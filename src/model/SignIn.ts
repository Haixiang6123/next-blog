import getDBConnection from '../../lib/getDBConnection'
import {User} from '../entity/User'
import md5 from 'md5'

type SignInErrors = {
  username: string[]
  password: string[]
}

class SignIn {
  username: string;
  password: string;
  user: User;

  errors: SignInErrors = {
    username: [],
    password: [],
  }

  async validate() {
    const connection = await getDBConnection();

    const user = await connection.manager.findOne(User, {where: {username: this.username}})

    this.user = user;

    if (this.username.trim() === '') {
      this.errors.username.push('请填写用户名')
    }
    if (user) {
      if (user.passwordDigest !== md5(this.password)) {
        this.errors.password.push('密码与用户名不匹配')
      }
    } else {
      this.errors.username.push('用户名不存在')
    }
  }

  hasErrors() {
    return Object.values(this.errors).some(errList => errList.length > 0);
  }
}

export default SignIn;
