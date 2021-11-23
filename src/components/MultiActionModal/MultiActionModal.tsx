import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, Text, IconName, Button, Icon } from '..';

type Props = {
  visible?: boolean;
  closeModal: () => void;
  action: 'delete' | 'activate' | 'deactivate' | 'approve' | 'reject';
  type: 'user' | 'prescription';
  resource?: { id: string; name?: string };
  mutate: any;
  isLoading: boolean;
  onSuccess?: () => void;
};

const MultiActionModal: React.FC<Props> = ({
  visible,
  closeModal,
  action,
  type,
  resource,
  mutate,
  isLoading,
  onSuccess,
}) => {
  const { t } = useTranslation(['translation', 'alerts', 'errors', 'placeholders']);

  const handleAction = async () => {
    try {
      if (action === 'delete') await mutate(resource?.id);
      if (action === 'activate' || action === 'deactivate') {
        await mutate({ ...resource, name: undefined });
      }

      if (onSuccess) onSuccess();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  // icon
  let icon: IconName = 'delete-bin-2-line';

  switch (action) {
    case 'activate':
    case 'approve':
      icon = 'checkbox-circle-line';
      break;
    case 'deactivate':
    case 'reject':
      icon = 'close-circle-line';
      break;
    default:
      break;
  }

  // ok button background color
  const oKBackGroundColor = ['activate', 'approve'].includes(action) ? '#00b6f8' : undefined;

  // resource name or type
  const resourceName = resource?.name ? resource?.name : t(type);

  return (
    <Modal title={`${t(action)} ${t(type)}`} visible={visible} width={420} onCancel={closeModal}>
      <div style={{ padding: '16px 24px' }}>
        <Row style={{ paddingBottom: 20 }}>
          <Text>
            {`${t('sure to')} ${t(action)}`}
            <b> {resourceName} </b>
            <span className="q-mark">?</span>
          </Text>
        </Row>
        <Row>
          <Col span={10}>
            <Button style={{ textTransform: 'uppercase', width: '90%' }} onClick={closeModal}>
              {t('cancel')}
            </Button>
          </Col>
          <Col span={14}>
            <Button
              danger
              type="primary"
              style={{
                textTransform: 'uppercase',
                width: '100%',
                backgroundColor: oKBackGroundColor,
                border: 'unset',
              }}
              onClick={handleAction}
              loading={isLoading}
              icon={<Icon size={20} name={icon} />}
            >
              {`${t(action)} ${t(type)}`}
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default MultiActionModal;
