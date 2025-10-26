import React , {useState} from "react";
import {  Link, useNavigate } from "react-router-dom";
import { Container, SelectPicker } from "rsuite";




const loginUserData = ["Court Admin", "General Admin", "Officer"].map(
  (item) => ({ label: item, value: item })
);



const System = () => {
  
  const navigate = useNavigate()
  const[loginAs, setLoginAs] = useState('')
  const[noLoginAs, setNoLoginAs] = useState('')


  let handleEnter = () =>{
    if (loginAs === ""){
      setNoLoginAs("Please Choose An User For Login")
    }
    else if (loginAs === "Court Admin"){
      navigate('/courtadminlogin')
    }
    else if (loginAs === "General Admin"){
      navigate('/generaladminlogin')
    }
    else if (loginAs === "Officer"){
      navigate('/officerlogin')
    }
  }


  return (
    <Container className="container">
      <div className="systemHome">
        <div className="loginAsPanel">
          <h1>Login as</h1>
          <div className="dropDowns">
            <div className="dropdownUser">
               <SelectPicker onChange={(e)=>setLoginAs(e)}
                data={loginUserData}
                appearance="default"
                placeholder="Select User"
                style={{ width: 250 }}
              />
            </div>
          </div> 
          {noLoginAs
          ?
          <p className="noLoginAs">Please Choose A User For Login !</p>
        :
        ""
        }         

          <button className="userEnterbutton" onClick={handleEnter}>Enter</button>
        </div>



        <div className="createAccountPanel">
          <h1>Create Account</h1>
          <div className="createAccount">
            <Link to="/createcourtadminaccount">
              <button className="createCourtAdmin">
                Create Court Admin Account
              </button>
            </Link>

            <Link to="/creategeneraladminaccount">
              <button className="createGeneralAdmin">
                Create General Admin Account
              </button>
            </Link>
            <Link to="/createofficeraccount">
              <button className="createOfficer">Create Officer Account</button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default System;
