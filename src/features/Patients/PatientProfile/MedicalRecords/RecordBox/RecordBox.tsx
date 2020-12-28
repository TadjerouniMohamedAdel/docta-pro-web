import React, { useState } from 'react';
import { Input } from 'antd';
import Button from '../../../../../components/Button/Button';
import Text from '../../../../../components/Text/Text';
import Icon from '../../../../../components/Icon/Icon';
import RecordItem from '../RecordItem/RecordItem';
import './styles.less';
import { MedicalLists } from '../../../types';

type Props = {
  data: MedicalLists[];
  title: string;
  name: string;
  handleFormChange: (values: any) => void;
};

const RecordBox: React.FC<Props> = ({ data, title, name, handleFormChange }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleAddNewValue = () => {
    setFocused(false);
    const dataToUpdate = [...data];
    dataToUpdate.push({ name: value });
    handleFormChange({ key: name, value: dataToUpdate });
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
          <RecordItem key={item.id}>{item.name}</RecordItem>
        ))}
      </div>
    </div>
  );
};

export default RecordBox;
