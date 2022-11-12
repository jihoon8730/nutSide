import "./navbar.scss";
import Logout from "./Logout";
import My from "./My";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import CreateStyle from "./CreateStyle";
import { useEffect, useState } from "react";

export default function Navbar({ userObj }) {
  const [profile, setProfile] = useState(userObj);
  const goHome = useNavigate();
  const goToHome = () => {
    goHome("/");
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 0.1);
  //   clearInterval(profile);
  // }, [profile]);

  return (
    <nav className="navbar">
      <div className="logo" onClick={goToHome}>
        NuT
      </div>
      <div className="user">
        <Users />
        <CreateStyle />
      </div>
      <div className="profile">
        <p className="profileName">{profile.displayName} 님</p>
        <My />
        <Logout />
      </div>
    </nav>
  );
}
