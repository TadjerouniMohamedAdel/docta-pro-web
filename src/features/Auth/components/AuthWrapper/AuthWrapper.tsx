import React from 'react';
import bgImage from '../../../../assets/img/background.jpg';
import { Spacer, Card } from '../../../../components';
import illustration from '../../../../assets/img/illustration.png';
import logo from '../../../../assets/img/logo.png';

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
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 10,
          maxWidth: '100%',
        }}
      >
        <Card style={{ padding: '40px 35px 24px', maxWidth: 420 }}>
          <Spacer size="md" direction="vertical">
            <Spacer size="md" direction="vertical" align="center">
              <img src={illustration} alt="illustration" />
              <img src={logo} alt="logo" />
            </Spacer>
            {children}
          </Spacer>
        </Card>
      </div>
    </div>
  );
};

export default AuthWrapper;
