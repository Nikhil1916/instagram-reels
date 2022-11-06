import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../context/Auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
function Profile() {
  // const { user } = useContext(AuthContext);
  let user = JSON.parse(localStorage.getItem("userInfo"));
  user = user?.user;
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc?.data());
      setPostIds(doc?.data()?.posts);
    })
    return () => { unsub() };
  }, [user]);

  useEffect(() => {
    let tempArr = [];
    postIds.forEach((postId) => {
      onSnapshot(doc(db, 'posts', postId), (doc) => {
        tempArr.push(doc.data());
        setUserPosts([...tempArr]);
      })
    })
  }, [postIds]);

  return (
    <div>
      <Navbar userData={userData} />
      <div>
        <div className='profile-intro'>
          <div style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}>
            <img style={{ borderRadius: "50%" }} height={200} width={220} src={userData?.profilePhoto} />
          </div>
          <div>
            <h1>{userData?.fullName}</h1>
            <h1>{userData?.posts?.length}</h1>
          </div>
        </div>
        <div className="profile-posts">
          {
            userPosts?.map((post, index) => {
              return <video src={post?.postURL} key={index} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Profile