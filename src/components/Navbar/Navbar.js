import "./navbar.scss";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">NuT</div>
      <div className="profile">
        <Logout />
      </div>
    </nav>
  );
}
