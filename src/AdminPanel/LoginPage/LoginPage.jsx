import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser, ensureUserDocument } from "../../firebase/services/authService";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.isActive) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log("No active session");
      }
    };

    checkAuthStatus();
  }, [navigate]);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    
    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", email);
      
      const result = await loginUser(email, password);
      
      if (result.user) {
        console.log("Login successful, user:", result.user);
        
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberMe");
        }
        
        // Store user info in session storage
        sessionStorage.setItem("currentUser", JSON.stringify(result.user));
        
        console.log("Navigating to dashboard");
        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // More specific error handling
      if (error.message.includes('not properly configured') || error.message.includes('No user document')) {
        setError("Account configuration issue. Please contact administrator.");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked for:", email);
    alert("Forgot password functionality to be implemented");
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    
    if (!isChecked) {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberMe");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>
          <span className={styles.tb}>TB</span>ADMIN
        </h1>

        <h2 className={styles.title}>Admin Login</h2>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="admin@yourstore.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.passwordInput}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className={styles.rememberForgotContainer}>
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className={styles.checkbox}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            
            <button
              type="button"
              className={styles.forgotPassword}
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <button 
            className={`${styles.loginBtn} ${isLoading ? styles.loading : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className={styles.footerText}>
          © {new Date().getFullYear()} TechnoBuild Admin Panel
        </p>
      </div>
    </div>
  );
};

export default LoginPage;