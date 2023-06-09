import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Auth.css";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { login, register } from "../../actions/user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [reloadboi, setreloadboi] = useState(false);
  useEffect(() => {
    document.title = "Social Media App - Login";
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    signUpBtn?.addEventListener("click", () => {
      container?.classList.add("sign-up-mode");
      document.title = "Social Media App - Register";
    });

    signInBtn?.addEventListener("click", () => {
      container?.classList.remove("sign-up-mode");
      document.title = "Social Media App - Login";
    });
  }, []);
  const dispatch = useDispatch();
  const Login = (e: React.FormEvent) => {
    e.preventDefault();
    setreloadboi(true);
    dispatch(login(loginData, navigate, setreloadboi));
  };
  const Register = (e: React.FormEvent) => {
    e.preventDefault();
    setreloadboi(true);
    dispatch(register(registerData, navigate, setreloadboi));
  };
  useEffect(() => {
    let token = [];
    try {
      //@ts-ignore
      token = JSON.parse(localStorage.getItem("token"));
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    if (token) {
      window.location.href = "/";
    }
  }, [navigate, dispatch]);
  const passwordCheck = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").test(registerData.password)
  return (
    <div>
      <div className="container">
        <div className="container__forms">
          <div className="form">
            <form action="" className="form__sign-in" onSubmit={Login}>
              <h2 className="form__title">Sign In</h2>
              <div className="form__input-field">
                <i className="uil uil-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="form__input-field">
                <i className="uil uil-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              {loginData.email.includes("@") &&
                loginData.password.trim().length >= 6 ? (
                reloadboi ? (
                  <CircularProgress />
                ) : (
                  <input className="form__submit" type="submit" value="Login" />
                )
              ) : (
                <input
                  className="form__submit_disabled"
                  type="submit"
                  value="Login"
                  disabled
                />
              )}
            </form>

            <form className="form__sign-up" onSubmit={Register}>
              <h2 className="form__title">Sign Up</h2>
              <div className="form__input-field">
                <i className="uil uil-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form__input-field">
                <i className="uil uil-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form__input-field">
                <i className="uil uil-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form__input-field">
                <i className="uil uil-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmpassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                {registerData.username.trim().length >= 4 &&
                  registerData.username.trim().length <= 20 &&
                  registerData.password.trim().length >= 8 &&
                  registerData.password.trim().length <= 20 &&
                  passwordCheck &&
                  registerData.password === registerData.confirmpassword &&
                  registerData.email.includes("@") ? (
                  reloadboi ? (
                    <CircularProgress />
                  ) : (
                    <input
                      className="form__submit"
                      type="submit"
                      value="Register"
                    />
                  )
                ) : (
                  <input
                    className="form__submit_disabled"
                    type="submit"
                    value="Register"
                    disabled
                  />
                )}
                {!reloadboi ? (
                  <Tooltip
                    title="NOTE: username length must be between 4 to 20 characters,email should be valid and both password should match and must be between 8 to 20 charcters and password should be combination of one uppercase,one lower case,one special char and one digit UwU"
                    arrow
                  >
                    <i
                      className="uil uil-info-circle"
                      style={{
                        cursor: "pointer",
                        marginLeft: "2rem",
                        fontSize: "1.3rem",
                        color: "gray",
                      }}
                    ></i>
                  </Tooltip>
                ) : (
                  ""
                )}
              </div>{" "}
            </form>
          </div>
        </div>
        <div className="container__panels">
          <div className="panel panel__left">
            <div className="panel__content">
              <h3 className="panel__title">New here ?</h3>
              <p className="panel__paragraph">
                Are you new here go sign up else (　-_･) ︻デ═一
              </p>
              <button className="btn btn-transparent" id="sign-up-btn">
                Register
              </button>
            </div>
            <img
              className="panel__image"
              src="https://stories.freepiklabs.com/storage/11588/market-launch-amico-2628.png"
              alt=""
            />
          </div>
          <div className="panel panel__right">
            <div className="panel__content">
              <h3 className="panel__title">One of us ?</h3>
              <p className="panel__paragraph">
                Are you one of us go sign in else (　-_･) ︻デ═一
              </p>
              <button className="btn btn-transparent" id="sign-in-btn">
                Sign In
              </button>
            </div>
            <img
              className="panel__image"
              src="https://www.pngkey.com/png/full/444-4444270_ia-press-play-website.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
