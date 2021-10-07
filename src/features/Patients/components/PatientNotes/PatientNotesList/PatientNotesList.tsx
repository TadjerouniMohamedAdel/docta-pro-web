import React from 'react';
import { PatientNote } from '../../../types';
import PatientNoteItem from '../PatientNoteItem/PatientNoteItem';

type Props = {
  notes: PatientNote[];
};

const PatientNotesList: React.FC<Props> = ({ notes }) => {
  return (
    <>
      {notes?.map((note) => (
        <PatientNoteItem note={note} key={note.id} />
      ))}
    </>
  );
};

export default PatientNotesList;
