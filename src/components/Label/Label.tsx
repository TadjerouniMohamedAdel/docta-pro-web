import React from 'react';
import { Col, Row, RowProps } from 'antd';
import Text from '../Text/Text';

export type Props = RowProps & {
  title: string;
  error?: string | undefined;
  required?: boolean;
};

const Label: React.FC<Props> = ({ title, error, required = false, ...rest }) => {
  return (
    <Row justify="space-between" {...rest}>
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
