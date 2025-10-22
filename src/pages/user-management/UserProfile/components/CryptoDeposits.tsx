import { LinkOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { ConfigProvider, Empty, Table, Tag, Tooltip, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import CopyComponent from '@/components/CopyComponent';
import type { AccountTransactionItem } from '@/services/types/account';
import { getAccountTransactionList } from '@/services/wallet/account';

interface Props {
  userId: string;
}

interface CryptoDeposit {
  id: string;
  depositTime: number;
  currency: string;
  chain: string;
  walletAddress: string;
  transactionHash: string;
  amount: string;
  status: number;
}

export default function CryptoDeposits({ userId }: Props) {
  const { data, loading } = useRequest(
    async () => {
      const response = await getAccountTransactionList({
        userId: Number(userId),
        tradeType: 1,
        pageNumber: 1,
        pageSize: 10,
      });

      const deposits: CryptoDeposit[] = (response.list || []).map(
        (item: AccountTransactionItem) => ({
          id: item.id || '',
          depositTime: item.timestamp || item.createTime || 0,
          currency: item.currency || '',
          chain: item.chainId || '',
          walletAddress: item.address || item.toAddress || '',
          transactionHash: item.txId || '',
          amount: item.amount || '0',
          status: item.status || 0,
        }),
      );

      return deposits;
    },
    {
      ready: !!userId,
      refreshDeps: [userId],
      onError: (error) => {
        message.error('Failed to fetch crypto deposits');
        console.error(error);
      },
    },
  );

  const cryptoDeposits = (data as CryptoDeposit[] | undefined) ?? [];

  const getBlockchainExplorerUrl = (chain: string, txHash: string): string => {
    // TODO: Map chain to appropriate explorer URL
    const explorers: Record<string, string> = {
      'ERC-20': `https://etherscan.io/tx/${txHash}`,
      'TRC-20': `https://tronscan.org/#/transaction/${txHash}`,
      'BEP-20': `https://bscscan.com/tx/${txHash}`,
      'TOK-20': `https://tokescan.com/tx/${txHash}`,
    };
    return explorers[chain] || `#${txHash}`;
  };

  const columns: ColumnsType<CryptoDeposit> = [
    {
      title: 'Deposit Time',
      dataIndex: 'depositTime',
      key: 'depositTime',
      render: (time: number) => (
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
      title: 'Chain',
      dataIndex: 'chain',
      key: 'chain',
      render: (chain: string) => <Tag color="blue">{chain}</Tag>,
    },
    {
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      render: (address: string) => (
        <div className="flex items-center gap-2">
          <Tooltip title={address}>
            <span className="font-mono text-sm">
              {address.slice(0, 8)}...{address.slice(-6)}
            </span>
          </Tooltip>
          <CopyComponent text={address} />
        </div>
      ),
    },
    {
      title: 'Transaction Hash',
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      render: (hash: string, record) => (
        <div className="flex items-center gap-2">
          <Tooltip title={hash}>
            <span className="font-mono text-sm">
              {hash.slice(0, 8)}...{hash.slice(-6)}
            </span>
          </Tooltip>
          <CopyComponent text={hash} />
          <a
            href={getBlockchainExplorerUrl(record.chain, hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <LinkOutlined />
          </a>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: string, record) => (
        <span className="font-medium">
          {parseFloat(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}{' '}
          {record.currency}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const statusMap: Record<number, { text: string; color: string }> = {
          0: { text: 'Pending Review', color: 'orange' },
          1: { text: 'Approved', color: 'green' },
          2: { text: 'Rejected', color: 'red' },
          3: { text: 'Success', color: 'green' },
          4: { text: 'Failed', color: 'red' },
        };
        const statusInfo = statusMap[status] || { text: 'Unknown', color: 'default' };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
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
        dataSource={cryptoDeposits}
        rowKey="id"
        size="middle"
        loading={loading}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} deposits`,
        }}
        locale={{
          emptyText: <Empty />,
        }}
      />
    </ConfigProvider>
  );
}
