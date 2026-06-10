import { createContext, useContext, useEffect, useState } from "react";
import axiosAPI from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosAPI.get("/api/auth/verify");
      if (res.data.status) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {/* 
        NEVER block children render here.
        Blocking causes Login/Signup to not show until fetchUser resolves.
        Individual pages that need auth state should check `loading` themselves.
      */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);