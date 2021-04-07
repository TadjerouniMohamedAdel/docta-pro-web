import { Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Calendar from './Calendar/Calendar';
import Text from '../../components/Text/Text';
import Icon from '../../components/Icon/Icon';
import AppointmentsList from './AppointmentsList/AppointmentsList';
import VisitReasons from './VisitReasons/VisitReasons';
import Button from '../../components/Button/Button';
import { useLocaleState } from '../../i18n';
import WeekCalendar from './WeekCalendar/WeekCalendar';
import './styles.less';
import HeaderDatePicker from './HeaderDatePicker/HeaderDatePicker';
import AddAppointmentModal from './AddAppointmentModal/AddAppointmentModal';
import AppointmentCount from './AppointmentCount/AppointmentCount';
import { AppointmentForm, Patient } from './types';
import AppointmentDetails from './AppointmentDetails/AppointmentDetails';
import StartAppointmentModal from './StartAppointmentModal/StartAppointmentModal';
import ProtectedComponent from '../Auth/ProtectedComponent/ProtectedComponent';

const Appointments: React.FC = () => {
  const { locale } = useLocaleState();
  const history = useHistory();
  const { pathname } = useLocation();
  const { t } = useTranslation('translation');

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [prevDate, setPrevDate] = useState<Date>(currentDate);
  const [nextDate, setNextDate] = useState<Date>(moment(currentDate).add(1, 'month').toDate());
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);
  const [showStartAppointmentModal, setShowStartAppointmentModal] = useState(false);
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
    setShowAddAppointmentModal(true);
  };

  useEffect(() => {
    if (!showAddAppointmentModal) setPatient(undefined);
  }, [showAddAppointmentModal]);

  return (
    <InnerLayout>
      {pathname !== '/appointments/week' ? (
        <InnerSidebar>
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
        </InnerSidebar>
      ) : null}

      <InnerContent style={{ padding: '18px 40px' }}>
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
                <Col>
                  <VisitReasons
                    visitReasonIds={visitReasonIds}
                    setVisitReasonIds={setVisitReasonIds}
                  />
                </Col>
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
                      onClick={() => setShowAddAppointmentModal(true)}
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
                <WeekCalendar
                  currentDate={currentDate}
                  visitReasonIds={visitReasonIds}
                  setAddAppointmentForm={setAddAppointmentForm}
                  appointmentForm={addAppointmentForm}
                  setShowAddAppointmentModal={setShowAddAppointmentModal}
                  setShowAppointmentDetailsModal={setShowAppointmentDetailsModal}
                  setAppointmentDetailsId={setAppointmentDetailsId}
                  {...props}
                />
              )}
            />
            <Route
              path="/appointments"
              render={({ ...props }) => (
                <AppointmentsList
                  currentDate={currentDate}
                  visitReasonIds={visitReasonIds}
                  setShowAppointmentDetailsModal={setShowAppointmentDetailsModal}
                  setShowStartAppointmentModal={setShowStartAppointmentModal}
                  setAppointmentDetailsId={setAppointmentDetailsId}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </InnerContent>
      <ProtectedComponent accessCode="add/appointments">
        <AddAppointmentModal
          visible={showAddAppointmentModal}
          onClose={() => setShowAddAppointmentModal(false)}
          currentDate={currentDate}
          appointmentForm={addAppointmentForm}
          selectedPatient={patient}
        />
      </ProtectedComponent>

      <AppointmentDetails
        visible={showAppointmentDetailsModal}
        onClose={() => setShowAppointmentDetailsModal(false)}
        appointmentId={appointmentDetailsId}
        currentDate={currentDate}
      />
      <ProtectedComponent accessCode="edit/appointments">
        <StartAppointmentModal
          visible={showStartAppointmentModal}
          onClose={() => setShowStartAppointmentModal(false)}
          appointmentId={appointmentDetailsId}
          currentDate={currentDate}
          scheduleNewAppointment={handleScheduleNewAppointment}
        />
      </ProtectedComponent>
    </InnerLayout>
  );
};

export default Appointments;
