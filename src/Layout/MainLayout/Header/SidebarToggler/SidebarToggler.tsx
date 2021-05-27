import React from 'react';
import { Button, Icon } from '../../../../components';

type Props = {
  handleToggled: (value: boolean) => void;
};

const SidebarToggler: React.FC<Props> = ({ handleToggled }) => {
  return (
    <div className="sidebar-toggler break-point-xl">
      <Button type="text" onClick={() => handleToggled(true)}>
        <Icon name="menu-line" />
      </Button>
    </div>
  );
};

export default SidebarToggler;
