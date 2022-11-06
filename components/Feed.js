import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Auth'
import { db } from '../firebase'
import Navbar from './Navbar'
import Post from './Post'
import UploadButtons from './Upload'

export default function Feed() {

  // const { user } = useContext(AuthContext);
  let user = JSON.parse(localStorage.getItem("userInfo"));
  user = user?.user;
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

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      // console.log(ele);
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          ele.pause()
        }
      })
    });
  }

  let options = {
    threshold: 0.6
  }
  let observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    const elements = document.querySelectorAll(".video-container");
    let postContainer = elements[0].childNodes;
    postContainer.forEach((video) => {
      // console.log(video.childNodes[0]); //video tag
      observer.observe(video)
    })
    return () => {
      observer.disconnect();
    }
  }, [posts])

  return (
    <div className='feed-cont'>
      <Navbar userData={userData} />
      <UploadButtons userData={userData} />
      <div className='video-container'>
        {
          posts.map((post, index) => {
            return (
              <Post postData={post} userData={userData} key={index.toString()} />
            )
          })
        }
      </div>
    </div>
  )
}
