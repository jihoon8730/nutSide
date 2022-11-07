import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./auth.scss";
library.add(fab);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [displayError, setDisplayError] = useState("");

  const auth = getAuth();

  // email & password.
  const onChangeInputValue = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (newAccount) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          setDisplayError(error.message);
        });
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          setDisplayError(error.message);
        });
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  // google Login
  const onSocialLoginClick = (event) => {
    const {
      target: { name },
    } = event;
    if (name === "google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="Auth">
      <p className="auth-title">NuT</p>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className="email-input"
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChangeInputValue}
          />
        </div>
        <div>
          <input
            className="password-input"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChangeInputValue}
          />
        </div>

        <input
          className="toggle-sign-btn"
          type="submit"
          value={newAccount ? "Create" : "Log In"}
        />
      </form>

      <div>{displayError}</div>
      <span className="toggle-sign-btn" onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create User"}
      </span>
      <div>
        <button
          className="google-btn"
          name="google"
          onClick={onSocialLoginClick}
        >
          <FontAwesomeIcon className="google-font" icon={["fab", "google"]} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
