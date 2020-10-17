import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../../../../../features/Auth';

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const { setUser } = useAuthState();

  const handleLogout = (): void => {
    localStorage.setItem('token', '');
    setUser(undefined);
  };

  return (
    <Dropdown
      overlay={
        <Menu style={{ minWidth: 150 }}>
          <Menu.Item key="1" onClick={handleLogout}>
            <LoginOutlined />
            <span>{t('logout')}</span>
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button type="text" style={{ height: 'auto' }}>
        <Avatar shape="circle" icon={<UserOutlined />} />
      </Button>
    </Dropdown>
  );
};

export default UserProfile;
