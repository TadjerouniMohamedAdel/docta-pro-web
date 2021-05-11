import { Col, Divider, Row, Skeleton } from 'antd';
import React from 'react';

const AppointmentCard: React.FC = () => {
  return (
    <>
      {Array(5).fill(
        <Row
          className="appointment-card skeleton"
          style={{
            height: 72,
            borderRadius: 8,
            padding: '0 16px',
            width: 'calc(100% - 70px)',
            marginBottom: 8,
            marginLeft: 70,
          }}
          align="middle"
          gutter={16}
        >
          <Col>
            <Skeleton.Avatar active size="large" shape="circle" />
          </Col>
          <Col flex={1}>
            <Row gutter={24} justify="space-between">
              <Col span={16}>
                <Skeleton.Input active size="small" style={{ height: 20 }} />
              </Col>
              <Col flex={8}>
                <Skeleton.Input active size="small" style={{ height: 20 }} />
              </Col>
            </Row>
          </Col>
        </Row>,
      )}
    </>
  );
};

const AppointmentForm: React.FC = () => {
  return (
    <Row gutter={[35, 16]}>
      <Col span={15}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={9}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={15}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={9}>
        <Skeleton.Input active size="small" />
      </Col>
    </Row>
  );
};

const PatientForm: React.FC = () => {
  return (
    <Row gutter={[35, 16]} align="middle">
      <Col span={12}>
        <Row gutter={16} align="middle">
          <Col>
            <Skeleton.Avatar active size={75} shape="square" />
          </Col>
          <Col flex={1}>
            <Skeleton.Input active size="small" />
          </Col>
        </Row>
      </Col>
      <Col flex={12}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={12}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={12}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={12}>
        <Skeleton.Input active size="small" />
      </Col>
      <Col span={12}>
        <Skeleton.Input active size="small" />
      </Col>
    </Row>
  );
};

const AppointmentDetails: React.FC = () => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ padding: '16px 40px' }}>
        <AppointmentForm />
      </div>
      <Divider style={{ marginTop: 0, marginBottom: 0 }} />
      <div style={{ padding: '16px 40px' }}>
        <PatientForm />
      </div>
    </div>
  );
};

const AppointmentSkeleton: React.FC = () => null;

type AppointmentSkeletonType = typeof AppointmentSkeleton & {
  AppointmentCard: typeof AppointmentCard;
} & { PatientForm: typeof PatientForm } & {
  AppointmentDetails: typeof AppointmentDetails;
};

(AppointmentSkeleton as AppointmentSkeletonType).PatientForm = PatientForm;
(AppointmentSkeleton as AppointmentSkeletonType).AppointmentDetails = AppointmentDetails;
(AppointmentSkeleton as AppointmentSkeletonType).AppointmentCard = AppointmentCard;

export default AppointmentSkeleton as AppointmentSkeletonType;
