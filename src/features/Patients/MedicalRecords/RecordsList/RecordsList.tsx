import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.less';
import RecordBox from '../RecordBox/RecordBox';
import { MedicalItems, MedicalRecordsForm } from '../../types';

type Props = {
  medicalRecordsForm: MedicalRecordsForm;
  handleAddNewItem: (name: MedicalItems, values: string) => void;
  handleDeleteItem: (name: MedicalItems, index: number) => void;
};

const RecordsList: React.FC<Props> = ({
  medicalRecordsForm,
  handleAddNewItem,
  handleDeleteItem,
}) => {
  const { t } = useTranslation('translation');

  return (
    <div className="records-list">
      <RecordBox
        title={t('chronic diseases')}
        name="chronicIllnesses"
        data={medicalRecordsForm.chronicIllnesses}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
      <RecordBox
        title={t('medications')}
        name="medications"
        data={medicalRecordsForm.medications}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
      <RecordBox
        title={t('surgeries')}
        name="surgeries"
        data={medicalRecordsForm.surgeries}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
      <RecordBox
        title={t('allergies')}
        name="allergies"
        data={medicalRecordsForm.allergies}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default RecordsList;
