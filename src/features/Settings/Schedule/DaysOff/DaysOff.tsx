import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import React from 'react';
import moment from 'moment';
import { DaysOffSchedule } from '../types';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import { fetchDaysOff } from '../services';
import DaysOffModal from './DaysOffModal/DaysOffModal';

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

const useDaysOffList = () => {
  const { data, ...rest } = useQuery('days-off', () => fetchDaysOff(), {
    keepPreviousData: true,
  });
  return { resolvedData: data ?? [], ...rest };
};

const DaysOff: React.FC<Props> = ({ showModal, closeModal }) => {
  const { t } = useTranslation('translation');

  const getStatus = (from: Date, to: Date) => {
    if (moment(from).isAfter(new Date(), 'day')) return <Text type="danger">{t('scheduled')}</Text>;
    if (moment(to).isBefore(new Date(), 'day')) return <Text type="success">{t('passed')}</Text>;
    return <Text type="secondary">{t('in progress')}</Text>;
  };

  const { resolvedData, isLoading } = useDaysOffList();
  const { data } = resolvedData;

  const columns: ColumnsType<DaysOffSchedule> = [
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="time-line" size={18} />
          </Col>
          <Col>{t('date')}</Col>
        </Row>
      ),

      dataIndex: 'date',
      key: 'date',
      render: (text: any, record: DaysOffSchedule) => (
        <div>
          <span>{moment(record.from).format('LL')}</span>
          <span> - </span>
          <span>{moment(record.to).format('LL')}</span>
        </div>
      ),
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="close-circle-line" size={18} />
          </Col>
          <Col>{t('canceled appointments')}</Col>
        </Row>
      ),
      dataIndex: 'canceledAppointments',
      key: 'canceledAppointments',
      render: (text: any, record: DaysOffSchedule) => (
        <span>
          {record.canceledAppointments} {t('appointment canceled')}
        </span>
      ),
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="message-line" size={18} />
          </Col>
          <Col>{t('notifications Message')}</Col>
        </Row>
      ),
      dataIndex: 'message',
      key: 'message',
      render: (text: any, record: DaysOffSchedule) => <span>{record.message}</span>,
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="information-line" size={18} />
          </Col>
          <Col>{t('status')}</Col>
        </Row>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: DaysOffSchedule) => (
        <span>{getStatus(record.from, record.to)}</span>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data}
        columns={columns}
        bordered
        pagination={false}
      />
      <DaysOffModal visible={showModal} closeModal={closeModal} />
    </>
  );
};

export default DaysOff;
