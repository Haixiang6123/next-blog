import * as React from 'react'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import axios from 'axios'
import withSession from '../lib/withSession'
import {User} from '../src/entity/User'
import useForm from '../hooks/useForm'
import qs from 'querystring';

type Props = {
  user: User
}

const SignIn: NextPage<Props> = (props) => {
  const {user} = props

  const {form} = useForm({
    initFormData: {username: '', password: ''},
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
    submit: {
      request: async (formData) => {
        return await axios.post(`/api/v1/sessions`, formData)
      },
      success: () => {
        alert('登录成功')
        const query = qs.parse(window.location.search.slice(1));
        window.location.replace(
          typeof query.return_to === 'string'
            ? decodeURIComponent(query.return_to)
            : '/posts'
        )
      }
    },
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
