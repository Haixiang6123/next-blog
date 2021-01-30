import * as React from 'react'
import {useCallback, useState} from 'react'
import {NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'

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
          <label>
            确认密码
            <input type="password" value={formData.passwordConfirmation} onChange={e => setFormData({
              ...formData, passwordConfirmation: e.target.value
            })}/>
          </label>
          {errors.passwordConfirmation?.length > 0 && <div>{errors.passwordConfirmation.join(',')}</div>}
        </div>

        <div>
          <button onClick={onSubmit} type="submit">注册</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
