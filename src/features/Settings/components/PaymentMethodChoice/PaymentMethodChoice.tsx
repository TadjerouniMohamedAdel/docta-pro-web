import React from 'react';
import { Text } from '../../../../components';
import './styles.less';
import bank from '../../../../assets/img/bank.png';
import ccp from '../../../../assets/img/ccp.png';
import cash from '../../../../assets/img/cash.png';
import check from '../../../../assets/img/check.png';

type Props = {
  type: string;
  isActive: boolean;
  onClick: () => void;
};

const getImages = (type: string) => {
  switch (type.toLowerCase()) {
    case 'ccp':
      return ccp;
    case 'cash':
      return cash;
    case 'check':
      return check;
    default:
      return bank;
  }
};

const PaymentMethodChoice: React.FC<Props> = ({ type, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`payment-method-choice ${isActive && 'active'}`}
      onClick={() => onClick()}
    >
      <img style={{ marginRight: 10 }} src={getImages(type)} alt={type} />
      <Text style={{ fontSize: 12 }}>{type.toUpperCase()}</Text>
    </button>
  );
};

export default PaymentMethodChoice;
