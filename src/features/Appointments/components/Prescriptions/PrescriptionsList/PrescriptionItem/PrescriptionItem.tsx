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
  disableEdit: boolean;
  setPreviewId:(id:string|null)=>void
};

const PrescriptionItem: React.FC<Props> = ({
  prescriptionRow,
  openDeleteModal,
  setSelectedPrescriptionId,
  goToEditPrescription,
  prescribeAgain,
  disableEdit,
  setPreviewId
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

  const menu = (
    <Menu>
      {!disableEdit && (
        <Menu.Item>
          <Button type="link" icon={<Icon name="restart-line" />} onClick={handlePrescribeAgain}>
            {t('prescribe again')}
          </Button>
        </Menu.Item>
      )}
      <Menu.Item>
        <Button type="text" icon={<Icon name="printer-line" />}>
          {t('print')}
        </Button>
      </Menu.Item>
      {!disableEdit && (
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
      )}
    </Menu>
  );

  return (
    <Row align="middle" style={{ padding: '0 24px' }}>
      <Col span={disableEdit ? 0 : 3}>
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
      <Col flex={1}>
        <Text size="md" type="secondary">
          {diagnostic}
        </Text>
      </Col>
      <Col span={6}>
        <Row justify="end">
          {!disableEdit && (
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
            <Button type="text" size="small" className="edit-action" onClick={()=>setPreviewId(id)}>
              <Icon name="search-eye-line" />
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
