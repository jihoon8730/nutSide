import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import "./signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecked, setPasswordChecked] = useState("");
  const [createDisplayName, setCreateDisplayName] = useState("");

  const [isPassword, setIsPassword] = useState(false);

  const onChangeInputValue = (e) => {
    const {
      target: { name, value },
    } = e;
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

  const onSignupClick = async (e) => {
    e.preventDefault();
    if (password === passwordChecked) {
      let data;
      const auth = getAuth();
      data = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: createDisplayName,
      });
      alert("회원가입 성공.");
      console.log(data);
    } else {
      setIsPassword(true);
      setTimeout(() => {
        setIsPassword(false);
        clearTimeout(isPassword);
      }, 3000);
    }
  };
  return (
    <div>
      <form onSubmit={onSignupClick}>
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
            className="password-input-check"
            name="passwordChecked"
            type="password"
            placeholder="Password 확인"
            required
            value={passwordChecked}
            onChange={onChangeInputValue}
          />
          <p
            className={
              isPassword === true
                ? "password-input-check-message"
                : "password-input-check-message-none"
            }
          >
            비밀번호가 일치하지 않습니다.
          </p>
        </div>
        <div>
          <input
            className="displayname-input"
            name="displayname"
            type="displayname"
            placeholder="Nickname"
            required
            value={createDisplayName}
            onChange={onChangeInputValue}
          />
        </div>
        <input className="create-btn" type="submit" value="생성완료" />
      </form>
    </div>
  );
};

export default Signup;
