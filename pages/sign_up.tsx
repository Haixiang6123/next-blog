import * as React from 'react'
import {NextPage} from 'next'
import {useCallback, useState} from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'

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
    } catch (e) {
      if (e.response) {
        const response: AxiosResponse = e.response

        if (response.status === 422) {
          setErrors({...errors, ...response.data})
        }
      }
    }
  }, [formData])

  return (
    <div>
      <h1>注册</h1>
      <hr/>
      {JSON.stringify(formData)}
      <hr/>
      {JSON.stringify(errors)}
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
