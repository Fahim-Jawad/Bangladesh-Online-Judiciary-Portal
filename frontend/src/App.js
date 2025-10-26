import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home.js";
import CreateCourtAdmin from "./pages/CreateCourtAdmin.js"
import CreateGeneralAdmin from "./pages/CreateGeneralAdmin.js";
import CreateOfficer from "./pages/CreateOfficer.js";
import CALogin from "./pages/CALogin.js";
import GALogin from "./pages/GALogin.js";
import OLogin from "./pages/OLogin.js";
import LoginHome from "./pages/LoginHome.js";
import LoginCases from "./pages/LoginCases.js";
import CALoginHome from "./pages/CALoginHome.js";
import GALoginHome from "./pages/GALoginHome.js";
import OfficerAddNewCases from "./pages/OfficerAddNewCases.js";
import ViewCase from "./pages/ViewCase.js";
import CaseAction from "./pages/CaseAction.js";
import GALoginCases from "./pages/GALoginCases.js";

function App() {
  return (
    
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/createcourtadminaccount" element={<CreateCourtAdmin />}></Route>
      <Route path="/creategeneraladminaccount" element={<CreateGeneralAdmin />}></Route>
      <Route path="/createofficeraccount" element={<CreateOfficer />}></Route>
      <Route path="/courtadminlogin" element={<CALogin />}></Route>
      <Route path="/generaladminlogin" element={<GALogin />}></Route>
      <Route path="/officerlogin" element={<OLogin />}></Route>
      <Route path="/loginhome" element={<LoginHome />}></Route>
      <Route path="/courtadminloginhome" element={<CALoginHome />}></Route>
      <Route path="/generaladminloginhome" element={<GALoginHome />}></Route>
      <Route path="/logincases" element={<LoginCases />}></Route>
      <Route path="/officeraddnewcases" element={<OfficerAddNewCases/>}></Route>
      <Route path="/viewcases" element={<ViewCase/>}></Route>
      <Route path="/caseaction" element={<CaseAction/>}></Route>
      <Route path="/generaladmincases" element={<GALoginCases />}></Route>
      {/* <Route path="/courtadmincases" element={<CourtAdminCases />}></Route> */}
      </Routes>
  </BrowserRouter>
  </>
   
    
    );
}

export default App;
