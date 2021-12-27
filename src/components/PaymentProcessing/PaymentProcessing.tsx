import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { Text, Button } from '..';
import payment_processing from '../../assets/img/payment_processing.png';
import './styles.less';

const PaymentProcessing: React.FC<{ isLocked: boolean | 'pending' }> = ({ isLocked }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const history = useHistory();
  const location = useLocation();
  const ModalTitle = () => (
    <div className="payment-pending-header">
      <Text className="payment-pending-title">{t('Payment Processing')}</Text>
    </div>
  );
  return (
    <Modal
      visible={isLocked === 'pending' && location.pathname !== '/settings/subscription'}
      footer={null}
      centered
      width={600}
      closable={false}
      title={ModalTitle()}
    >
      <div className="payment-pending-content">
        <img src={payment_processing} alt="" />
        <Text className="payment-pending-description">{t('payment processing message')}</Text>
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
export default PaymentProcessing;
