import React from 'react';
import classNames from 'classnames';

export type Props = React.HTMLAttributes<HTMLElement> & {
  name: string;
  type?: 'fill' | 'line' | 'none';
  size?: number;
  style?: React.CSSProperties;
};

const Spacer: React.FC<Props> = ({ name, type = 'line', size = 22, style, ...rest }) => {
  return (
    <i
      className={classNames('custom-icon', `ri-${name}${type === 'none' ? '' : `-${type}`}`)}
      style={{ fontSize: size, ...style }}
      {...rest}
    />
  );
};

export default Spacer;
