import "./navbar.scss";
import Logout from "./Logout";
import My from "./My";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const goHome = useNavigate();
  const goToHome = () => {
    goHome("/");
  };
  return (
    <nav className="navbar">
      <div className="logo" onClick={goToHome}>
        NuT
      </div>
      <div className="profile">
        <My />
        <Logout />
      </div>
    </nav>
  );
}
