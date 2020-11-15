import React from 'react';
import { Select as AntSelect } from 'antd';
import { SelectProps } from 'antd/lib/select';
import classNames from 'classnames';
import './styles.less';
import Icon from '../Icon/Icon';

export type Props = SelectProps<any> & {
  prefixIcon?: React.ReactNode;
};

const Select: React.FC<Props> = ({
  className,
  prefixIcon = null,
  suffixIcon = <Icon name="arrow-down-s" />,
  ...rest
}) => {
  return (
    <div
      className={classNames('custom-select', className, {
        'with-prefix-icon': prefixIcon,
      })}
      style={{ position: 'relative' }}
    >
      <AntSelect {...rest} suffixIcon={suffixIcon} />
      {prefixIcon}
    </div>
  );
};

export default Select;
