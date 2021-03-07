import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const InnerSidebar: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <aside
      className="sidebar"
      style={{
        width: 312,
        minWidth: 312,
        zIndex: 1,
      }}
      {...rest}
    >
      {children}
    </aside>
  );
};

export default InnerSidebar;
