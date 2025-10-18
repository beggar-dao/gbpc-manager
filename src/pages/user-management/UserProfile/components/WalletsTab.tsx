import { ConfigProvider, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  userId: string;
}

interface Wallet {
  id: string;
  currency: string;
  type: 'Crypto' | 'Fiat';
  balance: number;
  availableBalance: number;
  frozenBalance: number;
  address?: string;
  status: 'Active' | 'Frozen' | 'Inactive';
}

export default function WalletsTab({ userId }: Props) {
  // TODO: Fetch wallets from API
  const wallets: Wallet[] = [];

  const columns: ColumnsType<Wallet> = [
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      width: 120,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => (
        <Tag color={type === 'Crypto' ? 'blue' : 'green'}>{type}</Tag>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      align: 'right',
      render: (balance: number, record) => (
        <span className="font-medium">
          {balance.toFixed(8)} {record.currency}
        </span>
      ),
    },
    {
      title: 'Available',
      dataIndex: 'availableBalance',
      key: 'availableBalance',
      width: 150,
      align: 'right',
      render: (balance: number, record) => (
        <span className="text-green-600">
          {balance.toFixed(8)} {record.currency}
        </span>
      ),
    },
    {
      title: 'Frozen',
      dataIndex: 'frozenBalance',
      key: 'frozenBalance',
      width: 150,
      align: 'right',
      render: (balance: number, record) => (
        <span className="text-orange-600">
          {balance.toFixed(8)} {record.currency}
        </span>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      ellipsis: true,
      render: (address) => address || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          Active: 'green',
          Frozen: 'orange',
          Inactive: 'default',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#202B4B]">Wallets</h3>
        <p className="text-sm text-[#8C8C8C]">
          View and manage user's crypto and fiat wallets
        </p>
      </div>

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
          dataSource={wallets}
          rowKey="id"
          size="middle"
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} wallets`,
          }}
          locale={{
            emptyText: 'No wallets found',
          }}
        />
      </ConfigProvider>
    </div>
  );
}
