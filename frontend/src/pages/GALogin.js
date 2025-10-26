import React, { useState } from "react";
import { Form } from "rsuite";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GALogin = () => {
  const auth = getAuth();

  let navigate = useNavigate();

  let [GAemail, setGAEmail] = useState("");
  let [GAemailerr, setGAEmailErr] = useState("");
  let [GApassword, setGAPassword] = useState("");
  let [GApassworderr, setGAPasswordErr] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);

  let [loginerror, setLoginError] = useState("");

  let [forgotpasswordshow, setForgotPasswordShow] = useState(false);
  let [forgotgaemail, setForgotGAEmail] = useState("");
  let [forgotemailtext, setForgotEmailText] = useState("");
  let [forgotemailtexterr, setForgotEmailTextErr] = useState("");

  const handleGAEmail = (e) => {
    setGAEmail(e);
    setGAEmailErr("");
  };

  const handleGAPassword = (e) => {
    setGAPassword(e);
    setGAPasswordErr("");
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };

  let handleGALogin = () => {
    if (!GAemail) {
      setGAEmailErr("Admin ID is Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(GAemail)) {
        setGAEmailErr("Your Email is Invalid");
      }
    }

    if (!GApassword) {
      setGAPasswordErr("Password is Required");
    } else {
      signInWithEmailAndPassword(auth, GAemail, GApassword)
        .then((user) => {
          console.log("Login Successfull, We are taking you to home page");
          console.log(user);
          console.log("Login Successfull, We are taking you to home page");
          setTimeout(() => {
            navigate("/generaladminloginhome");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setLoginError("Invalid Credentials");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setLoginError("Invalid Credentials");
          }
        });
    }
  };

  const handleForgotGAEmail = (e) => {
    setForgotGAEmail(e);
    setForgotEmailTextErr("");
  };

  let handleForgotPassword = () => {
    if (!forgotgaemail) {
      setForgotEmailTextErr("Enter password reset email ");
    }
    sendPasswordResetEmail(auth, forgotgaemail)
      .then(() => {
        setForgotEmailText("Password reset email is sent to your email");
        setTimeout(() => {
          setForgotPasswordShow(false);
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes("auth/invalid-email")) {
          setForgotEmailTextErr("Invalid Credentials");
        }
      });
  };

  return (
    <>
      <Navbar />
      <SystemBackground>
        <h3>Login To Your Account</h3>
        <div className="systemLoginBackground">
          <div className="systemLoginForm">
            <Form>
              <Form.Group controlId="general admin email">
                <Form.ControlLabel>Admin Email</Form.ControlLabel>
                <Form.Control
                  onChange={handleGAEmail}
                  placeholder="Enter Admin Email"
                  name="General Admin Email"
                />
                {GAemailerr && <p className="adminerrtext">{GAemailerr}</p>}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  onChange={handleGAPassword}
                  placeholder="Enter Password"
                  name="password"
                  type={passwordshow ? "text" : "password"}
                  autoComplete="off"
                />
                {GApassworderr && (
                  <p className="adminerrtext">{GApassworderr}</p>
                )}
              </Form.Group>
              {passwordshow ? (
                <RiEyeFill
                  className="passwordEyeLogin"
                  onClick={handlePasswordShow}
                />
              ) : (
                <RiEyeCloseFill
                  className="passwordEyeLogin"
                  onClick={handlePasswordShow}
                />
              )}
            </Form>
            {loginerror && <p className="adminerrtext">{loginerror}</p>}
            <button className="systemLoginButton" onClick={handleGALogin}>
              Log in
            </button>
            <h1
              onClick={() => setForgotPasswordShow(!forgotpasswordshow)}
              className="mt-[-101.5px] ml-52 text-bold text-black hover:text-[#6591d2] cursor-pointer"
            >
              Forgot Password?
            </h1>
            {forgotpasswordshow && (
              <div className="w-full max-h-80 bg-primary flex fixed  ">
                <div className="p-10 bg-white rounded">
                  <h1 className="text-xl text-center text-primary font-bold">
                    Forgot Password
                  </h1>
                  <div className="relative">
                    <input
                      className="border border-solid border-indigo-900 w-full rounded-lg top-6 sml:top-1 md:top-!1 px-14 py-6 mt-9 sml:p-4 md:px-14 md:py-6 md:!mt-9 sml:mt-4 outline-0"
                      type="text"
                      onChange={handleForgotGAEmail}
                    />
                    <p className="font-semibold text-sm text-slate-500 absolute top-7 left-8 bg-white px-4">
                      Enter Your Email
                    </p>
                  </div>
                  <button
                    onClick={handleForgotPassword}
                    className="rounded-[5px] font-semibold text-md bg-yellow-500 text-black mt-5 p-2"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={() => setForgotPasswordShow(false)}
                    className="rounded-[5px] ml-5 text-center font-semibold text-md text-white mt-5 p-2 bg-[#6591d2]"
                  >
                    Cancel
                  </button>
                  {forgotemailtext && (
                    <p className="firebaseregsuccessfulltext">
                      {forgotemailtext}
                    </p>
                  )}
                  {forgotemailtexterr && (
                    <p className="adminerrtext">{forgotemailtexterr}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </SystemBackground>
    </>
  );
};

export default GALogin;
