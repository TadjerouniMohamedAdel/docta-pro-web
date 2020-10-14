import { bool } from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as AntMenu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const propTypes = {
  collapsed: bool.isRequired,
};

const Menu = ({ collapsed }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <AntMenu
      theme="dark"
      mode="inline"
      inlineCollapsed={collapsed}
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
    >
      <AntMenu.Item key="/">
        {t('calendar')} <Link to="/" />
      </AntMenu.Item>
      <AntMenu.Item key="/patients">
        {t('patients')}
        <Link to="/patients" />
      </AntMenu.Item>
    </AntMenu>
  );
};

Menu.propTypes = propTypes;

export default Menu;
