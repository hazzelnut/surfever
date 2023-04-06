import '../styles/global.css'
import localFont from 'next/font/local'


export const fontAmerica = localFont({ 
  src: './fonts/GT-America-Standard-Medium-Trial.woff2',
  variable: '--font-sans'
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${fontAmerica.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}