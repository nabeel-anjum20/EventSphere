import { Routes, Route } from "react-router-dom";
import AdminViewDashboard from "./Pages/AdminView/AdminViewDashboard";
import ExpoManagement from "./Pages/AdminView/ExpoManagement";
import AdminLayout from "./components/Layouts/AdminView/AdminLayout";
import UnAuth from "./Pages/UnAuth/UnAuth";
import ExhibitorList from "./Pages/AdminView/ExhibitorList";
import HallManagement from "./Pages/AdminView/HallManagement";
import HallsList from "./Pages/AdminView/HallsList";
import AuthLayout from "./components/Layouts/Auth/AuthLayout";
import Login from "./Pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import CheckAuth from "./components/common/CheckAuth";
import { useEffect } from "react";
import { checkauthuser } from "./Store/AuthSlice/AuthSlice";
import AttendeeInfo from "./Pages/AdminView/AttendeeInfo";



function App() {
  
  const {isAuthenticated} = useSelector((state) => state.portalauth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkauthuser())
  },[dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} />}/>

         <Route path="/adminuserauth" element={
          <CheckAuth isAuthenticated={isAuthenticated}>
             <AuthLayout/>
          </CheckAuth>
          }>
         <Route path="login" element={<Login/>}/>
         </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth  isAuthenticated={isAuthenticated} >
            <AdminLayout/>
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminViewDashboard />} />
          <Route path="expomanagement" element={<ExpoManagement />} />
          <Route path="exhibitorlist" element={<ExhibitorList />} />
          {/* <Route path="exhibitormanagement" element={<ExhibitorManagement />} /> */}
          <Route path="attendeeinfo" element={<AttendeeInfo/>} />
          <Route path="hallmanagement" element={<HallManagement/>} />
          <Route path="hallslist" element={<HallsList/>} />
        </Route>
        <Route path="/un-auth" element={<UnAuth/>} />
      </Routes>
    </>
  );
}

export default App;
