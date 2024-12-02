import React from 'react';
import { Divider, Table } from 'antd';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { format } from 'date-fns';
import { RcFile } from 'antd/lib/upload';
import { useTranslation } from 'react-i18next';
import { Text, Modal, Icon } from '../../../../components';
import CurrentSubscription from '../../components/CurrentSubscription/CurrentSubscription';
import NextSubscription from '../../components/NextSubscription/NextSubscription';
import { useGetCurrentSubscription } from '../../hooks/useGetCurrentSubscription';
import { useGetInvoices } from '../../hooks/useGetInvoices';
import { useGetNextSubscription } from '../../hooks/useGetNextSubscription';
import { useGetSubscriptionPlans } from '../../hooks/useGetSubscriptionPlans';
import { usePickPlan } from '../../hooks/usePickPlan';
import NewSubscription from './NewSubscription/NewSubscription';
import UploadReceipt from './NewSubscription/UploadReceipt/UploadReceipt';
import { formatAmount } from '../../utils';
import { InvoiceType } from '../../types';
import { useUploadReceipt } from '../../hooks/useUploadReceipt';

const Subscription: React.FC = () => {
  const { t } = useTranslation('translation');
  const [addSubscriptionVisible, setAddSubscriptionVisible] = React.useState(false);
  const [uploadReceipt, setUploadReceipt] = React.useState(false);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize] = React.useState(10);
  const { currentSubscription } = useGetCurrentSubscription();
  const { nextSubscription } = useGetNextSubscription();
  const { plans } = useGetSubscriptionPlans();
  const { mutateAsync, isLoading: isLoadingPickPlan } = usePickPlan();
  const { invoices, isLoading } = useGetInvoices(pageIndex, pageSize);
  const { mutateAsync: mutateReceipt, isLoading: uploadLoading } = useUploadReceipt();
  const columns = [
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'Date',
      render: (text: any, record: InvoiceType) => (
        <>{format(new Date(record.date), 'MMM dd,yyyy')}</>
      ),
    },
    {
      title: t('plan'),
      dataIndex: 'plan',
      key: 'Plan',
      render: (text: any, record: InvoiceType) => <>{record.plan.title}</>,
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'Price',
      render: (text: any, record: InvoiceType) => <>{`${formatAmount(record.plan.price)},00 DA`}</>,
    },
    {
      title: t('quotation/receipt'),
      dataIndex: 'Quotation / Receipt',
      key: 'Quotation / Receipt',
      responsive: ['xxl', 'xl', 'lg'] as Breakpoint[],
      render: (text: any, record: InvoiceType) => (
        <>
          {record.quotation && record.quotation !== '' ? (
            <a
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              rel="noreferrer"
              target="_blank"
              href={record.quotation}
            >
              <Text>Quotation-{format(new Date(record.date), 'yyyy/MM')}.pdf</Text>
              <Icon style={{ color: '#74798C' }} name="download-2-line" />
            </a>
          ) : null}
        </>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'Status',
      key: 'Status',
      responsive: ['xxl', 'xl', 'lg', 'md'] as Breakpoint[],
      render: (text: any, record: InvoiceType) => (
        <Text
          type={
            record.status === 'unpaid'
              ? 'danger'
              : record.status === 'pending'
              ? 'warning'
              : 'success'
          }
        >
          {record.status}
        </Text>
      ),
    },
    {
      title: t('payment receipt'),
      dataIndex: 'Payment Receipt',
      key: 'Payment Receipt',
      responsive: ['xxl', 'xl', 'lg'] as Breakpoint[],
      render: (text: any, record: InvoiceType) => (
        <>
          {record.paymentReciept && record.paymentReciept !== '' ? (
            <a
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              rel="noreferrer"
              target="_blank"
              href={record.paymentReciept}
            >
              <Text>Receipt-{format(new Date(record.date), 'yyyy/MM')}.pdf</Text>
              <Icon style={{ color: '#74798C' }} name="download-2-line" />
            </a>
          ) : null}
        </>
      ),
    },
  ];

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const handleUploadReceipt = async (file: File | RcFile) => {
    try {
      await mutateReceipt({ paymentId: nextSubscription?.data?.paymentId, file });
      setUploadReceipt(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          padding: '18px 25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
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
        isLoadingPickPlan={isLoadingPickPlan}
      />
      <Modal
        title={t('upload payment receipt')}
        visible={uploadReceipt}
        width={650}
        destroyOnClose
        onCancel={() => setUploadReceipt(false)}
      >
        <UploadReceipt isLoading={uploadLoading} handleUploadReceipt={handleUploadReceipt} />
      </Modal>
      {/* Subscription state */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 25px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: 200,
            flexWrap: 'wrap',
          }}
        >
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
        <div style={{ marginTop: 20 }}>
          <Text style={{ fontSize: '12px', color: '#74798C' }}>
            {t('invoices')}({invoices?.total ?? 0})
          </Text>
          <Table
            rowKey="id"
            dataSource={invoices?.data}
            pagination={{ pageSize, total: invoices?.total }}
            columns={columns}
            onChange={handleChange}
            bordered
            style={{ marginTop: 17 }}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Subscription;
