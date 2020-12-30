import { LoadingOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from 'react-query';
import Spacer from '../../../../components/Spacer/Spacer';
import Text from '../../../../components/Text/Text';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver';
import { fetchBlockedPatients } from '../../services';

type Props = {};

const usePatientsList = (term: string) => {
  const { data, ...rest } = useInfiniteQuery(
    'blocked-patients',
    async ({ pageParam = 0 }) => {
      const res = await fetchBlockedPatients(term, pageParam);
      return { ...res, patients: res.data };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor < lastPage.total ? lastPage.nextCursor : undefined,
    },
  );
  return { data: data && data.pages ? data : ({ pages: [] } as any), ...rest };
};

const BlockedPatients: React.FC<Props> = () => {
  const { t } = useTranslation('translation');

  const [term, setTerm] = useState<string>('');
  const {
    data,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
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

  useEffect(() => {
    refetch();
  }, [term]);

  return (
    <div style={{ padding: '12px 0' }}>
      <Spacer size="xl" direction="vertical">
        <div style={{ padding: '0 12px' }}>
          <Input
            size="small"
            placeholder={t('search patients')}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="patients-list">
          {data.pages.map((page: any) => (
            <>
              {page.patients.map((patient: any) => (
                <div key={patient.id} className="patient-box">
                  <Row justify="space-between" gutter={12} style={{ padding: '12px' }}>
                    <Col>
                      <Row gutter={12} align="middle">
                        <Col>
                          <Avatar src={patient.picture} size="large" />
                        </Col>
                        <Col>
                          <Spacer size="xss" direction="vertical">
                            <Text style={{ fontWeight: 'bold' }}>
                              {patient.firstName} {patient.lastName}
                            </Text>
                            <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                              {patient.city ?? '-'} - {patient.state ?? '-'}
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
        </div>
        <div ref={loadMoreButtonRef} style={{ textAlign: 'center' }}>
          {isLoading || isFetchingNextPage ? <LoadingOutlined /> : null}
        </div>
      </Spacer>
    </div>
  );
};

export default BlockedPatients;
