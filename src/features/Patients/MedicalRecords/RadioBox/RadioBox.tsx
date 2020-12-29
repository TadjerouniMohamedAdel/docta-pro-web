import React from 'react';
import { Col, Radio, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { RadioGroupProps } from 'antd/lib/radio';
import Text from '../../../../components/Text/Text';
import './styles.less';

type Props = RadioGroupProps & {
  icon?: React.ReactNode;
};

const RadioBox: React.FC<Props> = ({ icon = null, ...rest }) => {
  const { t } = useTranslation('translation');

  const options = [
    { label: <Text style={{ textTransform: 'uppercase' }}>{t('yes')}</Text>, value: true },
    { label: <Text style={{ textTransform: 'uppercase' }}>{t('no')}</Text>, value: false },
  ];

  return (
    <div className="radio-box">
      <Row gutter={24} align="middle" wrap={false}>
        <Col>{icon}</Col>
        <Col>
          <Radio.Group size="large" options={options} {...rest} />
        </Col>
      </Row>
    </div>
  );
};

export default RadioBox;
