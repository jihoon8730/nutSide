import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import "./auth.scss";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecked, setPasswordChecked] = useState("");
  const [createDisplayName, setCreateDisplayName] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [displayError, setDisplayError] = useState("");

  const [isPassword, setIsPassword] = useState(false);

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
    } else if (name === "passwordChecked") {
      setPasswordChecked(value);
    }
  };

  const auth = getAuth();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        if (password === passwordChecked) {
          data = await createUserWithEmailAndPassword(auth, email, password);
          updateProfile(auth.currentUser, {
            displayName: createDisplayName,
          });
        }
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      setIsPassword(true);
      setTimeout(() => {
        setIsPassword(false);
      }, 3000);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

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
              newAccount ? "password-input-check" : "password-input-check-none"
            }
            name="passwordChecked"
            type="password"
            placeholder="Password 확인"
            required
            value={passwordChecked}
            onChange={onChangeInputValue}
          />
          {isPassword === true ? (
            <p className="password-input-check-message">
              비밀번호가 일치하지 않습니다.
            </p>
          ) : null}
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
          value={newAccount ? "생성완료" : "로그인"}
        />
      </form>

      <span className="toggle-sign-btn" onClick={toggleAccount}>
        {newAccount ? "로그인 돌아가기" : "계정만들기"}
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
