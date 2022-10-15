import Image from 'next/image'
import React from 'react'
import logo from '../../assets/Instagram.jpg';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function index() {
  return (
    <div className="login-container">
      <div className="login-card">
        <Image src={logo} />
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense" />
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth margin="dense" />
        <p style={{ color: "blue" }}>Forgot Password</p>
        <Button variant="contained" fullWidth style={{ marginTop: "1rem" }}>Log In</Button>
      </div>
      <div className='login-bottom-container'>
        Dont have an account ? <span>SignUp</span>
      </div>
    </div >
  )
}
