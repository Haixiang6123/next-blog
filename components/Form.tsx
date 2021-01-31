import * as React from 'react'
import {ChangeEventHandler, FormEventHandler, ReactChild} from 'react'

type Props = {
  fields: {
    label: string;
    inputType: 'text' | 'password' | 'textarea';
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    errors: string[];
  }[];
  onSubmit: FormEventHandler;
  button: ReactChild;
}

const Form: React.FC<Props> = (props) => {
  const {fields, onSubmit, button} = props;

  return (
    <form onSubmit={onSubmit}>
      {fields.map(field => (
        <div key={field.label}>
          <label>{field.label}
            {field.inputType === 'textarea' ?
              <textarea cols={30} rows={10} onChange={field.onChange}>{field.value}</textarea> :
              <input type={field.inputType} value={field.value} onChange={field.onChange}/>
            }
          </label>
          {field.errors?.length > 0 && <small>{field.errors.join(',')}</small>}
        </div>
      ))}

      <div>
        {button}
      </div>
    </form>
  )
}

export default Form
