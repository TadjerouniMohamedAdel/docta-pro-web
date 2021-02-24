/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { Avatar, Col, Divider, Dropdown, Form, Input, Menu, Row, Select as AntSelect } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import ReactInputMask from 'react-input-mask';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import Icon from '../../../components/Icon/Icon';
import Label from '../../../components/Label/Label';
import Select from '../../../components/Select/Select';
import { AppointmentForm, AppointmentStatus, Patient } from '../types';
import { editAppointment, fetchAppointmentsDetails, updateAppointmentStatus } from '../services';
import i18n from '../../../i18n';
import DatePicker from '../../../components/DatePicker/DatePicker';
import TimePicker from '../../../components/TimePicker/TimePicker';
import { FetchSpecialtyResponse } from '../../Settings/VisitReasons/types';
import { getWeekRange } from '../../../utils/date';
import Spacer from '../../../components/Spacer/Spacer';
import Text from '../../../components/Text/Text';

type Props = {
  visible: boolean;
  onClose: () => void;
  appointmentId: string;
  currentDate: Date;
};

const { Option } = AntSelect;

const StartAppointmentModal: React.FC<Props> = ({
  visible,
  onClose,
  appointmentId,
  currentDate,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const minute = t('minute');
  const hour = t('hour');
  const [statusAction, setStatusAction] = useState<AppointmentStatus | ''>('');
  const [patient, setPatient] = useState<Patient>({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    gender: undefined,
    generalStatus: '',
    picture: '',
  });

  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    id: '',
    patientId: '',
    start: null,
    time: null,
    duration: undefined,
    reasonId: '',
  });

  const cache = useQueryClient();

  const specialties = cache.getQueryData('appointment-specialties') as {
    data: FetchSpecialtyResponse[];
  };

  const [form] = Form.useForm();

  const validationSchema = Yup.object().shape({
    patientId: Yup.string().required(t('errors:required field')),
    start: Yup.date().required(t('errors:required field')),
    time: Yup.string().required(t('errors:required field')),
    reasonId: Yup.string().required(t('errors:required field')),
    duration: Yup.number().required(t('errors:required field')),
  });

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useMutation(editAppointment);
  const { mutateAsync: mutateAsyncStatus, isLoading: isLoadingStatus } = useMutation(
    updateAppointmentStatus,
  );
  // const { mutateAsync: mutateAsyncDone, isLoading: isLoadingDone } = useMutation(
  //   updateAppointmentStatus,
  // );
  // const { mutateAsync: mutateAsyncAbsent, isLoading: isLoadingAbsent } = useMutation(
  //   updateAppointmentStatus,
  // );

  const queryClient = useQueryClient();

  const handleEditAppointment = async (values: AppointmentForm) => {
    const time = moment(values.time).format('HH:mm').toString();
    const data = {
      ...values,
      start: moment(values.start)
        .set({
          h: parseInt(time.split(':')[0]),
          m: parseInt(time.split(':')[1]),
          s: 0,
          ms: 0,
        })
        .toDate(),
    };
    await mutateAsyncEdit({
      appointmentId,
      appointmentForm: data,
    });

    // TODO: remove ivalidateQueries adn replace it with a hook that updates query cache data (setQueryData)
    queryClient.invalidateQueries(['appointments-day', currentDate]);
    const { start, end } = getWeekRange(currentDate);
    queryClient.invalidateQueries(['appointments-week', start, end]);

    onClose();
  };

  const handleDoneAppointment = async () => {
    setStatusAction('DONE');
    await mutateAsyncStatus({ appointmentId, status: 'DONE' });
    setStatusAction('');
    // TODO: remove ivalidateQueries adn replace it with a hook that updates query cache data (setQueryData)
    queryClient.invalidateQueries(['appointments-day', currentDate]);
    const { start, end } = getWeekRange(currentDate);
    queryClient.invalidateQueries(['appointments-week', start, end]);

    onClose();
  };

  const handleDeleteAppointment = async () => {
    setStatusAction('DOCTOR_CANCELED');
    await mutateAsyncStatus({ appointmentId, status: 'DOCTOR_CANCELED' });
    setStatusAction('');
    // TODO: remove ivalidateQueries adn replace it with a hook that updates query cache data (setQueryData)
    queryClient.invalidateQueries(['appointments-day', currentDate]);
    const { start, end } = getWeekRange(currentDate);
    queryClient.invalidateQueries(['appointments-week', start, end]);

    onClose();
  };

  const handlePatientAbsent = async () => {
    setStatusAction('PATIENT_MISSED');
    await mutateAsyncStatus({ appointmentId, status: 'PATIENT_MISSED' });
    setStatusAction('');
    // TODO: remove ivalidateQueries adn replace it with a hook that updates query cache data (setQueryData)
    queryClient.invalidateQueries(['appointments-day', currentDate]);
    const { start, end } = getWeekRange(currentDate);
    queryClient.invalidateQueries(['appointments-week', start, end]);

    onClose();
  };

  const formik = useFormik({
    initialValues: appointmentForm as AppointmentForm,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleEditAppointment,
  });

  const { handleChange, values, handleSubmit, touched, errors, setFieldValue } = formik;

  const onReasonChange = (reasonId: string) => {
    if (specialties && specialties.data) {
      let duration;
      specialties.data.forEach((specialty) => {
        duration = specialty.reasons.filter((reason) => reason.id === reasonId)[0].duration;
      });

      if (duration) setFieldValue('duration', duration);
    }
  };

  const handleFetchAppointmentDetails = async () => {
    try {
      const response = await fetchAppointmentsDetails(appointmentId);
      setAppointmentForm({
        start: new Date(response.start),
        time: new Date(response.start),
        reasonId: response.reason.id,
        duration: response.duration,
        patientId: response.patient.id,
      });

      setPatient(response.patient);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appointmentId) handleFetchAppointmentDetails();
  }, [appointmentId]);

  return (
    <Modal
      title={t('Appointment Details')}
      visible={visible}
      width={780}
      onCancel={onClose}
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={form.submit}
          loading={isLoadingEdit}
          style={{ textTransform: 'uppercase' }}
        >
          {t('save')}
        </Button>
      }
    >
      <div style={{ padding: '16px 40px' }}>
        <Form onFinish={handleSubmit} form={form}>
          <Row gutter={[35, 16]}>
            <Col span={15}>
              <Label title={t('date')} required />
              <Form.Item
                validateStatus={touched.start && Boolean(errors.start) ? 'error' : undefined}
              >
                <DatePicker
                  prefixIcon={<Icon name="calendar-event-line" />}
                  name="date"
                  value={values.start ? moment(values.start) : null}
                  placeholder={i18n.t('placeholders:select', {
                    fieldName: t('appointment date'),
                  })}
                  onChange={(value) => {
                    handleChange({
                      target: { name: 'start', value },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Label title={t('time')} required />
              <Form.Item
                validateStatus={touched.time && Boolean(errors.time) ? 'error' : undefined}
              >
                <TimePicker
                  prefixIcon={<Icon name="time-line" />}
                  name="time"
                  value={values.time ? moment(values.time) : null}
                  format="HH:mm"
                  minuteStep={5}
                  style={{ width: '100%' }}
                  placeholder={i18n.t('placeholders:select', {
                    fieldName: t('appointment time'),
                  })}
                  onChange={(time) => {
                    handleChange({
                      target: { name: 'time', value: time },
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={15}>
              <Label
                title={t('reason')}
                error={touched.reasonId ? errors.reasonId : undefined}
                required
              />
              <Form.Item
                validateStatus={touched.reasonId && Boolean(errors.reasonId) ? 'error' : undefined}
              >
                <Select
                  prefixIcon={<Icon name="award-line" />}
                  placeholder={i18n.t('placeholders:select', {
                    fieldName: t('appointment reason'),
                  })}
                  dropdownMatchSelectWidth={false}
                  value={values.reasonId || undefined}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: 'reasonId',
                        value,
                      },
                    });
                    onReasonChange(value);
                  }}
                >
                  {specialties && specialties.data
                    ? specialties.data.map((specialty) =>
                        specialty.reasons.map((visitReason) => (
                          <Option key={visitReason.id} value={visitReason.id}>
                            {visitReason.name}
                          </Option>
                        )),
                      )
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Label
                title={t('duration')}
                error={touched.duration ? errors.duration : undefined}
                required
              />
              <Form.Item
                validateStatus={touched.duration && Boolean(errors.duration) ? 'error' : undefined}
              >
                <Select
                  prefixIcon={<Icon name="time-line" />}
                  placeholder={t('appointment duration')}
                  dropdownMatchSelectWidth={false}
                  style={{ width: '100%' }}
                  value={values.duration}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: 'duration',
                        value,
                      },
                    });
                  }}
                >
                  <Option value={15}> 15 {minute}</Option>
                  <Option value={20}> 20 {minute}</Option>
                  <Option value={25}> 25 {minute}</Option>
                  <Option value={30}> 30 {minute}</Option>
                  <Option value={35}> 35 {minute}</Option>
                  <Option value={40}> 40 {minute}</Option>
                  <Option value={45}> 45 {minute}</Option>
                  <Option value={50}> 50 {minute}</Option>
                  <Option value={55}> 55 {minute}</Option>
                  <Option value={60}> 1 {hour}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Divider style={{ marginTop: 0, marginBottom: 0 }} />
      <div style={{ padding: '16px 40px' }}>
        <Row gutter={[35, 16]}>
          <Col span={12}>
            <Row gutter={16}>
              <Col>
                {patient.picture ? (
                  <Avatar src={patient.picture} size={75} shape="square" />
                ) : (
                  <Avatar src={patient.picture} size={75} shape="square">
                    {patient.firstName[0]?.toUpperCase()}
                    {patient.lastName[0]?.toUpperCase()}
                  </Avatar>
                )}
              </Col>
              <Col flex={1}>
                <Label title={t('first name')} />
                <Form.Item>
                  <Input
                    prefix={<Icon name="user-line" />}
                    name="firstName"
                    value={patient.firstName}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col flex={12}>
            <Label title={t('last name')} />
            <Form.Item>
              <Input
                prefix={<Icon name="user-line" />}
                name="lastName"
                value={patient.lastName}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[35, 16]}>
          <Col span={12}>
            <Label title={t('birthday')} />
            <Form.Item>
              <DatePicker
                disabled
                prefixIcon={<Icon name="mail-line" />}
                name="birthDate"
                value={patient.birthDate ? moment(patient.birthDate) : null}
                placeholder={i18n.t('placeholders:enter', {
                  fieldName: t('birthday'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title={t('gender')} />
            <Form.Item>
              <Select
                disabled
                prefixIcon={<Icon name="genderless-line" />}
                placeholder={i18n.t('placeholders:select', {
                  fieldName: t('gender'),
                })}
                dropdownMatchSelectWidth={false}
                value={patient.gender}
              >
                <AntSelect.Option value="MALE">Male</AntSelect.Option>
                <AntSelect.Option value="Female">Female</AntSelect.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title={t('phone number')} />
            <Form.Item>
              <ReactInputMask
                disabled
                mask="+213 999 999 999"
                maskChar={null}
                placeholder={`+213 ${i18n.t('placeholders:enter', {
                  fieldName: t('phone number'),
                })}`}
                value={patient.phone}
                dir="ltr"
              >
                {(inputProps: any) => (
                  <Input
                    disabled
                    prefix={<Icon name="phone-line" />}
                    name="phone"
                    value={patient.phone}
                    {...inputProps}
                  />
                )}
              </ReactInputMask>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title={t('general status')} />
            <Form.Item>
              <Input
                disabled
                prefix={<Icon name="heart-pulse-line" />}
                name="generalStatus"
                value={patient.generalStatus}
                placeholder={i18n.t('placeholders:enter', {
                  fieldName: t('general status'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify="space-between">
              <Col>
                <Spacer size="xl">
                  <Dropdown
                    placement="topLeft"
                    overlayStyle={{ minWidth: 240 }}
                    overlay={
                      <Menu>
                        <Menu.Item onClick={handlePatientAbsent}>
                          <Spacer size="sm">
                            <Icon name="user-unfollow-line" />
                            <Text>{t('patient absent')}</Text>
                          </Spacer>
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <Button
                      type="default"
                      size="small"
                      loading={isLoadingStatus && statusAction === 'PATIENT_MISSED'}
                    >
                      <Icon name="more-2-fill" size={24} />
                    </Button>
                  </Dropdown>
                  <Button
                    type="primary"
                    danger
                    icon={<Icon name="delete-bin-2-line" />}
                    onClick={handleDeleteAppointment}
                    loading={isLoadingStatus && statusAction === 'DOCTOR_CANCELED'}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {t('delete')}
                  </Button>
                </Spacer>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<Icon name="calendar-todo-line" />}
                  onClick={handleDoneAppointment}
                  loading={isLoadingStatus && statusAction === 'DONE'}
                >
                  {t('appointment done')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default StartAppointmentModal;
