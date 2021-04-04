import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { fetchAppointmentsCount } from './services';
import Text from '../../components/Text/Text';

type Props = {
  date: Date;
  type: 'month' | 'day';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
};

const AppointmentCount: React.FC<Props> = ({ date, type, size = 'md' }) => {
  const { t } = useTranslation('translation');

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetAppointmentCount = async () => {
    let from: Date = date;
    let to: Date = date;
    if (type === 'month') {
      from = moment(date).clone().startOf('month').toDate();
      to = moment(date).clone().endOf('month').toDate();
    }
    // TODO : use react query to cache result by range ['appointment-count', from, to]
    try {
      setLoading(true);
      const response = await fetchAppointmentsCount(from, to);
      setCount(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAppointmentCount();
  }, [date]);

  return (
    <Text type="secondary" style={{ fontWeight: 500 }} size={size}>
      {loading ? (
        `${t('loading')}...`
      ) : (
        <>
          {count} {t('appointments')}
        </>
      )}
    </Text>
  );
};

export default AppointmentCount;
