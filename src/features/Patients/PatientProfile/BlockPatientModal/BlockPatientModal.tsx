import { Avatar, Col, Form, Input, Radio, Row } from 'antd';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import { blockPatient } from '../../services';
import { SelectedPatient, BlockPatientParams } from '../../types';
import Spacer from '../../../../components/Spacer/Spacer';
import Label from '../../../../components/Label/Label';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  patient?: SelectedPatient;
  setPatient: (values: SelectedPatient) => void;
};

const BlockPatientModal: React.FC<Props> = ({ visible, setVisible, patient, setPatient }) => {
  const { t } = useTranslation('translation');

  const { mutateAsync, isLoading } = useMutation(blockPatient);
  const queryClient = useQueryClient();

  const handleBlockPatient = async (values: BlockPatientParams) => {
    if (patient?.id) {
      await mutateAsync(values);
      queryClient.invalidateQueries(['blocked-patients']);
      queryClient.invalidateQueries(['patients']);
      setPatient({ ...patient, blocked: true });
      setVisible(false);
    }
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    reason: Yup.string().required(t('errors:required field')),
    comment: Yup.string().when('reason', {
      is: 'other',
      then: Yup.string().required(t('errors:required field')),
      otherwise: Yup.string(),
    }),
  });

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { patientId: patient?.id, reason: '', comment: '' } as BlockPatientParams,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleBlockPatient,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <Modal
      title={t('block patient')}
      visible={visible}
      width={535}
      onCancel={() => setVisible(false)}
    >
      <Form onFinish={handleSubmit} form={form}>
        <div style={{ padding: 32 }}>
          <div style={{ marginBottom: 32 }}>
            <Text size="xxl">
              {/* {t('confirm patient block:')} */}
              Are you sure you want to block the patient:
            </Text>
          </div>
          <Row gutter={16} align="middle" style={{ marginBottom: 24 }}>
            <Col>
              {patient?.picture ? (
                <Avatar src={patient?.picture} size={57} shape="circle" />
              ) : (
                <Avatar src={patient?.picture} size={57} shape="circle">
                  {patient?.firstName[0]?.toUpperCase()}
                  {patient?.lastName[0]?.toUpperCase()}
                </Avatar>
              )}
            </Col>
            <Col>
              <Text size="xxl" style={{ fontWeight: 500 }}>
                {patient?.firstName} {patient?.lastName}
              </Text>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={24} style={{ marginBottom: 28 }}>
              <Label
                title={t('select a reason')}
                error={touched.reason ? errors.reason : undefined}
              />
            </Col>
            <Col span={24}>
              <Radio.Group
                name="reason"
                onChange={handleChange}
                value={values.reason}
                style={{ width: '100%' }}
              >
                <Spacer size="md" direction="vertical">
                  <Radio value="reason 1">reason 1</Radio>
                  <Radio value="reason 2">reason 2</Radio>
                  <Radio value="reason 3">reason 3</Radio>
                  <Spacer size="xs" direction="vertical">
                    <Radio value="other">{t('other')}</Radio>
                    {values.reason === 'other' ? (
                      <>
                        <Label title="" error={touched.comment ? errors.comment : undefined} />
                        <Form.Item
                          validateStatus={
                            touched.reason && Boolean(errors.reason) ? 'error' : undefined
                          }
                        >
                          <Input
                            name="comment"
                            value={values.comment}
                            placeholder={t('type your reason')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Item>
                      </>
                    ) : null}
                  </Spacer>
                </Spacer>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={32} style={{ marginTop: 32 }}>
            <Col flex={1}>
              <Button type="default" block onClick={() => setVisible(false)}>
                {t('no, keep it')}
              </Button>
            </Col>
            <Col flex={1}>
              <Button
                type="primary"
                danger
                block
                icon={<Icon name="admin-line" />}
                style={{ textTransform: 'uppercase' }}
                onClick={form.submit}
                loading={isLoading}
              >
                {t('yes, block patient')}
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default BlockPatientModal;
