import React from 'react';

export type Props = {
  name: string;
  type?: 'fill' | 'line';
  style?: React.CSSProperties;
};

const Spacer: React.FC<Props> = ({ name, type = 'line', style, ...rest }) => {
  //   return (
  //     <i
  //       className={`ri-${name}-${type}`}
  //       {...rest}
  //       style={{ fontSize: 20, height: 10, lineHeight: '10px', ...style }}
  //     />
  //   );
  return (
    <svg className="remix" style={{ width: 22, height: 22, ...style }} {...rest}>
      <use xlinkHref={`remixicon.symbol.svg#ri-${name}-${type}`} />
    </svg>
  );
};

export default Spacer;
