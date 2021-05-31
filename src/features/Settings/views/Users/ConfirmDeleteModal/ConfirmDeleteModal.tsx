import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Modal, Text, Icon } from '../../../../../components';
import { UserForm } from '../types';
import { deleteUser } from '../services';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  user?: UserForm;
  pageIndex: number;
  pageSize: number;
};

const ConfirmDeleteModal: React.FC<Props> = ({
  visible,
  setVisible,
  user,
  pageIndex,
  pageSize,
}) => {
  const { t } = useTranslation('translation');

  const { mutateAsync, isLoading } = useMutation(deleteUser);
  const cache = useQueryClient();

  const handleDeleteUser = async () => {
    try {
      if (user?.id) {
        await mutateAsync(user.id);
        const previousValue: { data: any[]; total: number } | undefined = cache.getQueryData([
          'users',
          pageIndex,
          pageSize,
        ]);
        if (previousValue) {
          const updatedValue = { ...previousValue };
          const newData = updatedValue.data.filter((item) => item.id !== user.id);
          cache.setQueryData(['users', pageIndex, pageSize], {
            ...updatedValue,
            data: newData,
            total: updatedValue.total - 1,
          });
        }
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={t('delete user')}
      visible={visible}
      width={535}
      onCancel={() => setVisible(false)}
    >
      <div style={{ padding: 32 }}>
        <div style={{ marginBottom: 32 }}>
          <Text size="xxl">
            {/* {t('confirm user delete:')} */}
            are you sure you want to delete the user:
          </Text>
        </div>
        <Row gutter={16} align="middle">
          <Col>
            {user?.picture ? (
              <Avatar src={user?.picture} size={66} shape="square" />
            ) : (
              <Avatar src={user?.picture} size={66} shape="square">
                {user?.firstName[0]?.toUpperCase()}
                {user?.lastName[0]?.toUpperCase()}
              </Avatar>
            )}
          </Col>
          <Col>
            <Text size="xxl" style={{ fontWeight: 500 }}>
              {user?.firstName} {user?.lastName}
            </Text>
          </Col>
        </Row>
        <Row gutter={32} style={{ marginTop: 60 }}>
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
              icon={<Icon name="delete-bin-2-line" />}
              style={{ textTransform: 'uppercase' }}
              onClick={handleDeleteUser}
              loading={isLoading}
            >
              {t('yes, delete user')}
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
