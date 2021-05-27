import { Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InnerLayout } from '../../Layout';
import Calendar from './components/Calendar/Calendar';
import { Text, Icon, Button } from '../../components';
import DayView from './views/DayView/DayView';
import VisitReasons from './components/VisitReasons/VisitReasons';
import { useLocaleState } from '../../i18n';
import WeekView from './views/WeekView/WeekView';
import './styles.less';
import HeaderDatePicker from './components/HeaderDatePicker/HeaderDatePicker';
import AppointmentAdd from './views/AppointmentAdd/AppointmentAdd';
import AppointmentCount from './components/AppointmentCount/AppointmentCount';
import { AppointmentForm, Patient } from './types';
import AppointmentDetails from './views/AppointmentDetails/AppointmentDetails';
import AppointmentStart from './views/AppointmentStart/AppointmentStart';
import { ProtectedComponent } from '../Auth';

const Appointments: React.FC = () => {
  const { locale } = useLocaleState();
  const history = useHistory();
  const { pathname } = useLocation();
  const { t } = useTranslation('translation');

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [prevDate, setPrevDate] = useState<Date>(currentDate);
  const [nextDate, setNextDate] = useState<Date>(moment(currentDate).add(1, 'month').toDate());
  const [showAppointmentAdd, setShowAppointmentAdd] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showAppointmentStart, setShowAppointmentStart] = useState(false);
  const [appointmentDetailsId, setAppointmentDetailsId] = useState('');
  const [addAppointmentForm, setAddAppointmentForm] = useState<AppointmentForm>({
    patientId: '',
    start: null,
    time: null,
    duration: undefined,
    reasonId: '',
  });
  const [visitReasonIds, setVisitReasonIds] = useState<string[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>();

  const onPrevDateChange = (date: Date): void => {
    if (date > prevDate && moment(date).month() !== moment(prevDate).month())
      setNextDate(moment(nextDate).add(1, 'month').toDate());
    else if (date < prevDate && moment(date).month() !== moment(prevDate).month())
      setNextDate(moment(nextDate).subtract(1, 'month').toDate());

    setPrevDate(date);
    setCurrentDate(date);
  };

  const onNextDateChange = (date: Date): void => {
    if (date > nextDate && moment(date).month() !== moment(nextDate).month())
      setPrevDate(moment(prevDate).add(1, 'month').toDate());
    else if (date < nextDate && moment(date).month() !== moment(nextDate).month())
      setPrevDate(moment(prevDate).subtract(1, 'month').toDate());

    setNextDate(date);
    setCurrentDate(date);
  };

  const changePanel = (action: string): void => {
    switch (action) {
      case 'next':
        setPrevDate(moment(prevDate).add(2, 'month').toDate());
        setNextDate(moment(nextDate).add(2, 'month').toDate());
        break;

      case 'prev':
        setPrevDate(moment(prevDate).subtract(2, 'month').toDate());
        setNextDate(moment(nextDate).subtract(2, 'month').toDate());
        break;

      default:
        break;
    }
  };

  const handleScheduleNewAppointment = (value: Patient) => {
    setPatient(value);
    setShowAppointmentAdd(true);
  };

  useEffect(() => {
    if (!showAppointmentAdd) setPatient(undefined);
  }, [showAppointmentAdd]);

  return (
    <InnerLayout>
      {pathname !== '/appointments/week' ? (
        <InnerLayout.Sidebar>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              <div style={{ padding: '18px 24px 13px 24px' }}>
                <Text size="xl" style={{ fontWeight: 'bold' }}>
                  {t('appointments')}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <Calendar date={prevDate} onSelectDate={onPrevDateChange} currentDate={currentDate} />
              <Divider style={{ margin: 0 }} />
              <Calendar date={nextDate} onSelectDate={onNextDateChange} currentDate={currentDate} />
            </div>
            <div>
              <div>
                <Divider style={{ margin: 0 }} />
                <div>
                  <Row style={{ height: 70 }} align="middle">
                    <Col flex={1}>
                      <Button
                        type="link"
                        style={{ margin: '0 auto', display: 'flex' }}
                        onClick={() => changePanel('prev')}
                      >
                        <Text style={{ fontWeight: 'normal' }}>
                          {locale === 'ar' ? (
                            <Icon name="arrow-right-s-line" style={{ marginLeft: 16 }} />
                          ) : (
                            <Icon name="arrow-left-s-line" style={{ marginRight: 16 }} />
                          )}
                        </Text>
                        <Text size="md" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                          {t('prev')}
                        </Text>
                      </Button>
                    </Col>
                    <Col>
                      <Divider type="vertical" style={{ height: 70 }} />
                    </Col>
                    <Col flex={1}>
                      <Button
                        type="link"
                        style={{ margin: '0 auto', display: 'flex' }}
                        onClick={() => changePanel('next')}
                      >
                        <Text size="md" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                          {t('next')}
                        </Text>
                        <Text style={{ fontWeight: 'normal' }}>
                          {locale === 'ar' ? (
                            <Icon name="arrow-left-s-line" style={{ marginRight: 16 }} />
                          ) : (
                            <Icon name="arrow-right-s-line" style={{ marginLeft: 16 }} />
                          )}
                        </Text>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </InnerLayout.Sidebar>
      ) : null}

      <InnerLayout.Content style={{ padding: '18px 40px' }}>
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={24}>
                {pathname === '/appointments/week' ? (
                  <>
                    <Col>
                      <Text size="xl" style={{ fontWeight: 'bold' }}>
                        {t('appointments')}
                      </Text>
                    </Col>
                    <Col>
                      <Divider type="vertical" style={{ height: 50, borderWidth: 2 }} />
                    </Col>
                  </>
                ) : null}
                <Col>
                  <Row align="middle">
                    <Col>
                      <Text size="xxl" style={{ fontWeight: 'bold' }}>
                        {moment(currentDate).format('dddd, MMMM DD')}
                      </Text>
                    </Col>
                    {pathname === '/appointments/week' ? (
                      <Col>
                        <HeaderDatePicker
                          date={currentDate}
                          handleUpdateDate={(date) => setCurrentDate(date)}
                        />
                      </Col>
                    ) : null}
                  </Row>
                  <AppointmentCount date={currentDate} type="day" />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={10}>
                <ProtectedComponent accessCode="reasons/settings">
                  <Col>
                    <VisitReasons
                      visitReasonIds={visitReasonIds}
                      setVisitReasonIds={setVisitReasonIds}
                    />
                  </Col>
                </ProtectedComponent>
                <Col>
                  <Button
                    className="btn-view-swicther"
                    type="text"
                    size="small"
                    icon={<Icon name="list-check-2" />}
                    active={pathname === '/appointments'}
                    onClick={() => history.push('/appointments')}
                  >
                    {t('list')}
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="btn-view-swicther"
                    type="text"
                    size="small"
                    icon={<Icon name="calendar-2-line" />}
                    active={pathname === '/appointments/week'}
                    onClick={() => history.push('/appointments/week')}
                  >
                    {t('week')}
                  </Button>
                </Col>
                <ProtectedComponent accessCode="add/appointments">
                  <Col>
                    <Button
                      type="primary"
                      icon={<Icon name="add-line" />}
                      style={{ display: 'flex' }}
                      size="small"
                      onClick={() => setShowAppointmentAdd(true)}
                    >
                      {t('new appointment')}
                    </Button>
                  </Col>
                </ProtectedComponent>
              </Row>
            </Col>
          </Row>
        </div>
        <Divider />
        <div>
          <Switch>
            <Route
              path="/appointments/week"
              render={({ ...props }) => (
                <WeekView
                  currentDate={currentDate}
                  visitReasonIds={visitReasonIds}
                  setAddAppointmentForm={setAddAppointmentForm}
                  appointmentForm={addAppointmentForm}
                  setShowAppointmentAdd={setShowAppointmentAdd}
                  setShowAppointmentDetails={setShowAppointmentDetails}
                  setAppointmentDetailsId={setAppointmentDetailsId}
                  {...props}
                />
              )}
            />
            <Route
              path="/appointments"
              render={({ ...props }) => (
                <DayView
                  currentDate={currentDate}
                  visitReasonIds={visitReasonIds}
                  setShowAppointmentDetails={setShowAppointmentDetails}
                  setShowAppointmentStart={setShowAppointmentStart}
                  setAppointmentDetailsId={setAppointmentDetailsId}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </InnerLayout.Content>
      <ProtectedComponent accessCode="add/appointments">
        <AppointmentAdd
          visible={showAppointmentAdd}
          onClose={() => setShowAppointmentAdd(false)}
          currentDate={currentDate}
          appointmentForm={addAppointmentForm}
          selectedPatient={patient}
        />
      </ProtectedComponent>

      <AppointmentDetails
        visible={showAppointmentDetails}
        onClose={() => setShowAppointmentDetails(false)}
        appointmentId={appointmentDetailsId}
        currentDate={currentDate}
      />
      <ProtectedComponent accessCode="edit/appointments">
        <AppointmentStart
          visible={showAppointmentStart}
          onClose={() => setShowAppointmentStart(false)}
          appointmentId={appointmentDetailsId}
          currentDate={currentDate}
          scheduleNewAppointment={handleScheduleNewAppointment}
        />
      </ProtectedComponent>
    </InnerLayout>
  );
};

export default Appointments;
