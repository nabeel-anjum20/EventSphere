import { Routes, Route } from "react-router-dom";
import ExhibitorLayout from "./components/Layouts/ExhibitorView/ExhibitorLayout";
import ExhibitorHome from "./Pages/ExhibitorView/ExhibitorHome";
import Login from "./Pages/Auth/Login";
import AuthLayout from "./components/Layouts/Auth/AuthLayout";
import UnAuth from "./Pages/UnAuth/UnAuth";
import AttendeeLayout from "./components/Layouts/AttendeeView/AttendeeLayout";
import AttendeeHome from "./Pages/AttendeeView/AttendeeHome";
import AttendeeEvents from "./Pages/AttendeeView/AttendeeEvents";
import AttendeeAboutUs from "./Pages/AttendeeView/AttendeeAboutUs";
import AttendeeContactUs from "./Pages/AttendeeView/AttendeeContactUs";
import AttendeeServices from "./Pages/AttendeeView/AttendeeServices";
import Register from "./Pages/Auth/Register";
import Register2 from "./Pages/Auth/Register2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkauthuser } from "./Store/AuthSlice/AuthSlice";
import Login2 from "./Pages/Auth/Login2";
import CheckAuth from "./components/common/CheckAuth";
import CreateExpo from "./Pages/ExhibitorView/CreateExpo";
import AttendeeBooking from "./Pages/AttendeeView/AttendeeBooking";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
 
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(checkauthuser())
  },[dispatch])
  return (
    <Routes>
       
      <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}/>}/>
      <Route
        path="/attendeeauth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AuthLayout/>
        </CheckAuth>
      }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/exhibitorauth" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AuthLayout />
        </CheckAuth>
        }>
        <Route path="login" element={<Login2/>} />
        <Route path="register" element={<Register2 />} />
      </Route>

      <Route path="/exhibitor" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ExhibitorLayout/>
        </CheckAuth>
        }>
        <Route path="home" element={<ExhibitorHome />} />
        <Route path="createxpo" element={<CreateExpo/>} />
      </Route>

      <Route path="/attendee" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AttendeeLayout/>
        </CheckAuth>
        }>
        <Route path="attendeehome" element={<AttendeeHome />} />
        <Route path="attendeeservices" element={<AttendeeServices />} />
        <Route path="attendeeevents" element={<AttendeeEvents />} />
        <Route path="attendeebooking" element={<AttendeeBooking/>} />
        <Route path="attendeeaboutus" element={<AttendeeAboutUs />} />
        <Route path="attendeecontactus" element={<AttendeeContactUs />} />
      </Route>

      <Route path="/un-auth" element={<UnAuth />} />
    </Routes>
  );
}

export default App;
