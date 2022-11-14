import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import "./signin.scss";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeInputValue = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSigninClick = async (e) => {
    e.preventDefault();
    let data;
    const auth = getAuth();
    data = await signInWithEmailAndPassword(auth, email, password);
    console.log(data);
    alert("로그인 하였습니다.");
  };

  return (
    <form onSubmit={onSigninClick}>
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
      <input className="login-btn" type="submit" value="로그인" />
    </form>
  );
};

export default Signin;
