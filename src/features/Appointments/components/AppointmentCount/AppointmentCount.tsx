import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text/Text';
import { useAppointmentCount } from '../../hooks';

type Props = {
  date: Date;
  type: 'month' | 'day';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
};

const AppointmentCount: React.FC<Props> = ({ date, type, size = 'md' }) => {
  const { t } = useTranslation('translation');

  const { data, isLoading } = useAppointmentCount(date, type);

  return (
    <Text type="secondary" style={{ fontWeight: 500 }} size={size}>
      {isLoading ? (
        `${t('loading')}...`
      ) : (
        <>
          {data ?? 0} {t('appointments')}
        </>
      )}
    </Text>
  );
};

export default AppointmentCount;
