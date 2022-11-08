import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import "./styleEdit.scss";

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
  return (
    <div className="mylists">
      {isOwner === myStyleObj.createId ? (
        <div className="cards">
          <div className="card-black"></div>
          <button className="delete-btn" onClick={onDeleteClick}>
            X
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
