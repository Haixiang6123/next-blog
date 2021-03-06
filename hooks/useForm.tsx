import * as React from 'react'
import {ReactChild, useCallback, useState} from 'react'
import {AxiosResponse} from 'axios'

type Field<F> = {
  label: string;
  inputType: 'text' | 'password' | 'textarea';
  key: keyof F;
}

type UseFormOptions<F> = {
  initFormData: F;
  fields: Field<F>[];
  button: ReactChild;
  submit: {
    request: (fromData: F) => Promise<AxiosResponse<F>>;
    success: () => void;
  }
}

function useForm<F>(options: UseFormOptions<F>) {
  const {initFormData, button, fields, submit} = options;

  const [formData, setFormData] = useState<F>(initFormData)
  const [errors, setErrors] = useState(() => {
    const e: { [key in keyof F]?: string[] } = {}

    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = []
      }
    }

    return e
  })

  const onChange = useCallback((key: keyof F, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }, [formData])

  const _onSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      await submit.request(formData)

      submit.success();
    } catch (error) {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(error.response.data)
        }
        else if (response.status === 401) {
          window.alert('请先登录')
          window.location.href = `/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`
        }
      }
    }
  }, [submit, formData])

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field => (
        <div key={field.key.toString()}>
          <label>{field.label}
            {field.inputType === 'textarea'
              ? <textarea
                  value={formData[field.key].toString()}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              : <input
                  type={field.inputType}
                  value={formData[field.key].toString()}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
            }
          </label>
          {errors[field.key]?.length > 0 && <small>{errors[field.key].join(',')}</small>}
        </div>
      ))}

      <div>
        {button}
      </div>
    </form>
  )

  return {
    form,
    setErrors,
  }
}

export default useForm
