import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { Alert } from '@mui/material';
import { storage, db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
export default function UploadButtons({ userData }) {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file == null) {
      setError("File not supported");
      setTimeout(() => { setError('') }, 2000);
      return;
    }
    if ((file.size / (1024 * 1024)) > fileLimit) {
      setError(`File too large,Upload a file less than ${fileLimit}MB`);
      setTimeout(() => { setError('') }, 2000);
      return;
    }
    setLoading(true);
    const uid = uuidv4();
    const storageRef = ref(storage, `${userData.uid}/Posts/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + prog + '% done');
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          const postData = {
            likes: [],
            postId: uid,
            postURL: downloadURL,
            profileName: userData.fullName,
            profilePhotoURL: userData.profilePhoto,
            userId: userData.uid,
            timestamp: serverTimestamp()
          }
          await setDoc(doc(db, "posts", uid), postData);
        });
        console.log("post added");
        setLoading(false);
      }
    )
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prog, setProgress] = useState(0);
  const fileLimit = 50;
  return (
    <div className='upload-button'>
      {error != "" ? <Alert severity="error">{error}</Alert> : (
        <Button variant="outlined" color='secondary' component="label" style={{ marginBottom: "0.5rem" }}>
          <MovieIcon />
          Upload Media
          <input hidden accept="*" multiple type="file" onChange={(e) => { handleUpload(e) }} />
        </Button>)}
      {
        loading &&
        <LinearProgress color="secondary" variant="determinate" value={prog} sx={{ mb: '0.5rem' }} />
      }
    </div>
  );
}
