import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import "./detail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Detail = ({ userObj, userStyle }) => {
  const [commentsValue, setCommentsValue] = useState([]);

  let { id } = useParams();
  let userId = userStyle.find((style) => {
    return style.id === id;
  });

  const userStyleDoc = doc(db, "nutside", `${userId?.id}`);

  const isLike = userId?.likelist.includes(userObj.uid);
  const onLikeCount = async () => {
    // array 요소의 추가 제거;
    // Atomically add a new region to the "regions" array field.
    // await updateDoc(washingtonRef, {
    //   regions: arrayUnion("greater_virginia")
    // });

    // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //   regions: arrayRemove("east_coast")
    // });
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

  const onCommentSubmit = (event) => {
    event.preventDefault();
    updateDoc(userStyleDoc, {
      styleComments: arrayUnion(commentsValue),
    });
  };

  const onCommentChange = async (event) => {
    const {
      target: { value, name },
    } = event;
    if (name) {
      setCommentsValue(value);
    }
  };

  return (
    <div className="Detail">
      <div key={userId} className="detail-view">
        <img
          className="detail-image"
          src={userId?.imageUrl}
          alt="image URL load fail..."
          width="200px"
        />
        <div className="detail-contents">
          <div>SNS : {userId?.sns}</div>
          <div>TOP : {userId?.top}</div>
          <div>Bottom :{userId?.bottom}</div>
          <div>Outer : {userId?.outer}</div>
          <div>Comment : {userId?.comment}</div>
        </div>

        <button className="like-btn" onClick={onLikeCount}>
          <p className="like-count">{userId?.like}</p>
          <FontAwesomeIcon icon={isLike === false ? farHeart : faHeart} />
        </button>
      </div>
      <form onSubmit={onCommentSubmit}>
        <input
          name="comment"
          type="text"
          placeholder="comment"
          onChange={onCommentChange}
          value={commentsValue}
        />
        <input type="submit" value="Comment" />
      </form>

      <div>{userId?.styleComments}</div>
    </div>
  );
};

export default Detail;
