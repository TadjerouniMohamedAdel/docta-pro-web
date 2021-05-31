import React, { useState } from 'react';
import { Col, Row, Table, Avatar } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import moment from 'moment';
import { Text, Icon, Button } from '../../../../components';
import { fetchUsers } from './services';
import UserModal from './UserModal/UserModal';
import { Professional, UserForm } from './types';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';

type Props = {};

const useUsersList = (page: number, size: number) => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ['users', page, size],
    () => fetchUsers(page, size),
    { keepPreviousData: true },
  );
  return { resolvedData: data ?? [], isLoading, isError, isFetching };
};

const initialValues: UserForm = {
  id: undefined,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  roleId: undefined,
  password: '',
};

const Users: React.FC<Props> = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>(initialValues);

  const { t } = useTranslation('translation');

  const { resolvedData, isFetching } = useUsersList(pageIndex, pageSize);

  const { data, total = 0 } = resolvedData;

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const handleSelectUser = (record: Professional) => {
    setUserForm({
      ...userForm,
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      phone: record.user.phone,
      email: record.user.email,
      roleId: record.role.id,
      picture: record.picture,
    });
  };

  const handleEditUser = (record: Professional) => {
    handleSelectUser(record);
    setShowModal(true);
  };

  const handleDeleteUser = (record: Professional) => {
    handleSelectUser(record);
    setShowConfirmDeleteModal(true);
  };

  const handleAddUser = () => {
    setUserForm(initialValues);
    setShowModal(true);
  };

  const columns: ColumnsType<Professional> = [
    {
      title: t('full name'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: any, record: Professional) => (
        <Row gutter={16} align="middle">
          <Col>
            {record.picture ? (
              <Avatar src={record.picture} />
            ) : (
              <Avatar src={record.picture}>
                {record.firstName[0]?.toUpperCase()}
                {record.lastName[0]?.toUpperCase()}
              </Avatar>
            )}
          </Col>
          <Col>
            {record.firstName} {record.lastName}
          </Col>
        </Row>
      ),
    },
    {
      title: t('phone number'),
      dataIndex: 'phone',
      key: 'phone',
      render: (text: any, record: Professional) => <>{record.user.phone}</>,
    },
    {
      title: t('email'),
      dataIndex: 'diagnostic',
      key: 'diagnostic',
      render: (text: any, record: Professional) => <>{record.user.email}</>,
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (text: any, record: Professional) => <>{t(record.role.name.toLowerCase())}</>,
    },
    {
      title: t('created at'),
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text: Date) => <span>{moment(text).format('LL')}</span>,
    },
    {
      title: t('actions'),
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: Professional) =>
        record.role.code === 'practitioner' ? null : (
          <Row>
            <Col>
              <Button
                type="text"
                size="small"
                className="edit-action"
                onClick={() => handleEditUser(record)}
              >
                <Icon name="pencil-line" />
              </Button>
            </Col>
            <Col>
              <Button
                type="text"
                size="small"
                className="delete-action"
                onClick={() => handleDeleteUser(record)}
              >
                <Icon name="delete-bin-7-line" />
              </Button>
            </Col>
          </Row>
        ),
    },
  ];

  return (
    <div>
      <Row style={{ height: 88, padding: '0 24px' }} align="middle" justify="space-between">
        <Col>
          <Text size="xxl" style={{ fontWeight: 'bold' }}>
            {t('users')} ({total})
          </Text>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<Icon name="add-line" />}
            size="small"
            onClick={handleAddUser}
          >
            {t('add user')}
          </Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        bordered
        pagination={{ pageSize, total }}
        onChange={handleChange}
        loading={isFetching}
      />
      <UserModal
        visible={showModal}
        setVisible={setShowModal}
        user={userForm}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
      <ConfirmDeleteModal
        visible={showConfirmDeleteModal}
        setVisible={setShowConfirmDeleteModal}
        user={userForm}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Users;
