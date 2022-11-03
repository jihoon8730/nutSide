import Navbar from "./Navbar/Navbar";
import Home from "../pages/Home/Home";
import Post from "../pages/Post/Post";
import Auth from "../pages/Auth/Auth";
import Postlist from "../pages/Postlist/Postlist";
import Mylist from "../pages/Mylist/Mylist";
import "normalize.css";
import { Route, Routes } from "react-router-dom";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <div className="wrap">
      {isLoggedIn ? <Navbar /> : null}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="/post" element={<Post userObj={userObj} />} />
        <Route path="/postlist" element={<Postlist userObj={userObj} />} />
        <Route path="/mylist" element={<Mylist userObj={userObj} />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
