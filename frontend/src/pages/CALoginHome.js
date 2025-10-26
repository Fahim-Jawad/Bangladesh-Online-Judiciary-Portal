import React from 'react'
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { Container } from "react-bootstrap";
import System from "./System";
import SidebarHome from "../components/SidebarHome";
import Search from '../components/Search';

const CALoginHome = () => {
  return (
    <Container>
    <Navbar />
    <SystemBackground>
      <div className="flex justify-between h-full w-full bg-[rgba(215,205,151,0.5)]">
        <div className="h-full w-[250px]" >
        <SidebarHome active="home" />
        </div>
        <div className="mr-[600px] mt-[40px]">
            <Search/>
          </div>
          <div className="h-100px w-100p absolute top-60 left-[403px] text-lg">Seach Result</div>
          <div className="h-100px w-100px bg-white absolute top-80 left-[400px] w-[50%] h-10">
            <button className="bg-[#6591d2] text-white rounded p-2.5">View Case</button>
          </div>
      </div>
    </SystemBackground>
  </Container>
  )
}

export default CALoginHome
