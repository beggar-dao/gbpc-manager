import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Collapse, Input, Modal } from 'antd';
import React, { useState } from 'react';

export default function KycList() {
  const [open, setOpen] = useState(true);
  const columns = [
    {
      title: 'UID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Company Name',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Submit Time',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Review Time / Admin ID',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Status',
      key: 'option',
      valueType: 'option',
      render: () => [
        <a key="link">链路</a>,
        <a key="link2">报警</a>,
        <a key="link3">监控</a>,
      ],
    },
  ];
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <PageContainer
      header={{
        title: '',
        ghost: true,
      }}
      fixedHeader
    >
      <Modal
        open={open}
        width={'50%'}
        centered
        title="Corporate KYB"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button color="cyan" variant="solid">
              Approve
            </Button>
            <Button color="danger" variant="solid">
              Reject
            </Button>
            {/* <CancelBtn />
            <OkBtn /> */}
          </>
        )}
      >
        <div className="max-h-[60vh] overflow-y-auto">
          <ProDescriptions className="mt-4" column={2} title="">
            <ProDescriptions.Item label="UID">中国</ProDescriptions.Item>
            <ProDescriptions.Item label="Registration Time">
              type
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Email">中国</ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions
            className="mt-4"
            column={2}
            title="Company Information"
          >
            <ProDescriptions.Item label="Company Name">
              中国
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Registration NO">
              中国
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Legal Address">
              中国
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Tax ID">中国</ProDescriptions.Item>
            <ProDescriptions.Item label="Nationality">
              中国
            </ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions
            className="mt-4"
            column={2}
            title="Associated Parties"
          >
            <Collapse
              className="w-full"
              accordion
              defaultActiveKey={['1']}
              items={[
                {
                  key: '1',
                  label: 'UBO’s',
                  children: (
                    <Collapse
                      defaultActiveKey="1"
                      accordion
                      items={[
                        {
                          key: '1',
                          label: 'This is panel nest panel',
                          children: (
                            <ProDescriptions title="">
                              <ProDescriptions.Item label="First Name">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Last Name">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Email">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Document Type">
                                type
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Front Side">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Back Side">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="LiveNess Check">
                                中国
                              </ProDescriptions.Item>
                            </ProDescriptions>
                          ),
                        },
                      ]}
                    />
                  ),
                },
                {
                  key: '2',
                  label: 'Representatives',
                  children: (
                    <Collapse
                      defaultActiveKey="1"
                      accordion
                      items={[
                        {
                          key: '1',
                          label: 'This is panel nest panel',
                          children: (
                            <ProDescriptions title="">
                              <ProDescriptions.Item label="First Name">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Last Name">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Email">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Document Type">
                                type
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Front Side">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="Back Side">
                                中国
                              </ProDescriptions.Item>
                              <ProDescriptions.Item label="LiveNess Check">
                                中国
                              </ProDescriptions.Item>
                            </ProDescriptions>
                          ),
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </ProDescriptions>
          <ProDescriptions className="mt-4" column={2} title="Industry Details">
            <ProDescriptions.Item span={2} label="Industry Description">
              这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长
            </ProDescriptions.Item>
            <ProDescriptions.Item span={2} label="Planned Investment per Year">
              这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长
            </ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions className="mt-4" column={2} title="Remark">
            <Input.TextArea placeholder="Please Write a Remark" rows={4} />
          </ProDescriptions>
        </div>
      </Modal>
      <ProTable
        rowKey="id"
        search={false}
        bordered
        // dataSource={dataSource}
        columns={columns}
        params={{}}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: { pageSize: number; current: number },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          console.log('params', params);
          const promise = new Promise((resolve) => {
            resolve([]);
          });
          return {
            data: [
              {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
              },
              {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
              },
            ],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: 100,
          };
        }}
      />
    </PageContainer>
  );
}
