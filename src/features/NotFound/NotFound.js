import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('sorry... nothing here')}
      extra={
        <Button type="primary">
          <Link to="/">{t('home')}</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
