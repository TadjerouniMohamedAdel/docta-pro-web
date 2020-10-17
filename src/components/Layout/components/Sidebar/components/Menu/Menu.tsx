import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as AntMenu } from 'antd';
import { HomeOutlined, ProjectOutlined } from '@ant-design/icons';

type Props = {
  collapsed: boolean;
};

const Menu: React.FC<Props> = ({ collapsed }) => {
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
      <AntMenu.Item key="/" icon={<HomeOutlined />}>
        {t('Dashboard')} <Link to="/" />
      </AntMenu.Item>
      <AntMenu.Item key="/patients" icon={<ProjectOutlined />}>
        {t('Patients')} <Link to="/patients" />
      </AntMenu.Item>
    </AntMenu>
  );
};

export default Menu;
