import { LinkOutlined } from '@ant-design/icons';
import { ConfigProvider, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import CopyComponent from '@/components/CopyComponent';

interface Props {
  userId: string;
}

interface CryptoDeposit {
  id: string;
  depositTime: string;
  currency: string;
  chain: string;
  walletAddress: string;
  transactionHash: string;
  amount: number;
  status: 'Approved' | 'Pending';
}

export default function CryptoDeposits({ userId }: Props) {
  const [cryptoDeposits] = useState<CryptoDeposit[]>([]);

  // TODO: Fetch crypto deposits from API
  // useEffect(() => {
  //   fetchCryptoDeposits();
  // }, [userId]);

  const getBlockchainExplorerUrl = (chain: string, txHash: string): string => {
    // TODO: Map chain to appropriate explorer URL
    const explorers: Record<string, string> = {
      'ERC-20': `https://etherscan.io/tx/${txHash}`,
      'TRC-20': `https://tronscan.org/#/transaction/${txHash}`,
      'BEP-20': `https://bscscan.com/tx/${txHash}`,
    };
    return explorers[chain] || `#${txHash}`;
  };

  const columns: ColumnsType<CryptoDeposit> = [
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
      render: (amount: number, record) => (
        <span className="font-medium">
          {amount.toLocaleString('en-US', {
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
      render: (status: string) => (
        <Tag color={status === 'Approved' ? 'green' : 'orange'}>{status}</Tag>
      ),
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
