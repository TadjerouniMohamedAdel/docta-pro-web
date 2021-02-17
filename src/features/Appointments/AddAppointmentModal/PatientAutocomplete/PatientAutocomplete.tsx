import { AutoComplete, Avatar, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Icon from '../../../../components/Icon/Icon';
import Text from '../../../../components/Text/Text';
import { fetchAllPatients, fetchPatientDetails } from '../../../Patients/services';
import { Patient } from '../../types';

type Props = {
  selectedPatient: Patient;
  onSelectPatient: (value: Patient) => void;
};

const useSearchPatients = (term: string) => {
  const { data, ...rest } = useQuery('searched-patients', () => fetchAllPatients(term, 0, 5), {
    keepPreviousData: true,
  });
  return { patients: data ?? [], ...rest };
};

const PatientAutocomplete: React.FC<Props> = ({ onSelectPatient }) => {
  const { t } = useTranslation('translation');

  const [value, setValue] = useState('');

  const { patients, refetch } = useSearchPatients(value);

  const handleOnChange = (term: string) => {
    setValue(term);
  };

  const handleOnSelect = async (term: string, option: any) => {
    setValue(value);
    try {
      const { data } = await fetchPatientDetails(option.value, 'personal-info');

      onSelectPatient({
        id: option.value,
        birthDate: data.birthDate,
        city: data.city,
        firstName: data.firstName,
        gender: data.gender,
        generalStatus: data.generalStatus,
        lastName: data.lastName,
        state: data.state,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [value]);

  const options = patients.data
    ? patients.data.map((patient: any) => ({
        label: (
          <Row gutter={12} align="middle">
            <Col>
              <Avatar src={patient.picture} size="large" />
            </Col>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>
                {patient.firstName} {patient.lastName}
              </Text>
              <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                {patient.city ?? '-'} - {patient.state ?? '-'}
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
      //   onSearch={handleOnSearch}
      onChange={handleOnChange}
      options={options}
    >
      <Input
        size="middle"
        placeholder={t('Search and select patient')}
        prefix={<Icon name="search-2-line" />}
      />
    </AutoComplete>
  );
};

export default PatientAutocomplete;
