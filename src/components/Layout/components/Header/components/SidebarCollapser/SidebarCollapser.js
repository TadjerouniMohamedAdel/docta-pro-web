import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { bool, func } from 'prop-types';

const propTypes = {
  handleCollapsed: func.isRequired,
  collapsed: bool.isRequired,
};
const SidebarCollapser = ({ handleCollapsed, collapsed }) => {
  return (
    <div className="sidebar-collapser">
      {collapsed ? (
        <MenuUnfoldOutlined onClick={handleCollapsed} className="icons" />
      ) : (
        <MenuFoldOutlined onClick={handleCollapsed} className="icons" />
      )}
    </div>
  );
};

SidebarCollapser.propTypes = propTypes;

export default SidebarCollapser;
