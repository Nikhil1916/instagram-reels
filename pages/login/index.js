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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const { login, user, autoLogOut } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);
  const onLogin = async () => {
    try {
      const userResponse = await login(email, password);
      localStorage.setItem("userInfo", JSON.stringify(userResponse));
      await autoLogOut(_tokenResponse.expiresIn * 1000); //auto logout after 1 hr conversion to milliseconds from seconds.
      setLoader(false);
    } catch (error) {
      setError(error.code);
      const loginCard = document.querySelector('.login-card');
      loginCard.style.height = "22rem";
      setTimeout(() => {
        setError("");
        loginCard.style.height = "20rem";
      }, 3000);
    }
  }

  return (
    <div className="login-container">
      <div className='mobile-image'>
        <div className='carousel'>
          <Carousel autoPlay
            interval={2000}
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            stopOnHover
            // autoFocus
            centerMode
            centerSlidePercentage={80}
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
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense"
            value={email} type={"email"} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="outlined-basic" type={"password"} label="Password" variant="outlined" fullWidth margin="dense"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {error != "" && <div style={{ color: "red" }}>{error}</div>}
          <Link href="/Forgot">
            <p style={{ color: "blue" }} className="cursor-pointer">Forgot Password</p>
          </Link>
          <Button variant="contained" fullWidth style={{ marginTop: "1rem" }} onClick={onLogin}>Log In</Button>
        </div>
        <Link href="/signup">
          <div className='login-bottom-container'>
            Dont have an account ? <span>SignUp</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
