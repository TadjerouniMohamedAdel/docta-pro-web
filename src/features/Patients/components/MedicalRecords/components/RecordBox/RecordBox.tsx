import React from 'react';
import Button from '../../../../../../components/Button/Button';
import Text from '../../../../../../components/Text/Text';
import Icon from '../../../../../../components/Icon/Icon';
import RecordItem from '../RecordItem/RecordItem';

type Props = {
  data: string[];
  title: string;
};

const RecordBox: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="Record-box">
      <div className="record-header">
        <Text>{title}</Text>
      </div>
      <div className="record-body">
        <Button
          type="ghost"
          size="small"
          block
          icon={<Icon name="add-circle" type="fill" />}
          className="btn-record"
        >
          Add new
        </Button>
        {data.map((item) => (
          <RecordItem>{item}</RecordItem>
        ))}
      </div>
    </div>
  );
};

export default RecordBox;
