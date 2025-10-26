import React, { useEffect, useState } from "react";
import { Form,  } from "rsuite";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";

const OLogin = () => {

  let [checkofficer, setCheckOfficer] = useState([])


  const auth = getAuth();

  const db = getDatabase();

  // useEffect(() => {
  //   const starCountRef = ref(db, "officers/");
  //   onValue(starCountRef, (snapshot) => {
  //     let array = []
  //     snapshot.forEach((item)=>{
  //       array.push(item.val())
  //     })
  //     setCheckOfficer(array)
  //   });
  // }, []);

  // console.log(checkofficer)

  let navigate = useNavigate();

  let [Oemail, setOEmail] = useState("");
  let [Oemailerr, setOEmailErr] = useState("");
  let [Opassword, setOPassword] = useState("");
  let [Opassworderr, setOPasswordErr] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);

  let [loginerror, setLoginError] = useState("");

  let [forgotpasswordshow, setForgotPasswordShow] = useState(false);
  let [forgotofficeremail, setForgotOfficerEmail] = useState("");
  let [forgotemailtext, setForgotEmailText] = useState("");
  let [forgotemailtexterr, setForgotEmailTextErr] = useState("");

  const handleOEmail = (e) => {
    setOEmail(e);
    setOEmailErr("");
  };

  const handleOPassword = (e) => {
    setOPassword(e);
    setOPasswordErr("");
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };

  let handleOLogin = () => {
    if (!Oemail) {
      setOEmailErr("Officer ID is Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Oemail)) {
        setOEmailErr("Your Email is Invalid");
      }
    }

    if (!Opassword) {
      setOPasswordErr("Password is Required");
    } else {
      signInWithEmailAndPassword(auth, Oemail, Opassword)
        .then((user) => {
          console.log("Login Successfull, We are taking you to home page");
          console.log(user);
          console.log("Login Successfull, We are taking you to home page");
          setTimeout(() => {
            navigate("/loginhome");
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

  const handleForgotOfficerEmail = (e) => {
    setForgotOfficerEmail(e);
    setForgotEmailTextErr("");
  };

  let handleForgotPassword = () => {
    if (!forgotofficeremail) {
      setForgotEmailTextErr("Enter password reset email ");
    }
    sendPasswordResetEmail(auth, forgotofficeremail)
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
              <Form.Group controlId="enter officer email">
                <Form.ControlLabel>Officer Email</Form.ControlLabel>
                <Form.Control
                  onChange={handleOEmail}
                  placeholder="Enter Officer Email"
                  name="Officer Email"
                />
                {Oemailerr && <p className="adminerrtext">{Oemailerr}</p>}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  onChange={handleOPassword}
                  placeholder="Enter Password"
                  name="password"
                  type={passwordshow ? "text" : "password"}
                  autoComplete="off"
                />
                {Opassworderr && <p className="adminerrtext">{Opassworderr}</p>}
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
            <button onClick={handleOLogin} className="systemLoginButton">
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
                      onChange={handleForgotOfficerEmail}
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

export default OLogin;
