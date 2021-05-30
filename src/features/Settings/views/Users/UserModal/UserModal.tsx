import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, Row, Select as AntSelect, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import generatePassword from 'password-generator';
import {
  Modal,
  Icon,
  Button,
  Text,
  Label,
  Select,
  PhoneInput,
  Link,
} from '../../../../../components';
import { Role, UserForm, Section, AddUserParams, EditUserParams } from '../types';
import i18n from '../../../../../i18n';
import { addUser, editUser, fetchPermissions, fetchRoles } from '../services';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
  user: UserForm;
  pageIndex: number;
  pageSize: number;
};

const { Option } = AntSelect;

const UserModal: React.FC<Props> = ({ visible, setVisible, user, pageIndex, pageSize }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const [roles, setRoles] = useState<Role[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const { mutateAsync: addUserMutate, isLoading: isAddUserLoading } = useMutation(addUser);
  const { mutateAsync: EditUserMutate, isLoading: isEditUserLoading } = useMutation(editUser);

  const queryClient = useQueryClient();

  const phoneRegEx = /(\+[0-9]{11,12})/;

  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    firstName: Yup.string().required(t('errors:required field')),
    lastName: Yup.string().required(t('errors:required field')),
    phone: Yup.string()
      .required(t('errors:required field'))
      .matches(phoneRegEx, i18n.t('errors:must be a valid', { fieldName: t('phone number') })),
    email: Yup.string()
      .required(t('errors:required field'))
      .email(i18n.t('errors:must be a valid', { fieldName: t('email') })),
    roleId: Yup.string().required(t('errors:required field')),
    password: Yup.string().when('id', {
      is: undefined,
      then: Yup.string().required(t('errors:required field')),
      otherwise: Yup.string(),
    }),
  });

  const handleAddUser = async (values: UserForm, permissions: string[]) => {
    const addUserParams: AddUserParams = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.roleId || '',
      password: values.password,
      permissions,
    };

    try {
      await addUserMutate(addUserParams);
      queryClient.invalidateQueries(['users', pageIndex, pageSize]);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (values: UserForm, permissions: string[]) => {
    const editUserParams: EditUserParams = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.roleId || '',
      permissions,
    };

    if (values.password) editUserParams.password = values.password;

    try {
      await EditUserMutate({ id: values.id || '', body: editUserParams });
      queryClient.invalidateQueries(['users', pageIndex, pageSize]);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveUser = async (values: UserForm): Promise<void> => {
    const permissions: string[] = [];

    sections.forEach((section) =>
      section.permissions.forEach((permission) => {
        if (permission.checked) permissions.push(permission.id);
      }),
    );

    if (!values.id) handleAddUser(values, permissions);
    else handleEditUser(values, permissions);
  };

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: user as UserForm,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSaveUser,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors, setFieldValue } = formik;

  const getRoles = async (): Promise<void> => {
    try {
      const response = await fetchRoles();
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPermissions = async (): Promise<void> => {
    try {
      const response = await fetchPermissions();
      setSections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAllPermissions = (value: boolean) => {
    const sectionsToUpdate: Section[] = sections.map((section) => ({
      ...section,
      permissions: section.permissions.map((permission) => ({ ...permission, checked: value })),
    }));

    setSections(sectionsToUpdate);
  };

  const checkRelevantPermission = (role: Role) => {
    const sectionsToUpdate: Section[] = sections.map((section) => ({
      ...section,
      permissions: section.permissions.map((permission) => ({
        ...permission,
        checked: role.permissions.filter((item) => item.id === permission.id).length > 0,
      })),
    }));

    setSections(sectionsToUpdate);
  };

  const handleRoleChange = (id: string) => {
    if (!id) checkAllPermissions(false);
    else {
      const role = roles.find((item) => item.id === id);
      if (role) {
        if (role.permissions.length === 0) checkAllPermissions(true);
        else checkRelevantPermission(role);
      }
    }
  };

  const handlePermissionChange = (id: string, checked: boolean) => {
    const sectionsToUpdate: Section[] = [...sections];

    const sectionIndex: number = sectionsToUpdate.findIndex(
      (section) => section.permissions.filter((permission) => permission.id === id).length > 0,
    );

    if (sectionIndex !== -1) {
      const PermissoinIndex: number = sectionsToUpdate[sectionIndex].permissions.findIndex(
        (permission) => permission.id === id,
      );
      if (PermissoinIndex !== -1) {
        sectionsToUpdate[sectionIndex].permissions[PermissoinIndex].checked = checked;
      }

      setSections(sectionsToUpdate);
    }
  };

  const handleGeneratePassword = () => {
    const password = generatePassword(8, false, /[\w\d-]/);
    setFieldValue('password', password);
  };

  const columns: ColumnsType<Section> = [
    {
      title: t('sections'),
      dataIndex: 'sections',
      key: 'sections',
      render: (text: any, record: Section) => <Text>{t(record.name.toLowerCase())}</Text>,
    },
    {
      title: t('permissions'),
      dataIndex: 'permissions',
      key: 'permissions',
      render: (text: any, record: Section) => (
        <Row>
          {record.permissions.map((permission) => (
            <Checkbox
              key={permission.id}
              checked={permission.checked}
              onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
            >
              {t(permission.name.toLowerCase())}
            </Checkbox>
          ))}
        </Row>
      ),
    },
  ];

  useEffect(() => {
    getRoles();
    getPermissions();
  }, []);

  useEffect(() => {
    handleRoleChange(user.roleId ?? '');
  }, [user]);

  return (
    <Modal
      title={user.id ? t('edit user') : t('add user')}
      visible={visible}
      width={780}
      onCancel={() => setVisible(false)}
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={form.submit}
          loading={isAddUserLoading || isEditUserLoading}
          style={{ textTransform: 'uppercase' }}
        >
          {t('save')}
        </Button>
      }
    >
      <div style={{ padding: '16px 40px' }}>
        <Form onFinish={handleSubmit} form={form}>
          <Row gutter={[35, 16]}>
            <Col span={12}>
              <Label
                title={t('first name')}
                error={touched.firstName ? errors.firstName : undefined}
                required
              />
              <Form.Item
                validateStatus={
                  touched.firstName && Boolean(errors.firstName) ? 'error' : undefined
                }
              >
                <Input
                  prefix={<Icon name="user-line" />}
                  name="firstName"
                  value={values.firstName}
                  placeholder={i18n.t('placeholders:enter', { fieldName: t('first name') })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Label
                title={t('last name')}
                error={touched.lastName ? errors.lastName : undefined}
                required
              />
              <Form.Item
                validateStatus={touched.lastName && Boolean(errors.lastName) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="user-line" />}
                  name="lastName"
                  value={values.lastName}
                  placeholder={i18n.t('placeholders:enter', { fieldName: t('last name') })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <PhoneInput
                required
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                name="phone"
                label={t('phone')}
                error={touched.phone ? errors.phone : undefined}
                placeholder={`+213 ${i18n.t('placeholders:enter', {
                  fieldName: t('phone number'),
                })}`}
              />
            </Col>
            <Col span={12}>
              <Label title={t('email')} error={touched.email ? errors.email : undefined} required />
              <Form.Item
                validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="mail-line" />}
                  name="email"
                  value={values.email}
                  placeholder={i18n.t('placeholders:enter', { fieldName: t('email') })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Label
                title={t('role')}
                error={touched.roleId ? errors.roleId : undefined}
                required
              />
              <Form.Item
                validateStatus={touched.roleId && Boolean(errors.roleId) ? 'error' : undefined}
              >
                <Select
                  prefixIcon={<Icon name="award-line" />}
                  placeholder={i18n.t('placeholders:select', { fieldName: t('role') })}
                  dropdownMatchSelectWidth={false}
                  value={values.roleId || undefined}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: 'roleId',
                        value,
                      },
                    });
                    handleRoleChange(value);
                  }}
                >
                  {roles.map((role: Role) => (
                    <Option key={role.id} value={role.id}>
                      {t(role.name.toLowerCase())}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Row gutter={8}>
                <Col flex={1}>
                  <Label
                    title={t('password')}
                    error={touched.password ? errors.password : undefined}
                    required
                  />
                </Col>
                <Col>
                  <Link
                    style={{ fontSize: 10, textTransform: 'uppercase' }}
                    onClick={handleGeneratePassword}
                  >
                    {t('generate password')}
                  </Link>
                </Col>
              </Row>
              <Form.Item
                validateStatus={touched.password && Boolean(errors.password) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="lock-2-line" />}
                  suffix={<Icon name="eye-line" />}
                  name="password"
                  value={values.password}
                  placeholder={i18n.t('placeholders:enter', { fieldName: t('password') })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <Table rowKey="id" dataSource={sections} columns={columns} bordered />
      </div>
    </Modal>
  );
};

export default UserModal;
