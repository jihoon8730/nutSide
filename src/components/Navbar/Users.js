import React from "react";
import { useNavigate } from "react-router-dom";
import "./users.scss";

const Users = () => {
  const users = useNavigate();
  const goToUsers = () => {
    users("/postlist");
  };
  return (
    <div className="Users" onClick={goToUsers}>
      사람들
    </div>
  );
};

export default Users;
