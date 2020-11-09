import React from 'react';

export type Props = {
  name: string;
  type?: 'fill' | 'line';
  size?: number;
  style?: React.CSSProperties;
};

const Spacer: React.FC<Props> = ({ name, type = 'line', size = 22, style, ...rest }) => {
  return (
    <svg className="remix" style={{ width: size, height: size, ...style }} {...rest}>
      <use xlinkHref={`remixicon.symbol.svg#ri-${name}-${type}`} />
    </svg>
  );
};

export default Spacer;
