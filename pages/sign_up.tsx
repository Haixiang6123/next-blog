import * as React from 'react'
import {useCallback, useState} from 'react'
import {NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import Form from '../components/Form'

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  })

  const onChange = useCallback((key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }, [formData]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
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
  }, [formData])

  return (
    <div>
      <h1>注册</h1>
      <hr/>

      <Form
        onSubmit={onSubmit}
        button={<button type="submit">注册</button>}
        fields={[
          {
            label: '用户名',
            inputType: 'text',
            value: formData.username,
            onChange: e => onChange('username', e.target.value),
            errors: errors.username,
          },
          {
            label: '密码',
            inputType: 'password',
            value: formData.password,
            onChange: e => onChange('password', e.target.value),
            errors: errors.password,
          },
          {
            label: '确认密码',
            inputType: 'password',
            value: formData.passwordConfirmation,
            onChange: e => onChange('passwordConfirmation', e.target.value),
            errors: errors.passwordConfirmation,
          },
        ]}
      />
    </div>
  )
}

export default SignUp
