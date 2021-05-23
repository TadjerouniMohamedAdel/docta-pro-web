import { Checkbox } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text/Text';
import Select from '../../../../components/Select/Select';
import { fetchSpecialties } from '../../../Settings/views/VisitReasons/services';
import { useFieldByLocal } from '../../../../common/hooks/useFieldByLocal';

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
  const { t } = useTranslation('translation');
  const { specialties } = useSpecialtiesList();
  const { getFieldNameByLocal } = useFieldByLocal();

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
      placeholder={
        <Text size="sm" type="secondary" style={{ textTransform: 'uppercase' }}>
          {t('visit reasons')}
        </Text>
      }
      dropdownMatchSelectWidth={false}
      dropdownRender={() => (
        <div style={{ padding: 10 }}>
          {specialties
            ? specialties.data.map((specialty) => (
                <div key={specialty.id}>
                  <Text>{(specialty as any)[getFieldNameByLocal()]}</Text>
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
                        <Text>{(reason as any)[getFieldNameByLocal()]}</Text>
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
