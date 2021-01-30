import * as React from 'react'
import {NextPage} from 'next'
import {useCallback, useState} from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'

const SignUp: NextPage = () => {
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

      window.location.href = '/sign_in'
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

export default SignUp
