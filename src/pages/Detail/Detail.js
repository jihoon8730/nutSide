import React, { useEffect, useState } from "react";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./detail.scss";

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

  console.log(userObj.uid);

  const onCommentChange = async (event) => {
    const {
      target: { value, name },
    } = event;
    if (name) {
      setCommentsValue(value);
    }
  };

  const onCommentSubmit = (event) => {
    event.preventDefault();
    updateDoc(userStyleDoc, {
      styleComments: arrayUnion({
        userName: userObj.uid,
        comment: commentsValue,
      }),
    });
    setCommentsValue("");
  };

  const onCommentDelete = () => {
    updateDoc(userStyleDoc, {
      // styleComments: {},
    });
  };

  const userCommentLength = userId?.styleComments?.length;

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
        </div>

        <button className="like-btn" onClick={onLikeCount}>
          <FontAwesomeIcon icon={isLike === false ? farHeart : faHeart} />
          <p className="like-count">{userId?.like}</p>
        </button>
      </div>
      <form className="comments" onSubmit={onCommentSubmit}>
        <input
          className="comment-input"
          name="comment"
          type="text"
          placeholder="댓글을 남겨주세요."
          onChange={onCommentChange}
          value={commentsValue}
        />
        <input className="comment-btn" type="submit" value="Comment" />
      </form>
      <div className="comment-list-box">
        <p className="comment-list-length">{`댓글 ${
          userCommentLength === undefined ? 0 : userCommentLength
        }`}</p>
        {userId?.styleComments?.map((comments) => {
          return (
            <div className="comment-view-box">
              <div key={comments} className="comment-list">
                {comments.comment}
              </div>
              {comments.userName === userObj.uid ? (
                <div className="comment-delete-btn" onClick={onCommentDelete}>
                  X
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
