import { format } from 'date-fns';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../../../../../components';
import { useGetPrescriptionsHistory } from '../../../../Patients/hooks';
import { PrescriptinRow } from '../../../types';
import DeleteModal from '../../../../../components/MultiActionModal/MultiActionModal';
import { deletePrescription } from '../../../services';

type Props = {
  patientId: string;
  prescriptionId: string;
  goToEditPrescription: () => void;
  setSelectedPrescriptionId: (id: string) => void;
};

const PrescriptionsList: React.FC<Props> = ({
  patientId,
  prescriptionId,
  goToEditPrescription,
  setSelectedPrescriptionId,
}) => {
  const { t } = useTranslation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  const cache = useQueryClient();
  const { resolvedData, isFetching } = useGetPrescriptionsHistory(patientId, pageIndex, pageSize);
  const { data, total = 0 } = resolvedData;

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const handleEdit = (id: string) => {
    setSelectedPrescriptionId(id);
    goToEditPrescription();
  };

  const {
    mutateAsync: deletePrescriptionMutate,
    isLoading: isDeletePrescriptionLoading,
  } = useMutation(() => deletePrescription(patientId, prescriptionId));

  const handleDelete = (id: string) => {
    setSelectedPrescriptionId(id);
    setShowDeleteModal(true);
  };

  const onDeleteSuccess = () => {
    cache.invalidateQueries('prescriptions-history');
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
            <Button type="text" size="small">
              <Icon name="serach-eye-line" />
            </Button>
          </Col>
          <Col>
            <Button
              type="text"
              size="small"
              className="delete-action"
              onClick={() => handleDelete(record.id)}
            >
              <Icon name="delete-bin-7-line" />
            </Button>
          </Col>
        </Row>
      ),
      width: 200,
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={{ pageSize, total, showQuickJumper: false, showSizeChanger: false }}
        onChange={handleChange}
        loading={isFetching}
      />
      <DeleteModal
        action="delete"
        type="prescription"
        mutate={deletePrescriptionMutate}
        visible={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        isLoading={isDeletePrescriptionLoading}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
};

export default PrescriptionsList;
