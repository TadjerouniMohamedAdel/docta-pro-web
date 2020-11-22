import { AutoComplete, Col, Divider, Input, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import Spacer from '../../../../components/Spacer/Spacer';
import Text from '../../../../components/Text/Text';

type Props = {};

const AllPatients: React.FC<Props> = () => {
  const data = [
    {
      id: 1,
      firstName: 'Mohamed',
      lastName: 'Chiller',
      phone: '+213777859632',
      address: '1962 Icnoj Trail',
      picture: '',
    },
    {
      id: 2,
      firstName: 'Mohamed',
      lastName: 'Azouaoui',
      phone: '+213777859632',
      address: '1962 Icnoj Trail',
      picture: '',
    },
  ];

  return (
    <div style={{ padding: '12px 0' }}>
      <Spacer size="xl" direction="vertical">
        <div style={{ padding: '0 12px' }}>
          <AutoComplete allowClear style={{ width: '100%' }}>
            <Input size="small" placeholder="Search patients" />
          </AutoComplete>
        </div>
        <div>
          {data.map((patient, index) => (
            <div key={patient.id}>
              <Row justify="space-between" gutter={12} style={{ padding: '12px' }}>
                <Col>
                  <Row gutter={12} align="middle">
                    <Col>
                      <Avatar src={patient.picture} size="large" />
                    </Col>
                    <Col>
                      <Spacer size="xss" direction="vertical">
                        <Text style={{ fontWeight: 'bold' }}>
                          {patient.firstName} {patient.lastName}
                        </Text>
                        <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                          {patient.address}
                        </Text>
                      </Spacer>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                    {patient.phone}
                  </Text>
                </Col>
              </Row>
              {index < data.length - 1 ? <Divider style={{ margin: 0 }} /> : null}
            </div>
          ))}
        </div>
      </Spacer>
    </div>
  );
};

export default AllPatients;
