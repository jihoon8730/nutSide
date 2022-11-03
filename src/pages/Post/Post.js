import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./post.scss";

const Post = ({ userObj }) => {
  const [addUserComment, setAddUserComment] = useState("");
  const [addUserTopInfo, setAddUserTopInfo] = useState("");
  const [addUserBottomInfo, setAddUserBottomInfo] = useState("");
  const [addUserSns, setAddUserSns] = useState("");

  const onPostChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "comment") {
      setAddUserComment(value);
    } else if (name === "top") {
      setAddUserTopInfo(value);
    } else if (name === "bottom") {
      setAddUserBottomInfo(value);
    } else if (name === "sns") {
      setAddUserSns(value);
    }
  };

  // add data save
  const onPostSubmit = async (event) => {
    event.preventDefault();
    try {
      const addStyleDatabasePush = await addDoc(collection(db, `nutside`), {
        comment: addUserComment,
        top: addUserTopInfo,
        bottom: addUserBottomInfo,
        sns: addUserSns,
        createAt: new Date(),
        createId: userObj.uid,
      });
      setAddUserComment("");
      setAddUserTopInfo("");
      setAddUserBottomInfo("");
      setAddUserSns("");
      console.log("docRef Id :", addStyleDatabasePush.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="Post">
      <form onSubmit={onPostSubmit}>
        <input
          name="sns"
          value={addUserSns}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onPostChange}
        />
        <input
          name="comment"
          value={addUserComment}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onPostChange}
        />
        <input
          name="top"
          value={addUserTopInfo}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onPostChange}
        />
        <input
          name="bottom"
          value={addUserBottomInfo}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onPostChange}
        />
        <input type="submit" value="nutside" />
      </form>
    </div>
  );
};

export default Post;
