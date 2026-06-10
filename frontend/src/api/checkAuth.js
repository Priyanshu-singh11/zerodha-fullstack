import axiosAPI from "./axios";

/**
 * Redirects already-logged-in users away from auth pages (login, signup).
 * Call this only in Login and SignUp — NOT in ForgotPassword / VerifyOtp / ResetPassword.
 */
const checkAuth = async (navigate) => {
  try {
    const res = await axiosAPI.get("/api/auth/verify");
    if (res.data.status) {
      navigate("/", { replace: true });
    }
  } catch {
    // Not logged in — stay on the page, do nothing
  }
};

export default checkAuth;