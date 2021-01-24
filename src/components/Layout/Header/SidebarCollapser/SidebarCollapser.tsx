import React from 'react';
import { useLocaleState } from '../../../../i18n';
import Button from '../../../Button/Button';
import Icon from '../../../Icon/Icon';

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
          <Icon name="list-check-2" />
        </Button>
      ) : (
        <Button type="text" onClick={handleCollapsed}>
          <Icon name="list-check-2" />
        </Button>
      )}
    </div>
  );
};

export default SidebarCollapser;
