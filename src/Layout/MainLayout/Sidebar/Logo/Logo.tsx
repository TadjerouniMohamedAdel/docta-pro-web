import React from 'react';
import './styles.less';
import logoImage from '../../../../assets/img/docta_Logo.png';
import logoText from '../../../../assets/img/docta_text.png';
import { Spacer } from '../../../../components';

type Props = {
  collapsed: boolean;
};

const Logo: React.FC<Props> = ({ collapsed }) => {
  return (
    <div
      className="logo-wrapper"
      style={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '0 5px',
      }}
    >
      <Spacer direction="horizontal" fullWidth={false}>
        <img src={logoImage} alt="logo" />
        {!collapsed ? <img src={logoText} alt="logo text" /> : null}
      </Spacer>
    </div>
  );
};

export default Logo;
