import { Col, Row, Skeleton } from 'antd';
import React from 'react';

const PersonalInfo: React.FC = () => {
  return (
    <Row gutter={[35, 24]} align="middle">
      {Array(8).fill(
        <Col span={12}>
          <Skeleton.Input active size="small" />
        </Col>,
      )}

      <Col span={24}>
        <Skeleton.Input active size="small" />
      </Col>
    </Row>
  );
};

const PatientSkeleton: React.FC = () => null;

type PatientSkeletonType = typeof PatientSkeleton & {
  PersonalInfo: typeof PersonalInfo;
};

(PatientSkeleton as PatientSkeletonType).PersonalInfo = PersonalInfo;

export default PatientSkeleton as PatientSkeletonType;
