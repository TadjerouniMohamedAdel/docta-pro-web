import React from 'react';
import { Typography } from 'antd';
import { LinkProps } from 'antd/lib/typography/Link';

export type Props = LinkProps & {
  children: React.ReactNode;
};

const Link: React.FC<Props> = ({ children, ...rest }) => {
  return <Typography.Link {...rest}>{children}</Typography.Link>;
};

export default Link;
