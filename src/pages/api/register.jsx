import connect from '../../lib/mongodb'
import User from '../../model/userSchema'
import { uid } from 'uid';
// import isEmail from 'is-email'
connect()

export default async function handler(req, res) {
  try {
    //TODO: Set up validation 
    const { email, password, username } = req.body
    const emailAlreadyExists = await User.findOne({ email })

    // if (!isEmail(email)) return res.status(401).json({ message: "Email is invalid" })

    if (emailAlreadyExists) {
      return res.status(401).json({ message: "Email is taken" })
    }
    // const hashPass = await bcrypt.hash(password, 10)

    const user = await (new User({
      email,
      username,
      password,
      secret: uid(),
    })).save()

    res.redirect('/Login')

    if (!user) {
      return res.status(400).json({ message: 'User not created' })
    }
  }
  catch (error) {
    res.status(400).json({ message: 'Unable to create new user.' })
  }

}