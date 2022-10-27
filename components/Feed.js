import React from 'react'
import Navbar from './Navbar'
import UploadButtons from './Upload'

export default function Feed() {
  return (
    <div className='feed-cont'>

      {/* materia ui navbar */}
      <Navbar />
      <UploadButtons />
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
