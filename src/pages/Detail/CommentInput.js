import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import CommentDelete from "./CommentDelete";

const CommentInput = ({ userId, userObj, userStyleDoc, userComments }) => {
  const [commentsValue, setCommentsValue] = useState("");

  const onCommentChange = async (event) => {
    const {
      target: { value, name },
    } = event;
    if (name) {
      setCommentsValue(value);
    }
  };

  const onCommentSubmit = async (event) => {
    event.preventDefault();
    const dt = new Date();
    if (commentsValue !== "") {
      if (userId?.createId === userObj?.uid) {
        await addDoc(collection(userStyleDoc, "repleComment"), {
          name: userObj?.displayName,
          createUserId: userObj?.uid,
          comment: commentsValue,
          date: new Date(),
          createDate: `${dt.getFullYear()}. ${
            dt.getMonth() + 1
          }. ${dt.getDate()}`,
          postUserId: userId?.id,
          maker: "작성자",
        });
      } else {
        await addDoc(collection(userStyleDoc, "repleComment"), {
          name: userObj?.displayName,
          createUserId: userObj?.uid,
          comment: commentsValue,
          date: new Date(),
          createDate: `${dt.getFullYear()}. ${
            dt.getMonth() + 1
          }. ${dt.getDate()}`,
          postUserId: userId?.id,
        });
      }
      setCommentsValue("");
    } else {
      alert("댓글을 입력해주세요");
    }
  };

  const userCommentLength = userComments?.length;
  return (
    <div>
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
        {userComments?.map((comments) => {
          return (
            <CommentDelete
              key={comments?.id}
              comments={comments}
              userObj={userObj}
              userId={userId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentInput;
