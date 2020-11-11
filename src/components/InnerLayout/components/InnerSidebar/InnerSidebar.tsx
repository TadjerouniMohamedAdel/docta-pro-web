import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const InnerSidebar: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <aside
      className="sidebar"
      style={{
        boxShadow: '4px 0 6px -1px rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06)',
        width: 312,
        zIndex: 1,
      }}
      {...rest}
    >
      {children}
    </aside>
  );
};

export default InnerSidebar;
