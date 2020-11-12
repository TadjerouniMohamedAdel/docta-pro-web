import React from 'react';
import { Select as AntSelect } from 'antd';
import { SelectProps } from 'antd/lib/select';
import classNames from 'classnames';
import './styles.less';

export type Props = SelectProps<any> & {};

const Select: React.FC<Props> = ({ size = 'small', className, ...rest }) => {
  return <AntSelect className={classNames('custom-select', className)} size={size} {...rest} />;
};

export default Select;
