import { Checkbox, Select } from 'antd';
import React from 'react';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';

export type Props = {};

const VisitReasons: React.FC<Props> = () => {
  const visitReasons = [
    {
      id: 1,
      name: 'Dental Consultation',
    },
    {
      id: 2,
      name: 'Dental Follow Up',
    },
    {
      id: 3,
      name: 'Filling',
    },
  ];

  return (
    <Select
      size="small"
      placeholder="VISIT REASONS"
      style={{ paddingLeft: 10 }}
      suffixIcon={<Icon name="arrow-down-s" style={{ marginTop: '-5px' }} />}
      dropdownMatchSelectWidth={false}
      dropdownRender={() => (
        <div>
          {visitReasons.map((visitReason) => (
            <div key={visitReason.id} style={{ padding: '12px 10px' }}>
              <Checkbox value={visitReason.id}>
                <Text>{visitReason.name}</Text>
              </Checkbox>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default VisitReasons;
