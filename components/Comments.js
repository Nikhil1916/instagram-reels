import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

function Comments({ postData, userData }) {

  const [comment, setComment] = useState("");

  const handleComment = async (isAdd = false) => {
    const uid = uuidv4();
    const commentObj = {
      text: comment,
      userDP: userData?.profilePhoto,
      userName: userData?.fullName,
      commentId: uid,
      postId: postData?.postId
    }
    if (isAdd) {
      await setDoc(doc(db, "comments", uid), commentObj);
    } else {
      // added for future edits and delete comment process not needed currently.
    }
    await updateDoc(doc(db, "posts", postData?.postId), { comments: arrayUnion(uid) });
    setComment("");
  }

  return (
    <div style={{ width: "100%" }} className="post-like-2">
      <TextField id="outlined-basic" label="Add Comment" variant="outlined" sx={{ width: '70%' }} value={comment}
        onChange={(e) => { setComment(e.target.value) }} />
      <Button variant='contained' color="primary" onClick={() => handleComment(true)}>Post</Button>
    </div>
  )
}

export default Comments