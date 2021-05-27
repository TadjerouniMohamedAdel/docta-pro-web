import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Icon } from '../../../../components';
import { useGetVisitHistory } from '../../hooks';
import { useFieldByLocal } from '../../../../common/hooks/useFieldByLocal';

type Props = {
  patientId?: string;
};

const VisitsHistory: React.FC<Props> = ({ patientId = '' }) => {
  const { t } = useTranslation('translation');
  const { getFieldNameByLocal } = useFieldByLocal();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const { resolvedData, isFetching } = useGetVisitHistory(patientId, pageIndex, pageSize);

  const { data, total = 0 } = resolvedData;

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const columns = [
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="time-line" size={18} />
          </Col>
          <Col>{t('date')}</Col>
        </Row>
      ),
      dataIndex: 'start',
      key: 'start',
      render: (text: Date) => <span>{moment(text).format('LLL')}</span>,
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="first-aid-kit-line" size={18} />
          </Col>
          <Col>{t('reason')}</Col>
        </Row>
      ),
      dataIndex: 'visitReason',
      key: 'visitReason',
      render: (text: any, record: any) => <span>{record.reason[getFieldNameByLocal()]}</span>,
    },
    {
      title: (
        <Row align="middle" gutter={8}>
          <Col>
            <Icon name="stethoscope-line" size={18} />
          </Col>
          <Col>{t('diagnostic')}</Col>
        </Row>
      ),
      dataIndex: 'diagnostic',
      key: 'diagnostic',
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      bordered
      pagination={{ pageSize, total }}
      onChange={handleChange}
      loading={isFetching}
    />
  );
};

export default VisitsHistory;
