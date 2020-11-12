import { Checkbox } from 'antd';
import React from 'react';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import Select from '../../../../components/Select/Select';

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
      suffixIcon={<Icon name="arrow-down-s" />}
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
