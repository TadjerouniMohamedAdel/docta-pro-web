/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Diploma } from '../../../types';
import DiplomasItem from './DiplomasItem/DiplomasItem';

type Props = {
  diplomas: Diploma[];
  updateDiplomas: (values: Diploma[]) => void;
};

const DiplomasList: React.FC<Props> = ({ diplomas, updateDiplomas }) => {
  const handleUpdateDiploma = (index: number, diploma: Diploma) => {
    const updatedDiplomas = [...diplomas];
    updatedDiplomas[index] = { ...diploma, isEdited: true };
    updateDiplomas(updatedDiplomas);
  };

  const handleDeleteDiploma = (index: number) => {
    const updatedDiplomas = [...diplomas];
    updatedDiplomas[index].isDeleted = true;
    updateDiplomas(updatedDiplomas);
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
            index={index}
          />
        ))}
    </>
  );
};

export default DiplomasList;
