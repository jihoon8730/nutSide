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
  const [addUserLike, setAddUserLike] = useState(0);
  const [addUserLikeList, setAddUserLikeList] = useState([]);
  const [addUserStyleComments, setAddUserStyleComments] = useState([]);
  // const [addUserRanking, setAddUserRanking] = useState();

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
      like: addUserLike,
      likelist: addUserLikeList,
      styleComments: addUserStyleComments,
      // ranking: addUserRanking,
    };
    if (addUserSns === "") {
      alert("인스타그램 계정을 입력해주세요.");
    } else {
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
      window.confirm("스타일을 등록하시겠습니까?");
      goToPostList();
    }
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
              placeholder="인스타그램 아이디 (필수)"
              maxLength={15}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="top"
              value={addUserTopInfo}
              type="text"
              placeholder="상의 or 없음"
              maxLength={15}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="bottom"
              value={addUserBottomInfo}
              type="text"
              placeholder="하의 or 없음"
              maxLength={15}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="outer"
              value={addUserOuter}
              type="text"
              placeholder="아우터 or 없음"
              maxLength={15}
              onChange={onPostChange}
            />
            <input
              className="input-style"
              name="comment"
              value={addUserComment}
              type="text"
              placeholder="간단한 소개"
              maxLength={50}
              onChange={onPostChange}
            />
          </div>

          <input className="Add-btn" type="submit" value="등록" />
          <div className="post-form-right">
            {attachment ? null : (
              <>
                <label className="post-image-input" for="input-file">
                  사진업로드
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  id="input-file"
                  style={{ display: "none" }}
                />
              </>
            )}

            {attachment && (
              <div>
                <img src={attachment} className="post-image" />
                <button className="clear-btn" onClick={onClearPhotoClick}>
                  취소
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
