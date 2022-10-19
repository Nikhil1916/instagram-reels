import Image from 'next/image'
import logo from '../../assets/logo.jpg';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function index() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <Image src={logo} />
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense" />
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth margin="dense" />
        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth margin="dense" />
        <Button variant="outlined" fullWidth color="secondary" component="label">
          <CloudUploadIcon />
          UPLOAD PROFILE IMAGE
          <input type={"file"} accept={"image/*"} hidden />
        </Button>
        <Button variant="contained" fullWidth style={{ marginTop: "1rem" }}>Sign Up</Button>
        <div className="tnc">
          <span>
            By signing up, you agree to our Terms, Conditions and Cookies policy.
          </span>
        </div>
      </div>
      <div className='bottom-container'>
        Already have an account ? <span>Login</span>
      </div>
    </div>
  )
}
