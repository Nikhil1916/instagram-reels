import Image from 'next/image'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import logo from '../../assets/logo.jpg';
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function index() {
  return (
    <div className="login-container">
      <div className='mobile-image'>
        <div className='carousel'>
          <Carousel autoPlay={true}
            interval={2000}
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            stopOnHover
            showIndicators={false}>
            <Image src={image1} />
            <Image src={image2} />
            <Image src={image3} />
            <Image src={image4} />
            <Image src={image5} />
          </Carousel>
        </div>
      </div>
      <div>
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
      </div>
    </div >
  )
}
