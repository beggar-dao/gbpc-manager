import { Segmented } from 'antd';
import { useState } from 'react';
import type { UserProfile } from '@/services/types/user-profile';
import AccountInfoTab from './AccountInfoTab';
import LoginHistoryTab from './LoginHistoryTab';

interface Props {
  userProfile: UserProfile;
  userId: string;
}

export default function AccountInfoMainTab({ userProfile, userId }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<string | number>(
    'account-details',
  );

  return (
    <div>
      {/* TODO: <div className="mb-6">
        <Segmented
          value={activeSubTab}
          onChange={setActiveSubTab}
          options={[
            { label: 'Account Info', value: 'account-details' },
            { label: 'Login History', value: 'login-history' },
          ]}
        />
      </div> */}

      <div>
        {activeSubTab === 'account-details' && (
          <AccountInfoTab userProfile={userProfile} />
        )}
        {activeSubTab === 'login-history' && (
          <LoginHistoryTab userId={userId} />
        )}
      </div>
    </div>
  );
}
