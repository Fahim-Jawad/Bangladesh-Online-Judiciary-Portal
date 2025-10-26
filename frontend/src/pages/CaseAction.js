import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { Container } from "react-bootstrap";
import System from "./System";
import SidebarHome from "../components/SidebarHome";
import { getDatabase, ref, onValue } from "firebase/database";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import { DatePicker, Stack } from "rsuite";

const CaseAction = () => {
  let [casehearingdateshow, setCaseHearingDateShow] = useState(false);

  return (
    <Container>
      <Navbar />
      <SystemBackground>
        <div className="flex justify-between h-full w-full bg-[rgba(215,205,151,0.5)] relative">
          <div className="h-full w-[250px]">
            <SidebarHome active="home" />
          </div>
          <div className=" absolute h-[88%] w-[55%] top-[40px] left-[350px] bg-white">
            <button className="bg-[#6591d2] text-white rounded p-2.5 ml-[710px] mt-2">
              Download as PDF
            </button>
            <button
              className="bg-[#6591d2] text-white rounded p-2.5 ml-[713px] mt-4"
              onClick={() => setCaseHearingDateShow(!casehearingdateshow)}
            >
              Set Hearing Date
            </button>
            {casehearingdateshow && (
              <div className="w-full max-h-80 bg-primary flex fixed  ">
                <div className="h-[200px] w-[400px] ml-[200px] mt-[20px] ml-[434px] p-10 bg-[rgb(255,233,159)] rounded-[9%]">
                  <div className="ml-[100px]">
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={6}
                    >
                      <DatePicker />
                    </Stack>
                  </div>

                  <div className="mt-[30px] ml-[100px]">
                    <button
                      className="rounded-[5px] font-semibold text-md bg-[#6591d2] text-black mt-5 p-2"
                      onClick={() => setCaseHearingDateShow(false)}
                    >
                      Add Hearing Date
                    </button>
                    <button
                      className="rounded-[5px] ml-5 text-center font-semibold text-md text-white mt-5 p-2 bg-[#6591d2]"
                      onClick={() => setCaseHearingDateShow(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  {/* {forgotemailtext && (
                    <p className="firebaseregsuccessfulltext">
                      {forgotemailtext}
                    </p>
                  )} */}
                  {/* {forgotemailtexterr && (
                    <p className="adminerrtext">{forgotemailtexterr}</p>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </SystemBackground>
    </Container>
  );
};

export default CaseAction;
