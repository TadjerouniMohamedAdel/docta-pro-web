import { AutoComplete, Col, Divider, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Icon, Text } from '../../../../../components';
import { fetchMedications } from '../../../services';
import greenImage from '../../../../../assets/img/remboursement.png';
import redImage from '../../../../../assets/img/no_remboursement.png';

const useSearchMedications = (term: string) => {
  const { data, ...rest } = useQuery(['medications', term], () => fetchMedications(term, 0, 5), {
    keepPreviousData: true,
  });
  return { medications: data ?? [], ...rest };
};

type Medication = {
  id: string;
  DENOMINATION_COMMUNE_INTERNATIONALE: string;
  FORME: string;
  LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT: string;
  NOM_DE_MARQUE: string;
  REMBOURSEMENT: 'OUI' | 'NO' | null;
};

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const MedicationAutocomplete: React.FC<Props> = ({ value, setValue }) => {
  const { t } = useTranslation('translation');

  const { medications } = useSearchMedications(value);

  const handleChange = (newValue: string) => {
    setValue(newValue ?? '');
  };

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
        key: medication.id,
      }))
    : [];

  return (
    <AutoComplete
      allowClear
      style={{ width: '100%' }}
      value={value}
      onChange={handleChange}
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
