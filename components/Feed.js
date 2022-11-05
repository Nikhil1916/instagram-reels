import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Auth'
import { db } from '../firebase'
import Navbar from './Navbar'
import Post from './Post'
import UploadButtons from './Upload'

export default function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc?.data());
    })
    return () => { unsub() };
  }, [user]);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
      const tempArr = [];
      snapshot.docs.map(doc => tempArr.push(doc.data()));
      setPosts([...tempArr]);
    });
    return () => unsub();
  }, []);

  return (
    <div className='feed-cont'>

      {/* materia ui navbar */}
      <Navbar userData={userData} />
      <UploadButtons userData={userData} />
      <div className='video-container'>
        {
          posts.map((post, index) => {
            return (
              <div key={index.toString()}>
                <Post postData={post} userData={user} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
