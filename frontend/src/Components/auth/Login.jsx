import React, { useContext, useState } from "react";
import { login } from "../../util/http";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUserIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim().length < 1 || password.trim().length < 1) return;

    const { data } = await login({ email, password });
    if (data) {
      setUserIsLoggedIn(true);
      Cookies.set("token", data?.token, { expires: 7 });
      navigate("/home", { replace: true });
    }
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container pt-3">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body py-2 px-5 text-center">
                <form onSubmit={handleSubmit} className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div
                    data-mdb-input-init
                    className="form-outline form-white mb-4"
                  >
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (
                          e.target.value.length < 1 ||
                          !e.target.value.includes("@")
                        )
                          setEmailError("Please enter a valid email");
                        else setEmailError("");
                      }}
                      value={email}
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                    <span className="text-danger d-block">{emailError}</span>
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline form-white mb-4"
                  >
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (
                          e.target.value.length < 8 ||
                          !/[a-z]/.test(e.target.value) ||
                          !/[A-Z]/.test(e.target.value) ||
                          !/[0-9]/.test(e.target.value)
                        ) {
                          setPasswordError(
                            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
                          );
                        } else setPasswordError("");
                      }}
                      value={password}
                    />
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                    <span className="text-danger d-block">{passwordError}</span>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                </form>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
