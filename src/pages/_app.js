import '@/styles/main.css'
// pages/_app.js
import { Gluten } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const gluten = Gluten({ subsets: ['latin'], style: ['normal'] })

export default function App({ Component, pageProps }) {
  return <main className={gluten.className}> <Component {...pageProps} /> </main>
}
