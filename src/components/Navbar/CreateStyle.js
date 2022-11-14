import React from "react";
import { useNavigate } from "react-router-dom";
import "./createstyle.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateStyle = () => {
  const create = useNavigate();
  const goToCreateStyle = () => {
    create("/post");
  };
  return (
    <div className="CreateStyle" onClick={goToCreateStyle}>
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};

export default CreateStyle;
