import {NextApiHandler} from 'next'
import md5 from 'md5'
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

  const errors: UserError = {
    username: [], password: [], passwordConfirmation: []
  };

  const found = await connection.manager.findOne(User, {username});
  if (found) {
    errors.username.push('已存在，不能重复注册');
  }

  if (username.trim() === '') {
    errors.username.push('不能为空');
  }
  if (!/[a-zA-Z0-9]*/.test(username.trim())) {
    errors.username.push('格式不合法');
  }
  if (username.trim().length > 42) {
    errors.username.push('太长');
  }
  if (username.trim().length < 3) {
    errors.username.push('太短');
  }

  if (password.trim() === '') {
    errors.password.push('不能为空');
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('密码不匹配')
  }

  const hasErr = Object.values(errors).some(errList => errList.length > 0);

  if (hasErr) {
    res.statusCode = 422
    res.json(errors);
    return res.end();
  }

  const user = new User();

  user.username = username.trim();
  user.passwordDigest = md5(password);

  await connection.manager.save(user);

  res.statusCode = 200;
  res.json(user);
  res.end();
}

export default Users;
