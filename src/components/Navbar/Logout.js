import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./logout.scss";

const Logout = () => {
  const goToLogin = useNavigate();
  const onLogoutClick = () => {
    const auth = getAuth();
    const isLogout = window.confirm("로그아웃 할래요?");
    if (isLogout) {
      signOut(auth);
      goToLogin("/");
    }
  };

  return (
    <button className="logout-btn" onClick={onLogoutClick}>
      Log out
    </button>
  );
};

export default Logout;
