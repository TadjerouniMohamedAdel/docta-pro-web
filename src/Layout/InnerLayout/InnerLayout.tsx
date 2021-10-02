import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardProps } from '../../components';
import './styles.less';

export type Props = CardProps & {
  children: React.ReactNode;
};

const InnerLayout: React.FC<Props> = ({ children, ...rest }) => {
  const { i18n } = useTranslation();

  return (
    <Card style={{ height: '100%', overflow: 'hidden' }} {...rest}>
      <div className={`layout inner-layout has-sidebar ${i18n.language === 'ar' ? 'rtl' : ''}`}>
        {children}
      </div>
    </Card>
  );
};

export default InnerLayout;
