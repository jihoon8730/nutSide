import React, { useEffect, useState } from "react";
import {
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  collection,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import CommentInput from "./CommentInput";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./detail.scss";

const Detail = ({ userObj, userStyle }) => {
  const [userComments, setUserComments] = useState();
  const goToList = useNavigate();

  let { id } = useParams();
  let userId = userStyle.find((style) => {
    return style.id === id;
  });

  const userStyleDoc = doc(db, "nutside", `${userId?.id}`);
  useEffect(() => {
    const q = query(
      collection(userStyleDoc, "repleComment"),
      orderBy("date", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const userCommentArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserComments(userCommentArr);
    });
  }, [userStyle]);

  const isLike = userId?.likelist.includes(userObj.uid);
  const onLikeCount = async () => {
    if (!isLike) {
      await updateDoc(userStyleDoc, {
        like: userId?.like + 1,
        likelist: arrayUnion(userObj.uid),
      });
    } else {
      await updateDoc(userStyleDoc, {
        like: userId?.like - 1,
        likelist: arrayRemove(userObj.uid),
      });
    }
  };

  const onDeleteStyle = () => {
    const isDeleteConfirm = window.confirm("정말로 스타일을 삭제하시겠습니까?");
    const styleDelete = doc(db, "nutside", `${userId?.id}`);
    const imageDelete = ref(storage, userStyle.imageUrl);
    if (isDeleteConfirm) {
      goToList("/postlist");
      deleteDoc(styleDelete);
      deleteObject(imageDelete);
    }
  };
  return (
    <div className="Detail">
      <a
        className="detail-title-a"
        href={`https://www.instagram.com/${userId?.sns}/`}
        target="_blank"
      >
        <p className="detail-title">@{userId?.sns}</p>
      </a>
      <div className="detail-comment">{userId?.comment}</div>
      <div key={userId} className="detail-view">
        <img
          className="detail-image"
          src={userId?.imageUrl}
          alt="image URL load fail..."
          width="200px"
        />
        <div className="detail-delete-box">
          <button
            className="detail-delete"
            onClick={() => {
              onDeleteStyle();
            }}
          >
            삭제
          </button>
        </div>

        <div className="detail-contents">
          <div>TOP : {userId?.top}</div>
          <div>Bottom : {userId?.bottom}</div>
          <div>Outer : {userId?.outer}</div>
          <div>Shoes : {userId?.shoes}</div>
        </div>

        <button className="like-btn" onClick={onLikeCount}>
          <FontAwesomeIcon icon={isLike === false ? farHeart : faHeart} />
          <p className="like-count">{userId?.like}</p>
        </button>
      </div>
      <CommentInput
        userId={userId}
        userObj={userObj}
        userStyleDoc={userStyleDoc}
        userComments={userComments}
      />
    </div>
  );
};

export default Detail;
