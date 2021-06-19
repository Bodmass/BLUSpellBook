import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Spellbook from '../components/Spellbook'

export default function Home() {
  return (
    <div>
      <Head>
        <title>FFXIV Blue Mage Spellbook </title>
        <meta name="description" content="Final Fantasy XIV Blue Mage Spellbook" />
        <meta name="keywords" content="FFXIV, Final Fantasy XIV, Final Fantasy 14, Blu, Blue Mage, Spellbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Spellbook />
      <Footer />
    </div>
  )
}
