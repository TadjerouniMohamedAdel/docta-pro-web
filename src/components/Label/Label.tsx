import React from 'react';
import { Col, Row } from 'antd';
import Text from '../Text/Text';

export type Props = {
  title: string;
  error?: string | undefined;
  required?: boolean;
};

const Label: React.FC<Props> = ({ title, error, required = false }) => {
  return (
    <Row justify="space-between">
      <Col>
        <Text size="lg">{title}</Text>
        {required ? (
          <Text type="danger" size="xl">
            *
          </Text>
        ) : null}
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
