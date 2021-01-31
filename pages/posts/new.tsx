import * as React from 'react'
import {NextPage} from 'next'
import axios from 'axios'
import useForm from 'hooks/useForm'

type FormData = {
  title: string;
  content: string;
}

const PostsNew: NextPage = () => {
  const {form} = useForm<FormData>({
    initFormData: {title: '', content: ''},
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
    submit: {
      request: async (formData) => {
        return await axios.post('/api/v1/posts', formData)
      },
      success: () => {
        alert('提交成功')
        window.location.href = '/posts';
      },
    },
    button: <button type="submit">提交</button>
  })

  return (
    <div>{form}</div>
  )
}

export default PostsNew
