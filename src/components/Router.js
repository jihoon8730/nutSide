import Navbar from "./Navbar/Navbar";
import Home from "../pages/Home/Home";
import Post from "../pages/Post/Post";
import Auth from "../pages/Auth/Auth";
import "normalize.css";
import { Route, Routes } from "react-router-dom";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <div className="wrap">
      {isLoggedIn ? <Navbar /> : null}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
