import React from 'react'
import Navbar from "../components/Navbar";
import SystemBackground from "../components/SystemBackground";
import { Container } from "react-bootstrap";
import System from "./System";
import SidebarHome from "../components/SidebarHome";
import { useNavigate } from 'react-router-dom';


const GALoginCases = () => {

    let navigate = useNavigate()


 let handleOfficerAddCases = () =>{
  navigate('/officeraddnewcases')
  }



  return (
    <Container>
    <Navbar />
    <SystemBackground>
      <div className="flex justify-between h-full w-full bg-[rgba(215,205,151,0.5)]">
        <div className="h-full w-[250px]" >
        <SidebarHome active="cases" />
        </div>
        <div className='w-3/4 h-16 mt-11 ml-16 mr-52 bg-[#DDCA5B] rounded text-2xl font-bold' onClick={handleOfficerAddCases}>
          <div className=' mt-3 ml-12'>Add New Cases</div>
        </div>
      </div>
    </SystemBackground>
  </Container>
  )
}

export default GALoginCases
