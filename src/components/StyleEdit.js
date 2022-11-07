import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const StyleEdit = ({ myStyleObj, isOwner }) => {
  console.log(myStyleObj);
  const onDeleteClick = () => {
    const isDelete = window.confirm("스타일을 삭제 하시겠습니까?");
    const styleRef = doc(db, "nutside", `${myStyleObj.id}`);
    if (isDelete) {
      deleteDoc(styleRef);
    }
  };
  return (
    <div>
      {isOwner === myStyleObj.createId ? (
        <>
          <div>{myStyleObj.sns}</div>
          <div>{myStyleObj.comment}</div>
          <div>{myStyleObj.outer}</div>
          <div>{myStyleObj.top}</div>
          <div>{myStyleObj.bottom}</div>
          <div>{myStyleObj.imageFileUrl}</div>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default StyleEdit;
