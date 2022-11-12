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
      스타일 등록하기
    </div>
  );
};

export default CreateStyle;
