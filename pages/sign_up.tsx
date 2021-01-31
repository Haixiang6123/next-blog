import * as React from 'react'
import {NextPage} from 'next'
import axios from 'axios'
import useForm from '../hooks/useForm'

const SignUp: NextPage = () => {
  const {form} = useForm({
    initFormData: {username: '', password: '', passwordConfirmation: ''},
    fields: [
      {
        label: '用户名',
        inputType: 'text',
        key: 'username',
      },
      {
        label: '密码',
        inputType: 'password',
        key: 'password',
      },
      {
        label: '确认密码',
        inputType: 'password',
        key: 'passwordConfirmation',
      },
    ],
    submit: {
      request: async (formData) => {
        return await axios.post(`/api/v1/users`, formData)
      },
      success: () => alert('注册成功'),
    },
    button: <button type="submit">注册</button>
  });

  return (
    <div>
      <h1>注册</h1>
      <hr/>
      {form}
    </div>
  )
}

export default SignUp
