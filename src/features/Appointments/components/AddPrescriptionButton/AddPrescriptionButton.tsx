import React from 'react';
import { Button, Icon, Text } from '../../../../components';

type Props = { title: string };

const AddPrescriptionButton: React.FC<Props> = ({ title }) => {
  return (
    <Button className="new-prescription" type="text">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Icon name="file-3-line" />
        <Text>{title}</Text>
      </div>
      <Icon name="add-circle-fill" />
    </Button>
  );
};

export default AddPrescriptionButton;
