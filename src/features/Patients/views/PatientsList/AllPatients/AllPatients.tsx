import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useTranslation } from 'react-i18next';
import useIntersectionObserver from '../../../../../common/hooks/useIntersectionObserver';
import { SelectedPatient } from '../../../types';
import { usePatientsList } from '../../../hooks';
import PatientItem from '../PatientItem/PatientItem';

type Props = {
  handleSetPatientCount: (value: number) => void;
  selectedPatient?: SelectedPatient;
  setSelectedPatient: (values: SelectedPatient) => void;
};

const AllPatients: React.FC<Props> = ({
  handleSetPatientCount,
  selectedPatient,
  setSelectedPatient,
}) => {
  const { t } = useTranslation('translation');

  const [term, setTerm] = useState<string>('');

  const {
    data,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    total,
  } = usePatientsList(term);

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
    setSelectedPatient(values);
  };

  useEffect(() => {
    handleSetPatientCount(total);
  }, [total]);

  return (
    <div style={{ padding: '12px 0' }} className="patients-list">
      <div style={{ padding: '0 12px', marginBottom: 24 }}>
        <Input
          size="small"
          placeholder={t('search patients')}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <SimpleBar style={{ maxHeight: 'calc(100% - 52px)' }}>
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
          <div ref={loadMoreButtonRef} style={{ textAlign: 'center', height: 35, marginTop: 16 }}>
            {isLoading || isFetchingNextPage ? <span>{t('loading')}</span> : null}
            {!hasNextPage && !isLoading ? (
              <span style={{ opacity: 0.5 }}>{t('no more data')}</span>
            ) : null}
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default AllPatients;
