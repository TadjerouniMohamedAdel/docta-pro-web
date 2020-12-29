import React from 'react';
import './styles.less';
import RecordBox from '../RecordBox/RecordBox';
import { MedicalItems, MedicalRecordsForm } from '../../../types';

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
  return (
    <div className="records-list">
      <RecordBox
        title="Chronic Diseases"
        name="chronicIllnesses"
        data={medicalRecordsForm.chronicIllnesses}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
      <RecordBox
        title="Medicines"
        name="medications"
        data={medicalRecordsForm.medications}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
      <RecordBox
        title="Surgeries"
        name="surgeries"
        data={medicalRecordsForm.surgeries}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
      <RecordBox
        title="Allergies"
        name="allergies"
        data={medicalRecordsForm.allergies}
        handleAddNewItem={handleAddNewItem}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default RecordsList;
