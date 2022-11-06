import React, { useContext } from 'react'
import Profile from '../../components/Profile';
import Redirect from '../../components/Redirect';
import { AuthContext } from '../../context/Auth';

function index() {
  // const { user } = useContext(AuthContext);.
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);
  return (
    <>
      {
        user?.user?.uid ? <Profile /> : <Redirect />
      }
    </>
  )
}

export default index