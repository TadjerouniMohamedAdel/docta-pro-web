import React, { useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Text, Icon } from '../../../../../components';
import RecordItem from '../RecordItem/RecordItem';
import './styles.less';
import { MedicalItems, MedicalLists } from '../../../types';

type Props = {
  data: MedicalLists[];
  title: string;
  name: MedicalItems;
  handleAddNewItem: (name: MedicalItems, values: string) => void;
  handleDeleteItem: (name: MedicalItems, index: number) => void;
};

const RecordBox: React.FC<Props> = ({ data, title, name, handleAddNewItem, handleDeleteItem }) => {
  const { t } = useTranslation('translation');

  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleAddValue = () => {
    setFocused(false);
    handleAddNewItem(name, value);
    setValue('');
  };

  const handleDeleteValue = (index: number) => {
    setFocused(false);
    handleDeleteItem(name, index);
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
              onPressEnter={handleAddValue}
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
              style={{ justifyContent: 'start' }}
            >
              {t('add new')}
            </Button>
          )}
        </div>
        {data.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RecordItem key={index} onDelete={() => handleDeleteValue(index)}>
            {item.name}
          </RecordItem>
        ))}
      </div>
    </div>
  );
};

export default RecordBox;
