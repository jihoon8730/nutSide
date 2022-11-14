import GoogleSignin from "./GoogleSignin/GoogleSignin";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import "./auth.scss";
import React, { useState } from "react";

const Auth = () => {
  const [isCreateId, setIsCreateId] = useState(false);

  const onCreateIdClick = () => {
    setIsCreateId(!isCreateId);
  };
  return (
    <div className="Auth">
      <p className="auth-title">NuT</p>
      <button className="create-id-btn" onClick={onCreateIdClick}>
        {isCreateId ? "돌아가기" : "회원가입"}
      </button>
      {isCreateId === false ? <Signin /> : <Signup />}
      <GoogleSignin />
    </div>
  );
};
export default Auth;
