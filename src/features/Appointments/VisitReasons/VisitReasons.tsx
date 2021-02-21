import { Checkbox } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import Text from '../../../components/Text/Text';
import Select from '../../../components/Select/Select';
import { fetchSpecialties } from '../../Settings/VisitReasons/services';

export type Props = {
  visitReasonIds: string[];
  setVisitReasonIds: (visitReasonIds: string[]) => void;
};

const useSpecialtiesList = () => {
  const { data, ...rest } = useQuery('appointment-specialties', () => fetchSpecialties(), {
    keepPreviousData: true,
  });
  return { specialties: data ?? { data: [] }, ...rest };
};

const VisitReasons: React.FC<Props> = ({ visitReasonIds, setVisitReasonIds }) => {
  const { specialties } = useSpecialtiesList();

  const handleChange = (reasonId: string, checked: boolean) => {
    const visitReasonIdsUpdated = [...visitReasonIds];
    if (checked) visitReasonIdsUpdated.push(reasonId);
    else {
      const index = visitReasonIdsUpdated.findIndex((id) => id === reasonId);
      visitReasonIdsUpdated.splice(index, 1);
    }

    setVisitReasonIds(visitReasonIdsUpdated);
  };

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
                      <Checkbox
                        value={reason.id}
                        onChange={(e) => handleChange(reason.id, e.target.checked)}
                      >
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
