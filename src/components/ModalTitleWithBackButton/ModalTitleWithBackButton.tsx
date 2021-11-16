import React from 'react';
import { Icon } from '..';

type Props = {
  title: string;
  goBack: () => void;
};

const ModalTitleWithBackButton: React.FC<Props> = ({ title, goBack }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button type="button" className="modal-back-button" onClick={goBack}>
        <Icon name="arrow-left-line" style={{ color: '#273151', fontSize: 17 }} />
      </button>
      <span style={{ marginLeft: 16, marginRight: 16 }}>{title}</span>
    </div>
  );
};

export default ModalTitleWithBackButton;
