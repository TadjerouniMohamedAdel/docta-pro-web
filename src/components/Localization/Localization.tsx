import React from 'react';
import { Col, Dropdown, Menu, message, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '..';
import arFlag from '../../assets/img/ar.png';
import enFlag from '../../assets/img/en.png';
import frFlag from '../../assets/img/fr.png';

type Props = {
  collapsed?: boolean;
};

const Localization: React.FC<Props> = ({ collapsed = false }) => {
  const { i18n } = useTranslation();

  const handleLocaleChange = (e: any): void => {
    const result = message.loading('', 0) as unknown;
    const hide = result as () => void;

    i18n.changeLanguage(e.key, () => {
      hide();
    });
  };

  const languages: any = {
    ar: { flag: arFlag, title: 'العربية' },
    en: { flag: enFlag, title: 'English' },
    fr: { flag: frFlag, title: 'Français' },
  };

  return (
    <Dropdown
      overlay={
        <Menu
          style={{ minWidth: 150 }}
          onClick={handleLocaleChange}
          selectedKeys={[i18n.language as string]}
        >
          <Menu.Item key="ar">
            <Row align="middle" gutter={16}>
              <Col>
                <img src={arFlag} alt="flag" />
              </Col>
              <Col>
                <Typography>العربية</Typography>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="en">
            <Row align="middle" gutter={16}>
              <Col>
                <img src={enFlag} alt="flag" />
              </Col>
              <Col>
                <Typography>English</Typography>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="fr">
            <Row align="middle" gutter={16}>
              <Col>
                <img src={frFlag} alt="flag" />
              </Col>
              <Col>
                <Typography>Français</Typography>
              </Col>
            </Row>
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button
        block
        type="default"
        size="small"
        style={collapsed ? { margin: '0px -10px', width: 40 } : undefined}
      >
        <Row justify="space-between" align="middle" style={{ width: '100%' }} wrap={false}>
          <Col>
            {i18n.language ? (
              <Row align="middle" gutter={16} wrap={false}>
                <Col>
                  <img src={languages[i18n.language].flag} alt="flag" />
                </Col>
                {!collapsed ? (
                  <Col>
                    <Typography>{languages[i18n.language].title}</Typography>
                  </Col>
                ) : null}
              </Row>
            ) : null}
          </Col>
          {!collapsed ? (
            <Col>
              <Icon name="arrow-drop-up-line" size={32} />
            </Col>
          ) : null}
        </Row>
      </Button>
    </Dropdown>
  );
};

export default Localization;
