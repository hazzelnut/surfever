import { NextApiResponse, NextApiRequest } from "next"

// NOTE: Call DB to check if number exists or not
function doesExist(tel: string) {
  return tel === '1231231234'
}

function isNumberValid(tel: string) {
  return tel.length < 10
}

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req

  switch (method) {
    case 'GET':
      const tel = query.tel as string

      if (isNumberValid(tel)) {
        return res.status(401).json({ message: 'Invalid phone number.' })
      }

      if (doesExist(tel)) {
        return res.status(401).json({ message: 'Phone number in use.' })
      }

      // NOTE: Can Send 2FA code to mobile number here
      return res.status(200).json({ message: "Success! Number does not exist. "})
    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}