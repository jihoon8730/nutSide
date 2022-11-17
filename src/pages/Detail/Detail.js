import React, { useEffect, useState } from "react";
import {
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./detail.scss";
import CommentInput from "./CommentInput";

const Detail = ({ userObj, userStyle }) => {
  const [userComments, setUserComments] = useState();

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
  console.log(userStyleDoc);

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

  return (
    <div className="Detail">
      <a
        className="detail-title-a"
        href={`https://www.instagram.com/${userId?.sns}/`}
        target="_blank"
      >
        <p className="detail-title">{userId?.sns}</p>
      </a>
      <div className="detail-comment">{userId?.comment}</div>
      <div key={userId} className="detail-view">
        <img
          className="detail-image"
          src={userId?.imageUrl}
          alt="image URL load fail..."
          width="200px"
        />
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
