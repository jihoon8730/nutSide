import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  faArrowRightToBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./styleEdit.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyleEdit = ({ myStyleObj, isOwner }) => {
  const onDeleteClick = () => {
    const isDelete = window.confirm("스타일을 삭제 하시겠습니까?");
    const styleRef = doc(db, "nutside", `${myStyleObj.id}`);
    const imageFileUrl = ref(storage, myStyleObj.imageUrl);
    if (isDelete) {
      deleteDoc(styleRef);
      deleteObject(imageFileUrl);
    }
  };

  const goToDetail = useNavigate();

  return (
    <div className="mylists">
      {isOwner === myStyleObj.createId ? (
        <div className="cards">
          <div className="card-black"></div>
          <button
            className="detail-page-btn"
            onClick={() => {
              goToDetail(`/detail/${myStyleObj.id}`);
            }}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </button>
          <button className="delete-btn" onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <img
            className="card-image"
            src={myStyleObj.imageUrl}
            alt="image load fail..."
          ></img>
        </div>
      ) : null}
    </div>
  );
};

export default StyleEdit;
