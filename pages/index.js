import Head from 'next/head'
import Feed from '../components/Feed'
import UploadButtons from '../components/Upload'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Reels</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
    </div>
  )
}
