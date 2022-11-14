import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const [userStyle, setUserStyle] = useState([]);

  const detailPage = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "nutside"),
      orderBy("like", "desc"),
      limit(4)
    );
    onSnapshot(q, (snapshot) => {
      const userStyleArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStyle(userStyleArr);
    });
  }, []);

  return (
    <main className="home">
      <section className="main-box">
        <article
          className="main-left"
          onClick={() => {
            detailPage(`detail/${userStyle[0]?.id}`);
          }}
        >
          <div className="title-box">
            <p className="numbering-title">No.1</p>
            <p className="social-title">{userStyle[0]?.sns}</p>
          </div>
          <img
            className="main-left-image"
            src={userStyle[0]?.imageUrl}
            alt="no1 image load 실패"
          />
        </article>
        <article className="main-right">
          <div className="images-top">
            <div className="image-top-box-left">
              <div
                className="title-box"
                onClick={() => {
                  detailPage(`detail/${userStyle[1]?.id}`);
                }}
              >
                <p className="top-left-numbering-title">No.2</p>
                <p className="top-left-social-title">{userStyle[1]?.sns}</p>
              </div>
              <img
                className="image-top-left"
                src={userStyle[1]?.imageUrl}
                alt="no2 image load 실패"
              />
            </div>
            <div className="image-top-box-right">
              <div
                className="title-box"
                onClick={() => {
                  detailPage(`detail/${userStyle[2]?.id}`);
                }}
              >
                <p className="top-right-numbering-title">No.3</p>
                <p className="top-right-social-title">{userStyle[2]?.sns}</p>
              </div>
              <img
                className="image-top-right"
                src={userStyle[2]?.imageUrl}
                alt="no3 image load 실패"
              />
            </div>
          </div>
          <div className="images-bottom">
            <div className="image-bottom-box">
              <div
                className="title-box"
                onClick={() => {
                  detailPage(`detail/${userStyle[3]?.id}`);
                }}
              >
                <p className="bottom-numbering-title">No.4</p>
                <p className="bottom-social-title">{userStyle[3]?.sns}</p>
              </div>
              <img
                className="image-bottom-left"
                src={userStyle[3]?.imageUrl}
                alt="no4 image load 실패"
              />
            </div>
            <div className="title-bottom-right">
              <p>OO</p>
              <p>T D</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;
