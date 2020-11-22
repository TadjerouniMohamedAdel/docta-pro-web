import React from 'react';
import { Col, Row, Table } from 'antd';
import moment from 'moment';
import Icon from '../../../../components/Icon/Icon';

type Props = {};

const VisitsHistory: React.FC<Props> = () => {
  const dataSource = [
    {
      key: '1',
      date: new Date(),
      visitReason: 'Dental Consultation',
      diagnostic: 'Precautionary Measures For Hernia',
    },
    {
      key: '2',
      date: new Date(),
      visitReason: 'Dental Follow Up',
      diagnostic: 'Diet And Cure For Candida Infections',
    },
  ];

  const columns = [
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="time-line" size={18} />
          </Col>
          <Col>Date</Col>
        </Row>
      ),
      dataIndex: 'date',
      key: 'date',
      render: (text: Date) => <span>{moment(text).format('LLL')}</span>,
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="first-aid-kit-line" size={18} />
          </Col>
          <Col>Reason</Col>
        </Row>
      ),
      dataIndex: 'visitReason',
      key: 'visitReason',
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="stethoscope-line" size={18} />
          </Col>
          <Col>Diagnostic</Col>
        </Row>
      ),
      dataIndex: 'diagnostic',
      key: 'diagnostic',
    },
  ];

  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} bordered size="small" />
  );
};

export default VisitsHistory;
