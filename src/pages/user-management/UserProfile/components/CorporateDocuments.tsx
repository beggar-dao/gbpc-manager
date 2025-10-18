import { Collapse, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface Props {
  userId: string;
}

interface UBO {
  firstName: string;
  lastName: string;
  documentType: string;
  email: string;
  frontSide: string;
  backSide: string;
  selfie: string;
}

interface Representative {
  firstName: string;
  lastName: string;
  documentType: string;
  email: string;
  frontSide: string;
  backSide: string;
  selfie: string;
}

export default function CorporateDocuments({ userId }: Props) {
  // Mock data - replace with actual API data
  const companyInfo = {
    companyName: 'Alfa Technologies L.L.C',
    registrationNo: '111111232333444432d',
    legalAddress: 'Door no34 We Work , one Central, Dubai UAE',
    taxId: '',
    nationality: 'Italy',
  };

  const ubos: UBO[] = [
    {
      firstName: 'Oscar',
      lastName: 'Pilari',
      documentType: 'Passport',
      email: 'Oscar@vn.com',
      frontSide: '/api/placeholder/150/100',
      backSide: '/api/placeholder/150/100',
      selfie: '/api/placeholder/150/100',
    },
  ];

  const representatives: Representative[] = [
    {
      firstName: 'Oscar',
      lastName: 'Pilari',
      documentType: 'Passport',
      email: 'Oscar@vn.com',
      frontSide: '/api/placeholder/150/100',
      backSide: '/api/placeholder/150/100',
      selfie: '/api/placeholder/150/100',
    },
  ];

  const industryDetails = {
    industryDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Pellentesque finibus, est et iaculis suscipit, dolor nulla commodo dui, nec ultricies arcu nisl.',
    plannedInvestmentPerYear: '10000-20000',
  };

  // Render UBO/Representative card
  const renderPersonCard = (person: UBO | Representative) => (
    <div className="bg-[#F5F7FA] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">
            First name
          </label>
          <div className="text-base text-[#202B4B]">{person.firstName}</div>
        </div>
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">Last Name</label>
          <div className="text-base text-[#202B4B]">{person.lastName}</div>
        </div>
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">
            Document Type
          </label>
          <div className="text-base text-[#202B4B]">{person.documentType}</div>
        </div>
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">Email</label>
          <div className="text-base text-[#202B4B]">{person.email}</div>
        </div>
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">Front Side</label>
          <div className="mt-2">
            <Image
              src={person.frontSide}
              alt="Front Side"
              width={150}
              height={100}
              className="rounded border border-gray-200"
              placeholder={
                <div className="w-[150px] h-[100px] bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">Loading...</span>
                </div>
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">Back Side</label>
          <div className="mt-2">
            <Image
              src={person.backSide}
              alt="Back Side"
              width={150}
              height={100}
              className="rounded border border-gray-200"
              placeholder={
                <div className="w-[150px] h-[100px] bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">Loading...</span>
                </div>
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#8C8C8C] mb-2">Selfie</label>
          <div className="mt-2">
            <Image
              src={person.selfie}
              alt="Selfie"
              width={150}
              height={100}
              className="rounded border border-gray-200"
              placeholder={
                <div className="w-[150px] h-[100px] bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">Loading...</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Company Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Company Name
            </label>
            <div className="text-base text-[#202B4B]">
              {companyInfo.companyName}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Registration No.
            </label>
            <div className="text-base text-[#202B4B]">
              {companyInfo.registrationNo}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Legal Address
            </label>
            <div className="text-base text-[#202B4B]">
              {companyInfo.legalAddress}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">Tax ID</label>
            <div className="text-base text-[#202B4B]">
              {companyInfo.taxId || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Nationality
            </label>
            <div className="text-base text-[#202B4B]">
              {companyInfo.nationality}
            </div>
          </div>
        </div>
      </div>

      {/* Associated Parties Section */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Associated Parties
        </h3>
        <Collapse
          bordered={false}
          defaultActiveKey={['ubos']}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          className="bg-white border-none"
          items={[
            {
              key: 'ubos',
              label: (
                <span className="text-base font-medium text-[#202B4B]">
                  UBO's
                </span>
              ),
              children: (
                <div className="space-y-4">
                  {ubos.map((ubo, index) => (
                    <div key={index}>{renderPersonCard(ubo)}</div>
                  ))}
                </div>
              ),
            },
            {
              key: 'representatives',
              label: (
                <span className="text-base font-medium text-[#202B4B]">
                  Representatives
                </span>
              ),
              children: (
                <div className="space-y-4">
                  {representatives.map((rep, index) => (
                    <div key={index}>{renderPersonCard(rep)}</div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Industry Details Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Industry Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div className="md:col-span-2">
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Industry Description
            </label>
            <div className="text-base text-[#202B4B]">
              {industryDetails.industryDescription}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Planned Investment per Year
            </label>
            <div className="text-base text-[#202B4B]">
              {industryDetails.plannedInvestmentPerYear}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
