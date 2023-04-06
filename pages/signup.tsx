import DownloadLinks from "@/components/DownloadLinks"
import PhoneForm from "@/components/PhoneForm"
import TwoFactorForm from "@/components/TwoFactorForm"
import Head from "next/head"
import localFont from 'next/font/local'
import { useState } from "react"

export const fontAlpina = localFont({
  src: './fonts/GT-Alpina-Standard-Bold-Trial.woff2',
  variable: '--font-serif'
})

export default function SignUp() {
  const [stepState, updateStepState] = useState({
    step: 1,
    tel: ''
  })

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col justify-center items-center mt-20 lg:mt-56">
        {stepState.step === 1 &&
          <PhoneForm updateStepState={updateStepState} />
        }
        {stepState.step === 2 &&
          <TwoFactorForm
            updateStepState={updateStepState}
            stepState={stepState}
          />
        }
        {stepState.step === 3 &&
          <DownloadLinks />
        }
      </div>
    </>
  )
}