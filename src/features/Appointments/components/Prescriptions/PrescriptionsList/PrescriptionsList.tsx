import { format } from 'date-fns';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../../../../../components';
import { useGetPrescriptionsHistory } from '../../../../Patients/hooks';
import { PrescriptinRow } from '../../../types';

type Props = {
  patientId: string;
  goToEditPrescription: () => void;
  setSelectedPrescriptionId: (id: string) => void;
};

const PrescriptionsList: React.FC<Props> = ({
  patientId,
  goToEditPrescription,
  setSelectedPrescriptionId,
}) => {
  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  const { resolvedData, isFetching } = useGetPrescriptionsHistory(patientId, pageIndex, pageSize);
  const { data, total = 0 } = resolvedData;

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const handleEdit = (id: string) => {
    goToEditPrescription();
    setSelectedPrescriptionId(id);
  };

  const columns: ColumnsType<PrescriptinRow> = [
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
      render: (text, record) => (
        <Row justify="end">
          <Col>
            <Button
              type="text"
              size="small"
              className="edit-action"
              onClick={() => handleEdit(record.id)}
            >
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
