import { useRequest } from '@umijs/max';
import { Button, ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { type FunctionComponent, useCallback, useState } from 'react';
import type {
  KYCStatus,
  UserManagementResponse,
  UserResponseItem,
} from '@/services/types/user-management';
import {
  getUserList,
  type UserManagementParams,
} from '@/services/user-management';
import { getKYCStatusClass, getKYCStatusText } from '../utils/user-management';

interface Props {
  filterParams: UserManagementParams;
}

const UserManagementTable: FunctionComponent<Props> = ({ filterParams }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { data, loading } = useRequest(
    () => getUserList({ ...filterParams, pageNumber, pageSize }),
    {
      refreshDeps: [pageNumber, pageSize, filterParams],
    },
  );

  const userList = (data as UserManagementResponse) || {
    list: [],
    _meta: { currentPage: 1, perPage: pageSize, totalCount: 0, totalPages: 0 },
  };

  const columns: ColumnsType<UserResponseItem> = [
    {
      title: 'Registration Date',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (_, { createTime }) => (
        <span>{dayjs(createTime).format('YYYY/MM/DD HH:mm:ss')}</span>
      ),
    },
    {
      title: 'UID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Full Name',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 150,
      render: (_, { firstname, lastname }) => (
        <span>
          {firstname} {lastname}
        </span>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: 120,
    },
    {
      title: 'KYC',
      dataIndex: 'kycStatus',
      key: 'kycStatus',
      width: 150,
      render: (_, { kycStatus }) => (
        <span className={getKYCStatusClass(kycStatus as KYCStatus)}>
          {kycStatus ? getKYCStatusText(kycStatus as KYCStatus) : '-'}
        </span>
      ),
    },
    {
      title: 'Operation',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (_, record: UserResponseItem) => (
        <Button
          type="link"
          className="!text-[#63BCFF] px-0"
          onClick={() => handleViewUser(record.id)}
        >
          View
        </Button>
      ),
    },
  ];

  const handleViewUser = (userId: string) => {
    // TODO: Navigate to user profile page
    console.log('View user:', userId);
    // You can use history.push or navigate to user profile page
    // Example: history.push(`/user/profile/${userId}`);
  };

  const handlePageChange = useCallback(
    (page: number, newPageSize?: number) => {
      setPageNumber(page);
      if (newPageSize && newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    },
    [pageSize],
  );

  return (
    <div className="w-full">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerColor: 'rgba(32, 43, 75, 0.85)',
              headerBg: 'rgba(32, 43, 75, 0.05)',
              headerSplitColor: 'transparent',
              borderColor: 'rgba(32, 43, 75, 0.1)',
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={userList.list}
          rowKey="id"
          loading={loading}
          size="middle"
          scroll={{ x: 1200 }}
          pagination={{
            size: 'default',
            current: pageNumber,
            pageSize: userList._meta.perPage,
            total: userList._meta.totalCount,
            onChange: handlePageChange,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default UserManagementTable;
