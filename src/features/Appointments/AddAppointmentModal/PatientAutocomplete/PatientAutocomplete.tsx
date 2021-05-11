import { AutoComplete, Avatar, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Icon from '../../../../components/Icon/Icon';
import Text from '../../../../components/Text/Text';
import { fetchAllPatients } from '../../../Patients/services';

type Props = {
  onSelectPatient: (patientId: string) => void;
};

const useSearchPatients = (term: string) => {
  const { data, ...rest } = useQuery(
    ['searched-patients', term],
    () => fetchAllPatients(term, 0, 5),
    {
      keepPreviousData: true,
    },
  );
  return { patients: data ?? [], ...rest };
};

const PatientAutocomplete: React.FC<Props> = ({ onSelectPatient }) => {
  const { t } = useTranslation('translation');

  const [value, setValue] = useState('');

  const { patients } = useSearchPatients(value);

  const handleOnChange = (term: string) => {
    setValue(term);
  };

  const handleOnSelect = async (term: string, option: any) => {
    setValue(value);
    onSelectPatient(option.value);
  };

  const options = patients.data
    ? patients.data.map((patient: any) => ({
        label: (
          <Row gutter={12} align="middle">
            <Col>
              {patient?.picture ? (
                <Avatar src={patient?.picture} size="large" />
              ) : (
                <Avatar src={patient?.picture} size="large">
                  {patient?.firstName[0].toUpperCase()}
                  {patient?.lastName[0].toUpperCase()}
                </Avatar>
              )}
            </Col>
            <Col>
              <div>
                <Text style={{ fontWeight: 'bold' }}>
                  {patient.firstName} {patient.lastName}
                </Text>
              </div>
              <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                {patient.state?.name ?? '-'} - {patient.city?.name ?? '-'}
              </Text>
            </Col>
          </Row>
        ),
        value: patient.id,
      }))
    : [];

  return (
    <AutoComplete
      allowClear
      style={{ width: '100%' }}
      value={value}
      onSelect={handleOnSelect}
      onChange={handleOnChange}
      options={options}
    >
      <Input
        size="middle"
        placeholder={t('search and select patient')}
        prefix={<Icon name="search-2-line" />}
      />
    </AutoComplete>
  );
};

export default PatientAutocomplete;
