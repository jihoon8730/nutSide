import React from "react";
import { useNavigate } from "react-router-dom";
import "./my.scss";

const My = () => {
  const MyRouter = useNavigate();
  const goToMy = () => {
    MyRouter("/mylist");
  };
  return (
    <div className="my-btn" onClick={goToMy}>
      Mylist
    </div>
  );
};
export default My;
