import React from 'react';
import { Text } from '../../../../components';
import './styles.less';

type Props = {
    name: string,
    label: string,
    img: string,
    isActive: boolean,
    onClick: () => void
};

const PaymentMethodChoice: React.FC<Props> = ({ name, label, img, isActive, onClick }) => {
    return (
        <button type="button" className={`payment-method-choice ${isActive && 'active'}`} onClick={()=>onClick()}>
            <img style={{ marginRight: 10 }} src={img} alt={name} />
            <Text style={{ fontSize: 12 }}>{label}</Text>
        </button>
    );
};

export default PaymentMethodChoice;
