import {NextApiHandler} from 'next'
import SignIn from 'src/model/SignIn'

const Sessions: NextApiHandler = async (req, res) => {
  const {username, password} = req.body;

  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;

  await signIn.validate();

  if (signIn.hasErrors()) {
    res.statusCode = 422;
    res.json(signIn.errors);
  }

  res.statusCode = 200;
  res.json(signIn.user);

  res.end();
}

export default Sessions;
