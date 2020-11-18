import React from 'react';
import { Col, Row } from 'antd';
import Text from '../../../../../../components/Text/Text';
import Icon from '../../../../../../components/Icon/Icon';
import Button from '../../../../../../components/Button/Button';
import './styles.less';

type Props = {
  children: React.ReactNode;
};

const RecordItem: React.FC<Props> = ({ children }) => {
  return (
    <Row className="record-item" align="middle" justify="space-between">
      <Col>
        <Text>{children}</Text>
      </Col>
      <Col>
        <Button type="text" className="btn-record-delete" danger>
          <Icon name="close-circle" />
        </Button>
      </Col>
    </Row>
  );
};

export default RecordItem;
