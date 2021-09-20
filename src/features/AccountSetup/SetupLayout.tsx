import { Col, Row, Steps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text } from '../../components';
import Localization from '../../components/Localization';
import { useSetupAccountState } from './context';
import './styles.less';

type Props = {
  title: string;
  description: string;
  header: string;
  content: React.ReactNode;
  loading?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
};

const SetupLayout: React.FC<Props> = ({
  title,
  description,
  header,
  content,
  loading = false,
  onNext,
  onBack,
  onSkip,
}) => {
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, specialtiesLength } = useSetupAccountState();

  const handlePrevStep = () => {
    onBack?.();
    setCurrentStep(
      currentStep === 6 && specialtiesLength === 1 ? currentStep - 2 : currentStep - 1,
    );
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
          <Col style={{ width: '100%' }}>
            <Text style={{ fontSize: 48, color: 'white' }}>{title}</Text>
          </Col>
          <Col style={{ width: '100%' }}>
            <Text size="xl" style={{ color: 'white' }}>
              {description}
            </Text>
          </Col>
          <Col>
            <Localization />
          </Col>
        </Row>
      </Col>
      <Col span={14} style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
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
                  <Button
                    type="text"
                    size="small"
                    onClick={handlePrevStep}
                    icon={<Icon name="arrow-left-s-line" size={18} />}
                  >
                    {t('Back')}
                  </Button>
                </Col>
              ) : null}
              {onNext ? (
                <Col>
                  <Button type="primary" size="small" onClick={() => onNext?.()}>
                    <Row align="middle" gutter={8} style={{ paddingLeft: 8 }}>
                      <Col>{t('next')}</Col>
                      <Col>
                        <Icon name="arrow-right-s-line" size={18} />
                      </Col>
                    </Row>
                  </Button>
                </Col>
              ) : null}
              {onSkip ? (
                <Col>
                  <Button type="primary" size="small" onClick={() => onSkip?.()}>
                    {t('skip')}
                  </Button>
                </Col>
              ) : null}
            </Row>
          </Col>
        </Row>
        <div className="step-content">
          <div style={{ marginBottom: 32, marginTop: 80, paddingLeft: 80, paddingRight: 80 }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{header}</Text>
          </div>
          {content}
        </div>
        {loading ? (
          <div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              zIndex: 1999,
              background: 'rgba(255,255,255,.8)',
            }}
          >
            {t('processing')}
          </div>
        ) : null}
      </Col>
    </Row>
  );
};

export default SetupLayout;
