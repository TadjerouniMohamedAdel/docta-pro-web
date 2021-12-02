import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from '../../../../components';
import './styles.less';
import { formatAmount } from '../../utils';
import { SubscriptionPlan } from '../../types';

type Props = {
    subscription: {
        plan: SubscriptionPlan,
        dueDate:Date,
        status:string
    },
    setVisibleUploadReceipt: (visible: boolean) => void
};

const NextSubscription: React.FC<Props> = ({ subscription, setVisibleUploadReceipt }) => {
    const { t } = useTranslation('translation');
    return (
        <div className="next-plan">
            <div>
                <div className="plan-info">
                    <Text className="plan-info-name">{t('next payment')}</Text>
                    <Text className="plan-info-value">{subscription ? `${formatAmount(subscription.plan.price)},00${t('da')} - ${subscription.plan.title}` : '-'}</Text>
                </div>
                <div className="plan-info" style={{ marginTop: 9 }}>
                    <Text className="plan-info-name">{t('due on')}</Text>
                    <Text className="plan-info-value">{subscription ? moment(subscription.dueDate).format('MMMM Do YYYY') : '-'}</Text>
                </div>
            </div>
            <div className="plan-action">
                {
                    subscription && subscription.status === 'unpaid' &&  (
                        <Button type="default" className="upload-receipt" onClick={() => setVisibleUploadReceipt(true)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#00B6F8' }}>{t('upload receipt')}</Text>
                            <Icon name="upload-2-line" style={{ color: '#00B6F8', fontSize: 12 }} />
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default NextSubscription;