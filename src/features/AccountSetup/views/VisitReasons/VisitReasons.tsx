import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const specialty: Specialty | undefined = specialties.find((item) => item.id === id);
      if (specialty) await saveVisitReasonsStep(specialty);
      takeNextStep(specialties.length === 1 ? 2 : 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSpecialties();
  }, []);

  return (
    <>
      {currentStep === 4 ? (
        <SetupLayout
          title={t('Set up visit reasons')}
          description="You are almost there ! Setting up your consultation reasons will help you manage visits better."
          onNext={() => handleSaveChanges(specialties[0].id)}
          header={t('Main Consultation Reasons')}
          loading={loading}
          content={
            <VisitReasonsItem specialty={specialties[0]} handleUpdateSpecialty={handleUpdate} />
          }
        />
      ) : null}
      {specialties.length === 2 && currentStep === 5 ? (
        <SetupLayout
          loading={loading}
          title={t('One more step !')}
          description="Set up your secondary visit reasons and go live now !"
          onNext={() => handleSaveChanges(specialties[1].id)}
          header={t('Secondary Consultation Reasons')}
          content={
            <VisitReasonsItem specialty={specialties[1]} handleUpdateSpecialty={handleUpdate} />
          }
        />
      ) : null}
    </>
  );
};

export default VisitReasons;
