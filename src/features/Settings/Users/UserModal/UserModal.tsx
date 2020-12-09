import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, Row, Select as AntSelect, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Modal from '../../../../components/Modal/Modal';
import Icon from '../../../../components/Icon/Icon';
import Button from '../../../../components/Button/Button';
import Text from '../../../../components/Text/Text';
import { Role, UserForm, Section } from '../types';
import Label from '../../../../components/Label/Label';
import Select from '../../../../components/Select/Select';
import i18n from '../../../../i18n';
import { fetchPermissions, fetchRoles } from '../services';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
  user: UserForm;
};

const { Option } = AntSelect;

const UserModal: React.FC<Props> = ({ visible, setVisible, user }) => {
  const { t } = useTranslation('translation');

  const [roles, setRoles] = useState<Role[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const formik = useFormik({
    initialValues: user as UserForm,
    enableReinitialize: true,
    onSubmit: () => console.log('form submitted'),
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  const getRoles = async (): Promise<void> => {
    try {
      const response = await fetchRoles();
      setRoles(
        response.data.map((role: Role) => ({ id: role.id, code: role.code, name: role.name })),
      );
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

  const checkAllPermissions = () => {
    const sectionsToUpdate: Section[] = sections.map((section) => ({
      ...section,
      permissions: section.permissions.map((permission) => ({ ...permission, checked: true })),
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
    const role = roles.find((item) => item.id === id);
    console.log(role);

    if (role) {
      if (role.permissions.length === 0) checkAllPermissions();
      else checkRelevantPermission(role);
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

  const columns: ColumnsType<Section> = [
    {
      title: t('sections'),
      dataIndex: 'sections',
      key: 'sections',
      render: (text: any, record: Section) => <Text>{record.name}</Text>,
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
              {permission.name}
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

  return (
    <Modal
      title={user.id ? t('edit user') : t('add user')}
      visible={visible}
      width={780}
      onCancel={() => setVisible(false)}
      actions={
        <Button type="primary" icon={<Icon name="save-line" />}>
          SAVE
        </Button>
      }
    >
      <div style={{ padding: '16px 40px' }}>
        <Form onFinish={handleSubmit}>
          <Row gutter={[35, 16]}>
            <Col span={12}>
              <Label
                title="First name"
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
                  placeholder="enter your first name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Label
                title="Last name"
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
                  placeholder="enter your last name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Label title="Phone" error={touched.phone ? errors.phone : undefined} required />
              <Form.Item
                validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="phone-line" />}
                  name="phone"
                  value={values.phone}
                  placeholder="enter your phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Label title="Email" error={touched.email ? errors.email : undefined} required />
              <Form.Item
                validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="mail-line" />}
                  name="email"
                  value={values.email}
                  placeholder="enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Label title="Role" error={touched.roleId ? errors.roleId : undefined} required />
              <Form.Item
                validateStatus={touched.roleId && Boolean(errors.roleId) ? 'error' : undefined}
              >
                <Select
                  prefixIcon={<Icon name="award-line" />}
                  placeholder="Select Role"
                  dropdownMatchSelectWidth={false}
                  value={values.roleId}
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
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Label
                title={t('password')}
                error={touched.password ? errors.password : undefined}
                required
              />
              <Form.Item
                validateStatus={touched.password && Boolean(errors.password) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="lock-2-line" />}
                  name="password"
                  value={values.password}
                  placeholder={i18n.t('placeholders:enter your', { fieldName: t('password') })}
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
