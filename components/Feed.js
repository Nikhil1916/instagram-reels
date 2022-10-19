import React from 'react'
import ResponsiveAppBar from './Navbar'
import UploadButtons from './Upload'

export default function Feed() {
  return (
    <div className='feed-cont'>

      {/* materia ui navbar */}
      <ResponsiveAppBar />
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
