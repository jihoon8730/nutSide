import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./postlist.scss";

const Postlist = ({ userStyle, setUserStyle }) => {
  const goToDetail = useNavigate();

  const onLikeTopSort = async () => {
    const q = query(collection(db, "nutside"), orderBy("like", "desc"));
    onSnapshot(q, (snapshot) => {
      const userStyleArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStyle(userStyleArr);
    });
  };

  const onCreateDateSort = async () => {
    const q = query(collection(db, "nutside"), orderBy("createAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const userStyleArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStyle(userStyleArr);
    });
  };

  return (
    <div className="Postlist">
      <div className="like-rank">
        <button className="like-rank-btn" onClick={onLikeTopSort}>
          인기순
        </button>
        <button className="create-rank-btn" onClick={onCreateDateSort}>
          등록순
        </button>
      </div>
      <div className="postlist-box">
        {userStyle.map((styleInfo) => {
          return (
            <div
              className="postlist-cards"
              key={styleInfo.id}
              onClick={() => {
                goToDetail(`/detail/${styleInfo.id}`);
              }}
            >
              <div className="postlist-title">
                @{styleInfo.sns}
                <div className="title-like">
                  <FontAwesomeIcon icon={faHeart} />
                  {styleInfo.like}
                </div>
              </div>

              <img
                className="postlist-image"
                src={styleInfo.imageUrl}
                alt="image load fail..."
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Postlist;
