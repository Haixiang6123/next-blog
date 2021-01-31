import * as React from 'react'
import {NextPage} from 'next'
import Form from '../../components/Form'
import {useCallback, useState} from 'react'
import axios, {AxiosResponse} from 'axios'

const PostsNew: NextPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const [errors, setErrors] = useState({
    title: [],
    content: [],
  })

  const onChange = useCallback((key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }, [formData]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()

    setErrors({title: [], content: []})

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
      <Form
        onSubmit={onSubmit}
        button={<button type="submit">提交</button>}
        fields={[
          {
            label: '标题',
            inputType: 'text',
            value: formData.title,
            onChange: e => onChange('title', e.target.value),
            errors: errors.title
          },
          {
            label: '内容',
            inputType: 'textarea',
            value: formData.content,
            onChange: e => onChange('content', e.target.value),
            errors: errors.content
          }
        ]}
      />
    </div>
  )
}

export default PostsNew
