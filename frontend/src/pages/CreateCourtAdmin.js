import React, { useState, useEffect } from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import {
  Form,
  Button,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
  SelectPicker,
} from "rsuite";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import System from "./System";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";




const CADivisiondata = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Syhlet",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Maymensingh",
].map((item) => ({ label: item, value: item }));

const CADistrictdata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const CAThanadata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const CreateCourtAdmin = () => {
  const auth = getAuth();

  const db = getDatabase();

  let navigate = useNavigate();

   

  let [adminfullname, setAdminFullName] = useState("");
  let [adminfullnameerr, setAdminFullNameErr] = useState("");
  let [adminID, setAdminID] = useState("");
  let [adminIDerr, setAdminIDErr] = useState("");
  let [adminemail, setAdminEmail] = useState("");
  let [adminemailerr, setAdminEmailErr] = useState("");
  let [adminmobilenumber, setAdminMobileNumber] = useState("");
  let [adminmobilenumbererr, setAdminMobileNumberErr] = useState("");
  let [adminnationalID, setAdminNationalID] = useState("");
  let [adminnationalIDerr, setAdminNationalIDErr] = useState("");
  let [adminDivision, setAdminDivision] = useState("");
  let [adminDistrict, setAdminDistrict] = useState("");
  let [adminThana, setAdminThana] = useState("");
  let [adminlocationerr, setAdminLocationErr] = useState("");
  let [adminpassword, setAdminPassword] = useState("");
  let [adminpassworderr, setAdminPasswordErr] = useState("");
  let [adminconfirmpassword, setAdminConfirmPassword] = useState("");
  let [adminconfirmpassworderr, setAdminConfirmPasswordErr] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);
  let [confirmpasswordshow, setConfirmPasswordShow] = useState(false);

  let [firebaseerr, setFirebaseErr] = useState("");
  let [regsuccessfull, setRegSuccessfull] = useState("")

  const adminemailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const adminmobilenumbertest = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const adminpasswordtest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})$/;


  const handleAdminFullName = (e) => {
    setAdminFullName(e);
    setAdminFullNameErr("");
  };
  const handleAdminID = (e) => {
    setAdminID(e);
    setAdminIDErr("");
  };
  const handleAdminEmail = (e) => {
    setAdminEmail(e);
    setAdminEmailErr("");
  };
  const handleAdminMobileNumber = (e) => {
    setAdminMobileNumber(e);
    setAdminMobileNumberErr("");
  };
  const handleAdminNationalID = (e) => {
    setAdminNationalID(e);
    setAdminNationalIDErr("");
  };
  const handleAdminDivision = (e) => {
    setAdminDivision(e);
    setAdminLocationErr("");
  };
  const handleAdminDistrict = (e) => {
    setAdminDistrict(e);
    setAdminLocationErr("");
  };
  const handleAdminThana = (e) => {
    setAdminThana(e);
    setAdminLocationErr("");
  };
  const handleAdminPassword = (e) => {
    setAdminPassword(e);
    setAdminPasswordErr("");
  };
  const handleAdminConfirmPassword = (e) => {
    setAdminConfirmPassword(e);
    setAdminConfirmPasswordErr("");
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };
  let handleConfirmPasswordShow = () => {
    setConfirmPasswordShow(!confirmpasswordshow);
  };

  let handleCreateCAAccount = async () => {
    if (!adminfullname) {
      setAdminFullNameErr("Full Name is Required");
    } else {
      if (adminfullname.length <= 1) {
        setAdminFullNameErr("Full Name must be greater than one character");
      }
    }
    if (!adminID) {
      setAdminIDErr("Admin ID is Required");
    }
    if (!adminemail) {
      setAdminEmailErr("Email is Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adminemail)) {
        setAdminEmailErr("Your Email is Invalid");
      }
    }
    if (!adminmobilenumber) {
      setAdminMobileNumberErr("Mobile Number is Required");
    } else {
      if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(adminmobilenumber)) {
        setAdminMobileNumberErr("Mobile number is Invalid");
      }
    }
    if (!adminnationalID) {
      setAdminNationalIDErr("National ID Number is Required");
    }
    if (!adminDivision && !adminDistrict && !adminThana) {
      setAdminLocationErr("Please Select Your Division, District and Thana");
    } else if (!adminDivision && !adminDistrict) {
      setAdminLocationErr("Please Select Your Division and District");
    } else if (!adminDivision && !adminThana) {
      setAdminLocationErr("Please Select Your Division and Thana");
    } else if (!adminDistrict && !adminThana) {
      setAdminLocationErr("Please Select Your District and Thana");
    } else if (!adminDivision) {
      setAdminLocationErr("Please Select Your Division");
    } else if (!adminDistrict) {
      setAdminLocationErr("Please Select Your District");
    } else if (!adminThana) {
      setAdminLocationErr("Please Select Your Thana");
    }
    if (!adminpassword) {
      setAdminPasswordErr("Password is Required");
    } else {
      if (!/^(?=.*[a-z])/.test(adminpassword)) {
        setAdminPasswordErr("Password must contain a lower case");
      } else if (!/^(?=.*[A-Z])/.test(adminpassword)) {
        setAdminPasswordErr("Password must contain a upper case");
      } else if (!/^(?=.*[0-9])/.test(adminpassword)) {
        setAdminPasswordErr("Password must contain one numeric character");
      } else if (!/^(?=.*[!@#$%^&*])/.test(adminpassword)) {
        setAdminPasswordErr(
          "Password  must contain at least one special character"
        );
      } else if (!/^(?=.{6,})/.test(adminpassword)) {
        setAdminPasswordErr("Password  must be six characters or longer");
      }
    }
    if (!adminconfirmpassword) {
      setAdminConfirmPasswordErr("Rewrite Your Password");
    }
    if (adminpassword !== adminconfirmpassword) {
      setAdminConfirmPasswordErr("Passowords don't match");
    }
    if (
      adminfullname &&
      adminID &&
      adminemail &&
      adminemailtest.test(adminemail) &&
      adminmobilenumber &&
      adminmobilenumbertest.test(adminmobilenumber) &&
      adminnationalID &&
      adminDivision &&
      adminDistrict &&
      adminThana &&
      adminpassword &&
      adminconfirmpassword &&
      !adminemailerr &&
      !adminmobilenumbererr &&
      !adminpassworderr &&
      !adminconfirmpassworderr &&
      // adminemailtest &&
      // adminmobilenumbertest &&
      // // adminpasswordtest &&
      adminpassword === adminconfirmpassword
    ) {
      createUserWithEmailAndPassword(auth, adminemail, adminpassword)
        .then((user) => {
          console.log("Admin Database Created");
          console.log(user);
          set(push(ref(db, "courtAdmins/")), {
            adminFullName: adminfullname,
            adminID: adminID,
            adminEmail: adminemail,
            adminMobileNumber: adminmobilenumber,
            adminNationalID: adminnationalID,
            adminDivision: adminDivision,
            adminDistrict: adminDistrict,
            adminThana: adminThana,
            adminPassword: adminpassword,
          });
          sendEmailVerification(auth.currentUser).then(() => {
            setRegSuccessfull(
              "Registration Successfull, Please Verify Your Email"
            );
            setTimeout(() => {
              navigate("/");
            }, 3000);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already is use");
          }
        });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <SystemBackground>
        <h3>Create Court Admin Account</h3>
        <div className="accountcreateformbackground">
          <div className="accountcreatesystem">
            <div className="left-column">
              <h4>Personal Info</h4>

              <div className="leftForm">
                <Form fluid>
                  <Form.Group controlId="court admin name">
                    <Form.ControlLabel>Admin Name</Form.ControlLabel>
                    <Form.Control
                      onChange={handleAdminFullName}
                      placeholder="Enter Your Name"
                      name="Court Admin Name"
                      type="text"
                      style={{ width: 260 }}
                    />
                    {adminfullnameerr && (
                      <p className="adminerrtext">{adminfullnameerr}</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="court admin id">
                    <Form.ControlLabel>Admin ID</Form.ControlLabel>
                    <Form.Control
                      onChange={handleAdminID}
                      placeholder="Enter Your ID"
                      name="court admin id"
                      style={{ width: 260 }}
                    />
                    {adminIDerr && <p className="adminerrtext">{adminIDerr}</p>}
                  </Form.Group>
                </Form>

                <Form fluid>
                  <Form.Group controlId="email">
                    <Form.ControlLabel style={{ marginTop: 30 }}>
                      Email
                    </Form.ControlLabel>
                    <Form.Control
                      onChange={handleAdminEmail}
                      placeholder="Email"
                      name="email"
                      type="text"
                      style={{ width: 260 }}
                    />
                    {adminemailerr && (
                      <p className="adminerrtext">{adminemailerr}</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="mobile number">
                    <Form.ControlLabel>Mobile Number</Form.ControlLabel>
                    <Form.Control
                      onChange={handleAdminMobileNumber}
                      placeholder="Mobile Number"
                      name="mobile number"
                      type="text"
                      style={{ width: 200 }}
                    />
                    {adminmobilenumbererr && (
                      <p className="adminerrtext">{adminmobilenumbererr}</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="national id">
                    <Form.ControlLabel>National Id No.</Form.ControlLabel>
                    <Form.Control
                      onChange={handleAdminNationalID}
                      placeholder="National ID Number"
                      name="national id"
                      style={{ width: 300 }}
                    />
                    {adminnationalIDerr && (
                      <p className="adminerrtext">{adminnationalIDerr}</p>
                    )}
                  </Form.Group>
                </Form>

                <SelectPicker
                  onChange={handleAdminDivision}
                  placeholder="Dvision:   Select"
                  data={CADivisiondata}
                  style={{ width: 224, marginTop: 20 }}
                />
                <br />
                <SelectPicker
                  onChange={handleAdminDistrict}
                  placeholder="District:   Select"
                  data={CADistrictdata}
                  style={{ width: 224, marginTop: 10 }}
                />
                <br />
                <SelectPicker
                  onChange={handleAdminThana}
                  placeholder="Thana:   Select"
                  data={CAThanadata}
                  style={{ width: 224, marginTop: 10 }}
                />
                {adminlocationerr && (
                  <p className="adminerrtext">{adminlocationerr}</p>
                )}
              </div>
            </div>

            <div className="right-column">
              <h4 className="rightcoloumHeading">Official Info</h4>
              <div className="rightForm">
                {/* <div className="photopreview"></div>

                <div className="pictureUploadForm">
                  <Form layout="inline">
                    <Form.Group controlId="prfile picture">
                      <Form.ControlLabel>Your image</Form.ControlLabel>
                      <Form.Control
                        placeholder="Upload Profile Picture"
                        name="profile picture"
                        style={{ width: 260 }}
                      />
                    </Form.Group>
                    <button className="uploadbutton">Upload</button>
                  </Form>
                </div> */}
                <p className="passwordtext">
                  Password must be 6 characters Longer(Password must contain at
                  least one lower case letter, at least one upper case letter,
                  at least one nummeric character and at least one special
                  character)
                </p>
                <div className="passwordForm">
                  <Form layout="inline">
                    <Form.Group controlId="password">
                      <Form.ControlLabel>Password:</Form.ControlLabel>
                      <Form.Control
                        onChange={handleAdminPassword}
                        placeholder="Enter Password"
                        name="password"
                        type={passwordshow ? "text" : "password"}
                        style={{ width: 260 }}
                      />
                      {adminpassworderr && (
                        <p className="adminerrtext">{adminpassworderr}</p>
                      )}
                    </Form.Group>
                    {passwordshow ? (
                      <RiEyeFill
                        className="passwordEyePassword"
                        onClick={handlePasswordShow}
                      />
                    ) : (
                      <RiEyeCloseFill
                        className="passwordEyePassword"
                        onClick={handlePasswordShow}
                      />
                    )}
                  </Form>

                  <Form layout="inline">
                    <Form.Group controlId="confirm password">
                      <Form.ControlLabel>Confirm Password:</Form.ControlLabel>
                      <Form.Control
                        onChange={handleAdminConfirmPassword}
                        placeholder="Confirm Password"
                        name="confirm password"
                        type={confirmpasswordshow ? "text" : "password"}
                        style={{ width: 260 }}
                      />
                      {adminconfirmpassworderr && (
                        <p className="adminerrtext">
                          {adminconfirmpassworderr}
                        </p>
                      )}
                    </Form.Group>
                    {confirmpasswordshow ? (
                      <RiEyeFill
                        className="passwordEyeConfirmPassword"
                        onClick={handleConfirmPasswordShow}
                      />
                    ) : (
                      <RiEyeCloseFill
                        className="passwordEyeConfirmPassword"
                        onClick={handleConfirmPasswordShow}
                      />
                    )}
                  </Form>
                </div>

                <button
                  className="createCAAccountButton"
                  onClick={handleCreateCAAccount}
                >
                  Create Account
                </button>
                {firebaseerr && <p className="adminerrtext">{firebaseerr}</p>}
                {regsuccessfull && <p className="firebaseregsuccessfulltext">{regsuccessfull}</p>}
              </div>
            </div>
          </div>
        </div>
      </SystemBackground>
    </>
  );
};

export default CreateCourtAdmin;
