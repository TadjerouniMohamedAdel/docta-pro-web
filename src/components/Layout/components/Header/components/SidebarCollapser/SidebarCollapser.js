import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { bool, func } from 'prop-types';
import { useLocaleState } from '../Localization';

const propTypes = {
  handleCollapsed: func.isRequired,
  collapsed: bool.isRequired,
};
const SidebarCollapser = ({ handleCollapsed, collapsed }) => {
  const { locale } = useLocaleState();
  return (
    <div className="sidebar-collapser">
      {(locale === 'ar' && !collapsed) || (locale !== 'ar' && collapsed) ? (
        <MenuUnfoldOutlined onClick={handleCollapsed} className="icons" />
      ) : (
        <MenuFoldOutlined onClick={handleCollapsed} className="icons" />
      )}
    </div>
  );
};

SidebarCollapser.propTypes = propTypes;

export default SidebarCollapser;
