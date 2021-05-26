import { Form, Input } from 'antd';
import React from 'react';
import ReactInputMask from 'react-input-mask';
import Label from '../Label/Label';
import Icon from '../Icon/Icon';

type Props = {
  label?: string;
  value: string;
  name: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
  onBlur?: (value: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
};

const PhoneInput: React.FC<Props> = ({
  label,
  value,
  placeholder,
  name,
  error,
  required = false,
  onChange,
  onBlur,
}) => {
  return (
    <>
      {label ? <Label title={label} error={error} required={required} /> : null}
      <Form.Item validateStatus={error ? 'error' : undefined}>
        <ReactInputMask
          mask="+213 999 999 999"
          maskChar={null}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) =>
            onChange?.({
              target: { name, value: e.target.value.replace(/ /g, '') },
            })
          }
          onBlur={(e) => {
            onBlur?.({
              target: { name, value: e.target.value.replace(/ /g, '') },
            });
          }}
          dir="ltr"
        >
          {(inputProps: any) => (
            <Input prefix={<Icon name="phone-line" />} name={name} value={value} {...inputProps} />
          )}
        </ReactInputMask>
      </Form.Item>
    </>
  );
};

export default PhoneInput;
