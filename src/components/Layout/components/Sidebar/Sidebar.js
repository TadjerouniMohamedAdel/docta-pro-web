import React from 'react';
import { bool } from 'prop-types';
import { useTranslation } from 'react-i18next';

const propTypes = {
  collapsed: bool.isRequired,
  toggled: bool.isRequired,
};

const Sidebar = ({ collapsed, toggled }) => {
  const { t } = useTranslation();

  return (
    <aside
      className={`sidebar break-point-md ${collapsed ? 'collapsed' : ''} ${
        toggled ? 'toggled' : ''
      }`}
      style={{ padding: '20px 0' }}
    >
      <div className="logo" style={{ height: 64 }}>
        {t('title')}
      </div>
    </aside>
  );
};

Sidebar.propTypes = propTypes;

export default Sidebar;
