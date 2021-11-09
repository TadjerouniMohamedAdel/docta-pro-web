import { format } from 'date-fns';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../../../../../components';
import { useGetPrescriptionsHistory } from '../../../hooks';
// import { useTranslation } from 'react-i18next';

type Props = {
  patientId: string;
};

const PrescriptionsList: React.FC<Props> = ({ patientId }) => {
  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  const { resolvedData, isFetching } = useGetPrescriptionsHistory(patientId, pageIndex, pageSize);
  const { data, total = 0 } = resolvedData;

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const columns: ColumnsType<any> = [
    {
      dataIndex: 'isNew',
      width: 64,
    },
    {
      title: t('date'),
      dataIndex: 'date',
      render: (text: Date) => <span>{format(text, 'LLL')}</span>,
      width: 96,
    },
    {
      title: t('diagnosis'),
      dataIndex: 'diagnosis',
    },
    {
      dataIndex: 'actions',
      render: () => (
        <Row justify="end">
          <Col>
            <Button type="text" size="small" className="edit-action">
              <Icon name="pencil-line" />
            </Button>
          </Col>
          <Col>
            <Button type="text" size="small" className="delete-action">
              <Icon name="serach-eye-line" />
            </Button>
          </Col>
          <Col>
            <Button type="text" size="small" className="delete-action">
              <Icon name="pencil-line" />
            </Button>
          </Col>
        </Row>
      ),
      width: 200,
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data} // {[{ date: new Date(), diagnosis: 'a' }]}
      columns={columns}
      pagination={{ pageSize, total }}
      onChange={handleChange}
      loading={isFetching}
    />
  );
};

export default PrescriptionsList;
