import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../../components';
import { fetchSpecialties } from '../../../Settings/views/VisitReasons/services';
import { FetchSpecialtyResponse, Specialty } from '../../../Settings/views/VisitReasons/types';
import VisitReasonsItem from '../../../Settings/views/VisitReasons/VisitReasonsItem/VisitReasonsItem';
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';
import { saveVisitReasonsStep } from '../../services';

type Props = {};

const VisitReasons: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const { currentStep } = useSetupAccountState();
  const { takeNextStep } = useNextStep();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (id: string) => {
    try {
      const specialty: Specialty | undefined = specialties.find((item) => item.id === id);
      if (specialty) await saveVisitReasonsStep(specialty);
      takeNextStep(specialties.length === 1 ? 2 : 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecialties();
  }, []);

  return (
    <>
      {currentStep === 4 ? (
        <SetupLayout
          title={t('Set up your working hours')}
          description="No unexpected visitors at your beach day, you are the lord of time!"
          onNext={() => handleSaveChanges(specialties[0].id)}
          content={
            <div>
              <div style={{ marginBottom: 32 }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold' }}>
                  {t('Main Consultation Reasons')}
                </Text>
              </div>
              <VisitReasonsItem specialty={specialties[0]} handleUpdateSpecialty={handleUpdate} />
            </div>
          }
        />
      ) : null}
      {specialties.length === 2 && currentStep === 5 ? (
        <SetupLayout
          title={t('Set up your working hours')}
          description="No unexpected visitors at your beach day, you are the lord of time!"
          onNext={() => handleSaveChanges(specialties[1].id)}
          content={
            <div>
              <div style={{ marginBottom: 32 }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold' }}>
                  {t('Secondary Consultation Reasons')}
                </Text>
              </div>
              <VisitReasonsItem specialty={specialties[1]} handleUpdateSpecialty={handleUpdate} />
            </div>
          }
        />
      ) : null}
      ;
    </>
  );
};

export default VisitReasons;
