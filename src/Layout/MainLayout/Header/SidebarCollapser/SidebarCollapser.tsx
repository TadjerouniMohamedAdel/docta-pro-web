import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../../../../components';

type Props = {
  handleCollapsed: () => void;
  collapsed: boolean;
};

const SidebarCollapser: React.FC<Props> = ({ handleCollapsed, collapsed }) => {
  const { i18n } = useTranslation();
  return (
    <div className="sidebar-collapser">
      {(i18n.language === 'ar' && !collapsed) || (i18n.language !== 'ar' && collapsed) ? (
        <Button type="text" onClick={handleCollapsed}>
          <Icon name="menu-2-line" />
        </Button>
      ) : (
        <Button type="text" onClick={handleCollapsed}>
          <Icon name="menu-2-line" />
        </Button>
      )}
    </div>
  );
};

export default SidebarCollapser;
