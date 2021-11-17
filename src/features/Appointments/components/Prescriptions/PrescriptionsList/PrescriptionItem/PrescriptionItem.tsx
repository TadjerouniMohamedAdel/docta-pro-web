import { format, isSameDay } from 'date-fns';
import { Col, Row, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, Icon, Text } from '../../../../../../components';
import { PrescriptinRow } from '../../../../types';

type Props = {
  prescriptionRow: PrescriptinRow;
  setSelectedPrescriptionId: (prescriptionId: string) => void;
  openDeleteModal: () => void;
  goToEditPrescription: () => void;
};

const PrescriptionItem: React.FC<Props> = ({
  prescriptionRow,
  openDeleteModal,
  setSelectedPrescriptionId,
  goToEditPrescription,
}) => {
  const { t } = useTranslation();

  const { id, createdAt: date, diagnostic } = prescriptionRow;
  const isNew = isSameDay(new Date(date), new Date());

  const handleEdit = () => {
    setSelectedPrescriptionId(id);
    goToEditPrescription();
  };

  const handleDelete = () => {
    setSelectedPrescriptionId(id);
    openDeleteModal();
  };

  return (
    <Row align="middle" style={{ paddingRight: 34 }}>
      <Col span={3}>
        {isNew && (
          <Row justify="center" align="middle">
            <Col>
              <Tag className="new-prescription-tag">{t('new')}</Tag>
            </Col>
          </Row>
        )}
      </Col>
      <Col span={4}>
        <Text size="md">{format(new Date(date), 'dd MMM yyyy')}</Text>
      </Col>
      <Col span={11}>
        <Text size="md" type="secondary">
          {diagnostic}
        </Text>
      </Col>
      <Col span={6}>
        <Row justify="end">
          <Col>
            <Button type="text" size="small" className="edit-action" onClick={handleEdit}>
              <Icon name="pencil-line" />
            </Button>
          </Col>
          <Col>
            <Button type="text" size="small">
              <Icon name="serach-eye-line" />
            </Button>
          </Col>
          <Col>
            <Button type="text" size="small" className="delete-action" onClick={handleDelete}>
              <Icon name="delete-bin-7-line" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PrescriptionItem;
