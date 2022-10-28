import Image from 'next/image'
import React, { useContext } from 'react'
import Navbar from './Navbar'
import avatar from '../assets/avatar.png';
import { AuthContext } from '../context/Auth';
function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <div>
        <div className='profile-intro'>
          <div style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}>
            <Image src={avatar} />
          </div>
          <div>
            <h1>Nikhil</h1>
            <h1>Posts:12</h1>
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