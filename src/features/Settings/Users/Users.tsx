import React, { useState } from 'react';
import { Col, Row, Table, Avatar } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { usePaginatedQuery } from 'react-query';
import moment from 'moment';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Button from '../../../components/Button/Button';
import { fetchUsers } from './services';
import UserModal from './UserModal/UserModal';
import { Professional, UserForm } from './types';

type Props = {};

const useUsersList = (page: number, size: number) => {
  const { resolvedData, isLoading, isError, isFetching } = usePaginatedQuery(
    ['users', page, size],
    fetchUsers,
  );
  return { resolvedData: resolvedData ?? [], isLoading, isError, isFetching };
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
  const [userForm, setUserForm] = useState<UserForm>(initialValues);

  const { t } = useTranslation('translation');

  const { resolvedData, isFetching } = useUsersList(pageIndex, pageSize);

  const { data, total = 0 } = resolvedData;

  const handleChange = ({ current }: any) => {
    setPageIndex(current);
  };

  const handleEditUser = (record: Professional) => {
    setUserForm({
      ...userForm,
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      phone: record.user.phone,
      email: record.user.email,
      roleId: record.role.id,
    });
    setShowModal(true);
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
            <Avatar src={record.picture} className="picture" />
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
      render: (text: any, record: Professional) => <>{record.role.name}</>,
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
      render: (text: any, record: Professional) => (
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
            <Button type="text" size="small" className="delete-action">
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
            {t('users')} (9)
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
      <UserModal visible={showModal} setVisible={setShowModal} user={userForm} />
    </div>
  );
};

export default Users;
