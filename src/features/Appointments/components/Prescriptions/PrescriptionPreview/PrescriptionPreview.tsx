import React from 'react';
import printJS from 'print-js';
import { useTranslation } from 'react-i18next';
import { format, isSameDay } from 'date-fns';
import { Button, Card, Spin, Divider } from 'antd';
import { Icon, Text } from '../../../../../components';
import docta_with_text from '../../../../../assets/img/docta_with_text.png';
// import barre_code from '../../../../../assets/img/barre_code.png';
import './styles.less';
import { MedicationRow } from '../../../types';
import { Specialty } from '../../../../Settings/views/VisitReasons/types';

type Props = {
  prescription: any;
  isLoading: boolean;
  onClose: () => void;
  visible: boolean;
  printPreview: boolean;
  isModal?: boolean;
};

const PrescriptionPreview: React.FC<Props> = ({
  visible,
  prescription,
  isLoading,
  isModal = false,
  onClose,
  printPreview,
}) => {
  const { t } = useTranslation('translation');

  React.useEffect(() => {
    if (visible && !isModal) {
      document.querySelector('.ant-modal')?.classList.add('modals-two-window');
      document.querySelector('.ant-modal-content')?.classList.add('modal-content-two-modals');
    }
    return () => {
      document.querySelector('.ant-modal')?.classList.remove('modals-two-window');
      document.querySelector('.ant-modal-content')?.classList.remove('modal-content-two-modals');
    };
  });

  const printPreviewI = () => {
    printJS({
      printable: 'print-subscription',
      type: 'html',
      css: ['/prescription-preview-assets/preview.css'],
      scanStyles: false,
    });
    onClose();
  };

  React.useEffect(() => {
    if (!isLoading && printPreview) {
      printPreviewI();
    }
  }, [printPreview, isLoading]);

  // custom loader
  const Loading = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 0,
        height: 500,
      }}
    >
      <Spin />
    </div>
  );

  // header of  pescription preview
  const CustomTitle = () => {
    return isLoading ? (
      <Loading />
    ) : (
      prescription && (
        <div className="prescription-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {format(new Date(prescription.data.createdAt), 'dd MMM yyyy')}
              </Text>
              {isSameDay(new Date(prescription.data.createdAt), new Date()) && (
                <div className="prescription-state-badge">New</div>
              )}
            </div>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{prescription.data.diagnostic}</Text>
          </div>
          <div style={{ display: 'flex' }}>
            <Button
              type="primary"
              className="prescription-print-button"
              onClick={() => printPreviewI()}
            >
              <Icon name="printer-line" />
              <Text style={{ color: '#fff', fontSize: 14 }}>{t('print'.toUpperCase())}</Text>
            </Button>
            <Button type="default" onClick={() => onClose()} className="prescription-close-button">
              <Icon name="close-line" />
            </Button>
          </div>
        </div>
      )
    );
  };

  // prescription medication info line
  const MedicationItem: React.FC<{ medication: MedicationRow }> = ({ medication }) => (
    <div style={{ marginBottom: 29, width: '95%', display: 'flex', flexDirection: 'column' }}>
      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{medication.name}</Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{
            flex: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 10 }}>{medication.frequency}</Text>
          <Text style={{ fontSize: 10 }}>{medication.unit}</Text>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 10 }}>{medication.duration}</Text>
        </div>
      </div>
    </div>
  );

  // Wrapper of prescription (modal on patient screen and card on apoitments)
  const Wrapper: React.FC = ({ children }) => (
    <div style={{ display: visible ? 'block' : 'none' }}>
      {isModal ? (
        <div className="ant-modal-mask" style={{ display: 'flex', justifyContent: 'center' }}>
          <Card title={<CustomTitle />} style={{ width: 422, margin: 'auto', marginTop: 50 }}>
            {children}
          </Card>
        </div>
      ) : (
        <Card
          className="prescription-preview-card"
          title={<CustomTitle />}
          style={{ display: `${!visible ? 'none' : 'initial'}` }}
        >
          {children}
        </Card>
      )}
    </div>
  );

  return (
    <Wrapper>
      {prescription && (
        <div id="print-subscription">
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              width: '95%',
              justifyContent: 'space-between',
              // alignItems: 'center',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div style={{ marginBottom: 28 }}>
                <img src={docta_with_text} alt="cabinet-logo-" style={{ width: 97 }} />
              </div>

              <Text
                style={{
                  marginTop: 4,
                  color: '#74798c',
                  fontWeight: 'bold',
                  fontSize: 9,
                }}
              >
                Dr {`${prescription.data.doctor.lastName} ${prescription.data?.doctor.firstName}`}
              </Text>
              <Text style={{ marginTop: 4, color: '#74798c', fontWeight: 'bold', fontSize: 9 }}>
                {
                  prescription.data.doctor.specialties[
                    prescription.data?.doctor.specialties.findIndex(
                      (spe: Specialty) => spe.isMain === 0,
                    )
                  ]?.name
                }
              </Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text
                  style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}
                >
                  {prescription.data.doctor.establishment.contactNumber}
                </Text>
                <Text
                  style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}
                >
                  {prescription.data.doctor.establishment.secondaryContactNumber}
                </Text>
              </div>
              <div style={{ width: 150, marginTop: 28, textAlign: 'right' }}>
                <Text
                  style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}
                >
                  {prescription.data.doctor.establishment.addressLine1 ||
                    prescription.data.doctor.establishment.address}
                </Text>
              </div>
            </div>
          </div>
          <Divider style={{ margin: 0 }} />
          <div
            style={{ padding: '24px 20px', width: '95%', display: 'flex', flexDirection: 'column' }}
          >
            <Text
              style={{ display: 'block', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}
            >
              Prescription
            </Text>
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 10 }}>
                {format(new Date(prescription.data.createdAt), 'dd MMMM yyyy')}
              </Text>
              <div>
                <Text style={{ fontSize: 10 }}>
                  {`${prescription.data.patient.lastName} ${prescription.data.patient.firstName}`}
                  &nbsp;&nbsp;
                  {new Date().getFullYear() -
                    new Date(prescription.data.patient.birthDate).getFullYear()}{' '}
                  yo
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 69, width: '95%' }}>
              {prescription.data.medications.map(
                (medication: MedicationRow) =>
                  !medication.isDeleted && (
                    <MedicationItem key={`medication-${medication.id}`} medication={medication} />
                  ),
              )}
            </div>

            <p style={{ marginTop: 44, fontSize: 10, marginBottom: 80 }}>
              {prescription.data.note}
            </p>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default PrescriptionPreview;
