import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Profile from '../../components/Profile';
import Redirect from '../../components/Redirect';
import { AuthContext } from '../../context/Auth';

function index() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {
        user?.uid ? <Profile /> : <Redirect />
      }
    </>
  )
}

export default index