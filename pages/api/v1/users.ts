import {NextApiHandler} from 'next'
import {User} from 'src/entity/User'
import getDBConnection from 'lib/getDBConnection'

type UserError = {
  username: string[];
  password: string[];
  passwordConfirmation: string[];
}

const Users: NextApiHandler = async (req, res) => {
  const connection = await getDBConnection();

  const {username, password, passwordConfirmation} = req.body;

  console.log('input', passwordConfirmation)

  const user = new User();
  user.username = username.trim();
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;

  await user.validate();

  if (user.hasErr()) {
    res.statusCode = 422
    res.json(user.errors);
    return res.end();
  }

  await connection.manager.save(user);

  res.statusCode = 200;
  res.json(user);
  res.end();
}

export default Users;
