import Image from "next/image"
import { fontAlpina } from "@/pages/signup"
import { FormEvent } from "react"
import logo from '@/public/surf.svg'

interface FormProps {
  onSubmit: (e: FormEvent<Element>) => void
  title: string
  children: React.ReactNode
  id?: string
}

export default function Form({ id, title, onSubmit, children }: FormProps): JSX.Element {
  return (
    <div className="relative m-5">
      <form
        id={id}
        onSubmit={onSubmit}
        className="
          h-full
          w-full
          flex-auto
          bg-blush
          rounded-lg
          p-6
          text-center
        "
      >
        <Image className="h-20 w-20 m-auto mb-4" src={logo} alt="surf logo" />
        <p className={`${fontAlpina.variable} font-serif mb-6 text-3xl`}>
          {title}
        </p>
        {children}
      </form>
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
      >
      </div>
    </div>
  )
}