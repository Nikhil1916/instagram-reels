import { Avatar, CircularProgress } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

function DisplayComments({ postData }) {
  const [allComments, setComments] = useState(null);

  useEffect(() => {
    setComments(null)
    let tempArr = [];
    postData?.comments?.map(async (commentId) => {
      const docSnap = await getDoc(doc(db, "comments", commentId));
      tempArr.push(docSnap.data());
      setComments(tempArr);
    });
    if (postData?.comments?.length == 0) {
      setComments([]);
    }
  }, [postData]);

  const textStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <>
      {
        allComments == null ? (<div className='center-content'><CircularProgress /> </div>) :
          (
            <>
              {
                allComments != null && allComments.length == 0 ? (<p className='center-content'>No Comments available.</p>) : (
                  <div className='comments-cont'>
                    {
                      allComments?.map((commentObj, index) => {
                        return (
                          <div key={index}>
                            <Avatar src={commentObj?.userDP} style={{ marginRight: "1rem" }} />
                            <p><span style={{ marginRight: "1rem" }}>{commentObj?.userName}</span><span style={textStyle}>{commentObj?.text}</span></p>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </>
          )
      }
    </>
  )
}

export default DisplayComments