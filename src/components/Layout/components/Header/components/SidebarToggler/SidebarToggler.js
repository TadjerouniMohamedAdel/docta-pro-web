import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { func } from 'prop-types';

const propTypes = {
  setToggled: func.isRequired,
};
const SidebarToggler = ({ setToggled }) => {
  return (
    <div className="sidebar-toggler break-point-md">
      <MenuOutlined onClick={() => setToggled(true)} className="icons" />
    </div>
  );
};

SidebarToggler.propTypes = propTypes;

export default SidebarToggler;
