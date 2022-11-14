import cookie from 'cookie'

export default async function handler(req, res) {

  res.setHeader("Set-Cookie", cookie.serialize("userToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    sameSite: "strict",
    path: '/'
  }))

  res.status(200).json({ message: 'User loged out' })
}

