import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.less';

const Logo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="logo-wrapper"
      style={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '0 5px',
      }}
    >
      {t('title')}
    </div>
  );
};

export default Logo;
