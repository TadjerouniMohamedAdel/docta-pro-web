import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../../../../../components';
import { MedicationItem } from '../../../types';

type Props = {
  medications: MedicationItem[];
  deleteMedication: (id: string) => void;
};

const MedicationsList: React.FC<Props> = ({ medications, deleteMedication }) => {
  const { t } = useTranslation();

  const columns: ColumnsType<any> = [
    {
      width: 55,
    },
    {
      title: t('medication'),
      dataIndex: 'name',
    },
    {
      title: t('units'),
      dataIndex: 'unit',
    },
    {
      title: t('frequency'),
      dataIndex: 'frequency',
    },
    {
      title: t('duration'),
      dataIndex: 'duration',
    },
    {
      dataIndex: 'actions',
      render: (text, record) => (
        <Button
          type="text"
          size="small"
          className="delete-action"
          onClick={() => deleteMedication(record.id)}
        >
          <Icon name="delete-bin-7-line" />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px 0 24px' }}>
      <Row justify="space-between" align="middle" style={{ padding: '0 40px 20px' }}>
        <Col>
          <Text>{t('prescription')}</Text>
        </Col>
        <Col>
          <Row>
            <Col>
              <Button type="link" icon={<Icon name="serach-eye-line" />}>
                {t('preview')}
              </Button>
            </Col>
            <Col>
              <Button type="link" icon={<Icon name="printer-line" />}>
                {t('print')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        rowKey="id"
        dataSource={medications.filter((medication) => !medication.isDeleted)}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default MedicationsList;
