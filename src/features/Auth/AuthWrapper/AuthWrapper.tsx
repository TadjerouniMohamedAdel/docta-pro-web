import React from 'react';
import bgImage from '../../../assets/img/background.jpg';

export type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const AuthWrapper: React.FC<Props> = ({ children, style, ...rest }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default AuthWrapper;
