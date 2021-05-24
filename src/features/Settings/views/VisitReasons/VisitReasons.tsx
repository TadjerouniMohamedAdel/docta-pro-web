import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button/Button';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import { fetchSpecialties, saveVisitReasons } from './services';
import VisitReasonsItem from './VisitReasonsItem/VisitReasonsItem';
import { FetchSpecialtyResponse, Specialty } from './types';
import Tab from '../../../../components/Tab/Tab';

type Props = {};

const VisitReasons: React.FC<Props> = () => {
  const { t } = useTranslation('translation');

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabsChange = (value: string) => {
    setActiveKey(value);
  };

  const handleUpdate = (id: string, specialty: Specialty) => {
    const updatedSpecialties: Specialty[] = [...specialties];
    const index: number = updatedSpecialties.findIndex((item) => item.id === id);

    if (index > -1) {
      updatedSpecialties[index] = specialty;
      setSpecialties(updatedSpecialties);
    }
  };

  const getSpecialties = async () => {
    try {
      const { data: result }: { data: FetchSpecialtyResponse[] } = await fetchSpecialties();
      setSpecialties(result.map((item) => ({ ...item, visitReasons: item.reasons })));
      setActiveKey(result[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (id: string) => {
    setLoading(true);
    try {
      const specialty: Specialty | undefined = specialties.find((item) => item.id === id);
      if (specialty) await saveVisitReasons(specialty);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSpecialties();
  }, []);

  return (
    <>
      <div>
        <Row style={{ height: 88, padding: '0 24px' }} align="middle" justify="space-between">
          <Col>
            <Text size="xxl" style={{ fontWeight: 'bold' }}>
              {t('consultation reasons')}
            </Text>
          </Col>
          <Col>
            {specialties.map((specialty) => {
              if (activeKey === specialty.id)
                return (
                  <Button
                    key={specialty.id}
                    type="primary"
                    icon={<Icon name="save-line" />}
                    size="small"
                    onClick={() => handleSaveChanges(specialty.id)}
                    loading={loading}
                  >
                    {t('save')}
                  </Button>
                );
              return null;
            })}
          </Col>
        </Row>
      </div>
      <div style={{ flexGrow: 1 }}>
        {activeKey ? (
          <Tabs
            defaultActiveKey={activeKey}
            activeKey={activeKey}
            tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
            onChange={handleTabsChange}
          >
            {specialties.map((specialty) => (
              <Tabs.TabPane
                tab={
                  <Tab icon={<Icon name="first-aid-kit-line" />}>
                    {specialty.isMain === 0 ? t('main specialty') : t('secondary specialty')}{' '}
                  </Tab>
                }
                // eslint-disable-next-line react/no-array-index-key
                key={specialty.id}
              >
                <VisitReasonsItem specialty={specialty} handleUpdateSpecialty={handleUpdate} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        ) : null}
      </div>
    </>
  );
};

export default VisitReasons;
