import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import classNames from 'classnames';
import './styles.less';

export type Props = DatePickerProps & {
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
      className={classNames('custom-date-picker', className, {
        'with-prefix-icon': prefixIcon,
      })}
      style={{ position: 'relative' }}
    >
      <AntDatePicker suffixIcon={suffixIcon} style={{ width: '100%', ...style }} {...rest} />
      {prefixIcon}
    </div>
  );
};

export default DatePicker;
