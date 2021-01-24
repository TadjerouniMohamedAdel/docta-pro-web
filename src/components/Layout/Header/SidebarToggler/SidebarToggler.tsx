import React from 'react';
import Button from '../../../Button/Button';
import Icon from '../../../Icon/Icon';

type Props = {
  handleToggled: (value: boolean) => void;
};

const SidebarToggler: React.FC<Props> = ({ handleToggled }) => {
  return (
    <div className="sidebar-toggler break-point-xl">
      <Button type="text" onClick={() => handleToggled(true)}>
        <Icon name="list-check-2" />
      </Button>
    </div>
  );
};

export default SidebarToggler;
