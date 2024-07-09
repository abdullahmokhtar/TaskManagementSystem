import React, { useState } from "react";
import { register } from "../../util/http";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      userName.trim().length < 1 ||
      email.trim().length < 1 ||
      password.trim().length < 1 ||
      rePassword.trim().length < 1
    )
      return;

    const { data } = await register({ userName, email, password, rePassword });
    if (data) {
      navigate("/login", { replace: true });
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
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="userName"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setUserName(e.target.value);
                        if (e.target.value.length < 3)
                          setUserNameError("Please enter a valid name");
                        else setUserNameError("");
                      }}
                      value={userName}
                    />
                    <label className="form-label" htmlFor="userName">
                      User Name
                    </label>
                    <span className="text-danger d-block">{userNameError}</span>
                  </div>
                  <div className="form-outline form-white mb-4">
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

                  <div className="form-outline form-white mb-4">
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

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typeRePasswordX"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setRePassword(e.target.value);
                        if (e.target.value !== password) {
                          setRePasswordError(
                            "Confirm Password must match the password"
                          );
                        } else setRePasswordError("");
                      }}
                      value={rePassword}
                    />
                    <label className="form-label" htmlFor="typeRePasswordX">
                      Confirm Password
                    </label>
                    <span className="text-danger d-block">
                      {rePasswordError}
                    </span>
                  </div>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Register
                  </button>
                </form>

                <div>
                  <p className="mb-0">
                    Do you have an account?{" "}
                    <Link to="/login" className="text-white-50 fw-bold">
                      login
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

export default Register;
