import { AutoComplete, Col, Divider, Input, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Icon, Text } from '../../../../../../components';
import { fetchMedications } from '../../../../services';
import greenImage from '../../../../../../assets/img/remboursement.png';
import redImage from '../../../../../../assets/img/no_remboursement.png';

type Medication = {
  DENOMINATION_COMMUNE_INTERNATIONALE: string;
  FORME: string;
  LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: string;
  NOM_DE_MARQUE: string;
  REMBOURSEMENT: 'OUI' | 'NO' | null;
};

type Props = {
  selectedMedication: string;
  onSelectMedication: (medicationName: string) => void;
};

const useSearchMedications = (term: string) => {
  const { data, ...rest } = useQuery(['medications', term], () => fetchMedications(term, 0, 5), {
    keepPreviousData: true,
  });
  return { medications: data ?? [], ...rest };
};

const MedicationAutocomplete: React.FC<Props> = ({ selectedMedication, onSelectMedication }) => {
  const { t } = useTranslation('translation');

  const [value, setValue] = useState('');

  const { medications } = useSearchMedications(value);

  const handleOnChange = (term: string) => {
    if (!term) onSelectMedication('');
    setValue(term);
  };

  const handleOnSelect = async (term: string, option: any) => {
    onSelectMedication(option.value);
  };

  useEffect(() => {
    setValue(selectedMedication);
  }, [selectedMedication]);

  const options = medications.data
    ? medications.data.map((medication: Medication) => ({
        label: (
          <>
            <Row align="middle" gutter={[4, 8]}>
              <Col>
                <Text strong>{medication.NOM_DE_MARQUE}</Text>
              </Col>
              <Col>
                <img src={medication.REMBOURSEMENT === 'OUI' ? greenImage : redImage} alt="" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text type="secondary">{`CDI : ${medication.DENOMINATION_COMMUNE_INTERNATIONALE}`}</Text>
              </Col>
              <Col span={24}>
                <Text type="secondary">{`FORME : ${medication.FORME}`}</Text>
              </Col>
              <Col span={24}>
                <Text type="secondary">{`LAB : ${medication.LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT}`}</Text>
              </Col>
            </Row>
            <Divider style={{ margin: '4px 0' }} />
          </>
        ),
        value: medication.NOM_DE_MARQUE,
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
      dropdownStyle={{
        margin: 0,
        padding: 0,
      }}
    >
      <Input
        size="middle"
        placeholder={t('search and select patient')}
        prefix={<Icon name="search-2-line" />}
      />
    </AutoComplete>
  );
};

export default MedicationAutocomplete;
