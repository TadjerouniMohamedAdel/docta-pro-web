import React from 'react';

type Props = {
  children: React.ReactNode;
};

const InnerSidebar: React.FC<Props> = ({ children }) => {
  return (
    <aside
      className="sidebar"
      style={{
        boxShadow: '4px 0 6px -1px rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
        width: 312,
      }}
    >
      {children}
    </aside>
  );
};

export default InnerSidebar;
