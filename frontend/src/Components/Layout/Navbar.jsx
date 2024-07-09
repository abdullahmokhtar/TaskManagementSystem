import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUserIsLoggedIn(false);
    Cookies.remove("token");
    navigate("/login", { replace: true });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-gred">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav fw-bold  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link active text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!userIsLoggedIn && (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white fw-bold">
                  Login
                </Link>
              </li>
            )}

            {userIsLoggedIn && (
              <li className="nav-item">
                <span
                  onClick={logout}
                  className="nav-link text-white fw-bold"
                  role="button"
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
