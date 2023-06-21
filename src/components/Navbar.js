import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { useJwt } from "react-jwt";

export default function Navbar() {
  const { logout, token } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);

  return (
    <div className="container">
      <div className="title">
        <Link to="/">My Cool Blog</Link>
      </div>
      <nav>
        {token !== null && (
          <div>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {token === null && (
          <div>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
