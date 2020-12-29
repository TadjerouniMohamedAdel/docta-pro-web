import React from 'react';
import { Col, Row } from 'antd';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import Button from '../../../../components/Button/Button';
import './styles.less';

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
};

const RecordItem: React.FC<Props> = ({ children, onDelete }) => {
  return (
    <Row className="record-item" align="middle" justify="space-between">
      <Col>
        <Text>{children}</Text>
      </Col>
      <Col>
        <Button type="text" className="btn-record-delete" danger size="small" onClick={onDelete}>
          <Icon name="close-circle-line" size={18} />
        </Button>
      </Col>
    </Row>
  );
};

export default RecordItem;
