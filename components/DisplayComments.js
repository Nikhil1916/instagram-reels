import { Avatar, CircularProgress } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

function DisplayComments({ postData }) {
  const [allComments, setComments] = useState(null);
  useEffect(() => {
    // getComments();
    let tempArr = [];
    postData?.comments?.map(async (commentId) => {
      const docSnap = await getDoc(doc(db, "comments", commentId));
      tempArr.push(docSnap.data());
      setComments(tempArr);
    });
  }, [postData]);

  // function getComments() {
  //   let tempArr = [];
  //   postData?.comments?.map(async (commentId) => {
  //     const docSnap = await getDoc(doc(db, "comments", commentId));
  //     tempArr.push(docSnap.data());
  //   });
  //   setComments(tempArr);
  // }

  return (
    <div>
      {
        allComments == null ? (<div className='center-container'><CircularProgress /> </div>) :
          (<>
            {
              allComments?.map((commentObj, index) => {
                return (
                  <div key={index}>
                    <Avatar src={commentObj?.userDP} />
                    <p><span style={{ marginRight: "1rem" }}>{commentObj?.userName}</span><span>{commentObj?.text}</span></p>
                  </div>
                )
              })
            }
          </>)
      }
    </div>
  )
}

export default DisplayComments