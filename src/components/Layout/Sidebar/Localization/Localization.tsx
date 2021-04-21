import React from 'react';
import { Col, Dropdown, Menu, message, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocaleState } from '../../../../i18n';
import Button from '../../../Button/Button';
import Icon from '../../../Icon/Icon';
import arFlag from '../../../../assets/img/ar.png';
import enFlag from '../../../../assets/img/en.png';
import frFlag from '../../../../assets/img/fr.png';

const Localization: React.FC = () => {
  const { locale, setLocale } = useLocaleState();
  const { t, i18n } = useTranslation();

  const handleLocaleChange = (e: any): void => {
    const result = message.loading(t('changing language'), 0) as unknown;
    const hide = result as () => void;

    i18n.changeLanguage(e.key, () => {
      setLocale(e.key);
      localStorage.setItem('locale', e.key);
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
          selectedKeys={[locale as string]}
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
      <Button block type="default" size="small">
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col>
            {locale ? (
              <Row align="middle" gutter={16}>
                <Col>
                  <img src={languages[locale].flag} alt="flag" />
                </Col>
                <Col>
                  <Typography>{languages[locale].title}</Typography>
                </Col>
              </Row>
            ) : null}
          </Col>
          <Col>
            <Icon name="arrow-drop-up-line" size={32} />
          </Col>
        </Row>
      </Button>
    </Dropdown>
  );
};

export default Localization;
