import { NextApiResponse, NextApiRequest } from "next"

// NOTE: Replace contents with real 2FA code check API
//       and matching telephone number
function isValid(code: string, _tel: string) {
  return code === 'AAAAAA' && code.length === 6
}

// NOTE: Replace contents with DB calls to create user
function createUser(_tel: string) {
  return 
}


export default function handler (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { tel, code } = JSON.parse(req.body)

  switch (method) {
    case 'POST':
      if (isValid(code, tel)) {
        createUser(tel)
        return res.status(200).json({message: 'Code is verified, user is created!'})
      }

      return res.status(401).json({message: 'Code is invalid. Hint: "AAAAAA"'})
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}