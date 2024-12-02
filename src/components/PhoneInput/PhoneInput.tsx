import { Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactInputMask from 'react-input-mask';
import classnames from 'classnames';
import Label from '../Label/Label';
import Icon from '../Icon/Icon';
import './styles.less';

type Props = {
  label?: string;
  value?: string;
  name: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
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
  disabled = false,
  onChange,
  onBlur,
}) => {
  const { i18n } = useTranslation();
  return (
    <>
      {label ? <Label title={label} error={error} required={required} /> : null}
      <Form.Item validateStatus={error ? 'error' : undefined}>
        <ReactInputMask
          disabled={disabled}
          mask="+213 999 999 999"
          maskChar={null}
          placeholder={placeholder}
          name={name}
          value={value ?? ''}
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
          className={classnames('phone-input', { rtl: i18n.language === 'ar' })}
        >
          {(inputProps: any) => (
            <Input
              style={{ textAlign: 'right' }}
              disabled={disabled}
              prefix={<Icon name="phone-line" />}
              name={name}
              value={value ?? ''}
              {...inputProps}
            />
          )}
        </ReactInputMask>
      </Form.Item>
    </>
  );
};

export default PhoneInput;
