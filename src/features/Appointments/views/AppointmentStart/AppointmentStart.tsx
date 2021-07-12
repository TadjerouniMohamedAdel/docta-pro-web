/* eslint-disable radix */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { Col, Dropdown, Form, Menu, Row } from 'antd';
import moment from 'moment';
import { Button, Modal, Icon } from '../../../../components';
import { AppointmentForm, AppointmentStatus } from '../../types';
import { editAppointment, updateAppointmentStatus } from '../../services';
import Spacer from '../../../../components/Spacer/Spacer';
import Text from '../../../../components/Text/Text';
import { useCheckAccess, ProtectedComponent } from '../../../Auth';
import { getWeekRange } from '../../../../common/utilities';
import AppointmentInfo from '../../components/AppointmentInfo/AppointmentInfo';

type Props = {
  visible: boolean;
  onClose: () => void;
  appointmentId: string;
  patientId?: string;
  currentDate: Date;
  scheduleNewAppointment: () => void;
};

const AppointmentStart: React.FC<Props> = ({
  visible,
  onClose,
  appointmentId,
  currentDate,
  scheduleNewAppointment,
  patientId,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const { CheckAccess } = useCheckAccess();

  const [statusAction, setStatusAction] = useState<AppointmentStatus | ''>('');

  const [appointmentForm] = Form.useForm();

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useMutation(editAppointment);
  const { mutateAsync: mutateAsyncStatus, isLoading: isLoadingStatus } = useMutation(
    updateAppointmentStatus,
  );

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

  const handleScheduleNewAppointment = async () => {
    onClose();
    scheduleNewAppointment();
  };

  return (
    <Modal
      title={t('start appointment')}
      visible={visible}
      width={780}
      onCancel={onClose}
      borderedHeader={false}
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={appointmentForm.submit}
          loading={isLoadingEdit}
          style={{ textTransform: 'uppercase' }}
        >
          {t('save')}
        </Button>
      }
    >
      <AppointmentInfo
        onClose={onClose}
        appointmentId={appointmentId}
        currentDate={currentDate}
        onEditSave={handleEditAppointment}
        appointmentForm={appointmentForm}
        patientId={patientId}
      />
      <div style={{ padding: '16px 40px' }}>
        <Row justify="space-between">
          <Col>
            <Spacer size="xl">
              <Dropdown
                placement="topLeft"
                overlayStyle={{ minWidth: 240 }}
                overlay={
                  <Menu>
                    {CheckAccess('permission', 'add/appointments') ? (
                      <Menu.Item onClick={handleScheduleNewAppointment}>
                        <Spacer size="sm">
                          <Icon name="refresh-line" />
                          <Text>{t('new appointment')}</Text>
                        </Spacer>
                      </Menu.Item>
                    ) : null}
                    {CheckAccess('permission', 'edit/appointments') ? (
                      <Menu.Item onClick={handlePatientAbsent}>
                        <Spacer size="sm">
                          <Icon name="user-unfollow-line" />
                          <Text>{t('patient absent')}</Text>
                        </Spacer>
                      </Menu.Item>
                    ) : null}
                  </Menu>
                }
                trigger={['click']}
              >
                <Button
                  type="default"
                  loading={isLoadingStatus && statusAction === 'PATIENT_MISSED'}
                  style={{ paddingLeft: 5, paddingRight: 5 }}
                >
                  <Icon name="more-2-fill" size={24} />
                </Button>
              </Dropdown>
              <ProtectedComponent accessCode="delete/appointments">
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
              </ProtectedComponent>
            </Spacer>
          </Col>
          <ProtectedComponent accessCode="edit/appointments">
            <Col>
              <Button
                type="primary"
                icon={<Icon name="calendar-check-line" />}
                onClick={handleDoneAppointment}
                loading={isLoadingStatus && statusAction === 'DONE'}
              >
                {t('appointment done')}
              </Button>
            </Col>
          </ProtectedComponent>
        </Row>
      </div>
    </Modal>
  );
};

export default AppointmentStart;
