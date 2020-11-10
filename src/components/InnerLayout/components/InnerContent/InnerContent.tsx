import React from 'react';

type Props = {
  children: React.ReactNode;
};

const InnerContent: React.FC<Props> = ({ children }) => {
  return (
    <aside className="content" style={{ padding: '18px 40px' }}>
      {children}
    </aside>
  );
};

export default InnerContent;
