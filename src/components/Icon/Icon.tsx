import React from 'react';
import classNames from 'classnames';
import { IconName } from './types';

export type Props = React.HTMLAttributes<HTMLElement> & {
  size?: number;
  style?: React.CSSProperties;
  name: IconName;
};

const Spacer: React.FC<Props> = ({ name, size = 22, style, ...rest }) => {
  return (
    <i
      className={classNames('custom-icon', `ri-${name}`)}
      style={{ fontSize: size, ...style }}
      {...rest}
    />
  );
};

export default Spacer;
