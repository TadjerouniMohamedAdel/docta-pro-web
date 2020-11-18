import React from 'react';
import { Col, Radio, Row } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import Text from '../../../../../../components/Text/Text';
import './styles.less';

type Props = RadioGroupProps & {
  icon?: React.ReactNode;
};

const RadioBox: React.FC<Props> = ({ icon = null, ...rest }) => {
  const options = [
    { label: <Text>YES</Text>, value: true },
    { label: <Text>NO</Text>, value: false },
  ];

  return (
    <div className="radio-box">
      <Row gutter={24} align="middle">
        <Col>{icon}</Col>
        <Col>
          <Radio.Group size="large" options={options} {...rest} />
        </Col>
      </Row>
    </div>
  );
};

export default RadioBox;
