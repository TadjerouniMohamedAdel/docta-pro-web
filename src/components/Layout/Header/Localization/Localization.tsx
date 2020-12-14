import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocaleState } from '../../../../i18n';

const Localization: React.FC = () => {
  const { locale, setLocale } = useLocaleState();
  const { t, i18n } = useTranslation();

  const handleLocaleChange = (e: any): void => {
    const hide: Function = message.loading(t('changing language'), 0);
    i18n.changeLanguage(e.key, () => {
      setLocale(e.key);
      localStorage.setItem('locale', e.key);
      hide();
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu
          style={{ minWidth: 150 }}
          onClick={handleLocaleChange}
          selectedKeys={[locale as string]}
        >
          <Menu.Item key="ar">العربية</Menu.Item>
          <Menu.Item key="en">English</Menu.Item>
          <Menu.Item key="fr">Français</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button type="text" style={{ height: 'auto' }}>
        <GlobalOutlined className="icons" />
      </Button>
    </Dropdown>
  );
};

export default Localization;
