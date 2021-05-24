import { Divider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text/Text';
import Password from './Password/Password';
import Phone from './Phone/Phone';

type Props = {};

const PasswordLogin: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div style={{ padding: '18px 25px' }}>
        <Text size="xxl" style={{ fontWeight: 'bold' }}>
          {t('password & login')}
        </Text>
      </div>
      <Divider style={{ margin: 0 }} />
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '18px 25px',
        }}
      >
        <div style={{ width: 400 }}>
          <Phone />
          <Password />
        </div>
      </div>
    </>
  );
};

export default PasswordLogin;
