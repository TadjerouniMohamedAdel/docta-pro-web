import React from 'react';
import { useLocaleState } from '../../../../i18n';
import Button from '../../../../components/Button/Button';
import Icon from '../../../../components/Icon/Icon';

type Props = {
  handleCollapsed: () => void;
  collapsed: boolean;
};

const SidebarCollapser: React.FC<Props> = ({ handleCollapsed, collapsed }) => {
  const { locale } = useLocaleState();

  return (
    <div className="sidebar-collapser">
      {(locale === 'ar' && !collapsed) || (locale !== 'ar' && collapsed) ? (
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
