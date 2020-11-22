import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

type Props = {
  handleToggled: (value: boolean) => void;
};

const SidebarToggler: React.FC<Props> = ({ handleToggled }) => {
  return (
    <div className="sidebar-toggler break-point-xl">
      <MenuOutlined onClick={() => handleToggled(true)} className="icons" />
    </div>
  );
};

export default SidebarToggler;
