import Navbar from "./Navbar/Navbar";
import Home from "../pages/Home/Home";
import Post from "../pages/Post/Post";
import Auth from "../pages/Auth/Auth";
import Postlist from "../pages/Postlist/Postlist";
import Mylist from "../pages/Mylist/Mylist";
import Detail from "../pages/Detail/Detail";
import { Route, Routes } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import "normalize.css";
import "./router.scss";

const AppRouter = ({ isLoggedIn, userObj }) => {
  const [userStyle, setUserStyle] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "nutside"), orderBy("createAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const userStyleArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStyle(userStyleArr);
    });
  }, []);
  return (
    <div className="wrap">
      {isLoggedIn ? <Navbar userObj={userObj} /> : null}
      <Routes basename={process.env.PUBLIC_URL}>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="/post" element={<Post userObj={userObj} />} />
        <Route
          path="/postlist"
          element={
            <Postlist
              userObj={userObj}
              userStyle={userStyle}
              setUserStyle={setUserStyle}
            />
          }
        />
        <Route
          path="/mylist"
          element={
            <Mylist
              userObj={userObj}
              userStyle={userStyle}
              setUserStyle={setUserStyle}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Detail
              userObj={userObj}
              userStyle={userStyle}
              setUserStyle={setUserStyle}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
