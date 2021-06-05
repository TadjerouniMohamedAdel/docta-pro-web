import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Text } from '../../../../components';
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
  const [workingHoursSchedule, setWorkingHoursSchedule] = useState<WorkingHoursSchedule[]>([]);

  const handleUpdateWorkingHours = (values: WorkingHoursSchedule[]) => {
    setWorkingHoursSchedule(values);
  };

  const { mutate: saveWorkingHoursMutation, isLoading: isSaveWorkingHoursLoading } = useMutation(
    saveAvailability,
  );

  const handleSaveWorkingHours = async () => {
    await saveWorkingHoursMutation(workingHoursSchedule);
    takeNextStep();
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
      title={t('Set up your working hours')}
      description="No unexpected visitors at your beach day, you are the lord of time!"
      onNext={handleSaveWorkingHours}
      loading={isSaveWorkingHoursLoading}
      content={
        <div>
          <div style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{t('availability')}</Text>
          </div>
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
