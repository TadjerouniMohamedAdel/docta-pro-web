import { Col, Row } from 'antd';
import React from 'react';
import { Text } from '../../../../../components';
import { PatientNote } from '../../../types';

type Props = {
  notes: PatientNote[];
};

const PatientNotesList: React.FC<Props> = ({ notes }) => {
  return (
    <>
      {notes?.map((note) => (
        <div className="note-item">
          <Row align="top">
            <Col flex={1}>
              <div>
                <Text size="lg" style={{ fontWeight: 500 }}>
                  {note.title}
                </Text>
              </div>
              <div>
                <Text>{note.body}</Text>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

export default PatientNotesList;
