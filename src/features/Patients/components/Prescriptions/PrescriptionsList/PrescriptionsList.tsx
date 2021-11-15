import { format } from 'date-fns';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../../../../../components';
import { useGetPrescriptionsHistory } from '../../../hooks';

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
      width: 64,
    },
    {
      title: t('date'),
      dataIndex: 'createdAt',
      render: (text: Date) => <span>{format(new Date(text), 'dd MMM yyyy')}</span>,
      width: 120,
    },
    {
      title: t('diagnosis'),
      dataIndex: 'diagnostic',
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
      dataSource={data}
      columns={columns}
      pagination={{ pageSize, total }}
      onChange={handleChange}
      loading={isFetching}
    />
  );
};

export default PrescriptionsList;
