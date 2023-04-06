import Head from 'next/head'
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Surfever</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        <Link
          className="
            relative
            py-4
            px-8
            w-fit
            block
            border-2
            border-blushblack
            bg-blushblack
            rounded-full
            text-offwhite
          "
          href='/signup'>
            Sign up
        </Link>
      </div>
    </>
  )
}
