import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const InnerContent: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <div className="content" {...rest}>
      {children}
    </div>
  );
};

export default InnerContent;
