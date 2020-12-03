import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import classNames from 'classnames';
import './styles.less';

export type Props = Omit<ButtonProps, 'icon'> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  icon,
  style,
  size,
  active = false,
  className,
  ...rest
}) => {
  return (
    <AntButton
      className={classNames('custom-button', className, {
        'small-button': size === 'small',
        active,
      })}
      icon={icon}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
      size={size}
      {...rest}
    >
      {children}
    </AntButton>
  );
};

export default Button;
