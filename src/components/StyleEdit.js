import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

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
    <div>
      {isOwner === myStyleObj.createId ? (
        <>
          <div>{myStyleObj.sns}</div>
          <div>{myStyleObj.comment}</div>
          <div>{myStyleObj.outer}</div>
          <div>{myStyleObj.top}</div>
          <div>{myStyleObj.bottom}</div>
          <img
            src={myStyleObj.imageUrl}
            alt="image load fail..."
            width="200px"
            height="300px"
          ></img>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default StyleEdit;
