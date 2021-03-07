import React from 'react';
import classNames from 'classnames';
import { IconName } from './types';

export type Props = React.HTMLAttributes<HTMLElement> & {
  size?: number;
  style?: React.CSSProperties;
  name: IconName;
};

const Spacer: React.FC<Props> = ({ name, size, style, className, ...rest }) => {
  return (
    <i
      className={classNames('custom-icon', `ri-${name}`, className, { 'is-size-applied': size })}
      style={{ fontSize: size ?? 22, ...style }}
      {...rest}
    />
  );
};

export default Spacer;
