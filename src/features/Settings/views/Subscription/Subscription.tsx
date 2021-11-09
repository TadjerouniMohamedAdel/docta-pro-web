import { Divider, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Modal } from '../../../../components';
import CurrentSubscription from '../../components/CurrentSubscription/CurrentSubscription';
import NextSubscription from '../../components/NextSubscription/NextSubscription';
import { useGetCurrentSubscription } from '../../hooks/useGetCurrentSubscription';
import { useGetNextSubscription } from '../../hooks/useGetNextSubscription';
import { useGetSubscriptionPlans } from '../../hooks/useGetSubscriptionPlans';
import { usePickPlan } from '../../hooks/usePickPlan';
import NewSubscription from './NewSubscription/NewSubscription';
import UploadReceipt from './NewSubscription/UploadReceipt/UploadReceipt';

const Subscription: React.FC = () => {
    const { t } = useTranslation('translation');
    const [addSubscriptionVisible, setAddSubscriptionVisible] = React.useState(false);
    const [uploadReceipt, setUploadReceipt] = React.useState(false);
    const { currentSubscription } = useGetCurrentSubscription();
    const { nextSubscription } = useGetNextSubscription();
    const { plans } = useGetSubscriptionPlans();
    const { mutateAsync } = usePickPlan();




    const columns = [
        {
            title: t('date'),
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: t('plan'),
            dataIndex: 'Plan',
            key: 'Plan',
        },
        {
            title: t('price'),
            dataIndex: 'Price',
            key: 'Price',
        },
        {
            title: t('quotation/receipt'),
            dataIndex: 'Quotation / Receipt',
            key: 'Quotation / Receipt',
        },
        {
            title: t('status'),
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: t('payment receipt'),
            dataIndex: 'Payment Receipt',
            key: 'Payment Receipt',
        },
    ];

    return (
        <>

            <div style={{ padding: '18px 25px' }}>
                <Text size="xxl" style={{ fontWeight: 'bold' }}>
                    {t('subscription')}
                </Text>
            </div>
            <Divider style={{ margin: 0 }} />

            {/* modal for adding subscription */}
            <NewSubscription
              plans={plans ? plans.data : []}
              visible={addSubscriptionVisible}
              setVisible={setAddSubscriptionVisible}
              addSubscription={mutateAsync}
            />
            <Modal
              title={t('upload payment receipt')}
              visible={uploadReceipt}
              width={650}
              onCancel={() => setUploadReceipt(false)}
            >
                <UploadReceipt />
            </Modal>
            {/* Subscription state */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 25px', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '32px', height: 200 }}>
                    {/* Current Subscription */}
                    <CurrentSubscription
                      pickPlan={plans?.data && plans?.data.length > 0}
                      chooseNewSubscription={setAddSubscriptionVisible}
                      subscription={currentSubscription?.data}
                    />
                    {/* Next Subscription */}
                    <NextSubscription
                      setVisibleUploadReceipt={setUploadReceipt}
                      subscription={nextSubscription?.data}
                    />
                </div>

                {/* list of subscriptions */}
                <div style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: '12px', color: '#74798C' }}>
                        {t('invoices')}(0)
                    </Text>
                    <Table
                      rowKey="id"
                      dataSource={[]}
                      pagination={{ pageSize:10, total:1 }}
                      columns={columns}
                      bordered
                      style={{ marginTop: 17 }}
                    /* loading={isLoading} */
                    />
                </div>
            </div>
        </>
    );
};

export default Subscription;