import React from 'react';
import { Button } from 'antd';
// import { useTranslation } from 'react-i18next';
import './styles.less';
import { Text } from '../../../../components';
import { formatAmount } from '../../utils';

type Props = {
    plan: {
        title: string,
        price: number
    },
    selectChoice: ({ title, price }: { title: string, price: number }) => void
};
const ChoicePlanCard: React.FC<Props> = ({ plan, selectChoice }) => {
    // const { t } = useTranslation('translation');

    return (
        <div className="choice-card">
            <div className="choice-image" />
            <div className="choice-content">
                <div>
                    <sup className="price-unit">DA</sup>
                    <Text className="choice-price">{formatAmount(plan.price)}<sub style={{ position: 'relative', top: 0 }}>,00</sub></Text>
                </div>
                <Text className="choice-name">{plan.title}</Text>
                <Button className="choice-button" type="primary" onClick={() => selectChoice(plan)}>
                    Start Now
                </Button>
            </div>
        </div>
    );
};

export default ChoicePlanCard;
