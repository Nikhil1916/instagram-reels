import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Profile from '../../components/Profile';
import { AuthContext } from '../../context/Auth';

function index() {
  const { user } = useContext(AuthContext);
  const Redirect = () => {
    const router = useRouter();
    console.log("ok");
    router.push("/login");
  }
  return (
    <>
      {
        user?.uid ? <Profile /> : <Redirect />
      }
    </>
  )
}

export default index