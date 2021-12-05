import React from 'react';
import { Col, Row } from 'antd';
import UserProfile from './UserProfile/UserProfile';
import SidebarCollapser from './SidebarCollapser/SidebarCollapser';
import SidebarToggler from './SidebarToggler/SidebarToggler';
import AlertEndPlan from './AlertEndPlan/AlertEndPlan';
import { useGetCurrentSubscription } from '../../../features/Settings/hooks/useGetCurrentSubscription';
// import Search from './Search/Search';

type Props = {
  handleCollapsed: () => void;
  handleToggled: (value: boolean) => void;
  collapsed: boolean;
};

const Header: React.FC<Props> = ({ handleCollapsed, handleToggled, collapsed }) => {
  const { currentSubscription } = useGetCurrentSubscription();
  const [endDays, setEndDays] = React.useState<null | number>(null);

  React.useEffect(() => {
    if (currentSubscription?.data) {
      const diff = new Date(currentSubscription?.data.endAt).getTime() - new Date().getTime();
      const days = Math.ceil(diff / (1000 * 3600 * 24));
      setEndDays(days);
    }
  }, [currentSubscription]);

  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
      <Row style={{ width: '100%' }} justify="space-between" align="middle">
        <Col flex={1}>
          <Row align="middle" gutter={15}>
            <Col>
              <SidebarCollapser handleCollapsed={handleCollapsed} collapsed={collapsed} />
              <SidebarToggler handleToggled={handleToggled} />
            </Col>
            {/* <Col flex="auto">
              <Search />
            </Col> */}
          </Row>
        </Col>
        <Col>
          <Row align="middle">
            <Col>
              {endDays && endDays <= 10 && (
                <AlertEndPlan planName={currentSubscription?.data?.plan.title} endDays={endDays} />
              )}
            </Col>
            <Col>
              <UserProfile />
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
