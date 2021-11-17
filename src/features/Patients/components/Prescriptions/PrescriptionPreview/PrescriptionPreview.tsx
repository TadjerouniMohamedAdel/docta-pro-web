import React from 'react';
import { Button, Card, Divider } from 'antd';
import { Icon, Text } from '../../../../../components';
import docta_with_text from '../../../../../assets/img/docta_with_text.png';
import barre_code from '../../../../../assets/img/barre_code.png';
import './styles.less';

type Props = {
    prescription: any,
    setSelectedPrescription: (val: null) => void
};

const prescriptionFakeData = {
    date: new Date(),
    sickness: 'Grippe saisonnière',
    patient: {
        name: 'Ilyes Djelloul Boudjelthia',
        age: 45
    },
    cabinetInfo: {
        doctor: 'Amine Ould Aissa',
        speciality: 'Pediatric',
        phoneNumber1: '00213 666 53 53 74',
        phoneNumber2: '00213 25 13 54 99',
        address: 'Cité 1024 bätiment 53B porte n°01 Ouled Yaich - Blida'
    },
    medications: [
        {
            id:'1',
            name: 'Augmentin 100mg',
            posologie: '4 kg',
            number: 'twice a day',
            time: 'after meal',
            duration: '10 days'
        },
        {
            id:'2',
            name: 'Augmentin 100mg',
            posologie: '4 kg',
            number: 'twice a day',
            time: 'after meal',
            duration: '10 days'
        },
        {
            id:'3',
            name: 'Augmentin 100mg',
            posologie: '4 kg',
            number: 'twice a day',
            time: 'after meal',
            duration: '10 days'
        },
        {
            id:'4',
            name: 'Augmentin 100mg',
            posologie: '4 kg',
            number: 'twice a day',
            time: 'after meal',
            duration: '10 days'
        },
    ],
    note: 'Research in advertising is done in order to produce better advertisements that are more efficient in motivating customers to buy a product or a service.'

};

const PrescriptionPreview: React.FC<Props> = ({ prescription, setSelectedPrescription }) => {
    console.log(prescription);


    // handle pint button clicked
    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow?.document.write('<html><head><title>Prescription</title></head><body>');
        printWindow?.document.write(document.querySelector('#print-subscription')!.innerHTML);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();

    };


    // header of card pescription preview
    const CustomTitle = () => (
        <div className="prescription-header">
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>25 Oct 2021</Text>
                    <div className="prescription-state-badge">
                        New
                    </div>
                </div>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{prescriptionFakeData.sickness}</Text>
            </div>
            <div style={{ display: 'flex' }}>
                <Button type="primary" className="prescription-print-button" onClick={handlePrint}>
                    <Icon name="printer-line" />
                    <Text style={{ color: '#fff', fontSize: 14 }}>PRINT</Text>
                </Button>
                <Button type="default" onClick={() => setSelectedPrescription(null)} className="prescription-close-button">
                    <Icon name="close-line" />
                </Button>
            </div>
        </div>
    );



    // prescription medication info line 
    const MedicationItem = ({medication}: any) => (
        <div style={{ marginBottom: 29, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{medication.name}</Text>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10 }}>{medication.posologie}</Text>
                    <Text style={{ fontSize: 10 }}>{medication.number}</Text>
                    <Text style={{ fontSize: 10 }}>{medication.time}</Text>
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
            setSelectedPrescription(null);

        };
    });




    return (
        <Card className="prescription-preview-card" title={<CustomTitle />}>
            <div id="print-subscription">
                <div style={{ padding: '16px 20px', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: 5, padding: '10px 14px', fontSize: 9, fontWeight: 'bold', color: '#fff', position: 'relative', width: 83, height: 52, borderRadius: 7, backgroundColor: '#74798c' }}>
                            Cabinet<br />
                            Logo
                        </div>
                        <Text style={{ marginTop: 4, color: '#74798c', fontWeight: 'bold', fontSize: 9 }}>Dr {prescriptionFakeData.cabinetInfo.doctor}</Text>
                        <Text style={{ marginTop: 4, color: '#74798c', fontWeight: 'bold', fontSize: 9 }}>{prescriptionFakeData.cabinetInfo.speciality}</Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}>{prescriptionFakeData.cabinetInfo.phoneNumber1}</Text>
                            <Text style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}>{prescriptionFakeData.cabinetInfo.phoneNumber2}</Text>
                        </div>
                        <div style={{ width: 150, textAlign: 'right' }}>
                            <Text style={{ textAlign: 'right', marginBottom: 2, color: '#74798c', fontSize: 9 }}>
                                {prescriptionFakeData.cabinetInfo.address}
                            </Text>
                        </div>
                    </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '24px 20px', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ display: 'block', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Prescription</Text>
                    <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10 }}>18 March 2021</Text>
                        <div>
                            <Text style={{ fontSize: 10 }}>
                                {prescriptionFakeData.patient.name}
                                &nbsp;
                                {prescriptionFakeData.patient.age} yo
                            </Text>

                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 69, width: '100%' }}>
                        {
                            prescriptionFakeData.medications.map(medication => (
                                <MedicationItem key={`medication-${medication.id}`} medication={medication} />

                            ))
                        }
                    </div>

                    <p style={{ marginTop: 44, fontSize: 10, marginBottom: 80 }}>
                        {prescription.note}
                    </p>
                    <div style={{ position: 'absolute', left: 0, padding: '0 24px', bottom: 22, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div>
                            <img src={docta_with_text} alt="docta_logo" />
                        </div>
                        <div>
                            <img src={barre_code} alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </Card>
    );
};
export default PrescriptionPreview;
