import React from 'react';
import { Col, Row } from 'antd';
import Text from '../Text/Text';

export type Props = {
  title: string;
  error: string | undefined;
};

const Label: React.FC<Props> = ({ title, error }) => {
  return (
    <Row justify="space-between">
      <Col>
        <Text size="lg">{title}</Text>
      </Col>
      <Col>
        <Text size="xs" type="danger">
          {error}
        </Text>
      </Col>
    </Row>
  );
};

export default Label;
