/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { Avatar, Col, Divider, Form, Input, Row, Select as AntSelect } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import ReactInputMask from 'react-input-mask';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import Icon from '../../../components/Icon/Icon';
import Label from '../../../components/Label/Label';
import Select from '../../../components/Select/Select';
import { AppointmentForm, Patient } from '../types';
import { addAppointment } from '../services';
import i18n from '../../../i18n';
import DatePicker from '../../../components/DatePicker/DatePicker';
import TimePicker from '../../../components/TimePicker/TimePicker';
import { FetchSpecialtyResponse } from '../../Settings/VisitReasons/types';
import PatientAutocomplete from './PatientAutocomplete/PatientAutocomplete';
import { getWeekRange } from '../../../utils/date';
import NewPatient from './NewPatient/NewPatient';
import { StateCity } from '../../../types/types';
import { useGetStatesList } from '../../../hooks/useGetStatesList';
import { useGetCitiesList } from '../../../hooks/useGetCitiesList';

type Props = {
  visible: boolean;
  onClose: () => void;
  currentDate: Date;
  appointmentForm: AppointmentForm;
  selectedPatient?: Patient;
};

const { Option } = AntSelect;

const AddAppointmentModal: React.FC<Props> = ({
  visible,
  onClose,
  currentDate,
  appointmentForm,
  selectedPatient,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const minute = t('minute');
  const hour = t('hour');

  const initialPatientValues = {
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    gender: undefined,
    state: undefined,
    city: undefined,
    generalStatus: '',
    picture: '',
  };

  const [patient, setPatient] = useState<Patient>(initialPatientValues);
  const [showNewPatientform, setShowNewPatientForm] = useState<boolean>(false);

  const { mutateAsync, isLoading } = useMutation(addAppointment);

  const cache = useQueryClient();
  const specialties = cache.getQueryData('appointment-specialties') as {
    data: FetchSpecialtyResponse[];
  };

  const { states } = useGetStatesList();
  const { cities } = useGetCitiesList(patient.state);

  const [form] = Form.useForm();

  const validationSchema = Yup.object().shape({
    patientId: Yup.string().required(t('errors:required field')),
    start: Yup.date().required(t('errors:required field')),
    time: Yup.string().required(t('errors:required field')),
    reasonId: Yup.string().required(t('errors:required field')),
    duration: Yup.number().required(t('errors:required field')),
  });

  const queryClient = useQueryClient();

  const handleAddAppointment = async (values: AppointmentForm) => {
    const time = moment(values.time).format('HH:mm').toString();
    const newAppointment: AppointmentForm = {
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
    await mutateAsync(newAppointment);

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
    onSubmit: handleAddAppointment,
  });

  const { handleChange, values, handleSubmit, touched, errors, setFieldValue } = formik;

  const onReasonChange = (reasonId: string) => {
    if (specialties && specialties.data) {
      let duration;

      specialties.data.some((specialty) => {
        const reason = specialty.reasons.find((item) => item.id === reasonId);
        if (reason) {
          duration = reason.duration;
          return true;
        }
        return false;
      });

      if (duration) setFieldValue('duration', duration);
    }
  };

  const handleSelectPatient = (value: Patient) => {
    setPatient(value);
  };

  const handleSelectNewPatient = (value: Patient) => {
    setPatient(value);
    setFieldValue('patientId', value.id);
  };

  const handleAddNewPatient = () => {
    setShowNewPatientForm(true);
  };

  useEffect(() => {
    if (selectedPatient) {
      setPatient(selectedPatient);
      setFieldValue('patientId', selectedPatient.id);
    } else setPatient(initialPatientValues);
  }, [selectedPatient]);

  return (
    <Modal
      title={t('New Appointment')}
      visible={visible}
      width={780}
      onCancel={onClose}
      centered
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={form.submit}
          loading={isLoading}
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
                  onChange={(date) => {
                    handleChange({
                      target: { name: 'start', value: date },
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
          <Col span={24}>
            <Row align="bottom">
              <Col flex={1}>
                <Label
                  title={t('search patient')}
                  error={touched.patientId ? errors.patientId : undefined}
                  required
                />
              </Col>
              <Col>
                <Button
                  type="link"
                  size="small"
                  icon={<Icon name="user-add-line" size={18} />}
                  onClick={handleAddNewPatient}
                >
                  {t('new patient')}
                </Button>
              </Col>
            </Row>

            <Form.Item
              validateStatus={touched.patientId && Boolean(errors.patientId) ? 'error' : undefined}
            >
              <PatientAutocomplete onSelectPatient={handleSelectPatient} />
            </Form.Item>
          </Col>
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
                    placeholder={i18n.t('placeholders:enter', {
                      fieldName: t('first name'),
                    })}
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
                placeholder={i18n.t('placeholders:enter', {
                  fieldName: t('last name'),
                })}
                disabled
              />
            </Form.Item>
          </Col>

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
                value={patient.phone ?? ''}
                dir="ltr"
                name="phone"
              >
                {(inputProps: any) => (
                  <Input disabled prefix={<Icon name="phone-line" />} {...inputProps} />
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
          <Col span={12}>
            <Label title={t('state')} />
            <Form.Item>
              <Select
                disabled
                prefixIcon={<Icon name="map-pin-line" />}
                placeholder={i18n.t('placeholders:select', {
                  fieldName: t('state'),
                })}
                value={states?.data ? patient.state : undefined}
                dropdownMatchSelectWidth={false}
              >
                {states?.data
                  ? states.data.map((state: StateCity) => (
                      <AntSelect.Option key={state.id} value={state.id}>
                        {state.name}
                      </AntSelect.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title={t('city')} />
            <Form.Item>
              <Select
                disabled
                prefixIcon={<Icon name="road-map-line" />}
                placeholder={i18n.t('placeholders:select', {
                  fieldName: t('city'),
                })}
                value={cities?.data ? patient.city : undefined}
                dropdownMatchSelectWidth={false}
              >
                {cities?.data
                  ? cities.data.map((city: StateCity) => (
                      <AntSelect.Option key={city.id} value={city.id}>
                        {city.name}
                      </AntSelect.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
      {showNewPatientform ? (
        <NewPatient
          visible={showNewPatientform}
          onClose={() => setShowNewPatientForm(false)}
          handleSelectPatient={handleSelectNewPatient}
        />
      ) : null}
    </Modal>
  );
};
export default AddAppointmentModal;
