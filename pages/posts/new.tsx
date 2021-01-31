import * as React from 'react'
import {NextPage} from 'next'
import axios from 'axios'
import useForm from 'hooks/useForm'

type FormData = {
  title: string;
  content: string;
}

const PostsNew: NextPage = () => {
  const initFormData = {title: '', content: ''}

  const onSubmit = async (formData: typeof initFormData) => {
    try {
      await axios.post('/api/v1/posts', formData)
      alert('提交成功')
    } catch (e) {
      setErrors(e.response.data)
    }
  }

  const {form, setErrors} = useForm<FormData>({
    initFormData,
    fields: [
      {
        label: '标题',
        inputType: 'text',
        key: 'title',
      },
      {
        label: '内容',
        inputType: 'textarea',
        key: 'content',
      }
    ],
    onSubmit,
    button: <button type="submit">提交</button>
  })

  return (
    <div>{form}</div>
  )
}

export default PostsNew
