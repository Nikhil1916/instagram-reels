import { Avatar } from "@mui/material"
import React from "react"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
function Post({ postData }) {
  return (
    <div className='post-container'>
      <video src={postData.postURL} />
      <div className="video-info">
        <div className="avatar-cont">
          <Avatar src={postData.profilePhotoURL} />
          <p>{postData.profileName}</p>
        </div>
        <div className="post-like">
          <FavoriteBorderIcon />
          <FavoriteIcon />
        </div>
        <p>{postData.likes.length}</p>
      </div>
    </div>
  )
}

export default Post