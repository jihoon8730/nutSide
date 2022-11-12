import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import "./auth.scss";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createDisplayName, setCreateDisplayName] = useState("");
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
    } else if (name === "displayname") {
      setCreateDisplayName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (newAccount) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
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
    if (auth.currentUser.displayName === null) {
      updateProfile(auth.currentUser, {
        displayName: createDisplayName,
      });
    } else {
      return false;
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
        <div>
          <input
            className={
              newAccount ? "displayname-input" : "displayname-input-none"
            }
            name="displayname"
            type="displayname"
            placeholder="Nickname"
            required
            value={createDisplayName}
            onChange={onChangeInputValue}
            disabled={newAccount ? false : true}
          />
        </div>

        <input
          className="toggle-sign-btn"
          type="submit"
          value={newAccount ? "Create" : "Log In"}
        />
      </form>

      <span className="toggle-sign-btn" onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create User"}
      </span>
      <div>
        <button
          className="google-btn"
          name="google"
          onClick={onSocialLoginClick}
        >
          G
        </button>
      </div>
    </div>
  );
};
export default Auth;
