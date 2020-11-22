import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLocaleState } from '../../../../i18n';

type Props = {
  handleCollapsed: () => void;
  collapsed: boolean;
};

const SidebarCollapser: React.FC<Props> = ({ handleCollapsed, collapsed }) => {
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

export default SidebarCollapser;
