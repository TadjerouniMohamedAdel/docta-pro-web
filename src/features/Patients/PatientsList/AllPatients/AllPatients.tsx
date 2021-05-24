import { Col, Input, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Spacer from '../../../../components/Spacer/Spacer';
import Text from '../../../../components/Text/Text';
import useIntersectionObserver from '../../../../common/hooks/useIntersectionObserver';
import { SelectedPatient } from '../../types';
import { usePatientsList } from '../../hooks';

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
                <div
                  key={patient.id}
                  className={classNames('patient-box', {
                    selected: patient.id === selectedPatient?.id,
                  })}
                  onClick={() => handleGetPatientDetails(patient)}
                  onKeyPress={() => handleGetPatientDetails(patient)}
                  role="button"
                  tabIndex={0}
                >
                  <Row justify="space-between" gutter={12} style={{ padding: '12px' }}>
                    <Col>
                      <Row gutter={12} align="middle">
                        <Col>
                          {patient.picture ? (
                            <Avatar src={patient.picture} size="large" />
                          ) : (
                            <Avatar src={patient.picture} size="large">
                              {patient.firstName[0].toUpperCase()}
                              {patient.lastName[0].toUpperCase()}
                            </Avatar>
                          )}
                        </Col>
                        <Col>
                          <Spacer size="xss" direction="vertical">
                            <Text style={{ fontWeight: 'bold' }}>
                              {patient.firstName} {patient.lastName}
                            </Text>
                            <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                              {patient.city?.name ?? '-'} - {patient.state?.name ?? '-'}
                            </Text>
                          </Spacer>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                        {patient.user.phone}
                      </Text>
                    </Col>
                  </Row>
                </div>
              ))}
            </>
          ))}
          <div ref={loadMoreButtonRef} style={{ textAlign: 'center', height: 35, marginTop: 16 }}>
            {isLoading || isFetchingNextPage ? <span>loading...</span> : null}
            {!hasNextPage && !isLoading ? <span style={{ opacity: 0.5 }}>No more data</span> : null}
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default AllPatients;
