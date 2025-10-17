import { useState } from 'react';
import type { UserManagementParams } from '@/services/user-management';
import { UserManagementFilter, UserManagementTable } from './components';

export default function UserManagement() {
  const [filterParams, setFilterParams] = useState<UserManagementParams>({});

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#202B4B] mb-2">Users</h1>
            <p className="text-sm text-[#8C8C8C]">
              Manage and view all registered users
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <UserManagementFilter
          onValuesChange={(
            _: { [key: string]: any },
            values: UserManagementParams,
          ) => setFilterParams(values)}
        />

        {/* Table Section */}
        <div className="bg-white rounded-lg p-6">
          <UserManagementTable filterParams={filterParams} />
        </div>
      </div>
    </div>
  );
}
