import React from 'react';
import { useTranslation } from 'react-i18next';

const PageLoader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {t('loading')}...
    </div>
  );
};

export default PageLoader;
