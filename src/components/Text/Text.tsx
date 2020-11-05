import React from 'react';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';

export type Props = TextProps & {
  children: React.ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const sizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

const Spacer: React.FC<Props> = ({ children, size, style, ...rest }) => {
  return (
    <Typography.Text style={{ fontSize: sizes[size], ...style }} {...rest}>
      {children}
    </Typography.Text>
  );
};

export default Spacer;