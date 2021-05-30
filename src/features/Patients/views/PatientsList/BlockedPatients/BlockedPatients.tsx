import { Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useIntersectionObserver from '../../../../../common/hooks/useIntersectionObserver';
import { SelectedPatient } from '../../../types';
import { useBlockedPatients } from '../../../hooks/useBlockedPatients';
import PatientItem from '../PatientItem/PatientItem';

type Props = {
  selectedPatient?: SelectedPatient;
  setSelectedPatient: (values: SelectedPatient) => void;
};

const BlockedPatients: React.FC<Props> = ({ selectedPatient, setSelectedPatient }) => {
  const { t } = useTranslation('translation');

  const [term, setTerm] = useState<string>('');
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } = useBlockedPatients(
    term,
  );
  const loadMoreButtonRef = React.useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const handleSearchChange = (value: string) => {
    setTerm(value);
  };

  const handleGetPatientDetails = (values: SelectedPatient): void => {
    setSelectedPatient({ ...values, blocked: true });
  };

  return (
    <div style={{ padding: '12px 0' }} className="patients-list">
      <div style={{ padding: '0 12px', marginBottom: 24 }}>
        <Input
          size="small"
          placeholder={t('search patients')}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="patient-list-wrapper">
        {data.pages.map((page: any) => (
          <>
            {page.patients.map((patient: SelectedPatient) => (
              <PatientItem
                patient={patient}
                selectedPatient={selectedPatient}
                handleGetPatientDetails={handleGetPatientDetails}
              />
            ))}
          </>
        ))}
      </div>
      <div ref={loadMoreButtonRef} style={{ textAlign: 'center', height: 35, marginTop: 16 }}>
        {isLoading || isFetchingNextPage ? <span>{t('loading')}</span> : null}
        {!hasNextPage && !isLoading ? (
          <span style={{ opacity: 0.5 }}>{t('no more data')}</span>
        ) : null}
      </div>
    </div>
  );
};

export default BlockedPatients;
