import { AutoComplete, Col, Form, Input, Row, Tag } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import Label from '../../../../../components/Label/Label';
import Icon from '../../../../../components/Icon/Icon';
import Text from '../../../../../components/Text/Text';
import { Language } from '../../types';
import i18n from '../../../../../i18n';
import './styles.less';
import { fetchLanguages } from '../../services';

type Props = {
  languages: Language[];
  updateLanguages: (value: Language[]) => void;
};

const Languages: React.FC<Props> = ({ languages, updateLanguages }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Language[]>([]);

  const handleOnSearch = async (term: string) => {
    try {
      const response = await fetchLanguages(term);
      if (response.data) setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSelect = (term: string, option: any) => {
    const updatedLanguages = [...languages];
    updatedLanguages.push({ code: option.key, name: option.children, isNew: true });
    updateLanguages(updatedLanguages);
    setValue('');
  };

  const handleOnChange = (term: string, option: any) => {
    setValue(option.key);
  };

  const onDelete = (code: string) => {
    const updatedLanguages = [...languages];
    const index = updatedLanguages.findIndex((item) => item.code === code);

    if (index > -1) {
      if (updatedLanguages[index].isNew) updatedLanguages.splice(index, 1);
      else updatedLanguages[index].isDeleted = true;
      updateLanguages(updatedLanguages);
    }
  };

  const options = data.map((item) => (
    <AutoComplete.Option
      key={item.code}
      value={item.code}
      disabled={!!languages.find((language) => language.code === item.code)}
    >
      {item.name}
    </AutoComplete.Option>
  ));

  return (
    <Row>
      <Col span={24}>
        <Row justify="space-between" align="bottom">
          <Col>
            <Label title={t('Spoken Languages')} />
          </Col>
          <Col>
            <Button
              type="link"
              style={{ paddingRight: 0, paddingLeft: 0 }}
              onClick={() => setVisible(true)}
            >
              <Icon name="add-line" />
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="middle">
          {languages
            .filter((language) => !language.isDeleted)
            .map((language) => (
              <Col key={language.code}>
                <Tag key={language.code} style={{ display: 'flex', alignItems: 'center' }}>
                  <Text>{language.name}</Text>
                  <Button
                    type="link"
                    className="btn-language-delete"
                    danger
                    size="small"
                    onClick={() => onDelete(language.code)}
                  >
                    <Icon name="close-circle-line" size={16} />
                  </Button>
                </Tag>
              </Col>
            ))}
          {visible ? (
            <Col>
              <Form.Item>
                <AutoComplete
                  allowClear
                  value={value}
                  onSelect={handleOnSelect}
                  onSearch={handleOnSearch}
                  onChange={handleOnChange}
                  style={{ minWidth: 180 }}
                  size="small"
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('language'),
                  })}
                  getInputElement={() => <Input size="small" />}
                >
                  {options}
                </AutoComplete>
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
};

export default Languages;
