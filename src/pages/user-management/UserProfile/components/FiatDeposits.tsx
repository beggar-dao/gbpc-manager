import { ConfigProvider, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import CopyComponent from '@/components/CopyComponent';

interface Props {
  userId: string;
}

interface FiatDeposit {
  id: string;
  depositTime: string;
  currency: string;
  method: string;
  accountNumber: string;
  amount: number;
  fees: number;
  transactionNo: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function FiatDeposits({ userId }: Props) {
  const [fiatDeposits] = useState<FiatDeposit[]>([]);

  // TODO: Fetch fiat deposits from API
  // useEffect(() => {
  //   fetchFiatDeposits();
  // }, [userId]);

  const columns: ColumnsType<FiatDeposit> = [
    {
      title: 'Deposit Time',
      dataIndex: 'depositTime',
      key: 'depositTime',
      render: (time: string) => (
        <span className="text-sm">
          {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      render: (account: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{account}</span>
          <CopyComponent text={account} />
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: number, record) => (
        <span className="font-medium">
          {amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {record.currency}
        </span>
      ),
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
      key: 'fees',
      align: 'right',
      render: (fees: number) => (
        <span className="text-sm text-orange-600">{fees}%</span>
      ),
    },
    {
      title: 'Transaction No.',
      dataIndex: 'transactionNo',
      key: 'transactionNo',
      render: (txNo: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{txNo}</span>
          <CopyComponent text={txNo} />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          Approved: 'green',
          Pending: 'orange',
          Rejected: 'red',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
  ];

  return (
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
        dataSource={fiatDeposits}
        rowKey="id"
        size="middle"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} deposits`,
        }}
        locale={{
          emptyText: 'This user has not made any deposits yet.',
        }}
      />
    </ConfigProvider>
  );
}
