import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./post.scss";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Post = ({ userObj }) => {
  const [addUserComment, setAddUserComment] = useState("");
  const [addUserTopInfo, setAddUserTopInfo] = useState("");
  const [addUserBottomInfo, setAddUserBottomInfo] = useState("");
  const [addUserSns, setAddUserSns] = useState("");
  const [addUserOuter, setAddUserOuter] = useState("");

  const [attachment, setAttachment] = useState("");

  const goPostList = useNavigate();
  const goToPostList = () => {
    goPostList("/postlist");
  };

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
    } else if (name === "outer") {
      setAddUserOuter(value);
    }
  };

  // add data save
  const onPostSubmit = async (event) => {
    event.preventDefault();

    // image uploading And imageUrl
    let imageFileUrl = "";
    const imageRef = ref(storage, `${userObj.uid}/${v4()}`);
    await uploadString(imageRef, attachment, "data_url");
    imageFileUrl = await getDownloadURL(ref(storage, imageRef));

    //style data upload
    let styleInfoData = {
      comment: addUserComment,
      top: addUserTopInfo,
      bottom: addUserBottomInfo,
      outer: addUserOuter,
      sns: addUserSns,
      createAt: new Date(),
      createId: userObj.uid,
      imageUrl: imageFileUrl,
    };
    try {
      const addStyleDatabasePush = await addDoc(
        collection(db, "nutside"),
        styleInfoData
      );
      setAddUserComment("");
      setAddUserTopInfo("");
      setAddUserBottomInfo("");
      setAddUserSns("");
      setAddUserOuter("");
      setAttachment("");
      console.log("docRef Id :", addStyleDatabasePush.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    goToPostList();
  };

  // image File
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhotoClick = () => setAttachment(null);
  return (
    <div className="Post">
      <div className="post-form-left">
        <form onSubmit={onPostSubmit} className="post-position">
          <div className="post-input-box">
            <input
              className="input-style"
              name="sns"
              value={addUserSns}
              type="text"
              placeholder="SNS 계정"
              maxLength={30}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="top"
              value={addUserTopInfo}
              type="text"
              placeholder="Top"
              maxLength={30}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="bottom"
              value={addUserBottomInfo}
              type="text"
              placeholder="Bottom"
              maxLength={30}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="outer"
              value={addUserOuter}
              type="text"
              placeholder="Outer"
              maxLength={30}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="comment"
              value={addUserComment}
              type="text"
              placeholder="Comment"
              maxLength={120}
              onChange={onPostChange}
            />
          </div>

          <input className="Add-btn" type="submit" value="Add" />
          <div className="post-form-right">
            {attachment ? null : (
              <input
                className="post-image-input"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
            )}

            {attachment && (
              <div>
                <img src={attachment} className="post-image" />
                <button onClick={onClearPhotoClick}>Clear</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
