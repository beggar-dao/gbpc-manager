import { Segmented } from 'antd';
import { useState } from 'react';

interface Props {
  userId: string;
}

// Individual KYC Documents Component
function IndividualDocuments({ userId }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-[#202B4B] mb-4">
        Individual KYC Documents
      </h3>
      <p className="text-[#8C8C8C]">User ID: {userId}</p>
      {/* TODO: Implement Individual KYC documents table/list */}
    </div>
  );
}

// Corporate KYB Documents Component
function CorporateDocuments({ userId }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-[#202B4B] mb-4">
        Corporate KYB Documents
      </h3>
      <p className="text-[#8C8C8C]">User ID: {userId}</p>
      {/* TODO: Implement Corporate KYB documents table/list */}
    </div>
  );
}

// Main Documents Tab Component
export default function DocumentsTab({ userId }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<string | number>(
    'individual',
  );

  return (
    <div>
      <div className="mb-6">
        <Segmented
          value={activeSubTab}
          onChange={setActiveSubTab}
          options={[
            { label: 'Individual', value: 'individual' },
            { label: 'Corporate', value: 'corporate' },
          ]}
        />
      </div>

      <div>
        {activeSubTab === 'individual' && (
          <IndividualDocuments userId={userId} />
        )}
        {activeSubTab === 'corporate' && <CorporateDocuments userId={userId} />}
      </div>
    </div>
  );
}
