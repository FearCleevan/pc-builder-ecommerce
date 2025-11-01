import React, { useState } from "react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // TODO: integrate Firebase login
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>
          <span className={styles.tb}>TB</span>ADMIN
        </h1>

        <h2 className={styles.title}>Admin Login</h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="admin@yourstore.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.loginBtn} type="submit">
            Login
          </button>
        </form>

        <p className={styles.footerText}>
          © {new Date().getFullYear()} TechBuilder Admin Panel
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
