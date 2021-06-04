import { Col, Row, Steps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '../../../../components';
import { useSetupAccountState } from '../../context';
import '../../styles.less';

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  loading?: boolean;
  onNext: () => void;
  onBack?: () => void;
};

const SetupLayout: React.FC<Props> = ({
  title,
  description,
  content,
  // loading = false,
  onNext,
  onBack,
}) => {
  const { t } = useTranslation();
  const { currentStep, setCurrentStep } = useSetupAccountState();

  const handlePrevStep = () => {
    onBack?.();
    setCurrentStep(currentStep - 1);
  };

  return (
    <Row
      className="account-setup"
      style={{
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Col span={10} className="side-panel">
        <Row style={{ height: 500 }}>
          <Col>
            <Text style={{ fontSize: 48, color: 'white' }}>{title}</Text>
          </Col>
          <Col>
            <Text size="xl" style={{ color: 'white' }}>
              {description}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col span={14} style={{ padding: 10 }}>
        <Row className="step-header" gutter={24}>
          <Col flex={1}>
            <Steps current={currentStep}>
              <Steps.Step icon={<span className="custom-dot small" />} />
              <Steps.Step className="half-step" icon={<span className="custom-dot" />} />
              <Steps.Step icon={<span className="custom-dot" />} />
              <Steps.Step icon={<span className="custom-dot" />} />
              <Steps.Step icon={<span className="custom-dot" />} />
              <Steps.Step icon={<span className="custom-dot small" />} />
              <Steps.Step icon={<span className="custom-dot" />} />
            </Steps>
          </Col>
          <Col style={{ minWidth: 200 }}>
            <Row gutter={16} justify="end">
              {currentStep > 0 ? (
                <Col>
                  <Button type="text" size="small" onClick={handlePrevStep}>
                    {t('Back')}
                  </Button>
                </Col>
              ) : null}
              <Col>
                <Button type="primary" size="small" onClick={onNext}>
                  {t('Next')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="step-content">{content}</div>
      </Col>
    </Row>
  );
};

export default SetupLayout;
