import { useRequest } from '@umijs/max';
import { Button, Form, Input, Select, message, Modal } from 'antd';
import { Country } from 'country-state-city';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  updateUserProfile,
  updateUserSecurity,
  changeUserPassword,
} from '@/services/user-profile';
import {
  AccountStatus,
  UserRole,
  TwoFactorStatus,
  type UserProfile,
} from '@/services/types/user-profile';

interface Props {
  userProfile: UserProfile;
}

export default function AccountInfoTab({ userProfile }: Props) {
  const [form] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Get all countries
  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.name,
  }));

  // Account Status Options
  const accountStatusOptions = [
    { label: 'Active', value: AccountStatus.Active },
    { label: 'Locked', value: AccountStatus.Locked },
    { label: 'Withdrawals Blocked', value: AccountStatus.WithdrawalsBlocked },
    { label: 'Deactivated', value: AccountStatus.Deactivated },
  ];

  // User Role Options
  const userRoleOptions = [
    { label: 'User', value: UserRole.User },
    { label: 'Admin Support', value: UserRole.AdminSupport },
    { label: 'Super Admin', value: UserRole.SuperAdmin },
    { label: 'Finance Management', value: UserRole.FinanceManagement },
    { label: 'KYC/KYB', value: UserRole.KYCKYB },
  ];

  // 2FA Options
  const twoFactorOptions = [
    { label: 'Enabled', value: TwoFactorStatus.Enabled },
    { label: 'Disabled', value: TwoFactorStatus.Disabled },
  ];

  // Update account info mutation
  const { run: updateAccount, loading: updateAccountLoading } = useRequest(
    (values) => updateUserProfile(userProfile.id, values),
    {
      manual: true,
      onSuccess: () => {
        message.success('Account information updated successfully');
        setIsEditingAccount(false);
      },
      onError: (error) => {
        message.error('Failed to update account information');
        console.error(error);
      },
    },
  );

  // Update security mutation
  const { run: updateSecurity, loading: updateSecurityLoading } = useRequest(
    (values) => updateUserSecurity(userProfile.id, values),
    {
      manual: true,
      onSuccess: () => {
        message.success('Security settings updated successfully');
        setIsEditingSecurity(false);
      },
      onError: (error) => {
        message.error('Failed to update security settings');
        console.error(error);
      },
    },
  );

  // Change password mutation
  const { run: changePassword, loading: changePasswordLoading } = useRequest(
    (password) =>
      changeUserPassword({ userId: userProfile.id, newPassword: password }),
    {
      manual: true,
      onSuccess: () => {
        message.success('Password changed successfully');
        setIsPasswordModalVisible(false);
        setNewPassword('');
      },
      onError: (error) => {
        message.error('Failed to change password');
        console.error(error);
      },
    },
  );

  const handleEditAccount = () => {
    form.setFieldsValue({
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      country: userProfile.country,
      accountStatus: userProfile.accountStatus,
      userRole: userProfile.userRole,
      email: userProfile.email,
    });
    setIsEditingAccount(true);
  };

  const handleCancelAccount = () => {
    form.resetFields();
    setIsEditingAccount(false);
  };

  const handleSaveAccount = async () => {
    try {
      const values = await form.validateFields();
      updateAccount(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditSecurity = () => {
    securityForm.setFieldsValue({
      is2FA: userProfile.is2FA
        ? TwoFactorStatus.Enabled
        : TwoFactorStatus.Disabled,
    });
    setIsEditingSecurity(true);
  };

  const handleCancelSecurity = () => {
    securityForm.resetFields();
    setIsEditingSecurity(false);
  };

  const handleSaveSecurity = async () => {
    try {
      const values = await securityForm.validateFields();
      updateSecurity({
        is2FA: values.is2FA === TwoFactorStatus.Enabled,
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleChangePassword = () => {
    if (newPassword.length < 8) {
      message.error('Password must be at least 8 characters long');
      return;
    }
    changePassword(newPassword);
  };

  return (
    <div className="py-6">
      {/* Account Info Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#202B4B]">Account Info</h3>
          {!isEditingAccount && (
            <Button type="primary" onClick={handleEditAccount}>
              Edit
            </Button>
          )}
        </div>

        <Form form={form} layout="vertical" className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: 'Please enter first name' },
              ]}
            >
              {isEditingAccount ? (
                <Input placeholder="Enter first name" />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile.firstname}
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              {isEditingAccount ? (
                <Input placeholder="Enter last name" />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile.lastname}
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Please select country' }]}
            >
              {isEditingAccount ? (
                <Select
                  showSearch
                  placeholder="Select country"
                  options={countries}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile.country || '-'}
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Account Status"
              name="accountStatus"
              rules={[
                { required: true, message: 'Please select account status' },
              ]}
            >
              {isEditingAccount ? (
                <Select
                  placeholder="Select account status"
                  options={accountStatusOptions}
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {accountStatusOptions.find(
                    (opt) => opt.value === userProfile.accountStatus,
                  )?.label || 'Active'}
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter valid email' },
              ]}
            >
              {isEditingAccount ? (
                <Input placeholder="Enter email address" />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile.email}
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="User Role"
              name="userRole"
              rules={[{ required: true, message: 'Please select user role' }]}
            >
              {isEditingAccount ? (
                <Select
                  placeholder="Select user role"
                  options={userRoleOptions}
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userRoleOptions.find(
                    (opt) => opt.value === userProfile.userRole,
                  )?.label || 'User'}
                </div>
              )}
            </Form.Item>
          </div>

          {isEditingAccount && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleCancelAccount}>Cancel</Button>
              <Button
                type="primary"
                onClick={handleSaveAccount}
                loading={updateAccountLoading}
              >
                Save Changes
              </Button>
            </div>
          )}
        </Form>
      </div>

      {/* Security Section */}
      <div className="border-t pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#202B4B]">Security</h3>
          {!isEditingSecurity && (
            <Button type="primary" onClick={handleEditSecurity}>
              Edit
            </Button>
          )}
        </div>

        <Form form={securityForm} layout="vertical" className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="2 Factor Authentication"
              name="is2FA"
              rules={[{ required: true, message: 'Please select 2FA status' }]}
            >
              {isEditingSecurity ? (
                <Select
                  placeholder="Select 2FA status"
                  options={twoFactorOptions}
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile.is2FA ? 'Enabled' : 'Disabled'}
                </div>
              )}
            </Form.Item>

            <Form.Item label="Password">
              {isEditingSecurity ? (
                <Button onClick={() => setIsPasswordModalVisible(true)}>
                  Change Password
                </Button>
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  <Button onClick={() => setIsPasswordModalVisible(true)}>
                    Change Password
                  </Button>
                </div>
              )}
            </Form.Item>

            <Form.Item label="Last Password Update">
              <div className="text-base text-[#8C8C8C] py-1">
                {userProfile.lastPasswordUpdate
                  ? dayjs(userProfile.lastPasswordUpdate).format(
                      'DD/MM/YYYY HH:mm:ss',
                    )
                  : 'Never updated'}
              </div>
            </Form.Item>
          </div>

          {isEditingSecurity && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleCancelSecurity}>Cancel</Button>
              <Button
                type="primary"
                onClick={handleSaveSecurity}
                loading={updateSecurityLoading}
              >
                Save Changes
              </Button>
            </div>
          )}
        </Form>
      </div>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onOk={handleChangePassword}
        onCancel={() => {
          setIsPasswordModalVisible(false);
          setNewPassword('');
        }}
        confirmLoading={changePasswordLoading}
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-[#202B4B] mb-2">
            New Temporary Password
          </label>
          <Input.Password
            placeholder="Enter new password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="text-xs text-[#8C8C8C] mt-2">
            The user will be required to change this password on next login.
          </p>
        </div>
      </Modal>
    </div>
  );
}
