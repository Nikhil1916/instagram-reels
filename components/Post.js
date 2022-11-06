import { Avatar } from "@mui/material"
import { useEffect } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Comments from "./Comments";
import DisplayComments from "./DisplayComments";

function Post({ postData, userData }) {
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <div style={like ? { color: 'red' } : { color: 'white' }}>
            <FavoriteIcon className="cursor-pointer" onDoubleClick={() => handleLike()} />
          </div>
          <p>{postData.likes.length}</p>
          <CommentIcon className="cursor-pointer" onClick={handleClickOpen} />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="modal-container">
              <div className="video-modal">
                <video controls autoPlay={false} src={postData?.postURL} />
              </div>
              <div className="comments-modal">
                <Card className="card1">
                  <DisplayComments postData={postData} />
                </Card>
                <Card className="card2" sx={{ maxWidth: 345 }}>
                  <Typography sx={{ display: "flex", marginLeft: "1rem" }}>
                    {postData?.likes?.length == 0 ? "Be the first one to like this post" : `Liked by ${postData?.likes?.length} users.`}
                  </Typography>
                  <div className="post-like-2">
                    <FavoriteIcon className="cursor-pointer" style={like ? { color: "red" } : { color: "black" }} onClick={handleLike} />
                    <Comments postData={postData} userData={userData} />
                  </div>
                </Card>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Post