import React from 'react';

export type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const shadows = {
  xs: '0 1px 1px 0 rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
  sm: '0 3px 3px -1px rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
  md: '0 6px 6px -1px rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
  lg: '0 16px 16px -1px rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
  xl: '0 32px 40px -2px rgba(10, 22, 70, 0.12), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
};

const Spacer: React.FC<Props> = ({ children, shadow = 'md', style, ...rest }) => {
  return (
    <div
      style={{ boxShadow: shadows[shadow], borderRadius: 8, backgroundColor: 'white', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Spacer;
