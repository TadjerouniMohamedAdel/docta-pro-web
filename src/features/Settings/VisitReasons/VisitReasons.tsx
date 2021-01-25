import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import { fetchSpecialties } from './services';
import VisitReasonsItem from './VisitReasonsItem/VisitReasonsItem';
import { Specialty } from './types';
import Tab from '../../../components/Tab/Tab';

type Props = {};

const VisitReasons: React.FC<Props> = () => {
  const { t } = useTranslation('translation');

  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // const getVisitReasons = async (id: string) => {
  //   try {
  //     const response = await fetchVisitReasons(id);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdate = (id: string, specialty: Specialty) => {
    const updatedSpecialties: Specialty[] = [...specialties];
    const index: number = updatedSpecialties.findIndex((item) => item.id === id);

    if (index > -1) {
      updatedSpecialties[index] = specialty;
      setSpecialties(updatedSpecialties);
    }
    console.log(id, specialty);
  };

  const getSpecialties = async () => {
    try {
      const { data: result }: any = await fetchSpecialties();
      // const { data: visitReasons }: { data: VisitReason[] } = await fetchVisitReasons(
      //   result[0].specialty.id,
      // );

      result[0].visitReasons = [
        { id: 'zzz', title: 'Eye Makeup After Lasik', duration: 15, isEnabled: true, color: 'red' },
      ];

      console.log(result);

      setSpecialties(result);
    } catch (error) {
      console.log(error);
    }
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
            <Button
              type="primary"
              icon={<Icon name="save-line" />}
              size="small"
              // onClick={handleAddUser}
            >
              {t('save')}
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
          //   onChange={handleTabsChange}
        >
          {specialties.map((specialty) => (
            <Tabs.TabPane
              tab={<Tab icon={<Icon name="first-aid-kit-line" />}> {t('main specialty')} </Tab>}
              // eslint-disable-next-line react/no-array-index-key
              key={specialty.id}
            >
              <VisitReasonsItem specialty={specialty} handleUpdateSpecialty={handleUpdate} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default VisitReasons;
