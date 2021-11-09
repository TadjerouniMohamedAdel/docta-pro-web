import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import './styles.less';
import { Text } from '../../../../components';
import { formatAmount } from '../../utils';
import { SubscriptionPlan } from '../../types';

type Props = {
    plan: SubscriptionPlan,
    selectChoice: ({ id, title, price }: { id:string, title: string, price: number }) => void
};
const ChoicePlanCard: React.FC<Props> = ({ plan, selectChoice }) => {
    const { t } = useTranslation('translation');

    return (
        <div className="choice-card">
            <div className="choice-image" />
            <div className="choice-content">
                <div>
                    <sup className="price-unit">{t('da')}</sup>
                    <Text className="choice-price">{formatAmount(plan.price)}<sub style={{ position: 'relative', top: 0 }}>,00</sub></Text>
                </div>
                <Text className="choice-name">{plan.title}</Text>
                <Button className="choice-button" type="primary" onClick={() => selectChoice(plan)}>
                    {t('start now')}
                </Button>
            </div>
        </div>
    );
};

export default ChoicePlanCard;
