import { format, isSameDay } from 'date-fns';
import { Col, Row, Tag, Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, Icon, Text } from '../../../../../../components';
import { PrescriptinRow } from '../../../../types';

type Props = {
  prescriptionRow: PrescriptinRow;
  setSelectedPrescriptionId: (prescriptionId: string) => void;
  openDeleteModal: () => void;
  goToEditPrescription: () => void;
  prescribeAgain: (prescription: PrescriptinRow) => void;
};

const PrescriptionItem: React.FC<Props> = ({
  prescriptionRow,
  openDeleteModal,
  setSelectedPrescriptionId,
  goToEditPrescription,
  prescribeAgain,
}) => {
  const { t } = useTranslation();

  const { id, createdAt: date, diagnostic } = prescriptionRow;
  const isNew = isSameDay(new Date(date), new Date());

  const handlePrescribeAgain = () => {
    prescribeAgain(prescriptionRow);
  };

  const handleEdit = () => {
    setSelectedPrescriptionId(id);
    goToEditPrescription();
  };

  const handleDelete = () => {
    setSelectedPrescriptionId(id);
    openDeleteModal();
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="link" icon={<Icon name="refresh-line" />} onClick={handlePrescribeAgain}>
          {t('prescribe again')}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" icon={<Icon name="printer-line" />}>
          {t('print')}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="text"
          icon={<Icon name="delete-bin-7-line" />}
          className="delete-action"
          onClick={handleDelete}
          disabled={!isNew}
        >
          {t('delete')}
        </Button>
      </Menu.Item>
    </Menu>
  );

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
            <Button
              type="text"
              size="small"
              className="edit-action"
              onClick={handleEdit}
              disabled={!isNew}
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
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="text" size="small" className="edit-action">
                <Icon name="more-fill" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PrescriptionItem;
