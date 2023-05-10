import React from 'react'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Profile = () => {

  const context = useContext(AuthContext);
  const isAuthenticated = context.isAuthenticated;
  const user = context.user;


  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  console.log(user)


  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  )
}

export default Profile
