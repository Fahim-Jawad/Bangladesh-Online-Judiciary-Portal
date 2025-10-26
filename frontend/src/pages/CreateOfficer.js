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
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";

const OfficerDivisiondata = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Syhlet",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Maymensingh",
].map((item) => ({ label: item, value: item }));

const OfficerDistrictdata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const OfficerThanadata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));
const userRole = [
  "Court Admin",
  "General Admin",
  "Officer",
].map((item) => ({ label: item, value: item }));

const CreateOfficer = () => {
  const auth = getAuth();

  const db = getDatabase();

  let navigate = useNavigate();

  let [officerfullname, setOfficerFullName] = useState("");
  let [officerfullnameerr, setOfficerFullNameErr] = useState("");
  let [officerID, setOfficerID] = useState("");
  let [officerIDerr, setOfficerIDErr] = useState("");
  let [officeremail, setOfficerEmail] = useState("");
  let [officeremailerr, setOfficerEmailErr] = useState("");
  let [officermobilenumber, setOfficerMobileNumber] = useState("");
  let [officermobilenumbererr, setOfficerMobileNumberErr] = useState("");
  let [officernationalID, setOfficerNationalID] = useState("");
  let [officernationalIDerr, setOfficerNationalIDErr] = useState("");
  let [officerDivision, setOfficerDivision] = useState("");
  let [officerDistrict, setOfficerDistrict] = useState("");
  let [officerThana, setOfficerThana] = useState("");
  let [officerlocationerr, setOfficerLocationErr] = useState("");
  let [officerpassword, setOfficerPassword] = useState("");
  let [officerpassworderr, setOfficerPasswordErr] = useState("");
  let [officerconfirmpassword, setOfficerConfirmPassword] = useState("");
  let [officerconfirmpassworderr, setOfficerConfirmPasswordErr] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);
  let [confirmpasswordshow, setConfirmPasswordShow] = useState(false);

  let [firebaseerr, setFirebaseErr] = useState("");

  let [regsuccessfull, setRegSuccessfull] = useState("");

  const officeremailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const officermobilenumbertest = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const officerpasswordtest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})$/;


  const handleOfficerFullName = (e) => {
    setOfficerFullName(e);
    setOfficerFullNameErr("");
  };
  const handleOfficerID = (e) => {
    setOfficerID(e);
    setOfficerIDErr("");
  };
  const handleOfficerEmail = (e) => {
    setOfficerEmail(e);
    setOfficerEmailErr("");
  };
  const handleOfficerMobileNumber = (e) => {
    setOfficerMobileNumber(e);
    setOfficerMobileNumberErr("");
  };
  const handleOfficerNationalID = (e) => {
    setOfficerNationalID(e);
    setOfficerNationalIDErr("");
  };
  const handleOfficerDivision = (e) => {
    setOfficerDivision(e);
    setOfficerLocationErr("");
  };
  const handleOfficerDistrict = (e) => {
    setOfficerDistrict(e);
    setOfficerLocationErr("");
  };
  const handleOfficerThana = (e) => {
    setOfficerThana(e);
    setOfficerLocationErr("");
  };
  const handleOfficerPassword = (e) => {
    setOfficerPassword(e);
    setOfficerPasswordErr("");
  };
  const handleOfficerConfirmPassword = (e) => {
    setOfficerConfirmPassword(e);
    setOfficerConfirmPasswordErr("");
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };
  let handleConfirmPasswordShow = () => {
    setConfirmPasswordShow(!confirmpasswordshow);
  };

  let handleCreateOfficerAccount = async () => {
    if (!officerfullname) {
      setOfficerFullNameErr("Full Name is Required");
    } else {
      if (officerfullname.length <= 1) {
        setOfficerFullNameErr("Full Name must be greater than one character");
      }
    }
    if (!officerID) {
      setOfficerIDErr("Admin ID is Required");
    }
    if (!officeremail) {
      setOfficerEmailErr("Email is Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(officeremail)) {
        setOfficerEmailErr("Your Email is Invalid");
      }
    }
    if (!officermobilenumber) {
      setOfficerMobileNumberErr("Mobile Number is Required");
    } else {
      if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(officermobilenumber)) {
        setOfficerMobileNumberErr("Mobile number is Invalid");
      }
    }
    if (!officernationalID) {
      setOfficerNationalIDErr("National ID Number is Required");
    }
    if (!officerDivision && !officerDistrict && !officerThana) {
      setOfficerLocationErr("Please Select Your Division, District and Thana");
    } else if (!officerDivision && !officerDistrict) {
      setOfficerLocationErr("Please Select Your Division and District");
    } else if (!officerDivision && !officerThana) {
      setOfficerLocationErr("Please Select Your Division and Thana");
    } else if (!officerDistrict && !officerThana) {
      setOfficerLocationErr("Please Select Your District and Thana");
    } else if (!officerDivision) {
      setOfficerLocationErr("Please Select Your Division");
    } else if (!officerDistrict) {
      setOfficerLocationErr("Please Select Your District");
    } else if (!officerThana) {
      setOfficerLocationErr("Please Select Your Thana");
    }
    if (!officerpassword) {
      setOfficerPasswordErr("Password is Required");
    } else {
      if (!/^(?=.*[a-z])/.test(officerpassword)) {
        setOfficerPasswordErr("Password must contain a lower case");
      } else if (!/^(?=.*[A-Z])/.test(officerpassword)) {
        setOfficerPasswordErr("Password must contain a upper case");
      } else if (!/^(?=.*[0-9])/.test(officerpassword)) {
        setOfficerPasswordErr("Password must contain one numeric character");
      } else if (!/^(?=.*[!@#$%^&*])/.test(officerpassword)) {
        setOfficerPasswordErr(
          "Password  must contain at least one special character"
        );
      } else if (!/^(?=.{6,})/.test(officerpassword)) {
        setOfficerPasswordErr("Password  must be six characters or longer");
      }
    }
    if (!officerconfirmpassword) {
      setOfficerConfirmPasswordErr("Rewrite Your Password");
    }
    if (officerpassword !== officerconfirmpassword) {
      setOfficerConfirmPasswordErr("Passowords don't match");
    }

    if (
      officerfullname &&
      officerID &&
      officeremail &&
      officeremailtest.test(officeremail) &&
      officermobilenumber &&
      officermobilenumbertest.test(officermobilenumber) &&
      officernationalID &&
      officerDivision &&
      officerDistrict &&
      officerThana &&
      officerpassword &&
      officerconfirmpassword &&
      !officeremailerr &&
      !officermobilenumbererr &&
      !officerpassworderr &&
      !officerconfirmpassworderr &&
      officeremailtest &&
      officermobilenumbertest &&
      officerpasswordtest &&
      officerpassword === officerconfirmpassword 
    ) {
      createUserWithEmailAndPassword(auth, officeremail, officerpassword)
        .then((user) => {
          console.log("Officer Registered");
          updateProfile(auth.currentUser, {
            displayName: officerfullname,
            photoURL: "Images/profilepicture.png",
            phoneNumber: officermobilenumber,
            providerID: officerID
          })
          console.log(user);
          set(push(ref(db, "officers/")), {
            officerFullName: officerfullname,
            officerID: officerID,
            officerEmail: officeremail,
            officerMobileNumber: officermobilenumber,
            officerNationalID: officernationalID,
            officerDivision: officerDivision,
            officerDistrict: officerDistrict,
            officerThana: officerThana,
            officerPassword: officerpassword,
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

    // createUserWithEmailAndPassword(officeremail, officerpassword)
    // try {
    //   const userCredential = await firebase.firestore().collection('Officers').doc(userCredential.user.uid).set({
    //     officerFullName: officerfullname,
    //     officerID: officerID,
    //     officerEmail: officeremail,
    //     officerMobileNumber: officermobilenumber,
    //     officerNationalID: officernationalID,
    //     officerDivision: officerDivision,
    //     officerDistrict: officerDistrict,
    //     officerThana: officerThana,
    //     officerPassword: officerpassword,
    //   });
    //   // Redirect or notify user of successful registration
    // } catch (error) {
    //   console.error('Error registering officer:', error);
    // }
  };

  return (
    <>
      <Navbar></Navbar>
      <SystemBackground>
        <h3>Create Officer Account</h3>
        
        <div className="accountcreateformbackground">
          <div className="accountcreatesystem">
            <div className="left-column">
              <h4>Personal Info</h4>

              <div className="leftForm">
                <Form fluid>
                  <Form.Group controlId="officer name">
                    <Form.ControlLabel>Officer Name</Form.ControlLabel>
                    <Form.Control
                      onChange={handleOfficerFullName}
                      placeholder="Enter Your Name"
                      name="Officer Name"
                      type="text"
                      style={{ width: 260 }}
                    />
                    {officerfullnameerr && (
                      <p className="adminerrtext">{officerfullnameerr}</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="officer id">
                    <Form.ControlLabel>Officer ID</Form.ControlLabel>
                    <Form.Control
                      onChange={handleOfficerID}
                      placeholder="Enter Your ID"
                      name="officer id"
                      style={{ width: 260 }}
                    />
                    {officerIDerr && (
                      <p className="adminerrtext">{officerIDerr}</p>
                    )}
                  </Form.Group>
                </Form>

                <Form fluid>
                  <Form.Group controlId="email">
                    <Form.ControlLabel style={{ marginTop: 30 }}>
                      Email
                    </Form.ControlLabel>
                    <Form.Control
                      onChange={handleOfficerEmail}
                      placeholder="Email"
                      name="email"
                      type="text"
                      style={{ width: 260 }}
                    />
                    {officeremailerr && (
                      <p className="adminerrtext">{officeremailerr}</p>
                    )}
                  </Form.Group>

                  <Form.Group controlId="mobile number">
                    <Form.ControlLabel>Mobile Number</Form.ControlLabel>
                    <Form.Control
                      onChange={handleOfficerMobileNumber}
                      placeholder="Mobile Number"
                      name="mobile number"
                      type="text"
                      style={{ width: 200 }}
                    />
                    {officermobilenumbererr && (
                      <p className="adminerrtext">{officermobilenumbererr}</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="national id">
                    <Form.ControlLabel>National Id No.</Form.ControlLabel>
                    <Form.Control
                      onChange={handleOfficerNationalID}
                      placeholder="National ID Number"
                      name="national id"
                      style={{ width: 300 }}
                    />
                    {officernationalIDerr && (
                      <p className="adminerrtext">{officernationalIDerr}</p>
                    )}
                  </Form.Group>
                </Form>

                <div className="locationDropDowns">
                  <SelectPicker
                    onChange={handleOfficerDivision}
                    placeholder="Dvision:   Select"
                    data={OfficerDivisiondata}
                    style={{ width: 224, marginTop: 10 }}
                  />
                  <br />
                  <SelectPicker
                    onChange={handleOfficerDistrict}
                    placeholder="District:   Select"
                    data={OfficerDistrictdata}
                    style={{ width: 224, marginTop: 10 }}
                  />
                  <br />
                  <SelectPicker
                    onChange={handleOfficerThana}
                    placeholder="Thana:   Select"
                    data={OfficerThanadata}
                    style={{ width: 224, marginTop: 10 }}
                  />
                  {officerlocationerr && (
                    <p className="adminerrtext">{officerlocationerr}</p>
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
                        onChange={handleOfficerPassword}
                        placeholder="Enter Password"
                        name="password"
                        type={passwordshow ? "text" : "password"}
                        style={{ width: 260 }}
                      />
                      {officerpassworderr && (
                        <p className="adminerrtext">{officerpassworderr}</p>
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
                        onChange={handleOfficerConfirmPassword}
                        placeholder="Confirm Password"
                        name="confirm password"
                        type={confirmpasswordshow ? "text" : "password"}
                        style={{ width: 260 }}
                      />
                      {officerconfirmpassworderr && (
                        <p className="adminerrtext">
                          {officerconfirmpassworderr}
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
                  className="createOfficerAccountButton"
                  onClick={handleCreateOfficerAccount}
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

export default CreateOfficer;
