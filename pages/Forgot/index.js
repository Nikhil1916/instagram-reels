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
import { AuthContext } from '../../context/Auth';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function index() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const { forgotPassword, user } = useContext(AuthContext);
  const onForgotPass = async () => {
    try {
      await forgotPassword(email);
      router.push('/login');
      setLoader(false);
    } catch (error) {
      setError(error.code);
      const loginCard = document.querySelector('.forgot-card');
      loginCard.style.height = "17rem";
      setTimeout(() => {
        setError("");
        loginCard.style.height = "15rem";
      }, 3000);
    }
  }

  return (
    <div className="forgot-container">
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
        <div className="forgot-card">
          <Image src={logo} />
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense"
            value={email} type={"email"} onChange={(e) => setEmail(e.target.value)} />
          {error != "" && <div style={{ color: "red" }}>{error}</div>}
          <Link href="/login">
            <p style={{ color: "blue" }} className="cursor-pointer">Login</p>
          </Link>
          <Button variant="contained" fullWidth style={{ marginTop: "1rem" }} onClick={onForgotPass}>Send Reset E-mail</Button>
        </div>
        <Link href="/signup">
          <div className='forgot-bottom-container'>
            Dont have an account ? <span>SignUp</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
