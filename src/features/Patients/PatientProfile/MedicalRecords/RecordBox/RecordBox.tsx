import React, { useState } from 'react';
import { Input } from 'antd';
import Button from '../../../../../components/Button/Button';
import Text from '../../../../../components/Text/Text';
import Icon from '../../../../../components/Icon/Icon';
import RecordItem from '../RecordItem/RecordItem';
import './styles.less';

type Props = {
  data: string[];
  title: string;
};

const RecordBox: React.FC<Props> = ({ data, title }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleAddNewValue = () => {
    alert(value);
    setFocused(false);
    setValue('');
  };

  return (
    <div className="Record-box">
      <div className="record-header">
        <Text>{title}</Text>
      </div>
      <div className="record-body">
        <div style={{ marginBottom: 10, width: '100%' }}>
          {focused ? (
            <Input
              autoFocus
              size="small"
              name="value"
              value={value}
              placeholder=""
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setFocused(false)}
              onPressEnter={handleAddNewValue}
              style={{ width: '100%' }}
            />
          ) : (
            <Button
              type="ghost"
              size="small"
              block
              icon={<Icon name="add-circle-fill" size={18} />}
              className="btn-record"
              onClick={() => setFocused(true)}
            >
              Add new
            </Button>
          )}
        </div>
        {data.map((item) => (
          <RecordItem>{item}</RecordItem>
        ))}
      </div>
    </div>
  );
};

export default RecordBox;
