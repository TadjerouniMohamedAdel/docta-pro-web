import React from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Button from '../../../components/Button/Button';

type Props = {};

const Users: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  return (
    <Row style={{ height: 88, padding: '0 24px' }} align="middle" justify="space-between">
      <Col>
        <Text size="xxl" style={{ fontWeight: 'bold' }}>
          {t('users')} (9)
        </Text>
      </Col>
      <Col>
        <Button type="primary" icon={<Icon name="add-line" />} size="small">
          {t('add user')}
        </Button>
      </Col>
    </Row>
  );
};

export default Users;
