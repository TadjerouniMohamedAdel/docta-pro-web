import React from 'react';
import { Space } from 'antd';
import { SpaceProps } from 'antd/lib/space';

export type Props = Omit<SpaceProps, 'size'> & {
  children: React.ReactNode;
  size?: 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  fullWidth?: boolean;
};

const sizes = {
  xss: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

const Spacer: React.FC<Props> = ({ children, size = 'md', fullWidth = true, style, ...rest }) => {
  return (
    <Space size={sizes[size]} {...rest} style={{ width: fullWidth ? '100%' : 'auto', ...style }}>
      {children}
    </Space>
  );
};

export default Spacer;
