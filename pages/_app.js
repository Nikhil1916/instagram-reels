import '../styles/globals.css'
import './signup/signup.css'
import './login/login.css';
import '../components/Feed.css';
import AuthWrapper from '../context/Auth';
import './Forgot/forgot.css'
import '../components/Profile.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}
export default MyApp
