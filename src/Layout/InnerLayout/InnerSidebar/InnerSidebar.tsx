import React from 'react';
import classnames from 'classnames';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const InnerSidebar: React.FC<Props> = ({ children, style, className, ...rest }) => {
  return (
    <aside
      className={classnames('sidebar', className)}
      style={{
        width: 312,
        minWidth: 312,
        zIndex: 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </aside>
  );
};

export default InnerSidebar;
