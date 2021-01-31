import * as React from 'react'
import {NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import useForm from '../hooks/useForm'

const SignUp: NextPage = () => {
  const initFormData = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }

  const onSubmit = async (formData: typeof initFormData) => {
    try {
      await axios.post(`/api/v1/users`, formData)

      alert('注册成功')

      window.location.href = '/sign_in'
    } catch (e) {
      alert('注册失败')
      if (e.response) {
        const response: AxiosResponse = e.response

        if (response.status === 422) {
          setErrors(response.data)
        }
      }
    }
  };

  const {form, setErrors} = useForm({
    initFormData,
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
    onSubmit,
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
