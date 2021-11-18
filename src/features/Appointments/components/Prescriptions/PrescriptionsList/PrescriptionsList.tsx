import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../../../components';
import { useGetPrescriptionsHistory } from '../../../../Patients/hooks';
import DeleteModal from '../../../../../components/MultiActionModal/MultiActionModal';
import { deletePrescription } from '../../../services';
import useIntersectionObserver from '../../../../../common/hooks/useIntersectionObserver';
import { PrescriptinRow } from '../../../types';
import PrescriptionItem from './PrescriptionItem/PrescriptionItem';

type Props = {
  patientId: string;
  selectedPrescriptionId?: string;
  setSelectedPrescriptionId?: (id: string) => void;
  goToEditPrescription?: () => void;
  prescribeAgain?: (prescription: PrescriptinRow) => void;
  disableEdit?: boolean;
};

const PrescriptionsList: React.FC<Props> = ({
  patientId,
  selectedPrescriptionId: prescriptionId,
  goToEditPrescription,
  setSelectedPrescriptionId,
  prescribeAgain,
  disableEdit = false,
}) => {
  const { t } = useTranslation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadMoreButtonRef = React.useRef<HTMLDivElement | null>(null);

  const cache = useQueryClient();
  const {
    data,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPrescriptionsHistory(patientId);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const {
    mutateAsync: deletePrescriptionMutate,
    isLoading: isDeletePrescriptionLoading,
  } = useMutation(() => deletePrescription(patientId, prescriptionId || ''));

  const onDeleteSuccess = () => {
    cache.invalidateQueries('prescriptions-history');
  };

  return (
    <>
      <Row align="middle" style={{ paddingRight: 34 }}>
        <Col span={3} />
        <Col span={4}>
          <Text size="md" strong>
            {t('date')}
          </Text>
        </Col>
        <Col span={17}>
          <Text size="md" strong>
            {t('diagnosis')}
          </Text>
        </Col>
      </Row>
      <div style={{ height: disableEdit ? '100%' : 300, overflow: 'scroll' }}>
        {data.pages.map((page: any) => (
          <>
            {page.prescriptions.map((prescription: PrescriptinRow) => (
              <PrescriptionItem
                prescriptionRow={prescription}
                setSelectedPrescriptionId={setSelectedPrescriptionId}
                openDeleteModal={() => setShowDeleteModal(true)}
                goToEditPrescription={goToEditPrescription}
                prescribeAgain={prescribeAgain}
                disableEdit={disableEdit}
                key={prescription.id}
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
      <DeleteModal
        action="delete"
        type="prescription"
        mutate={deletePrescriptionMutate}
        visible={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        isLoading={isDeletePrescriptionLoading}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
};

export default PrescriptionsList;
