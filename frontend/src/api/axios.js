import axios from "axios";

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, 
});


axiosAPI.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);



let isRefreshing = false;
let failedQueue = []; 

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh-token") &&
      !originalRequest.url.includes("/api/auth/login") &&
      !originalRequest.url.includes("/api/auth/logout")
    ) {
  
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosAPI(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        
        await axiosAPI.post("/api/auth/refresh-token");

      
        processQueue(null);
        return axiosAPI(originalRequest);
      } catch (refreshError) {
    
        processQueue(refreshError);

        
        const authPaths = ["/login", "/signup", "/forgot-password", "/verify-reset-otp", "/reset-password", "/verify-otp"];
        const isAuthPage = authPaths.some((p) =>
          window.location.pathname.startsWith(p)
        );

        if (!isAuthPage) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAPI;