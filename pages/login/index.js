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

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const { login, user } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
    if (user) {
      router.push('/');
    }
  }, [user]);
  const onLogin = async () => {
    try {
      await login(email, password);
      setError('');
      setLoader(false);
      console.log("login");
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
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense"
            value={email} type={"email"} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="outlined-basic" type={"password"} label="Password" variant="outlined" fullWidth margin="dense"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {error != "" && <div style={{ color: "red" }}>{error}</div>}
          <p style={{ color: "blue" }}>Forgot Password</p>
          <Button variant="contained" fullWidth style={{ marginTop: "1rem" }} onClick={onLogin}>Log In</Button>
        </div>
        <div className='login-bottom-container'>
          Dont have an account ? <span>SignUp</span>
        </div>
      </div>
    </div>
  )
}
