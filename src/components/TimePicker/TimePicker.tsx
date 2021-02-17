import React from 'react';
import { TimePicker as AntTimePicker } from 'antd';
import { TimePickerProps } from 'antd/lib/time-picker';
import classNames from 'classnames';
import './styles.less';

export type Props = TimePickerProps & {
  prefixIcon?: React.ReactNode;
};

const DatePicker: React.FC<Props> = ({
  className,
  prefixIcon,
  suffixIcon = null,
  style,
  ...rest
}) => {
  return (
    <div
      className={classNames('custom-time-picker', className, {
        'with-prefix-icon': prefixIcon,
      })}
      style={{ position: 'relative' }}
    >
      <AntTimePicker suffixIcon={suffixIcon} style={{ width: '100%', ...style }} {...rest} />
      {prefixIcon}
    </div>
  );
};

export default DatePicker;
