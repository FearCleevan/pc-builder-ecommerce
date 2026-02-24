import React, { useMemo, useState } from "react";
import { FaApple, FaDiscord, FaGoogle } from "react-icons/fa";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./AccountPage.module.css";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Japan",
  "Singapore",
  "Philippines",
];

const initialSignInState = {
  email: "",
  password: "",
};

const initialRegisterState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "",
  birthDate: "",
  contactNumber: "",
  acceptTerms: false,
  allowUpdates: false,
  joinRewards: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AccountPage = () => {
  const [activeView, setActiveView] = useState("signin");
  const [signInForm, setSignInForm] = useState(initialSignInState);
  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [signInErrors, setSignInErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [feedback, setFeedback] = useState("");

  const activeTitle = useMemo(
    () =>
      activeView === "signin"
        ? "Sign in to your TechnoBuild account"
        : "Create your TechnoBuild account",
    [activeView]
  );

  const validateSignIn = () => {
    const errors = {};

    if (!signInForm.email.trim()) errors.email = "Email is required.";
    else if (!emailPattern.test(signInForm.email))
      errors.email = "Use a valid email format.";

    if (!signInForm.password.trim()) errors.password = "Password is required.";

    return errors;
  };

  const validateRegister = () => {
    const errors = {};

    if (!registerForm.firstName.trim()) errors.firstName = "First name is required.";
    if (!registerForm.email.trim()) errors.email = "Email is required.";
    else if (!emailPattern.test(registerForm.email))
      errors.email = "Use a valid email format.";

    if (!registerForm.password) errors.password = "Password is required.";
    else if (registerForm.password.length < 8)
      errors.password = "Password must be at least 8 characters.";

    if (!registerForm.confirmPassword)
      errors.confirmPassword = "Please confirm your password.";
    else if (registerForm.password !== registerForm.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    if (!registerForm.country) errors.country = "Please choose your country.";
    if (!registerForm.acceptTerms)
      errors.acceptTerms = "You must accept the terms to continue.";

    return errors;
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    const errors = validateSignIn();
    setSignInErrors(errors);
    setFeedback("");

    if (Object.keys(errors).length > 0) return;

    const payload = {
      email: signInForm.email.trim(),
      password: signInForm.password,
    };

    // Backend ready: replace with API call.
    console.log("Sign in payload:", payload);
    setFeedback("Sign in request is ready. Connect this to your auth API.");
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const errors = validateRegister();
    setRegisterErrors(errors);
    setFeedback("");

    if (Object.keys(errors).length > 0) return;

    const payload = {
      firstName: registerForm.firstName.trim(),
      lastName: registerForm.lastName.trim(),
      email: registerForm.email.trim(),
      password: registerForm.password,
      country: registerForm.country,
      birthDate: registerForm.birthDate || null,
      contactNumber: registerForm.contactNumber.trim() || null,
      allowUpdates: registerForm.allowUpdates,
      joinRewards: registerForm.joinRewards,
    };

    // Backend ready: replace with API call.
    console.log("Register payload:", payload);
    setFeedback("Registration request is ready. Connect this to your auth API.");
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Welcome to TechnoBuild Account Center</h1>
          <p>
            Access your saved builds, track orders, and manage your membership details.
          </p>
        </section>

        <section className={styles.cardWrap}>
          <aside className={styles.infoCard}>
            <h2>New to TechnoBuild?</h2>
            <p className={styles.infoLead}>
              Create an account to unlock faster checkout, build syncing, and priority updates.
            </p>
            <button type="button" onClick={() => setActiveView("register")}>
              Create an account
            </button>

            <div className={styles.infoSection}>
              <h3>Member Benefits</h3>
              <ul>
                <li>Save and compare multiple custom PC builds.</li>
                <li>Track purchases, support tickets, and warranty records.</li>
                <li>Receive curated launch alerts and hardware updates.</li>
                <li>Access account history from any device.</li>
              </ul>
            </div>

            <div className={styles.infoSection}>
              <h3>Rewards & Perks</h3>
              <p>
                Opt in to rewards for member-only drops, campaign bonuses, and early access notices.
              </p>
            </div>
          </aside>

          <div className={styles.authCard}>
            <h2>{activeTitle}</h2>
            <div className={styles.switch}>
              <button
                type="button"
                className={`${styles.switchButton} ${
                  activeView === "signin" ? styles.active : ""
                }`}
                onClick={() => setActiveView("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`${styles.switchButton} ${
                  activeView === "register" ? styles.active : ""
                }`}
                onClick={() => setActiveView("register")}
              >
                Register
              </button>
            </div>

            {activeView === "signin" ? (
              <form className={styles.form} onSubmit={handleSignInSubmit} noValidate>
                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={signInForm.email}
                    onChange={(event) =>
                      setSignInForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="you@example.com"
                  />
                  {signInErrors.email && <small>{signInErrors.email}</small>}
                </label>

                <label className={styles.field}>
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    value={signInForm.password}
                    onChange={(event) =>
                      setSignInForm((prev) => ({ ...prev, password: event.target.value }))
                    }
                    placeholder="Enter your password"
                  />
                  {signInErrors.password && <small>{signInErrors.password}</small>}
                </label>

                <div className={styles.inlineActions}>
                  <a href="#forgot-password">Forgot password?</a>
                </div>

                <button type="submit" className={styles.primaryButton}>
                  Continue
                </button>

                <div className={styles.social}>
                  <span>or continue with</span>
                  <div>
                    <button type="button" aria-label="Continue with Google">
                      <FaGoogle />
                    </button>
                    <button type="button" aria-label="Continue with Apple">
                      <FaApple />
                    </button>
                    <button type="button" aria-label="Continue with Discord">
                      <FaDiscord />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form className={styles.form} onSubmit={handleRegisterSubmit} noValidate>
                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>First Name *</span>
                    <input
                      type="text"
                      name="firstName"
                      value={registerForm.firstName}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          firstName: event.target.value,
                        }))
                      }
                    />
                    {registerErrors.firstName && <small>{registerErrors.firstName}</small>}
                  </label>

                  <label className={styles.field}>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="lastName"
                      value={registerForm.lastName}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({ ...prev, lastName: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                  />
                  {registerErrors.email && <small>{registerErrors.email}</small>}
                </label>

                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>Password *</span>
                    <input
                      type="password"
                      name="password"
                      value={registerForm.password}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                    />
                    {registerErrors.password && <small>{registerErrors.password}</small>}
                  </label>

                  <label className={styles.field}>
                    <span>Confirm Password *</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          confirmPassword: event.target.value,
                        }))
                      }
                    />
                    {registerErrors.confirmPassword && (
                      <small>{registerErrors.confirmPassword}</small>
                    )}
                  </label>
                </div>

                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>Country / Region *</span>
                    <select
                      name="country"
                      value={registerForm.country}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({ ...prev, country: event.target.value }))
                      }
                    >
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option value={country} key={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {registerErrors.country && <small>{registerErrors.country}</small>}
                  </label>

                  <label className={styles.field}>
                    <span>Date of Birth</span>
                    <input
                      type="date"
                      name="birthDate"
                      value={registerForm.birthDate}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          birthDate: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Contact Number</span>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={registerForm.contactNumber}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        contactNumber: event.target.value,
                      }))
                    }
                    placeholder="+1 000 000 0000"
                  />
                </label>

                <label className={styles.checkField}>
                  <input
                    type="checkbox"
                    checked={registerForm.acceptTerms}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        acceptTerms: event.target.checked,
                      }))
                    }
                  />
                  <span>I agree to the account terms and privacy policy. *</span>
                </label>
                {registerErrors.acceptTerms && <small>{registerErrors.acceptTerms}</small>}

                <label className={styles.checkField}>
                  <input
                    type="checkbox"
                    checked={registerForm.allowUpdates}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        allowUpdates: event.target.checked,
                      }))
                    }
                  />
                  <span>Send me product releases, drops, and event updates.</span>
                </label>

                <label className={styles.checkField}>
                  <input
                    type="checkbox"
                    checked={registerForm.joinRewards}
                    onChange={(event) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        joinRewards: event.target.checked,
                      }))
                    }
                  />
                  <span>Join rewards to track points and member perks.</span>
                </label>

                <button type="submit" className={styles.primaryButton}>
                  Create Account
                </button>
              </form>
            )}

            {feedback && <p className={styles.feedback}>{feedback}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
