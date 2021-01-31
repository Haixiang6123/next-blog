import * as React from 'react'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import withSession from '../lib/withSession'
import {User} from '../src/entity/User'
import useForm from '../hooks/useForm'

type Props = {
  user: User
}

const SignIn: NextPage<Props> = (props) => {
  const {user} = props

  const initFormData = {
    username: '',
    password: '',
  }

  const onSubmit = async (formData: typeof initFormData) => {
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
  }

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
        key: 'password'
      }
    ],
    onSubmit,
    button: <button type="submit">登录</button>
  })

  return (
    <div>
      <h1>登录</h1>
      <hr/>
      {user && <p>当前登录：{user.username}</p>}
      {form}
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
