import React from "react";
  import {Link } from "react-router-dom";
 
  import AuthProvider from "../contexts/authContext";
  import AuthHeader from "../contexts/authHeader";
 


  const UserPage = () => {
      return (
    
          <AuthProvider>
              <AuthHeader>
                  <ul>
                      <li>
                          <Link to="/profile">Profile</Link>
                      </li>
                  </ul>
              </AuthHeader>
          </AuthProvider>
      )
  };

  export default UserPage