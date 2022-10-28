import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Auth'
import { db } from '../firebase'
import Navbar from './Navbar'
import UploadButtons from './Upload'

export default function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      console.log("doc", doc?.data());
      setUserData(doc?.data());
    })
    return () => { unsub() };
  }, [user]);
  return (
    <div className='feed-cont'>

      {/* materia ui navbar */}
      <Navbar userData={userData} />
      <UploadButtons userData={userData} />
      <div className='video-container'>
        <div className='post-container'>
          <video />
        </div>
        <div className='post-container'>
          <video />
        </div>
        <div className='post-container'>
          <video />
        </div>
      </div>
    </div>
  )
}
