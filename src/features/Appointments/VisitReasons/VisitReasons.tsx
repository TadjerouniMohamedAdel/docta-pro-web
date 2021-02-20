import { Checkbox } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import Text from '../../../components/Text/Text';
import Select from '../../../components/Select/Select';
import { fetchSpecialties } from '../../Settings/VisitReasons/services';

export type Props = {};

const useSpecialtiesList = () => {
  const { data, ...rest } = useQuery('appointment-specialties', () => fetchSpecialties(), {
    keepPreviousData: true,
  });
  return { specialties: data ?? { data: [] }, ...rest };
};

const VisitReasons: React.FC<Props> = () => {
  const { specialties } = useSpecialtiesList();

  return (
    <Select
      size="small"
      placeholder="VISIT REASONS"
      dropdownMatchSelectWidth={false}
      dropdownRender={() => (
        <div style={{ padding: 10 }}>
          {specialties
            ? specialties.data.map((specialty) => (
                <div key={specialty.id}>
                  <Text>{specialty.name}</Text>
                  {specialty.reasons.map((reason) => (
                    <div
                      key={reason.id}
                      style={{ padding: '12px 10px' }}
                      className={`reason-checkbox ${reason.color}`}
                    >
                      <Checkbox value={reason.id}>
                        <Text>{reason.name}</Text>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              ))
            : null}
        </div>
      )}
    />
  );
};

export default VisitReasons;
