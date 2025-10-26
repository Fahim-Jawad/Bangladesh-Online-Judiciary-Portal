import React, { useState } from "react";
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";


const GADivisiondata = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Syhlet",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Maymensingh",
].map((item) => ({ label: item, value: item }));

const GADistrictdata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const GAThanadata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const CreateGeneralAdmin = () => {
  const auth = getAuth();
  
  const db = getDatabase();

  let navigate = useNavigate();


  let [generaladminfullname, setGeneralAdminFullName] = useState("");
  let [generaladminfullnameerr, setGeneralAdminFullNameErr] = useState("");
  let [generaladminID, setGeneralAdminID] = useState("");
  let [generaladminIDerr, setGeneralAdminIDErr] = useState("");
  let [generaladminemail, setGeneralAdminEmail] = useState("");
  let [generaladminemailerr, setGeneralAdminEmailErr] = useState("");
  let [generaladminmobilenumber, setGeneralAdminMobileNumber] = useState("");
  let [generaladminmobilenumbererr, setGeneralAdminMobileNumberErr] =
    useState("");
  let [generaladminnationalID, setGeneralAdminNationalID] = useState("");
  let [generaladminnationalIDerr, setGeneralAdminNationalIDErr] = useState("");
  let [generaladminDivision, setGeneralAdminDivision] = useState("");
  let [generaladminDistrict, setGeneralAdminDistrict] = useState("");
  let [generaladminThana, setGeneralAdminThana] = useState("");
  let [generaladminlocationerr, setGeneralAdminLocationErr] = useState("");
  let [generaladminpassword, setGeneralAdminPassword] = useState("");
  let [generaladminpassworderr, setGeneralAdminPasswordErr] = useState("");
  let [generaladminconfirmpassword, setGeneralAdminConfirmPassword] =
    useState("");
  let [generaladminconfirmpassworderr, setGeneralAdminConfirmPasswordErr] =
    useState("");
  let [passwordshow, setPasswordShow] = useState(false);
  let [confirmpasswordshow, setConfirmPasswordShow] = useState(false);

  let [firebaseerr, setFirebaseErr] = useState("");
  let [regsuccessfull, setRegSuccessfull] = useState("");

  const generaladminemailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const generaladminmobilenumbertest = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const generaladminpasswordtest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})$/;

  const handleGeneralAdminFullName = (e) => {
    setGeneralAdminFullName(e);
    setGeneralAdminFullNameErr("");
  };
  const handleGeneralAdminID = (e) => {
    setGeneralAdminID(e);
    setGeneralAdminIDErr("");
  };
  const handleGeneralAdminEmail = (e) => {
    setGeneralAdminEmail(e);
    setGeneralAdminEmailErr("");
  };
  const handleGeneralAdminMobileNumber = (e) => {
    setGeneralAdminMobileNumber(e);
    setGeneralAdminMobileNumberErr("");
  };
  const handleGeneralAdminNationalID = (e) => {
    setGeneralAdminNationalID(e);
    setGeneralAdminNationalIDErr("");
  };
  const handleGeneralAdminDivision = (e) => {
    setGeneralAdminDivision(e);
    setGeneralAdminLocationErr("");
  };
  const handleGeneralAdminDistrict = (e) => {
    setGeneralAdminDistrict(e);
    setGeneralAdminLocationErr("");
  };
  const handleGeneralAdminThana = (e) => {
    setGeneralAdminThana(e);
    setGeneralAdminLocationErr("");
  };
  const handleGeneralAdminPassword = (e) => {
    setGeneralAdminPassword(e);
    setGeneralAdminPasswordErr("");
  };
  const handleGeneralAdminConfirmPassword = (e) => {
    setGeneralAdminConfirmPassword(e);
    setGeneralAdminConfirmPasswordErr("");
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };
  let handleConfirmPasswordShow = () => {
    setConfirmPasswordShow(!confirmpasswordshow);
  };

  let handleCreateGAAccount = () => {
    if (!generaladminfullname) {
      setGeneralAdminFullNameErr("Full Name is Required");
    } else {
      if (generaladminfullname.length <= 1) {
        setGeneralAdminFullNameErr(
          "Full Name must be greater than 1 character"
        );
      }
    }
    if (!generaladminID) {
      setGeneralAdminIDErr("Admin ID is Required");
    }
    if (!generaladminemail) {
      setGeneralAdminEmailErr("Email is Required");
    } else {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(generaladminemail)
      ) {
        setGeneralAdminEmailErr("Your Email is Invalid");
      }
    }
    if (!generaladminmobilenumber) {
      setGeneralAdminMobileNumberErr("Mobile Number is Required");
    } else {
      if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(generaladminmobilenumber)) {
        setGeneralAdminMobileNumberErr("Mobile number is Invalid");
      }
    }
    if (!generaladminnationalID) {
      setGeneralAdminNationalIDErr("National ID Number is Required");
    }
    if (!generaladminDivision && !generaladminDistrict && !generaladminThana) {
      setGeneralAdminLocationErr(
        "Please Select Your Division, District and Thana"
      );
    } else if (!generaladminDivision && !generaladminDistrict) {
      setGeneralAdminLocationErr("Please Select Your Division and District");
    } else if (!generaladminDivision && !generaladminThana) {
      setGeneralAdminLocationErr("Please Select Your Division and Thana");
    } else if (!generaladminDistrict && !generaladminThana) {
      setGeneralAdminLocationErr("Please Select Your District and Thana");
    } else if (!generaladminDivision) {
      setGeneralAdminLocationErr("Please Select Your Division");
    } else if (!generaladminDistrict) {
      setGeneralAdminLocationErr("Please Select Your District");
    } else if (!generaladminThana) {
      setGeneralAdminLocationErr("Please Select Your Thana");
    }
    if (!generaladminpassword) {
      setGeneralAdminPasswordErr("Password is Required");
    } else {
      if (!/^(?=.*[a-z])/.test(generaladminpassword)) {
        setGeneralAdminPasswordErr("Password must contain a lower case");
      } else if (!/^(?=.*[A-Z])/.test(generaladminpassword)) {
        setGeneralAdminPasswordErr("Password must contain a upper case");
      } else if (!/^(?=.*[0-9])/.test(generaladminpassword)) {
        setGeneralAdminPasswordErr(
          "Password must contain one numeric character"
        );
      } else if (!/^(?=.*[!@#$%^&*])/.test(generaladminpassword)) {
        setGeneralAdminPasswordErr(
          "Password  must contain at least one special character"
        );
      } else if (!/^(?=.{6,})/.test(generaladminpassword)) {
        setGeneralAdminPasswordErr(
          "Password  must be six characters or longer"
        );
      }
    }
    if (!generaladminconfirmpassword) {
      setGeneralAdminConfirmPasswordErr("Rewrite Your Password");
    }
    if (generaladminpassword !== generaladminconfirmpassword) {
      setGeneralAdminConfirmPasswordErr("Passowords don't match");
    }
    if (
      generaladminfullname &&
      generaladminID &&
      generaladminemail &&
      generaladminemailtest.test(generaladminemail) &&
      generaladminmobilenumber &&
      generaladminmobilenumbertest.test(generaladminmobilenumber) &&
      generaladminnationalID &&
      generaladminDivision &&
      generaladminDistrict &&
      generaladminThana &&
      generaladminpassword &&
      !generaladminemailerr &&
      !generaladminmobilenumbererr &&
      !generaladminpassworderr &&
      !generaladminconfirmpassworderr &&
      generaladminconfirmpassword &&
      generaladminemailtest &&
      generaladminmobilenumbertest &&
      generaladminpasswordtest &&
      generaladminpassword === generaladminconfirmpassword
    ) {
      createUserWithEmailAndPassword(auth, generaladminemail, generaladminpassword)
      .then((user) => {
        console.log("General Admin Database Created");
        console.log(user);
        set(push(ref(db, "generalAdmins/")), {
          generaladminFullName: generaladminfullname,
          generaladminID: generaladminID,
          generaladminEmail: generaladminemail,
          generaladminMobileNumber: generaladminmobilenumber,
          generaladminNationalID:generaladminnationalID,
          generaladminDivision: generaladminDivision,
          generaladminDistrict: generaladminDistrict,
          generaladminThana: generaladminThana,
          generaladminPassword: generaladminpassword,
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
        <h3>Create General Admin Account</h3>
        <div className="accountcreateformbackground">
          <div className="accountcreatesystem">
            <div className="left-column">
              <h4>Personal Info</h4>

              <div className="leftForm">
                <Form fluid>
                  <Form.Group controlId="general admin name">
                    <Form.ControlLabel>Admin Name</Form.ControlLabel>
                    <Form.Control
                      onChange={handleGeneralAdminFullName}
                      placeholder="Enter Your Name"
                      name="General Admin Name"
                      type="text"
                      style={{ width: 260 }}
                    />
                    {generaladminfullnameerr && (
                      <p className="adminerrtext">{generaladminfullnameerr}</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="general admin id">
                    <Form.ControlLabel>Admin ID</Form.ControlLabel>
                    <Form.Control
                      onChange={handleGeneralAdminID}
                      placeholder="Enter Your ID"
                      name="General Admin id"
                      style={{ width: 260 }}
                    />
                    {generaladminIDerr && (
                      <p className="adminerrtext">{generaladminIDerr}</p>
                    )}
                  </Form.Group>
                </Form>

                <Form fluid>
                  <Form.Group controlId="email">
                    <Form.ControlLabel style={{ marginTop: 30 }}>
                      Email
                    </Form.ControlLabel>
                    <Form.Control
                      onChange={handleGeneralAdminEmail}
                      placeholder="Email"
                      name="email"
                      type="text"
                      style={{ width: 260 }}
                    />
                    {generaladminemailerr && (
                      <p className="adminerrtext">{generaladminemailerr}</p>
                    )}
                  </Form.Group>

                  <Form.Group controlId="mobile number">
                    <Form.ControlLabel>Mobile Number</Form.ControlLabel>
                    <Form.Control
                      onChange={handleGeneralAdminMobileNumber}
                      placeholder="Mobile Number"
                      name="mobile number"
                      type="text"
                      style={{ width: 200 }}
                    />
                    {generaladminmobilenumbererr && (
                      <p className="adminerrtext">
                        {generaladminmobilenumbererr}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="national id">
                    <Form.ControlLabel>National Id No.</Form.ControlLabel>
                    <Form.Control
                      onChange={handleGeneralAdminNationalID}
                      placeholder="National ID Number"
                      name="national id"
                      style={{ width: 300 }}
                    />
                    {generaladminnationalIDerr && (
                      <p className="adminerrtext">
                        {generaladminnationalIDerr}
                      </p>
                    )}
                  </Form.Group>
                </Form>

                <div className="locationDropDowns">
                  <SelectPicker
                    onChange={handleGeneralAdminDivision}
                    placeholder="Dvision:   Select"
                    data={GADivisiondata}
                    style={{ width: 224, marginTop: 10 }}
                  />
                  <br />
                  <SelectPicker
                    onChange={handleGeneralAdminDistrict}
                    placeholder="District:   Select"
                    data={GADistrictdata}
                    style={{ width: 224, marginTop: 10 }}
                  />
                  <br />
                  <SelectPicker
                    onChange={handleGeneralAdminThana}
                    placeholder="Thana:   Select"
                    data={GAThanadata}
                    style={{ width: 224, marginTop: 10 }}
                  />
                  {generaladminlocationerr && (
                    <p className="adminerrtext">{generaladminlocationerr}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="right-column">
              <h4 className="rightcoloumHeading">
                Upload your profile picture
              </h4>
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
                  least one lower case letter, one upper case letter, one
                  nummeric character and one special character)
                </p>
                <div className="passwordForm">
                  <Form layout="inline">
                    <Form.Group controlId="password">
                      <Form.ControlLabel>Password:</Form.ControlLabel>
                      <Form.Control
                        onChange={handleGeneralAdminPassword}
                        placeholder="Enter Password"
                        name="password"
                        type={passwordshow ? "text" : "password"}
                        style={{ width: 260 }}
                      />
                      {generaladminpassworderr && (
                        <p className="adminerrtext">
                          {generaladminpassworderr}
                        </p>
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
                        onChange={handleGeneralAdminConfirmPassword}
                        placeholder="Confirm Password"
                        name="confirm password"
                        type={confirmpasswordshow ? "text" : "password"}
                        style={{ width: 260 }}
                      />
                      {generaladminconfirmpassworderr && (
                        <p className="adminerrtext">
                          {generaladminconfirmpassworderr}
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
                  className="createGAAccountButton"
                  onClick={handleCreateGAAccount}
                >
                  Create Account
                </button>
                {firebaseerr && <p className="adminerrtext">{firebaseerr}</p>}
                {regsuccessfull && (
                  <p className="firebaseregsuccessfulltext">{regsuccessfull}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SystemBackground>
    </>
  );
};

export default CreateGeneralAdmin;
