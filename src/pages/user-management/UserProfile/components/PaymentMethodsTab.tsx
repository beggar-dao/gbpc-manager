import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Modal, message, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import CopyComponent from '@/components/CopyComponent';

interface Props {
  userId: string;
}

interface PaymentMethod {
  id: string;
  bankAccountNumber: string;
  accountHolderName: string;
  bankName: string;
  swiftCode: string;
  iban: string;
  branch: string;
  currency: string;
  billingAddress: string;
  status: 'Verified' | 'Unverified';
}

export default function PaymentMethodsTab({ userId }: Props) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  // TODO: Fetch payment methods from API
  // useEffect(() => {
  //   fetchPaymentMethods();
  // }, [userId]);

  const handleDelete = (record: PaymentMethod) => {
    modal.confirm({
      title: 'Delete Payment Method',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete this payment method for ${record.accountHolderName}?`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          // TODO: Call API to delete payment method
          // await request(`/api/payment-methods/${record.id}`, { method: 'DELETE' });

          // Update local state
          setPaymentMethods((prev) => prev.filter((pm) => pm.id !== record.id));

          message.success('Payment method deleted successfully');
        } catch (error) {
          message.error('Failed to delete payment method');
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns: ColumnsType<PaymentMethod> = [
    {
      title: 'Bank Account Number',
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{text}</span>
          <CopyComponent text={text} />
        </div>
      ),
    },
    {
      title: 'Acct. Holder Name',
      dataIndex: 'accountHolderName',
      key: 'accountHolderName',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'Swift Code',
      dataIndex: 'swiftCode',
      key: 'swiftCode',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{text}</span>
          <CopyComponent text={text} />
        </div>
      ),
    },
    {
      title: 'IBAN',
      dataIndex: 'iban',
      key: 'iban',
      render: (text: string) => text || '--',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Billing Address',
      dataIndex: 'billingAddress',
      key: 'billingAddress',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Verified' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDelete(record)}
          loading={loading}
        >
          Delete
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
          dataSource={paymentMethods}
          rowKey="id"
          size="middle"
          scroll={{ x: 'max-content' }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} payment methods`,
          }}
          locale={{
            emptyText: 'No payment methods added yet.',
          }}
        />
      </ConfigProvider>
    </>
  );
}
