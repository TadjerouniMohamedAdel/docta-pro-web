import React from 'react';
import { Select as AntSelect } from 'antd';
import { SelectProps } from 'antd/lib/select';
import classNames from 'classnames';
import './styles.less';

export type Props = SelectProps<any> & {
  prefixIcon?: React.ReactNode;
};

const Select: React.FC<Props> = ({ className, prefixIcon, ...rest }) => {
  return (
    <div
      className={classNames('custom-select', className, {
        'with-prefix-icon': prefixIcon,
      })}
      style={{ position: 'relative' }}
    >
      <AntSelect {...rest} />
      {prefixIcon ?? null}
    </div>
  );
};

export default Select;
