import { format, isSameDay } from 'date-fns';
import { Col, Row, Tag, Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, Icon, Text } from '../../../../../../components';
import { PrescriptinRow, PrescriptionDetails } from '../../../../types';
import { fetchPrescriptionDetails } from '../../../../services';

type Props = {
  prescriptionRow: PrescriptinRow;
  setSelectedPrescriptionId?: (prescriptionId: string) => void;
  openDeleteModal: () => void;
  goToEditPrescription?: () => void;
  prescribeAgain?: (prescription: PrescriptionDetails) => void;
  isEditable: boolean;
  setPreviewId: (id: string | null) => void;
  printPreview:()=>void
};

const PrescriptionItem: React.FC<Props> = ({
  prescriptionRow,
  openDeleteModal,
  setSelectedPrescriptionId,
  goToEditPrescription,
  prescribeAgain,
  isEditable,
  setPreviewId,
  printPreview
}) => {
  const { t } = useTranslation();

  const { id, createdAt: date, diagnostic } = prescriptionRow;
  const isNew = isSameDay(new Date(date), new Date());

  const handlePrescribeAgain = async () => {
    if (prescribeAgain) {
      try {
        const prescriptionData = await fetchPrescriptionDetails(prescriptionRow.id);
        const { data: prescription } = prescriptionData;

        prescribeAgain(prescription);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = () => {
    if (!setSelectedPrescriptionId || !goToEditPrescription) return;

    setSelectedPrescriptionId(id);
    goToEditPrescription();
  };

  const handleDelete = () => {
    if (!setSelectedPrescriptionId) return;

    setSelectedPrescriptionId(id);
    openDeleteModal();
  };

  const handlePrint = ()=>{
    printPreview();
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          style={{ color: '#00B6F8' }}
          type="text"
          size="small"
          className="edit-action"
          icon={<Icon name="restart-line" />}
          onClick={handlePrescribeAgain}
        >
          {t('prescribe again')}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="text"
          size="small"
          className="edit-action"
          icon={<Icon name="printer-line" />}
          onClick={handlePrint}
        >
          {t('print')}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="text"
          size="small"
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
    <Row
      align="middle"
      style={{ height: 54, padding: '0 32px', borderBottom: '1px solid #E8E8E8' }}
    >
      <Col span={isEditable ? 2 : 0}>
        {isNew && (
          <Row justify="start" align="middle">
            <Col>
              <Tag className="new-prescription-tag">{t('new')}</Tag>
            </Col>
          </Row>
        )}
      </Col>
      <Col span={4}>
        <Text size="md">{format(new Date(date), 'dd MMM yyyy')}</Text>
      </Col>
      <Col flex={1}>
        <Text size="md" type="secondary">
          {diagnostic}
        </Text>
      </Col>
      <Col span={6}>
        <Row justify="end">
          {isEditable && (
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
          )}
          <Col>
            <Button
              type="text"
              size="small"
              className="edit-action"
              onClick={() => setPreviewId(id)}
            >
              <Icon name="search-eye-line" />
            </Button>
          </Col>
          <Col>
            {isEditable ? (
              <Dropdown overlay={menu} trigger={['click']}>
                <Button type="text" size="small" className="edit-action">
                  <Icon name="more-fill" />
                </Button>
              </Dropdown>
            ) : (
              <Button type="text" size="small" className="edit-action" onClick={handlePrint}>
                <Icon name="printer-line" />
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PrescriptionItem;
