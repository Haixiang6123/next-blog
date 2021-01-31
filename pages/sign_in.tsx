import * as React from 'react'
import {useCallback, useState} from 'react'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import withSession from '../lib/withSession'
import {User} from '../src/entity/User'
import Form from '../components/Form'

type Props = {
  user: User
}

const SignIn: NextPage<Props> = (props) => {
  const {user} = props

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })

  const onChange = useCallback((key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }, [formData]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()

    setErrors({username: [], password: []})

    try {
      await axios.post(`/api/v1/sessions`, formData)

      alert('登录成功')
    } catch (e) {
      alert('登录失败')
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
      <h1>登录</h1>
      {user && <div>当前登录为：{user.username}</div>}
      <hr/>

      <Form
        onSubmit={onSubmit}
        button={<button type="submit">登录</button>}
        fields={[
        {
          label: '用户名',
          inputType: 'text',
          value: formData.username,
          errors: errors.username,
          onChange: (e) => onChange('username', e.target.value)
        },
        {
          label: '密码',
          inputType: 'password',
          value: formData.password,
          errors: errors.password,
          onChange: (e) => onChange('password', e.target.value)
        }
      ]}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const user = context.req.session.get('currentUser')

  return {
    props: {
      user: user || null,
    }
  }
})

export default SignIn