import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Modal,
  message,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import CopyComponent from '@/components/CopyComponent';

interface Props {
  userId: string;
}

interface Wallet {
  id: string;
  address: string;
  chain: 'TRC-20' | 'ERC-20' | 'TOK';
  currency: string; // Currently only 'GBPC'
  balance: number;
  status: 'Active' | 'Frozen';
}

export default function WalletsTab({ userId }: Props) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  // TODO: Fetch wallets from API
  // useEffect(() => {
  //   fetchWallets();
  // }, [userId]);

  const handleFreezeWallet = (wallet: Wallet) => {
    const isFrozen = wallet.status === 'Frozen';
    const action = isFrozen ? 'unfreeze' : 'freeze';

    modal.confirm({
      title: `${isFrozen ? 'Unfreeze' : 'Freeze'} Wallet`,
      icon: <ExclamationCircleOutlined />,
      content: isFrozen
        ? 'Are you sure you want to unfreeze this wallet? The user will be able to deposit, withdraw, and transfer funds from this wallet.'
        : 'Are you sure you want to freeze this wallet? The user will not be able to deposit, withdraw, or transfer funds from this wallet while frozen.',
      okText: isFrozen ? 'Unfreeze' : 'Freeze',
      okButtonProps: { danger: !isFrozen },
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          // TODO: Call API to freeze/unfreeze wallet
          // await request(`/api/wallets/${wallet.id}/${action}`, { method: 'POST' });

          // Update local state
          setWallets((prev) =>
            prev.map((w) =>
              w.id === wallet.id
                ? { ...w, status: isFrozen ? 'Active' : 'Frozen' }
                : w,
            ),
          );

          message.success(`Wallet ${action}d successfully`);
        } catch (error) {
          message.error(`Failed to ${action} wallet`);
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns: ColumnsType<Wallet> = [
    {
      title: 'Wallet Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: string) => (
        <div className="flex items-center gap-2">
          <Tooltip title={address}>
            <span className="font-mono text-sm">
              {address.slice(0, 10)}...{address.slice(-8)}
            </span>
          </Tooltip>
          <CopyComponent text={address} />
        </div>
      ),
    },
    {
      title: 'Chain',
      dataIndex: 'chain',
      key: 'chain',
      render: (chain: string) => <Tag color="blue">{chain}</Tag>,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
      render: (balance: number, record) => (
        <span className="font-medium text-base">
          {balance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {record.currency}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Button
          type="link"
          danger={record.status === 'Active'}
          onClick={() => handleFreezeWallet(record)}
          loading={loading}
        >
          {record.status === 'Frozen' ? 'Unfreeze Wallet' : 'Freeze Wallet'}
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
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
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} wallets`,
          }}
          locale={{
            emptyText: 'No wallets have been assigned to this user.',
          }}
        />
      </ConfigProvider>
    </>
  );
}
