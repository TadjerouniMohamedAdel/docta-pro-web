import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../../../components';
import { useGetPrescriptionsHistory } from '../../../../Patients/hooks';
import DeleteModal from '../../../../../components/MultiActionModal/MultiActionModal';
import { deletePrescription } from '../../../services';
import useIntersectionObserver from '../../../../../common/hooks/useIntersectionObserver';
import { PrescriptinRow, PrescriptionDetails } from '../../../types';
import PrescriptionPreview from '../../../../Patients/components/Prescriptions/PrescriptionPreview/PrescriptionPreview';
import PrescriptionItem from './PrescriptionItem/PrescriptionItem';

type Props = {
  patientId: string;
  selectedPrescriptionId?: string;
  setSelectedPrescriptionId?: (id: string) => void;
  goToEditPrescription?: () => void;
  prescribeAgain?: (prescription: PrescriptionDetails) => void;
  disableEdit?: boolean;
  fromPatient?:boolean
};

const PrescriptionsList: React.FC<Props> = ({
  patientId,
  selectedPrescriptionId: prescriptionId,
  goToEditPrescription,
  setSelectedPrescriptionId,
  prescribeAgain,
  disableEdit = false,
  fromPatient=false
}) => {
  const { t } = useTranslation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [previewId, setPreviewId] = useState<null | string>(null);
  const [previewVisible, setPreviewVisible] = useState(true);
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

  

  const printPreview = (diagnostic:string) => {
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow?.document.write(`<html><head><title>${diagnostic}</title></head><body>`);
        printWindow?.document.write(document.querySelector('#print-subscription')!.innerHTML);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
        setPreviewId(null);
        setPreviewVisible(true);
};


  return (
    <>
      <Row align="middle" style={{ padding: '0 24px' }}>
        <Col span={disableEdit ? 0 : 3} />
        <Col span={4}>
          <Text size="md" strong>
            {t('date')}
          </Text>
        </Col>
        <Col flex={1}>
          <Text size="md" strong>
            {t('diagnosis')}
          </Text>
        </Col>
      </Row>
      <div style={{ height: disableEdit ? '100%' : 300, overflow: 'scroll' }}>
        {data.pages.map((page: any) => (
          <>
            {page.prescriptions.map((prescriptionRow: PrescriptinRow) => (
              <PrescriptionItem
                prescriptionRow={prescriptionRow}
                setSelectedPrescriptionId={setSelectedPrescriptionId}
                openDeleteModal={() => setShowDeleteModal(true)}
                goToEditPrescription={goToEditPrescription}
                prescribeAgain={prescribeAgain}
                disableEdit={disableEdit}
                key={prescriptionRow.id}
                setPreviewId={setPreviewId}
                printPreview={()=>{setPreviewVisible(false);setPreviewId(prescriptionRow.id);}}
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
      {
        previewId && (
          <PrescriptionPreview
            prescriptionId={previewId}
            onClose={() => { setPreviewId(null);setPreviewVisible(true); }}
            visible={previewVisible}
            isModal={fromPatient}
            printPreview={printPreview}
          />

        )
      }
    </>
  );
};

export default PrescriptionsList;
