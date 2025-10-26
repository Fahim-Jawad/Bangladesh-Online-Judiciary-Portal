import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { Container } from "react-bootstrap";
import System from "./System";
import SidebarHome from "../components/SidebarHome";
import { getDatabase, ref, onValue } from "firebase/database";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";


const ViewCase = () => {
  return (
    <Container>
    <Navbar />
    <SystemBackground>
      <div className="flex justify-between h-full w-full bg-[rgba(215,205,151,0.5)] relative">
        <div className="h-full w-[250px]">
          <SidebarHome active="home" />
        </div>
        <div className=" absolute h-[88%] w-[55%] top-[40px] left-[350px] bg-white">
            <button className="bg-[#6591d2] text-white rounded p-2.5 ml-[710px] mt-2">Download as PDF</button>
        </div>
      </div>
    </SystemBackground>
  </Container>
  )
}

export default ViewCase
