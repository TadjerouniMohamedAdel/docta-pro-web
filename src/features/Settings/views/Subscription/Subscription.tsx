import { Divider, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Modal } from '../../../../components';
import CurrentSubscription from '../../components/CurrentSubscription/CurrentSubscription';
import NextSubscription from '../../components/NextSubscription/NextSubscription';
import { useGetCurrentSubscription } from '../../hooks/useGetCurrentSubscription';
import { useGetNextSubscription } from '../../hooks/useGetNextSubscription';
import NewSubscription from './NewSubscription/NewSubscription';
import UploadReceipt from './NewSubscription/UploadReceipt/UploadReceipt';

const Subscription: React.FC = () => {
    const { t } = useTranslation('translation');
    const [addSubscriptionVisible, setAddSubscriptionVisible] = React.useState(false);
    const [uploadReceipt, setUploadReceipt] = React.useState(false);
    const { currentSubscription } = useGetCurrentSubscription();
    const { nextSubscription } =useGetNextSubscription();


    const columns = [
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: 'Plan',
            dataIndex: 'Plan',
            key: 'Plan',
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
        },
        {
            title: 'Quotation / Receipt',
            dataIndex: 'Quotation / Receipt',
            key: 'Quotation / Receipt',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'Payment Receipt',
            dataIndex: 'Payment Receipt',
            key: 'Payment Receipt',
        },
    ];

    return (
        <>

            <div style={{ padding: '18px 25px' }}>
                <Text size="xxl" style={{ fontWeight: 'bold' }}>
                    {t('Subscription')}
                </Text>
            </div>
            <Divider style={{ margin: 0 }} />

            {/* modal choosfor adding subscription */}
            <NewSubscription visible={addSubscriptionVisible} setVisible={setAddSubscriptionVisible} />
            <Modal title="Upload payment receipt" visible={uploadReceipt} width={650} onCancel={() => setUploadReceipt(false)}>
                <UploadReceipt />
            </Modal>
            {/* Subscription state */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 25px', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '32px', height: 200 }}>
                    {/* Current Subscription */}
                    <CurrentSubscription chooseNewSubscription={setAddSubscriptionVisible} subscription={currentSubscription?.data} />
                    {/* Next Subscription */}
                    <NextSubscription setVisibleUploadReceipt={setUploadReceipt} subscription={nextSubscription?.data} />
                </div>

                {/* list of subscriptions */}
                <div style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: '12px', color: '#74798C' }}>
                        Invoices (0)
                    </Text>
                    <Table rowKey="id" dataSource={[]} columns={columns} bordered pagination={false} style={{ marginTop: 17 }} /* loading={isLoading} */ />
                </div>
            </div>
        </>
    );
};

export default Subscription;