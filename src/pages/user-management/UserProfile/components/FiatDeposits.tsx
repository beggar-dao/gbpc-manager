import { useRequest } from '@umijs/max';
import { ConfigProvider, Empty, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import CopyComponent from '@/components/CopyComponent';
import type { AccountTransactionItem } from '@/services/types/account';
import { getAccountTransactionList } from '@/services/wallet/account';

interface Props {
  userId: string;
}

interface FiatDeposit {
  id: string;
  depositTime: number;
  currency: string;
  method: string;
  accountNumber: string;
  amount: string;
  fiatAmount: string;
  fiatCurrency: string;
  fee: string;
  transactionNo: string;
  status: number;
}

export default function FiatDeposits({ userId }: Props) {
  const { data, loading } = useRequest(
    async () => {
      const response = await getAccountTransactionList({
        userId: Number(userId),
        tradeType: 1, // 1: 法币入金 (Fiat deposit)
        pageNumber: 1,
        pageSize: 10,
      });

      const deposits: FiatDeposit[] = (response.list || []).map(
        (item: AccountTransactionItem) => ({
          id: item.id || '',
          depositTime: item.timestamp || item.createTime || 0,
          currency: item.currency || '',
          method: item.bankName || 'Bank Transfer',
          accountNumber: item.iban || item.accountId || '',
          amount: item.amount || '0',
          fiatAmount: item.fiatAmount || item.amount || '0',
          fiatCurrency: item.fiatCurrency || item.currency || '',
          fee: item.fee || '0',
          transactionNo: item.tradeId || item.id || '',
          status: item.status || 0,
        }),
      );

      return deposits;
    },
    {
      ready: !!userId,
      refreshDeps: [userId],
      onError: (error) => {
        message.error('Failed to fetch fiat deposits');
        console.error(error);
      },
    },
  );

  const fiatDeposits = (data as FiatDeposit[] | undefined) ?? [];

  const columns: ColumnsType<FiatDeposit> = [
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
      dataIndex: 'fiatAmount',
      key: 'fiatAmount',
      align: 'right',
      render: (amount: string, record) => (
        <span className="font-medium">
          {parseFloat(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {record.fiatCurrency}
        </span>
      ),
    },
    {
      title: 'Fees',
      dataIndex: 'fee',
      key: 'fee',
      align: 'right',
      render: (fee: string, record) => (
        <span className="text-sm text-orange-600">
          {parseFloat(fee).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}{' '}
          {record.currency}
        </span>
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
        dataSource={fiatDeposits}
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
