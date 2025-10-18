import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  userId: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  accountName: string;
  accountNumber: string;
  bankName?: string;
  status: string;
  addedDate: number;
}

export default function PaymentMethodsTab({ userId }: Props) {
  // TODO: Fetch payment methods from API
  const paymentMethods: PaymentMethod[] = [];

  const columns: ColumnsType<PaymentMethod> = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: 'Account Name',
      dataIndex: 'accountName',
      key: 'accountName',
      width: 200,
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      width: 200,
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
      width: 200,
      render: (text) => text || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: 'Added Date',
      dataIndex: 'addedDate',
      key: 'addedDate',
      width: 180,
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#202B4B]">
          Payment Methods
        </h3>
        <p className="text-sm text-[#8C8C8C]">
          Manage user's payment methods for deposits and withdrawals
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
          dataSource={paymentMethods}
          rowKey="id"
          size="middle"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} payment methods`,
          }}
          locale={{
            emptyText: 'No payment methods added yet',
          }}
        />
      </ConfigProvider>
    </div>
  );
}
