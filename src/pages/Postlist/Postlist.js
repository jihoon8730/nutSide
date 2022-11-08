import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
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

  return (
    <div className="Postlist">
      <div className="like-rank">
        <button className="like-rank-btn" onClick={onLikeTopSort}>
          좋아요순
        </button>
      </div>
      <div className="postlist-box">
        {userStyle.map((styleInfo) => {
          return (
            <div
              className="cards"
              key={styleInfo.id}
              onClick={() => {
                goToDetail(`/detail/${styleInfo.id}`);
              }}
            >
              <div className="card-title">{styleInfo.sns}</div>
              <img
                className="card-image"
                src={styleInfo.imageUrl}
                alt="image load fail..."
                width="200px"
                height="300px"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Postlist;
