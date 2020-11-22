import React from 'react';
import { Col, Modal as AntModal, Row } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import './styles.less';

type Props = ModalProps & {
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const Modal: React.FC<Props> = ({ children, actions, title, onCancel, ...rest }) => {
  return (
    <AntModal
      className="custom-modal"
      footer={null}
      closable
      onCancel={onCancel}
      title={
        <Row align="middle" justify="space-between">
          <Col>
            <Text size="xxxl" style={{ fontWeight: 500 }}>
              {title}
            </Text>
          </Col>
          <Col>
            <Row gutter={16}>
              <Col>{actions}</Col>
              <Col>
                <Button type="default" onClick={onCancel}>
                  <Icon name="close-line" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      }
      {...rest}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
