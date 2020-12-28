import React from 'react';
import { Col, Modal as AntModal, Row } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import classNames from 'classnames';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import './styles.less';

type Props = ModalProps & {
  children: React.ReactNode;
  actions?: React.ReactNode;
  borderedHeader?: boolean;
};

const Modal: React.FC<Props> = ({
  children,
  actions,
  borderedHeader = true,
  title,
  onCancel,
  className,
  ...rest
}) => {
  return (
    <AntModal
      className={classNames('custom-modal', { 'bordered-header': borderedHeader }, className)}
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
