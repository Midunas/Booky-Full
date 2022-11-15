import connect from '../../lib/mongodb';
import User from '../../model/userSchema';
import cookie from 'cookie';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await connect()

  const { email, password, username } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    return res.status(401).json({ message: "Email is taken" });
  }

  const hashPass = await bcrypt.hash(password, 10);

  await (new User({
    email,
    username,
    password: hashPass,
  })).save();

  res.setHeader("Set-Cookie", cookie.serialize("userToken", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    sameSite: "strict",
    path: '/'
  }));

  return res.status(200).json({ message: 'User created' });
}