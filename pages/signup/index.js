import Image from 'next/image'
import logo from '../../assets/logo.jpg';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import { storage, db } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
export default function index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signUp } = useContext(AuthContext);
  const onSignUp = async () => {
    console.log(email, password, fullName, file, "done");
    try {
      setLoading(true);
      setError("");
      const userInfo = await signUp(email, password);
      console.log(JSON.stringify(userInfo));
      const storageRef = ref(storage, `${userInfo.user.uid}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            const userData = {
              fullName,
              email,
              password,
              profilePhoto: downloadURL,
              uid: userInfo.user.uid
            }
            await setDoc(doc(db, "users", userInfo.user.uid), userData);
            router.push("/login");
          });
          console.log("Sign up done");
        }
      );
    } catch (error) {
      console.log(error);
      setError(error.code);
      const signupCard = document.querySelector('.signup-card');
      signupCard.style.height = "28rem";
      setTimeout(() => {
        setError("");
        signupCard.style.height = "26rem";
      }, 3000);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={logo} />
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense"
          onChange={(e) => { setEmail(e.target.value) }} value={email} />
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth margin="dense"
          onChange={(e) => { setPassword(e.target.value) }} value={password} />
        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth margin="dense"
          onChange={(e) => { setFullName(e.target.value) }} value={fullName} />
        <Button variant="outlined" fullWidth color="secondary" component="label">
          <CloudUploadIcon />
          UPLOAD PROFILE IMAGE
          <input type={"file"} accept={"image/*"} hidden onChange={(e) => { console.log(e), setFile(e.target.files[0]) }} />
        </Button>
        <Button variant="contained" fullWidth style={{ marginTop: "1rem" }} onClick={onSignUp}>Sign Up</Button>
        {error != "" && <div style={{ color: "red" }}>{error}</div>}
        <div className="tnc">
          <span>
            By signing up, you agree to our Terms, Conditions and Cookies policy.
          </span>
        </div>
      </div>
      <Link href="/login">
        <div className='bottom-container'>
          Already have an account ? <span>Login</span>
        </div>
      </Link>
    </div>
  )

}
