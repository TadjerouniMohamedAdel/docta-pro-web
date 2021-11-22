import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Button, Card, Spin, Divider } from 'antd';
import { Icon, Text } from '../../../../../components';
import docta_with_text from '../../../../../assets/img/docta_with_text.png';
import barre_code from '../../../../../assets/img/barre_code.png';
import './styles.less';
import { useGetPrescription } from '../../../../Appointments/hooks';
import { MedicationRow } from '../../../../Appointments/types';
import { Specialty } from '../../../../Settings/views/VisitReasons/types';


type Props = {
    prescriptionId: string,
    setSelectedPrescriptionId: (val: null) => void
};


const PrescriptionPreview: React.FC<Props> = ({ prescriptionId, setSelectedPrescriptionId }) => {
    const { isLoading, prescription } = useGetPrescription(prescriptionId);

    // handle pint button clicked
    const handlePrint = () => {
        if (prescription) {
            const printWindow = window.open('', '', 'height=400,width=800');
            printWindow?.document.write(`<html><head><title>${prescription.data.diagnostic}</title></head><body>`);
            printWindow?.document.write(document.querySelector('#print-subscription')!.innerHTML);
            printWindow?.document.write('</body></html>');
            printWindow?.document.close();
            printWindow?.print();

        }

    };


    const Loading = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 200 }}>
            <Spin />
        </div>
    );



    // header of card pescription preview
    const CustomTitle = () => {
        return isLoading ? <Loading /> : prescription && (
            <div className="prescription-header">

                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{format(new Date(prescription.data.createdAt), 'dd MMM yyyy')}</Text>
                        {
                            isSameDay(new Date(prescription.data.createdAt), new Date()) && (
                                <div className="prescription-state-badge">
                                    New
                                </div>

                            )
                        }
                    </div>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{prescription.data.diagnostic}</Text>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button type="primary" className="prescription-print-button" onClick={handlePrint}>
                        <Icon name="printer-line" />
                        <Text style={{ color: '#fff', fontSize: 14 }}>PRINT</Text>
                    </Button>
                    <Button type="default" onClick={() => setSelectedPrescriptionId(null)} className="prescription-close-button">
                        <Icon name="close-line" />
                    </Button>
                </div>
            </div>
        );
    };


    // prescription medication info line 
    const MedicationItem: React.FC<{ medication: MedicationRow }> = ({ medication }) => (
        <div style={{ marginBottom: 29, width: '95%', display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{medication.name}</Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 10 }}>{medication.frequency}</Text>
                    <Text style={{ fontSize: 10 }}>{medication.unit}</Text>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 10 }}>{medication.duration}</Text>
                </div>
            </div>
        </div>
    );


    React.useEffect(() => {
        document.querySelector('.ant-modal')?.classList.add('modals-two-window');
        return () => {
            document.querySelector('.ant-modal')?.classList.remove('modals-two-window');

        };
    });




    return (
        <Card className="prescription-preview-card" title={<CustomTitle />}>
            {
                isLoading ? (
                    <Loading />
                ) : prescription &&
                (
                    <div id="print-subscription">
                        <div style={{ padding: '16px 20px', display: 'flex', width: '95%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {
                                    prescription.data.doctor.establishment.images[0] ?
                                        (
                                            <img src={prescription.data.doctor.establishment.images[0].url} alt="dsfs-" style={{ width: 83, height: 62 }} />
                                        ) : (
                                            <div style={{ marginBottom: 5, padding: '10px 14px', fontSize: 9, fontWeight: 'bold', color: '#fff', position: 'relative', width: 83, height: 52, borderRadius: 7, backgroundColor: '#74798c' }}>
                                                Cabinet<br />
                                                Logo
                                            </div>

                                        )
                                }
                                <Text style={{ marginTop: 4, color: '#74798c', fontWeight: 'bold', fontSize: 9 }}>Dr {`${prescription.data.doctor.lastName} ${prescription.data?.doctor.firstName}`}</Text>
                                <Text style={{ marginTop: 4, color: '#74798c', fontWeight: 'bold', fontSize: 9 }}>{prescription.data.doctor.specialties[prescription.data?.doctor.specialties.findIndex((spe: Specialty) => spe.isMain === 0)]?.name}</Text>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}>{prescription.data.doctor.establishment.contactNumber}</Text>
                                    <Text style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}>{prescription.data.doctor.establishment.secondaryContactNumber}</Text>
                                </div>
                                <div style={{ width: 150, marginTop: 28, textAlign: 'right' }}>
                                    <Text style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}>
                                        {prescription.data.doctor.establishment.addressLine1}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <Divider style={{ margin: 0 }} />
                        <div style={{ padding: '24px 20px', width: '95%', display: 'flex', flexDirection: 'column' }}>
                            <Text style={{ display: 'block', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Prescription</Text>
                            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10 }}>{format(new Date(prescription.data.createdAt), 'dd MMMM yyyy')}</Text>
                                <div>
                                    <Text style={{ fontSize: 10 }}>
                                        {`${prescription.data.patient.lastName} ${prescription.data.patient.firstName}`}
                                        &nbsp;&nbsp;
                                        {new Date().getFullYear() - new Date(prescription.data.patient.birthDate).getFullYear()} yo
                                    </Text>

                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 69, width: '95%' }}>
                                {
                                    prescription.data.medications.map((medication: MedicationRow) => (
                                        <MedicationItem key={`medication-${medication.id}`} medication={medication} />

                                    ))
                                }
                            </div>

                            <p style={{ marginTop: 44, fontSize: 10, marginBottom: 80 }}>
                                {prescription.data.note}
                            </p>
                            <div style={{ position: 'absolute', left: 0, padding: '0 24px', bottom: 22, display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                <div>
                                    <img src={docta_with_text} alt="docta_logo" />
                                </div>
                                <div>
                                    <img src={barre_code} alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }

        </Card>
    );
};
export default PrescriptionPreview;
