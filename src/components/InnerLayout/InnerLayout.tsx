import React from 'react';
import { useLocaleState } from '../../i18n';
import Card from '../Card/Card';
import './styles.less';

export type Props = {
  children: React.ReactNode;
};

const InnerLayout: React.FC<Props> = ({ children }) => {
  const { locale } = useLocaleState();

  return (
    <Card style={{ height: '100%', overflow: 'hidden' }}>
      <div className={`layout inner-layout has-sidebar ${locale === 'ar' ? 'rtl' : ''}`}>
        {children}
      </div>
    </Card>
  );
};

export default InnerLayout;
