import { Avatar } from "@mui/material"
import React, { useEffect } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
function Post({ postData, userData }) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (postData?.likes?.includes(userData?.uid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [postData]);

  const handleLike = async () => {
    if (!like) {
      await updateDoc(doc(db, "posts", postData?.postId), { likes: arrayUnion(userData?.uid) });
    } else {
      await updateDoc(doc(db, "posts", postData?.postId), { likes: arrayRemove(userData?.uid) });
    }
  }

  return (
    <div className='post-container'>
      <video src={postData?.postURL} />
      <div className="video-info">
        <div className="avatar-cont">
          <Avatar src={postData?.profilePhotoURL} />
          <p>{postData.profileName}</p>
        </div>
        <div className="post-like" >
          <div style={like ? { color: 'red' } : {}}>
            <FavoriteIcon onDoubleClick={() => handleLike()} />
          </div>
          <p>{postData.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Post