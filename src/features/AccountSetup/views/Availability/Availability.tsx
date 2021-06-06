import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { WorkingHours } from '../../../Settings/views/Schedule';
import { fetchWorkingHours } from '../../../Settings/views/Schedule/services';
import { WorkingHoursSchedule } from '../../../Settings/views/Schedule/types';
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';
import { saveAvailability } from '../../services';

type Props = {};

const Availability: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);
  const { currentStep } = useSetupAccountState();
  const { takeNextStep } = useNextStep();
  const [loading, setLoading] = useState(false);
  const [workingHoursSchedule, setWorkingHoursSchedule] = useState<WorkingHoursSchedule[]>([]);

  const handleUpdateWorkingHours = (values: WorkingHoursSchedule[]) => {
    setWorkingHoursSchedule(values);
  };

  const { mutateAsync: saveWorkingHoursMutation } = useMutation(saveAvailability);

  const handleSaveWorkingHours = async () => {
    setLoading(true);
    await saveWorkingHoursMutation(workingHoursSchedule);
    await takeNextStep();
    setLoading(false);
  };

  const getWorkingHours = async () => {
    try {
      const { data }: { data: WorkingHoursSchedule[] } = await fetchWorkingHours();
      setWorkingHoursSchedule(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkingHours();
  }, []);

  return currentStep === 3 ? (
    <SetupLayout
      title={t('account setup step 4 title')}
      description={t('account setup step 4 description')}
      header={t('availability')}
      onNext={handleSaveWorkingHours}
      loading={loading}
      content={
        <div style={{ padding: '0 80px' }}>
          <WorkingHours
            workingHoursSchedule={workingHoursSchedule}
            handleUpdateData={handleUpdateWorkingHours}
            spacing="0"
          />
        </div>
      }
    />
  ) : null;
};

export default Availability;
