import { normalizeTel, stripTel } from "@/utils/input"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import Form from "./Form"
import LoadingSvg from "./svg/LoadingSvg"
import CancelSvg from "./svg/CancelSvg"

interface PhoneFormProps {
  updateStepState: Dispatch<SetStateAction<{step: number, tel: string}>>
}
export default function PhoneForm(props: PhoneFormProps) {
  const [error, setError] = useState('')
  const [formattedTel, setFormattedTel] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  function onSubmit(e: FormEvent) {
    e.preventDefault()

    setSubmitting(true)

    const tel = stripTel(formattedTel)

    // NOTE: Faking request delay
    setTimeout(async () => {
      const response = await fetch('api/verify?' + new URLSearchParams({tel}))

      if(!response.ok) {
        const { message } = await response.json()
        setError(message)
        setSubmitting(false)
        return
      }

      // Success
      props.updateStepState(prevState =>
      ({
        tel,
        step: prevState.step + 1,
      }))
    }, 500)
  }

  function handleInput(value: string) {
    setFormattedTel(prevState => normalizeTel(value, prevState))

    // Remove error if user types in a new input
    if (error) setError('')
  }


  return (
    <Form onSubmit={onSubmit} title="Ride the waves, plan your escape now!">
      <label htmlFor="tel" className="block mx-kl2 my-2">
        Enter your phone number
      </label>
      <div className="relative">
        <input
          id="tel"
          type="tel"
          className={`
            py-4
            px-6
            border-2
            rounded-full
            w-full
            text-lg
            bg-offwhite
            ${error && 'border-2 border-red-500'}
          `}
          placeholder="(000) 000-0000"
          onChange={e => handleInput(e.target.value)}
          value={formattedTel}
          disabled={submitting}
          autoComplete="false"
          required
        />
        {formattedTel.length > 0 &&
          <button
            type="button"
            className="absolute top-3 right-5"
            onClick={() => {
              setFormattedTel('')
              setError('')
            }}
          >
            <CancelSvg
              className="
                p-2
                h-10
                w-10
                rounded-full
                opacity-50
                hover:bg-gray-200
                focus:rounded
              "
            />
          </button>
        }
        {error &&
          <p className="absolute -bottom-7 w-full text-red-600 truncate">
            &#9888; {error}
          </p>
        }
      </div>
      <button
        type="submit"
        className="
          relative
          mt-8
          p-2
          mx-auto
          w-full
          block
          border-2
          border-blushblack
          bg-blushblack
          rounded-full
          text-offwhite
          disabled:opacity-50
        "
        disabled={submitting || stripTel(formattedTel).length < 10}
      >
        {submitting && 
          <LoadingSvg className="animate-spin h-5 w-5 absolute left-3" />
        }
        {submitting? 'Signing up ...': 'Sign up'}
      </button>
    </Form>
  )
}
