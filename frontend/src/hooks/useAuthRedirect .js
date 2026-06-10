import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

/**
 * useAuthRedirect
 *
 * Two modes:
 *
 * mode: "guest"
 *   → Page is for NON-logged-in users (Login, Signup, ForgotPassword,
 *     VerifyOtp, VerifyResetOtp, ResetPassword)
 *   → If user IS logged in → redirect to "/"
 *   → If user is NOT logged in → stay on page
 *
 * mode: "protected"
 *   → Page is for logged-in users only (Dashboard, Profile, etc.)
 *   → If user is NOT logged in → redirect to "/login"
 *   → If user IS logged in → stay on page
 */

const useAuthRedirect = (mode = "guest") => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const didRedirect = useRef(false); // blocks StrictMode double-invoke

  useEffect(() => {
    // Wait until AuthContext has resolved
    if (loading) return;
    // Only redirect once
    if (didRedirect.current) return;

    if (mode === "guest" && user) {
      // Already logged in — no business being on Login/Signup/OTP pages
      didRedirect.current = true;
      navigate("/", { replace: true });
    }

    if (mode === "protected" && !user) {
      // Not logged in — can't access protected pages
      didRedirect.current = true;
      navigate("/login", { replace: true });
    }
  }, [user, loading]); // re-runs when auth state resolves

  return { user, loading };
};

export default useAuthRedirect;