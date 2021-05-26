import React from 'react';
import { useLocaleState } from '../../i18n';
import Card, { CardProps } from '../../components/Card/Card';
import './styles.less';

export type Props = CardProps & {
  children: React.ReactNode;
};

const InnerLayout: React.FC<Props> = ({ children, ...rest }) => {
  const { locale } = useLocaleState();

  return (
    <Card style={{ height: '100%', overflow: 'hidden' }} {...rest}>
      <div className={`layout inner-layout has-sidebar ${locale === 'ar' ? 'rtl' : ''}`}>
        {children}
      </div>
    </Card>
  );
};

export default InnerLayout;
