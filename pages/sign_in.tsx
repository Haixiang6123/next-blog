import * as React from 'react'
import {useCallback, useState} from 'react'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import withSession from '../lib/withSession'
import {User} from '../src/entity/User'

type Props = {
  user: User
}

const SignIn: NextPage<Props> = (props) => {
  const {user} = props;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()

    setErrors({ username: [], password: []});

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
      <form>
        <div>
          <label>
            用户名
            <input type="text" value={formData.username} onChange={e => setFormData({
              ...formData, username: e.target.value
            })}/>
          </label>
          {errors.username?.length > 0 && <div>{errors.username.join(',')}</div>}
        </div>
        <div>
          <label>
            密码
            <input type="password" value={formData.password} onChange={e => setFormData({
              ...formData, password: e.target.value
            })}/>
          </label>
          {errors.password?.length > 0 && <div>{errors.password.join(',')}</div>}
        </div>

        <div>
          <button onClick={onSubmit} type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const user = context.req.session.get('currentUser');

  return {
    props: {
      user: user || null,
    }
  }
});

export default SignIn
