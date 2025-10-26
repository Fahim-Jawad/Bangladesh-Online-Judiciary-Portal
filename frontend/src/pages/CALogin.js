import React, { useState } from "react";
import { Form } from "rsuite";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const CALogin = () => {

  const auth = getAuth();
  let navigate = useNavigate();


  let [CAemail, setCAEmail] = useState("");
  let [CAemailerr, setCAEmailErr] = useState("");
  let [CApassword, setCAPassword] = useState("");
  let [CApassworderr, setCAPasswordErr] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);

  let [loginerror, setLoginError] = useState("");

  let [forgotpasswordshow, setForgotPasswordShow] = useState(false);
  let [forgotcaemail, setForgotCAEmail] = useState("");
  let [forgotemailtext, setForgotEmailText] = useState("");
  let [forgotemailtexterr, setForgotEmailTextErr] = useState("");



  const handleCAEmail = (e) => {
    setCAEmail(e);
    setCAEmailErr("");
  };

  const handleCAPassword = (e) => {
    setCAPassword(e);
    setCAPasswordErr("");
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };

  let handleCALogin = () => {
    if (!CAemail) {
      setCAEmailErr("Admin ID is Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(CAemail)) {
        setCAEmailErr("Your Email is Invalid");
      }
    }

    if (!CApassword) {
      setCAPasswordErr("Password is required");
    } else {
      signInWithEmailAndPassword(auth, CAemail, CApassword)
        .then((user) => {
          console.log("Login Successfull, We are taking you to home page");
        
          console.log(
            "Login Successfull, We are taking you to home page"
          );
          setTimeout(() => {
            navigate("/courtadminloginhome");
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


  const handleForgotCAEmail = (e) => {
    setForgotCAEmail(e);
    setForgotEmailTextErr("");
  };

  let handleForgotPassword = () => {
    if (!forgotcaemail) {
      setForgotEmailTextErr("Enter password reset email ");
    }
    sendPasswordResetEmail(auth, forgotcaemail)
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
              <Form.Group controlId="court admin email">
                <Form.ControlLabel>Admin Email</Form.ControlLabel>
                <Form.Control
                  onChange={handleCAEmail}
                  placeholder="Enter Admin Email"
                  name="Court Admin Email"
                />
                {CAemailerr && <p className="adminerrtext">{CAemailerr}</p>}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  onChange={handleCAPassword}
                  placeholder="Enter Password"
                  name="password"
                  type={passwordshow ? "text" : "password"}
                  autoComplete="off"
                />
                {CApassworderr && (
                  <p className="adminerrtext">{CApassworderr}</p>
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
            {loginerror && (
                  <p className="adminerrtext">{loginerror}</p>
                )}
            <button className="systemLoginButton" onClick={handleCALogin}>
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
                      onChange={handleForgotCAEmail}
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

export default CALogin;
