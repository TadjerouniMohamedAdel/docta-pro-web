import { Button } from 'antd';
import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Icon, Text } from '../../../../components';
import { formatAmount } from '../../utils';
import './styles.less';

type Props = {
    subscription: {
        name: string,
        amountByMonth: number,
        totalAmount: number,
    } | null,
    chooseNewSubscription: (visible: boolean) => void
};

const CurrentSubscription: React.FC<Props> = ({ subscription, chooseNewSubscription }) => {
    // const { t } = useTranslation('translation');

    return (
        <div className="current-plan">
            <div className="left-side">
                <span className="plan-name">
                    {subscription ? subscription.name : '-'}
                </span>
                <Button type="primary" size="small" className="choose-plan-button" onClick={() => chooseNewSubscription(true)}>
                    Pick Plan
                    <Icon name="medal-2-line" />
                </Button>
            </div>
            <div className="right-side">
                <Text className="total-amount">{subscription ? formatAmount(subscription.totalAmount) : '-'},00 DA</Text>
                <Text className="amount-by-month">{subscription ? formatAmount(subscription.amountByMonth) : '-'},00DA <span style={{ fontSize: 12 }}>/month</span></Text>
            </div>
        </div>
    );
};

export default CurrentSubscription;
