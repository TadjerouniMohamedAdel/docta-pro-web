import React from 'react';
import './styles.less';
import RecordBox from '../RecordBox/RecordBox';
import { MedicalRecordsForm } from '../../../types';

type Props = {
  handleFormChange: (values: any) => void;
  medicalRecordsForm: MedicalRecordsForm;
};

const RecordsList: React.FC<Props> = ({ handleFormChange, medicalRecordsForm }) => {
  return (
    <div className="records-list">
      <RecordBox
        title="Chronic Diseases"
        name="chronicIllnesses"
        data={medicalRecordsForm.chronicIllnesses}
        handleFormChange={handleFormChange}
      />
      <RecordBox
        title="Medicines"
        name="medications"
        data={medicalRecordsForm.medications}
        handleFormChange={handleFormChange}
      />
      <RecordBox
        title="Surgeries"
        name="surgeries"
        data={medicalRecordsForm.surgeries}
        handleFormChange={handleFormChange}
      />
      <RecordBox
        title="Allergies"
        name="allergies"
        data={medicalRecordsForm.allergies}
        handleFormChange={handleFormChange}
      />
    </div>
  );
};

export default RecordsList;
