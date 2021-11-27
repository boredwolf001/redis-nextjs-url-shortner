import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'

export default function Home() {
  const [value, setValue] = useState("https://")
  const [shortUrl, setShortUrl] = useState(null)

  return (
    <div className={styles.container}>
      <form onSubmit={async (e) => {
        e.preventDefault()

        const res = await fetch('/api/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url: value})
        })
        const data = await res.json()
        
        setShortUrl(`${document.location.protocol}//${document.location.host}/${data.short}`)
      }}>
        <input autoFocus className={styles.inpt} value={value} onChange={e => setValue(e.target.value)} />
        <button disabled={value === 'https://' || value === '' ? true : false} className={styles.btn} type="submit">Shorten!</button>
      </form>

      {shortUrl && <a className={styles.link} href={shortUrl}>{shortUrl}</a>}
    </div>
  )
}
