import React, { useState } from 'react';
import { Col, DatePicker, Divider, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import Modal from '../../../../../components/Modal/Modal';
import Icon from '../../../../../components/Icon/Icon';
import Button from '../../../../../components/Button/Button';
import Text from '../../../../../components/Text/Text';
import Label from '../../../../../components/Label/Label';
import './styles.less';
import { useLocaleState } from '../../../../../i18n';
import { DaysOffParams } from '../../types';
import { addDaysOff } from '../../services';

type Props = {
  visible: boolean;
  closeModal: () => void;
};

const { RangePicker } = DatePicker;

const DaysOffModal: React.FC<Props> = ({ visible, closeModal }) => {
  const { t } = useTranslation('translation');
  const { locale } = useLocaleState();

  const [daysOff, setDaysOff] = useState<DaysOffParams>({
    from: null,
    to: null,
    message: '',
  });

  const [prevDate, setPrevDate] = useState<Date>(new Date());
  const [nextDate, setNextDate] = useState<Date>(moment().add(1, 'month').toDate());

  const queryClient = useQueryClient();

  const changePanel = (action: string): void => {
    let btn;
    switch (action) {
      case 'next':
        btn = document.querySelector(
          '.days-off-calendar button.ant-picker-header-next-btn',
        ) as HTMLButtonElement;
        if (btn) btn.click();
        setPrevDate(moment(prevDate).add(1, 'month').toDate());
        setNextDate(moment(nextDate).add(1, 'month').toDate());
        break;

      case 'prev':
        btn = document.querySelector(
          '.days-off-calendar button.ant-picker-header-prev-btn',
        ) as HTMLButtonElement;
        if (btn) btn.click();
        setPrevDate(moment(prevDate).subtract(1, 'month').toDate());
        setNextDate(moment(nextDate).subtract(1, 'month').toDate());
        break;

      default:
        break;
    }
  };

  const handleSelectRange = ([from, to]: any): void => {
    setDaysOff({
      ...daysOff,
      from: from ? from.toDate() : null,
      to: to ? to.toDate() : null,
    });
  };

  const handleMessageChange = (message: string): void => {
    setDaysOff({
      ...daysOff,
      message,
    });
  };

  const { mutateAsync, isLoading } = useMutation(addDaysOff);

  const handleSave = async () => {
    await mutateAsync(daysOff);
    queryClient.invalidateQueries('days-off');
    closeModal();
  };

  return (
    <Modal
      title={t('Add Days Off')}
      visible={visible}
      width={780}
      onCancel={closeModal}
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={handleSave}
          loading={isLoading}
          style={{ textTransform: 'uppercase' }}
          disabled={!daysOff.from}
        >
          {t('save')}
        </Button>
      }
    >
      <>
        <div style={{ padding: '24px' }}>
          <Row justify="space-between" style={{ padding: '0 16px' }}>
            <Col>
              <Row justify="space-between" style={{ width: 300 }}>
                <Col>
                  <Text size="xl" style={{ fontWeight: 'bold' }}>
                    {moment(prevDate).format('MMMM YYYY')}
                  </Text>
                </Col>
                <Col>
                  <Text size="lg" type="secondary" style={{ fontWeight: 500 }}>
                    {/* 7 Appointments */}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="space-between" style={{ width: 300 }}>
                <Col>
                  <Text size="xl" style={{ fontWeight: 'bold' }}>
                    {moment(nextDate).format('MMMM YYYY')}
                  </Text>
                </Col>
                <Col>
                  <Text size="lg" type="secondary" style={{ fontWeight: 500 }}>
                    {/* 7 Appointments */}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <RangePicker
            allowClear={false}
            open
            className="days-off-calendar"
            getPopupContainer={(triggerNode) => triggerNode}
            onCalendarChange={(values) => handleSelectRange(values)}
            disabledDate={(currentDate) => currentDate.isBefore(moment(), 'day')}
          />
          <Row justify="space-between" align="middle">
            <Col>
              <Button type="link" style={{ display: 'flex' }} onClick={() => changePanel('prev')}>
                <Row align="middle">
                  <Col>
                    <Text style={{ fontWeight: 'normal' }}>
                      {locale === 'ar' ? (
                        <Icon name="arrow-right-s-line" />
                      ) : (
                        <Icon name="arrow-left-s-line" />
                      )}
                    </Text>
                  </Col>
                  <Col>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      PREV
                    </Text>
                  </Col>
                </Row>
              </Button>
            </Col>

            <Col>
              <Button type="link" style={{ display: 'flex' }} onClick={() => changePanel('next')}>
                <Row align="middle">
                  <Col>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      NEXT
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontWeight: 'normal' }}>
                      {locale === 'ar' ? (
                        <Icon name="arrow-left-s-line" />
                      ) : (
                        <Icon name="arrow-right-s-line" />
                      )}
                    </Text>
                  </Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </div>
        <Divider style={{ marginTop: 0 }} />
        <div style={{ padding: '0 45px' }}>
          <Label title={t('Message to Patients')} />
          <Form.Item style={{ marginTop: 4 }}>
            <Input.TextArea
              name="message"
              maxLength={240}
              autoSize={{ minRows: 4 }}
              value={daysOff?.message}
              placeholder={t('Send a message to patients booked in those days')}
              onChange={(e) => handleMessageChange(e.target.value)}
              onBlur={(e) => handleMessageChange(e.target.value)}
            />
          </Form.Item>
        </div>
        <Divider />
      </>
    </Modal>
  );
};

export default DaysOffModal;
