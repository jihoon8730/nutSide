import React from "react";
import { useNavigate } from "react-router-dom";
import "./createstyle.scss";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateStyle = () => {
  const create = useNavigate();
  const goToCreateStyle = () => {
    create("/post");
  };
  return (
    <div className="CreateStyle" onClick={goToCreateStyle}>
      <FontAwesomeIcon icon={faPenToSquare} /> Style
    </div>
  );
};

export default CreateStyle;
