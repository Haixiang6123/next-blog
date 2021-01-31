import * as React from 'react'
import {ReactChild, useCallback, useState} from 'react'

type Field<F> = {
  label: string;
  inputType: 'text' | 'password' | 'textarea';
  key: keyof F;
}

type UseFormOptions<F> = {
  initFormData: F;
  fields: Field<F>[];
  button: ReactChild;
  onSubmit: (formData: F) => void;
}

function useForm<F>(options: UseFormOptions<F>) {
  const {initFormData, onSubmit, button, fields} = options;

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

  const _onSubmit = useCallback((e) => {
    e.preventDefault()
    onSubmit(formData)
  }, [onSubmit, formData])

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field => (
        <div key={field.label}>
          <label>{field.label}
            {field.inputType === 'textarea'
              ? <textarea onChange={(e) => onChange(field.key, e.target.value)}>
                  {formData[field.key]}
                </textarea>
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