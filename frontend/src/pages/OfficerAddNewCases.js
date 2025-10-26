import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { Container } from "react-bootstrap";
import System from "./System";
import SidebarHome from "../components/SidebarHome";
import { Form, Input, ButtonToolbar, Button, SelectPicker } from "rsuite";
import { getDatabase,push, ref, set } from "firebase/database";


const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));



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

const SelectCaseTypeData = [
  "Civil Cases",
  "Crimminal Cases",
  "Bankrupcy",
  "Traffic",
  "Civil Citation",
  "Other",
].map((item) => ({ label: item, value: item }));

const SelectCasePartyTypeData = [
  "Paintiff",
  "Defendant",
  "Petitioner",
  "Respondant",
  "Cross-Complaintant",
  "Cross-Defendant",
].map((item) => ({ label: item, value: item }));

const OfficerAddNewCases = () => {

  const db = getDatabase();



  let [caseID, setCaseID] = useState("");
  let [caseIDerr, setCaseIDErr] = useState("");
  let [casetype, setCaseType] = useState("");
  let [casetypeerr, setCaseTypeErr] = useState("");
  let [casepartytype, setCasePartyType] = useState("");
  let [casepartytypeerr, setCasePartyTypeErr] = useState("");
  let [casename, setCaseName] = useState("");
  let [casenameerr, setCaseNameErr] = useState("");
  let [casemobilenumber, setCaseMobileNumber] = useState("");
  let [casemobilenumbererr, setCaseMobileNumberErr] = useState("");
  let [casefulladdress, setCaseFullAddress] = useState("");
  let [casefulladdresserr, setCaseFullAddressErr] = useState("");
  let [caseDivision, setCaseDivision] = useState("");
  let [caseDistrict, setCaseDistrict] = useState("");
  let [caseThana, setCaseThana] = useState("");;
  let [caselocationerr, setCaseLocationErr] = useState("");
  let [casedescription, setCaseDescription] = useState("");
  let [casedescriptionerr, setCaseDescriptionErr] = useState("");

  let [addcasesuccessfull, setAddCaseSuccessfull] = useState("")

  let handleCaseID = (e) => {
    setCaseID(e);
    setCaseIDErr("");
  };

  let handleSelectCaseType = (e) => {
    setCaseType(e);
    setCaseTypeErr("");
  };

  let handleSelectPartyType = (e) => {
    setCasePartyType(e);
    setCasePartyTypeErr("");
  };

  let handleCaseName = (e) => {
    setCaseName(e);
    setCaseNameErr("");
  };

  let handleCaseMobileNumber = (e) => {
    setCaseMobileNumber(e);
    setCaseMobileNumberErr("");
  };

  let handleCaseFullAddress = (e) => {
    setCaseFullAddress(e);
    setCaseFullAddressErr("");
  };

  let handleCaseDivision = (e) => {
    setCaseDivision(e);
    setCaseLocationErr("");
  };

  let handleCaseDistrict = (e) => {
    setCaseDistrict(e);
    setCaseLocationErr("");
  };

  let handleCaseThana = (e) => {
    setCaseThana(e);
    setCaseLocationErr("");
  };

  let handleCaseDescription = (e) => {
    setCaseDescription(e);
    setCaseDescriptionErr("");
  };



  const casemobilenumbertest = /^(?:\+88|88)?(01[3-9]\d{8})$/;


  let handleAddNewCase = () => {
    if (!caseID) {
      setCaseIDErr("Case ID is Required");
    }
    if (!casetype) {
      setCaseTypeErr("Please Select A Case Type");
    }
    if (!casepartytype) {
      setCasePartyTypeErr("Please Select A Party Type");
    }
    if (!casename) {
      setCaseNameErr("Enter Case Name/Appliers Name");
    }
    if (!casemobilenumber) {
      setCaseMobileNumberErr("Enter Case Name/Appliers Name");
     }
     else {
      if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(casemobilenumber)) {
        setCaseMobileNumberErr("Mobile number is Invalid");
      }
    }
    if (!casefulladdress) {
      setCaseFullAddressErr("Enter Case Name/Appliers Name");
    }
    if (!caseDivision && !caseDistrict && !caseThana) {
      setCaseLocationErr("Please Select Your Division, District and Thana");
    } else if (!caseDivision && !caseDistrict) {
      setCaseLocationErr("Please Select Your Division and District");
    } else if (!caseDivision && !caseThana) {
      setCaseLocationErr("Please Select Your Division and Thana");
    } else if (!caseDistrict && !caseThana) {
      setCaseLocationErr("Please Select Your District and Thana");
    } else if (!caseDivision) {
      setCaseLocationErr("Please Select Your Division");
    } else if (!caseDistrict) {
      setCaseLocationErr("Please Select Your District");
    } else if (!caseThana) {
      setCaseLocationErr("Please Select Your Thana");
    }
    if (!casedescription) {
      setCaseDescriptionErr("Enter Case Name/Appliers Name");
    }
    if(
      caseID &&
      casetype &&
      casepartytype &&
      casename &&
      casemobilenumber &&
      casemobilenumbertest.test(casemobilenumber) &&
      casefulladdress &&
      caseDivision &&
      caseDistrict &&
      caseThana &&
      casedescription &&
      !caseIDerr &&
      !casetypeerr &&
      !casepartytypeerr &&
      !casenameerr &&
      !casemobilenumbererr &&
      !casefulladdresserr &&
      !caselocationerr &&
      !casedescriptionerr 
      ){
        set(push(ref(db, 'cases/')), {
          caseID: caseID,
          caseType: casetype,
          casePartyType : casepartytype,
          caseName: casename,
          caseMobileNubmer: casemobilenumber,
          caseFullAddress:casefulladdress,
          caseDivision: caseDivision,
          caseDistrict: caseDistrict,
          caseThana: caseThana,
          caseDescription: casedescription,
      });
      setAddCaseSuccessfull(
        "Case Added to the Database"
      );
      // setTimeout(() => {
      // }, 3000);
      }
  };

  return (
    <>
      <Container>
        <Navbar />
        <SystemBackground>
          <div className="flex justify-between h-full w-full bg-[rgba(215,205,151,0.5)]">
            <div className="h-full w-[250px]">
              <SidebarHome active="cases" />
            </div>
            <div className="mr-[800px] mt-10 ">
              <Form layout="horizontal">
                <Form.Group controlId="caseID">
                  <Form.ControlLabel>Case ID</Form.ControlLabel>
                  <Form.Control onChange={handleCaseID} name="caseID" />
                  {caseIDerr && <p className="caseerrtext">{caseIDerr}</p>}
                </Form.Group>
                <div className="mt-5 ml-44">
                  <SelectPicker
                    onChange={handleSelectCaseType}
                    placeholder="Case Type:   Select"
                    data={SelectCaseTypeData}
                    style={{ width: 300, marginTop: 10 }}
                  />
                  {casetypeerr && <p className="caseerrtext mt-[3px] ml-[7px]">{casetypeerr}</p>}
                </div>
                <div className="mt-5 ml-44">
                  <SelectPicker
                    onChange={handleSelectPartyType}
                    placeholder="Party Type:   Select"
                    data={SelectCasePartyTypeData}
                    style={{ width: 300, marginTop: 10 }}
                  />
                   {casepartytypeerr && (
                      <p className="caseerrtext mt-[5px] ml-[10px]">{casepartytypeerr}</p>
                    )}
                </div>
                <div className="mt-8">
                  <Form.Group controlId="name">
                    <Form.ControlLabel>
                      Case Name/Appliers Name
                    </Form.ControlLabel>
                    <Form.Control
                      onChange={handleCaseName}
                      name="name"
                      type="text"
                      rows="{5}"
                      autoComplete="off"
                      style={{ width: 300, marginTop: 10 }}
                    />
                    {casenameerr && <p className="caseerrtext mt-[50px]">{casenameerr}</p>}
                  </Form.Group>
                  <Form.Group controlId="mobile number">
                    <Form.ControlLabel>Mobile Number</Form.ControlLabel>
                    <Form.Control
                      onChange={handleCaseMobileNumber}
                      name="mobile number"
                      type="text"
                      rows="{5}"
                      autoComplete="off"
                      style={{ width: 300, marginTop: 10 }}
                    />
                    {casemobilenumbererr && <p className="caseerrtext mt-[50px]">{casemobilenumbererr}</p>}
                  </Form.Group>
                  <Form.Group controlId="full address">
                    <Form.ControlLabel>Full Address</Form.ControlLabel>
                    <Form.Control
                      onChange={handleCaseFullAddress}
                      name="full address"
                      type="text"
                      autoComplete="off"
                      style={{ width: 300, marginTop: 10 }}
                    />
                    {casefulladdresserr && <p className="caseerrtext mt-[50px]">{casefulladdresserr}</p>}
                    <div className="locationDropDowns ml-44 mt-20">
                      <p>Add Location</p>
                      <SelectPicker
                        onChange={handleCaseDivision}
                        placeholder="Dvision:   Select"
                        data={OfficerDivisiondata}
                        style={{ width: 300, marginTop: 20 }}
                      />
                      <br />
                      <SelectPicker
                        onChange={handleCaseDistrict}
                        placeholder="District:   Select"
                        data={OfficerDistrictdata}
                        style={{ width: 300, marginTop: 20 }}
                      />
                      <br />
                      <SelectPicker
                        onChange={handleCaseThana}
                        placeholder="Thana:   Select"
                        data={OfficerThanadata}
                        style={{ width: 300, marginTop: 20 }}
                      />
                    </div>
                    {caselocationerr && <p className="caseerrtext  mt-[5px] ml-[182px]">{caselocationerr}</p>}
                  </Form.Group>

                  <Form.Group controlId="textarea-6">
                    <Form.ControlLabel>Description</Form.ControlLabel>
                    <Form.Control
                      onChange={handleCaseDescription}
                      rows={5}
                      name="text"
                      type="text" 
                      accepter={Textarea}                                        
                      style={{ width: 300, marginTop: 10}}
                    />
                    {casedescriptionerr && <p className="caseerrtext mt-32">{casedescriptionerr}</p>}
                  </Form.Group>
                  <button
                    className="addNewCaseButton"
                    onClick={handleAddNewCase}
                  >
                    Add New Case
                  </button>
                </div>
              </Form>
            </div>
            <div>
          {addcasesuccessfull&&           
          <div className="firebaseregsuccessfulltext top-[400px] right-[250px] h-15 text-xl">
            <p >{addcasesuccessfull}</p>
          <button className="h-[22px] w-[100px] absolute top-[5px] text-sm text-white rounded bg-[#6591d2]">View Case</button>
          </div>
          }
          </div>
          </div>
        </SystemBackground>
      </Container>
    </>
  );
};

export default OfficerAddNewCases;
