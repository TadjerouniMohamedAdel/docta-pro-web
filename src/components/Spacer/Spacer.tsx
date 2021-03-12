import React from 'react';
import { Space } from 'antd';
import { SpaceProps } from 'antd/lib/space';

export type Props = Omit<SpaceProps, 'size'> & {
  children: React.ReactNode;
  size: 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
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

const Spacer: React.FC<Props> = ({ children, size = 'md', style, ...rest }) => {
  return (
    <Space size={sizes[size]} {...rest} style={{ width: '100%', ...style }}>
      {children}
    </Space>
  );
};

export default Spacer;
