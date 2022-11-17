import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import React from "react";
import "./comentdelete.scss";

const CommentDelete = ({ comments, userObj, userId }) => {
  const userStyleDoc = doc(db, "nutside", `${userId?.id}`);

  const onCommentDelete = () => {
    const checkDelete = window.confirm("댓글을 삭제 하시겠습니까?");
    const commentRef = doc(userStyleDoc, "repleComment", `${comments?.id}`);
    if (checkDelete) {
      deleteDoc(commentRef);
    }
  };
  return (
    <div key={comments?.id}>
      {" "}
      <div className="comment-view-box">
        <div className="comment-list">
          <div>
            <span className="comment-list-nickname">
              {`${comments?.name}`}{" "}
            </span>
            <span className="comment-list-date">
              {" "}
              {`${comments?.createDate}`}&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span className="comment-list-maker">{comments?.maker}</span>
          </div>
          <div className="comment-list-comment">{comments?.comment}</div>
        </div>
        {comments?.createUserId === userObj?.uid ? (
          <div className="comment-delete-btn" onClick={onCommentDelete}>
            X
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentDelete;
