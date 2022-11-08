import React from "react";
import { useNavigate } from "react-router-dom";
import "./createstyle.scss";

const CreateStyle = () => {
  const create = useNavigate();
  const goToCreateStyle = () => {
    create("/post");
  };
  return (
    <div className="CreateStyle" onClick={goToCreateStyle}>
      CreateStyle
    </div>
  );
};

export default CreateStyle;
