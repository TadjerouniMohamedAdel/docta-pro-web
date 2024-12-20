import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { Text, Button } from '..';
import lock from '../../assets/img/lock.png';
import './styles.less';

const AccountLocked: React.FC<{ isLocked: boolean | 'pending' }> = ({ isLocked }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const history = useHistory();
  const location = useLocation();
  const ModalTitle = () => (
    <div className="account-locked-header">
      <Text className="account-locked-title">{t('unlock pro features')}</Text>
    </div>
  );
  return (
    <Modal
      visible={isLocked === true && location.pathname !== '/settings/subscription'}
      footer={null}
      centered
      width={600}
      closable={false}
      title={ModalTitle()}
    >
      <div className="account-locked-content">
        <img src={lock} alt="" />
        <Text className="account-locked-description">{t('unlock message')}</Text>
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={() => history.push('/settings/subscription')}
        >
          {t('Go TO SUBSCRIPTIONS')}
        </Button>
      </div>
    </Modal>
  );
};

export default AccountLocked;
