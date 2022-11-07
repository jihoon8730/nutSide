import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="Spinner">
      <FontAwesomeIcon icon={faSpinner} />
    </div>
  );
};
export default Spinner;
