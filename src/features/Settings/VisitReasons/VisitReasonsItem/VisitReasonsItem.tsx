import React from 'react';
import { Table, Select as AntSelect, Popover, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';
import Button from '../../../../components/Button/Button';
import Icon from '../../../../components/Icon/Icon';
import Select from '../../../../components/Select/Select';
import Text from '../../../../components/Text/Text';
import { Specialty, VisitReason } from '../types';
import i18n from '../../../../i18n';
import './styles.less';
import ColorPalette from './ColorPalette/ColorPalette';

type Props = {
  specialty: Specialty;
  handleUpdateSpecialty: (id: string, specialty: Specialty) => void;
};

const { Option } = AntSelect;

const VisitReasonsItem: React.FC<Props> = ({ specialty, handleUpdateSpecialty }) => {
  const { t } = useTranslation('translation');
  const minute = t('minute');
  const hour = t('hour');

  const handleChange = (id: string, key: 'color' | 'duration' | 'isEnabled', value: never) => {
    const updatedSpecialty: Specialty = { ...specialty };
    const index: number = updatedSpecialty.visitReasons.findIndex((item) => item.id === id);

    if (index > -1) {
      updatedSpecialty.visitReasons[index][key] = value;
      updatedSpecialty.visitReasons[index].isEdited = true;
      handleUpdateSpecialty(specialty.id, updatedSpecialty);
    }
  };

  const columns: ColumnsType<VisitReason> = [
    {
      title: t('reason name'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: t('duration'),
      dataIndex: 'duration',
      key: 'duration',
      width: 200,
      render: (text: any, record: VisitReason) => (
        <Select
          prefixIcon={<Icon name="time-line" />}
          placeholder={i18n.t('placeholders:select', { fieldName: t('duration') })}
          dropdownMatchSelectWidth={false}
          size="small"
          style={{ width: '100%' }}
          value={text}
          onChange={(value) => {
            handleChange(record.id, 'duration', value as never);
          }}
        >
          <Option value={15}> 15 {minute}</Option>
          <Option value={20}> 20 {minute}</Option>
          <Option value={25}> 25 {minute}</Option>
          <Option value={30}> 30 {minute}</Option>
          <Option value={35}> 35 {minute}</Option>
          <Option value={40}> 40 {minute}</Option>
          <Option value={45}> 45 {minute}</Option>
          <Option value={50}> 50 {minute}</Option>
          <Option value={55}> 55 {minute}</Option>
          <Option value={60}> 1 {hour}</Option>
        </Select>
      ),
    },
    {
      title: t('color'),
      dataIndex: 'color',
      key: 'color',
      width: 130,
      render: (text: any, record: VisitReason) => (
        <Popover
          content={
            <ColorPalette
              onSelectColor={(color) => handleChange(record.id, 'color', color as never)}
              selectedColor={text}
            />
          }
          trigger="click"
        >
          <Button
            type="default"
            size="small"
            style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
          >
            <Row align="middle" gutter={16} justify="space-between" style={{ width: '100%' }}>
              <Col>
                <div className={`reason-color ${text}`} />
              </Col>
              <Col style={{ padding: 0 }}>
                <Icon name="arrow-down-s-line" />
              </Col>
            </Row>
          </Button>
        </Popover>
      ),
    },
    {
      title: t('activation'),
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      width: 140,
      render: (text: any, record: VisitReason) => (
        <Row gutter={16}>
          <Col>
            <Switch
              onChange={(checked) => {
                handleChange(record.id, 'isEnabled', checked as never);
              }}
              checked={text}
            />
          </Col>
          <Col>
            {text ? (
              <Text style={{ fontWeight: 500 }}>{t('on')}</Text>
            ) : (
              <Text style={{ fontWeight: 500 }} type="secondary">
                {t('off')}
              </Text>
            )}
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={specialty.visitReasons}
      columns={columns}
      bordered
      pagination={false}
    />
  );
};

export default VisitReasonsItem;
