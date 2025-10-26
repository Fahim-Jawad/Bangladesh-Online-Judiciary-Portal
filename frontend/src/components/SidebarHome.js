import React from "react";
import profilepicture from "../Images/profilepicture.png";
import { AiOutlineLogout } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SidebarHome = ({ active }) => {
  const auth = getAuth();

  let navigate = useNavigate()

  let handleNavigateHome = () => { 
    navigate('/loginhome')
  }

  let handleNavigateCases = () => { 
    navigate('/logincases')
  }

 
    let handleLogout = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {});
    };

  return (
    <div className="  w-full h-full px-11 py-9 bg-[rgba(221,202,91,0.5)] px-11 py-9 rounded-3xl border-b border-r border-solid border-white overflow-hidden">
      <div className="flex relative">
        <img
          className="absolute w-[70px] h-[70px] rounded top-[-25px] left-[-25px] "
          src={profilepicture}
        />
        <p className="absolute top-[0px] left-[50px]">Name</p>
        <AiOutlineLogout onClick={handleLogout} className="absolute w-[25px] h-[25px] top-[15px] right-[-15px]" />
      </div>
      <div className="flex flex-col gap-y-20 items-center text-center mt-24 ml-5 ">
        
          
            <div
              className={`${
                active == "home"
                  ? " w-[142%]  text-lg font-semibold border border-solid p-10 border-white bg-[rgba(101,145,210)] duration-200 before:hover:bg-[rgba(101,145,210)] "
                  : "w-[142%] text-lg font-semibold border border-solid p-10 border-white hover:bg-[rgba(101,145,210)]"
              }`}
             onClick={handleNavigateHome}>
              Dashboard
            </div>
         

       
          
            <div
              className={`${
                active == "cases"
                  ? " w-[142%]  text-lg font-semibold border border-solid p-10 border-white bg-[rgba(101,145,210)] duration-200 before:hover:bg-[rgba(101,145,210)] "
                  : "w-[142%] text-lg font-semibold border border-solid p-10 border-white hover:bg-[rgba(101,145,210)]"
              }`}
            onClick={handleNavigateCases}>
              Cases
            </div>
         

    
      </div>
    </div>
  );
};

export default SidebarHome;
