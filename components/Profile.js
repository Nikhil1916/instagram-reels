import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import avatar from '../assets/avatar.png';
import { AuthContext } from '../context/Auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Avatar } from '@mui/material';
function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      console.log("doc", doc?.data(), "doc data");
      setUserData(doc.data());
    })
    return () => { unsub() };
  }, [user]);
  return (
    <div>
      <Navbar userData={userData} />
      <div>
        <div className='profile-intro'>
          <div style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}>
            <Image loader={() => { userData?.profilePhoto }} src={userData?.profilePhoto} height={200} width={200} />
            {/* <Avatar src={userData.profilePhoto} /> */}
          </div>
          <div>
            <h1>{userData.fullName}</h1>
            <h1>{userData.posts?.length}</h1>
          </div>
        </div>
        <div className="profile-posts">
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
        </div>
      </div>
    </div>
  )
}

export default Profile