import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { Col, Menu, Row } from 'antd';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import { IconName } from '../../../../components/Icon/types';
import './styles.less';
import { useLocaleState } from '../../../../i18n';

type Props = Omit<MenuItemProps, 'key'> & {
  iconName: IconName;
  title: string;
  path: string;
  exact?: boolean;
};

const MenuItem: React.FC<Props> = ({ iconName, title, path, exact = false, ...rest }) => {
  const { pathname } = useLocation();
  const { locale } = useLocaleState();

  const isActive = (): boolean => {
    const match = matchPath(pathname, path);

    if ((exact && match?.isExact) || (!exact && match)) return true;
    return false;
  };

  return (
    <Menu.Item
      key={path}
      title=""
      style={{ display: 'flex', alignItems: 'center', height: 56 }}
      className="setting-menu-item-wrapper"
      {...rest}
    >
      <Row
        style={{ height: '100%', margin: 0 }}
        className={`setting-menu-item  ${isActive() ? 'active' : ''}`}
        align="middle"
        gutter={18}
        wrap={false}
      >
        <Col style={{ display: 'flex' }} offset={1}>
          <Icon name={iconName} size={22} style={{ overflow: 'initial' }} />
        </Col>
        <Col flex={1}>
          <Text className="menu-item-title">{title}</Text>
        </Col>
        <Col style={{ paddingTop: 5 }}>
          <Icon
            className="menu-item-arrow"
            name={locale === 'ar' ? 'arrow-left-s-line' : 'arrow-right-s-line'}
            size={24}
          />
        </Col>
      </Row>
      <Link to={path} />
    </Menu.Item>
  );
};

export default MenuItem;
