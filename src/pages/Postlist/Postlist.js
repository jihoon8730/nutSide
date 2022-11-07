import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import "./postlist.scss";

const Postlist = ({ userObj, userStyle, setUserStyle }) => {
  console.log(userObj.uid);
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
    <>
      <button onClick={onLikeTopSort}>top</button>
      <div className="Postlist">
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
    </>
  );
};

export default Postlist;
