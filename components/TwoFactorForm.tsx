import { normalizeCode, normalizeTel } from "@/utils/input"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import Form from "./Form"
import LoadingSvg from "./svg/LoadingSvg"

interface TwoFactorFormProps {
  updateStepState: Dispatch<SetStateAction<{step: number, tel: string}>>
  stepState: {step: number, tel: string}
}

export default function TwoFactorForm(props: TwoFactorFormProps) {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { tel } = props.stepState

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    // NOTE: Faking request delay
    setTimeout(async () => {
      const response = await fetch('api/users', {
        method: 'POST',
        body: JSON.stringify({ tel, code })
      })

      if(!response.ok) {
        const { message } = await response.json()
        setError(message)
        setSubmitting(false)
        return
      }

      // Success
      props.updateStepState(prevState =>
      ({
        ...prevState,
        step: prevState.step + 1,
      }))
    }, 500)
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setCode(normalizeCode(e.target.value))

    // Remove error if user types in a new input
    if (error) setError('')
  }

  useEffect(() => {
    // NOTE: Auto-submit form once all 6-letters are entered
    if (code.length === 6) {
      setError('')
      setSubmitting(true)

      const form = document.getElementById('form') as HTMLFormElement
      form.requestSubmit()
    }
  }, [code])

  function backToPhoneForm() {
    props.updateStepState(prevState => ({ ...prevState, step: prevState.step - 1 }))
  }

  return (
    <Form id="form" onSubmit={onSubmit} title="Verify your number">
      <label htmlFor="code" className="block my-2 mx-2">
        Enter the code sent to {normalizeTel(tel, '')}
      </label>
      <div className="relative">
        <input
          id="code"
          className={`
            py-4
            px-6
            border-2
            rounded-full
            w-full
            text-lg
            bg-offwhite
            tracking-wide
            ${error && 'border-2 border-red-500'}
          `}
          type="text"
          placeholder="XXXXXX"
          maxLength={6}
          minLength={6}
          pattern="[A-Z]{6}"
          onChange={handleInput}
          value={code}
          disabled={submitting}
          autoComplete="false"
          required
        />
        {submitting &&
          <LoadingSvg className="animate-spin h-5 w-5 absolute top-6 right-5" pathColor="text-blushblack" />
        }
        {error &&
          <p className="absolute -bottom-7 w-full text-red-600 truncate">
            &#9888; {error}
          </p>
        }
        {!error &&
          <p className="absolute -bottom-7 w-full text-yellow-700 truncate">
            Type 'AAAAAA'
          </p>
        }
      </div>
      <p
        className="mt-10 hover:cursor-pointer opacity-50 hover:opacity-100 underline underline-offset-2"
        onClick={() => alert('Not implemented. Demonstration only.')}
      >
        Resend code
      </p>
      <p
        className="mt-2 hover:cursor-pointer opacity-50 hover:opacity-100 underline underline-offset-2"
        onClick={() => backToPhoneForm()}
      >
        Wrong number? Enter a new number
      </p>
    </Form>
  )
}
