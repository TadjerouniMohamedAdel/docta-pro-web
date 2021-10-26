import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
// import { useTranslation } from 'react-i18next';
import { Icon, Text } from '../../../../components';
import './styles.less';
import { formatAmount } from '../../utils';

type Props = {
    subscription: {
        name: string,
        amount: number,
        dueDate: Date,

    } | null,
    setVisibleUploadReceipt: (visible: boolean) => void
};

const NextSubscription: React.FC<Props> = ({ subscription, setVisibleUploadReceipt }) => {
    // const { t } = useTranslation('translation');

    return (
        <div className="next-plan">
            <div>
                <div className="plan-info">
                    <Text className="plan-info-name">Next payment</Text>
                    <Text className="plan-info-value">{subscription ? `${formatAmount(subscription.amount)},00Da - ${subscription.name}` : '-'}</Text>
                </div>
                <div className="plan-info" style={{ marginTop: 9 }}>
                    <Text className="plan-info-name">Due on</Text>
                    <Text className="plan-info-value">{subscription ? moment(subscription.dueDate).format('MMMM Do YYYY') : '-'}</Text>
                </div>
            </div>
            <div className="plan-action">
                {
                    subscription && (
                        <Button type="default" className="upload-receipt" onClick={() => setVisibleUploadReceipt(true)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#00B6F8' }}>Upload Receipt</Text>
                            <Icon name="upload-2-line" style={{ color: '#00B6F8', fontSize: 12 }} />
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default NextSubscription;