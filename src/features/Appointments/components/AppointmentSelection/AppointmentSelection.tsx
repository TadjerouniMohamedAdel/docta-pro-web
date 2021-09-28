import React, { useEffect, useState } from 'react';
import { Avatar, Col, Divider, Form, FormInstance, Input, Row, Select as AntSelect } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import moment from 'moment';
import i18n from '../../../../i18n';
import { Icon, Label, Select, DatePicker, TimePicker, PhoneInput } from '../../../../components';
import AppointmentSkeleton from '../AppointmentSkeleton/AppointmentSkeleton';
import { AppointmentForm, Patient } from '../../types';
import { FetchSpecialtyResponse } from '../../../Settings/views/VisitReasons/types';
import { fetchAppointmentsDetails } from '../../services';

type Props = {
  onClose: () => void;
  onEditSave: (values: AppointmentForm) => void;
  appointmentId: string;
  currentDate: Date;
  form: FormInstance;
};

type AppointmentData = {
  appointmentForm: AppointmentForm;
  patient: Patient;
  note?: string;
};

const { Option } = AntSelect;

const AppointmentSelection: React.FC<Props> = ({ appointmentId, onEditSave, form }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const [fetchAppointmentLoading, setFetchAppointmentLoading] = useState(false);

  const minute = t('minute');
  const hour = t('hour');

  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    appointmentForm: {
      id: '',
      patientId: '',
      start: null,
      time: null,
      duration: undefined,
      reasonId: '',
    },
    patient: {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      birthDate: '',
      gender: undefined,
      generalStatus: '',
      picture: '',
    },
    note: undefined,
  });

  const cache = useQueryClient();

  const specialties = cache.getQueryData('appointment-specialties') as {
    data: FetchSpecialtyResponse[];
  };

  const validationSchema = Yup.object().shape({
    patientId: Yup.string().required(t('errors:required field')),
    start: Yup.date().required(t('errors:required field')),
    time: Yup.string().required(t('errors:required field')),
    reasonId: Yup.string().required(t('errors:required field')),
    duration: Yup.number().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues: appointmentData.appointmentForm as AppointmentForm,
    enableReinitialize: true,
    validationSchema,
    onSubmit: onEditSave,
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
      setFetchAppointmentLoading(true);
      const response = await fetchAppointmentsDetails(appointmentId);
      setAppointmentData({
        ...appointmentData,
        appointmentForm: {
          start: new Date(response.start),
          time: new Date(response.start),
          reasonId: response.reason.id,
          duration: response.duration,
          patientId: response.patient.id,
        },
        patient: response.patient,
        note: response.note,
      });
    } catch (error) {
      console.log(error);
    }
    setFetchAppointmentLoading(false);
  };

  useEffect(() => {
    if (appointmentId) handleFetchAppointmentDetails();
  }, [appointmentId]);

  return (
    <div>
      {' '}
      {fetchAppointmentLoading ? (
        <AppointmentSkeleton.AppointmentDetails />
      ) : (
        <>
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
                    validateStatus={
                      touched.reasonId && Boolean(errors.reasonId) ? 'error' : undefined
                    }
                  >
                    <Select
                      prefixIcon={<Icon name="stethoscope-line" />}
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
                    validateStatus={
                      touched.duration && Boolean(errors.duration) ? 'error' : undefined
                    }
                  >
                    <Select
                      prefixIcon={<Icon name="timer-line" />}
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
                    {appointmentData.patient.picture ? (
                      <Avatar src={appointmentData.patient.picture} size={75} shape="square" />
                    ) : (
                      <Avatar src={appointmentData.patient.picture} size={75} shape="square">
                        {appointmentData.patient.firstName[0]?.toUpperCase()}
                        {appointmentData.patient.lastName[0]?.toUpperCase()}
                      </Avatar>
                    )}
                  </Col>
                  <Col flex={1}>
                    <Label title={t('first name')} />
                    <Form.Item>
                      <Input
                        prefix={<Icon name="user-line" />}
                        name="firstName"
                        value={appointmentData.patient.firstName}
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
                    value={appointmentData.patient.lastName}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Label title={t('birthday')} />
                <Form.Item>
                  <DatePicker
                    disabled
                    prefixIcon={<Icon name="cake-line" />}
                    name="birthDate"
                    value={
                      appointmentData.patient.birthDate
                        ? moment(appointmentData.patient.birthDate)
                        : null
                    }
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
                    value={appointmentData.patient.gender}
                  >
                    <AntSelect.Option value="MALE">Male</AntSelect.Option>
                    <AntSelect.Option value="Female">Female</AntSelect.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <PhoneInput
                  value={appointmentData.patient.phone}
                  name="phone"
                  label={t('phone number')}
                  placeholder={`+213 ${t('placeholders:enter', {
                    fieldName: t('phone number'),
                  })}`}
                />
              </Col>
              <Col span={12}>
                <Label title={t('general status')} />
                <Form.Item>
                  <Input
                    disabled
                    prefix={<Icon name="heart-pulse-line" />}
                    name="generalStatus"
                    value={appointmentData.patient.generalStatus}
                    placeholder={i18n.t('placeholders:enter', {
                      fieldName: t('general status'),
                    })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          {appointmentData.note ? (
            <>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <div style={{ padding: '16px 40px' }}>
                <Label title={t('note from patient')} />
                <Form.Item>
                  <Input.TextArea
                    name="note"
                    autoSize={{ minRows: 2 }}
                    value={appointmentData.note}
                  />
                </Form.Item>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default AppointmentSelection;
