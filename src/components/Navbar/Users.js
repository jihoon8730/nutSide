import React from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const users = useNavigate();
  const goToUsers = () => {
    users("/postlist");
  };
  return <div onClick={goToUsers}>Users</div>;
};

export default Users;
