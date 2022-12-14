import Head from 'next/head'
import { useContext } from 'react'
import Feed from '../components/Feed'
import Redirect from '../components/Redirect'
import { AuthContext } from '../context/Auth'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Reels</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user?.uid ? <Feed /> : <Redirect />}
    </div>
  )
}
