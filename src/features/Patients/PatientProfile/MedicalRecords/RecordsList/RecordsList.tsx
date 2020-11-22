import React from 'react';
import './styles.less';
import RecordBox from '../RecordBox/RecordBox';

type Props = {};

const RecordsList: React.FC<Props> = () => {
  const data = ['List Option 1', 'List Option 2', 'List Option 3', 'List Option 4'];
  return (
    <div className="records-list">
      <RecordBox title="Chronic Diseases" data={data} />
      <RecordBox title="Medicines" data={data} />
      <RecordBox title="Surgeries" data={data} />
      <RecordBox title="Allergies" data={data} />
    </div>
  );
};

export default RecordsList;
