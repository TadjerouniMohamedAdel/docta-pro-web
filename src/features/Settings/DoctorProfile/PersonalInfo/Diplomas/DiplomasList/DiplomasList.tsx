/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Diploma } from '../../../types';
import DiplomasItem from './DiplomasItem/DiplomasItem';

type Props = {
  diplomas: Diploma[];
  updateDiplomas: (values: Diploma[]) => void;
};

const DiplomasList: React.FC<Props> = ({ diplomas, updateDiplomas }) => {
  const handleUpdateDiploma = (diploma: Diploma) => {
    const updatedDiplomas = [...diplomas];
    const index = updatedDiplomas.findIndex((item) => item.id === diploma.id);

    if (index > -1) {
      if (!updatedDiplomas[index].isNew) updatedDiplomas[index] = { ...diploma, isEdited: true };
      updateDiplomas(updatedDiplomas);
    }
  };

  const handleDeleteDiploma = (id: string) => {
    const updatedDiplomas = [...diplomas];

    const index = updatedDiplomas.findIndex((item) => item.id === id);

    if (index > -1) {
      if (updatedDiplomas[index].isNew) updatedDiplomas.splice(index, 1);
      else updatedDiplomas[index].isDeleted = true;
      updateDiplomas(updatedDiplomas);
    }
  };

  return (
    <>
      {diplomas
        .filter((diploma) => !diploma.isDeleted)
        .map((diploma, index) => (
          <DiplomasItem
            key={index}
            diploma={diploma}
            handleUpdateDiploma={handleUpdateDiploma}
            handleDeleteDiploma={handleDeleteDiploma}
          />
        ))}
    </>
  );
};

export default DiplomasList;
