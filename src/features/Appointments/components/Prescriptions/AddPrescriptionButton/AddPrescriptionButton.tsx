import React from 'react';
import { Button, Icon, Text } from '../../../../../components';

type Props = { title: string; onClick: () => void };

const AddPrescriptionButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <Button className="add-prescription-button" type="text" onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="file-3-line" />
        <Text>{title}</Text>
      </div>
      <Icon name="add-circle-fill" />
    </Button>
  );
};

export default AddPrescriptionButton;
