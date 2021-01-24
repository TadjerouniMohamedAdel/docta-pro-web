import { Button, Col, Dropdown, Menu, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../../../features/Auth';
import Text from '../../../Text/Text';
import Icon from '../../../Icon/Icon';

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuthState();

  const handleLogout = (): void => {
    localStorage.setItem('token', '');
    setUser(undefined);
  };

  return (
    <Dropdown
      overlay={
        <Menu style={{ minWidth: 150 }}>
          <Menu.Item key="1" onClick={handleLogout}>
            <span>{t('logout')}</span>
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button type="text" style={{ height: 'auto' }}>
        <Row gutter={14} align="middle">
          <Col>
            <Avatar shape="circle" src={user?.picture} />
          </Col>
          <Col>
            <Text style={{ fontWeight: 500, textTransform: 'capitalize' }} type="secondary">
              {user?.firstName} {user?.lastName}
            </Text>
          </Col>
          <Col>
            <Text style={{ fontWeight: 500 }} type="secondary">
              <Icon name="arrow-down-s-line" />
            </Text>
          </Col>
        </Row>
      </Button>
    </Dropdown>
  );
};

export default UserProfile;
