import { Col, Divider, Row, Skeleton } from 'antd';
import React from 'react';

const AppointmentCard: React.FC = () => {
  return (
    <>
      {Array(5).fill(
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col style={{ minWidth: 70, margin: 0 }}>
            <Skeleton.Input
              active
              size="small"
              style={{ height: 18, position: 'relative', margin: 0, top: 4 }}
            />
          </Col>
          <Col flex={1} style={{ padding: '0 16px' }}>
            <Row
              className="appointment-card skeleton"
              style={{
                height: 72,
                borderRadius: 8,

                width: '100%',
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
                  <Col span={4}>
                    <Skeleton.Input active size="small" style={{ height: 20 }} />
                  </Col>
                </Row>
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
