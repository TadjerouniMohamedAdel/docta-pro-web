import React from 'react';
import { Text } from '../../../../components';
import './styles.less';
import bank from '../../../../assets/img/bank.png';

type Props = {
    type: string,
    isActive: boolean,
    onClick: () => void
};

const PaymentMethodChoice: React.FC<Props> = ({ type, isActive, onClick }) => {
    return (
        <button type="button" className={`payment-method-choice ${isActive && 'active'}`} onClick={() => onClick()}>
            <img style={{ marginRight: 10 }} src={bank} alt={type} />
            <Text style={{ fontSize: 12 }}>{type.toUpperCase()}</Text>
        </button>
    );
};

export default PaymentMethodChoice;
