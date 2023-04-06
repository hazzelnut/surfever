import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { fontAlpina } from "@/pages/signup"
import logo from '@/public/surf.svg'
import googleBadge from '@/public/google-play-badge.png'
import appleBadge from '@/public/apple-badge.svg'

const OSTypes = {
  iOS: 'iOS',
  Android: 'Android'
}

export default function DownloadLinks() {
  const [mobileOS, setMobileOS] = useState('')

  function getMobileOS(uA: string) {
    if (uA.match(/iPad|iPhone|iPod/i)) {
      return OSTypes.iOS
    }

    else if (uA.match(/android/i)) {
      return OSTypes.Android
    }

    return ''
  }

  useEffect(() => {
    setMobileOS(getMobileOS(navigator.userAgent))
    confetti({
      angle: 90,
      spread: 100,
      particleCount: 150,
      origin: { y: 0.4 }
    })
  }, [])

  return (
    <div className="relative m-5">
      <div
        className="
          bg-blush
          rounded-lg
          text-center
          p-6
        "
      >
        <Image className="h-20 w-20 m-auto mb-4" src={logo} alt="surf logo" />
        <p className={`${fontAlpina.variable} font-serif mb-6 text-3xl`}>
          Woohoo! 🎉
        </p>
        <p className="mb-2">Download the app and sign in to start.</p>
        {(mobileOS === OSTypes.iOS || !mobileOS) &&
          <Link href="#">
            <Image src={appleBadge} className="m-auto h-28 w-10/12" alt="Apple App Store"/>
          </Link>
        }
        {(mobileOS === OSTypes.Android || !mobileOS) &&
          <Link href="#">
            <Image src={googleBadge} className="m-auto h-32 w-full" alt="Apple App Store"/>
          </Link>
        }
        <div
          className="
            absolute
            top-2
            left-2
            bg-blushblack
            w-full
            h-full
            rounded-lg
            -z-10
          "
        ></div>
      </div>
    </div>
  )
}