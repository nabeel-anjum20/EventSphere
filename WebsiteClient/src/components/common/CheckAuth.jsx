import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // if (!isAuthenticated) {
  //   if (location.pathname.includes('/attendeeauth') || location.pathname.includes('/exhibitorauth')) {
  //     return children;
  //   }

  //   return <Navigate to={user?.userRole === "Attendee" ? "/attendeeauth/login" : "/exhibitorauth/login"} />;
  // }

  // if (
  //   (user?.userRole === "Attendee" && (location.pathname.includes("/attendeeauth/login") || location.pathname.includes("/attendeeauth/register"))) ||
  //   (user?.userRole === "Exhibitor" && (location.pathname.includes("/exhibitorauth/login") || location.pathname.includes("/exhibitorauth/register")))
  // ) {
  //   return <Navigate to={user?.userRole === "Attendee" ? "/attendee/attendeehome" : "/exhibitor/home"} />;
  // }

  // if (user?.userRole === "Attendee" && location.pathname.includes("/exhibitor")) {
  //   return <Navigate to="/un-auth" />;
  // }

  // if (user?.userRole === "Exhibitor" && location.pathname.includes("/attendee")) {
  //   return <Navigate to="/un-auth" />;
  // }

 if(location.pathname === "/"){
  if(!isAuthenticated){
    return <Navigate to={"/attendee/attendeehome"}/>
  }else{
    if(user?.userRole === "Attendee"){
      return <Navigate to={"/attendee/attendeehome"}/>
    }else{
      return <Navigate to={"/exhibitor/home"}/>
    }
  }
 }

 if(!isAuthenticated && location.pathname.includes("/exhibitor/home")){
  return <Navigate to={"/attendee/attendeehome"}/>
 }


 if(isAuthenticated && user?.userRole === "Attendee" && location.pathname.includes("exhibitor")){
  return <Navigate to={"/attendee/attendeehome"}/>
 }

 
 if(isAuthenticated && user?.userRole === "Exhibitor" && location.pathname.includes("attendee")){
  return <Navigate to={"/exhibitor/home"}/>
 }

 


  return <>{children}</>;
}

export default CheckAuth;
