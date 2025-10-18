import { Image } from 'antd';

interface Props {
  userId: string;
}

export default function IndividualDocuments({ userId }: Props) {
  // Mock data - replace with actual API data
  const personalInfo = {
    firstName: 'Oscar',
    lastName: 'Pilari',
    dateOfBirth: '21/09/1995',
    countryOfBirth: 'Italy',
    nationality: 'Italy',
  };

  const addressInfo = {
    firstName: 'Oscar',
    lastName: 'Pilari',
    dateOfBirth: '21/09/1995',
    countryOfBirth: 'Italy',
    nationality: 'Italy',
    addressProof: '/api/placeholder/150/100', // Replace with actual image URL
  };

  const financialInfo = {
    plannedAnnualInvestment: '5000 - 20000',
    annualIncomeEarnings: '10000 - 50000',
    estimatedTotalWealth: '20001 - 100001',
    sourceOfFunds: 'XXXXXXXXXX',
  };

  const occupationInfo = {
    occupationInformation:
      "The standard lorem ipsum passage has been a printer's friend for centuries. Like stock photos today, it served as a placeholder for actual content.",
    professionalStatus: 'Salaried',
  };

  const documents = {
    countryOfIssue: 'Canada',
    documentType: 'Driving License',
    frontSide: '/api/placeholder/150/100', // Replace with actual image URL
    backSide: '/api/placeholder/150/100', // Replace with actual image URL
    selfie: '/api/placeholder/150/100', // Replace with actual image URL
  };

  return (
    <div>
      {/* Personal Info Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Personal Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              First Name
            </label>
            <div className="text-base text-[#202B4B]">
              {personalInfo.firstName}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Last Name
            </label>
            <div className="text-base text-[#202B4B]">
              {personalInfo.lastName}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Date Of Birth (DOB)
            </label>
            <div className="text-base text-[#202B4B]">
              {personalInfo.dateOfBirth}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Country of Birth
            </label>
            <div className="text-base text-[#202B4B]">
              {personalInfo.countryOfBirth}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Nationality
            </label>
            <div className="text-base text-[#202B4B]">
              {personalInfo.nationality}
            </div>
          </div>
        </div>
      </div>

      {/* Address Info Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Address Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              First Name
            </label>
            <div className="text-base text-[#202B4B]">
              {addressInfo.firstName}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Last Name
            </label>
            <div className="text-base text-[#202B4B]">
              {addressInfo.lastName}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Date Of Birth (DOB)
            </label>
            <div className="text-base text-[#202B4B]">
              {addressInfo.dateOfBirth}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Country of Birth
            </label>
            <div className="text-base text-[#202B4B]">
              {addressInfo.countryOfBirth}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Nationality
            </label>
            <div className="text-base text-[#202B4B]">
              {addressInfo.nationality}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Address Proof
            </label>
            <div className="mt-2">
              <Image
                src={addressInfo.addressProof}
                alt="Address Proof"
                width={120}
                height={80}
                className="rounded border border-gray-200"
                placeholder={
                  <div className="w-[120px] h-[80px] bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400">Loading...</span>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Info Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Financial Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Planned Annual Investment
            </label>
            <div className="text-base text-[#202B4B]">
              {financialInfo.plannedAnnualInvestment}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Estimated Total Wealth
            </label>
            <div className="text-base text-[#202B4B]">
              {financialInfo.estimatedTotalWealth}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Annual Income/Earnings
            </label>
            <div className="text-base text-[#202B4B]">
              {financialInfo.annualIncomeEarnings}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Source of Funds
            </label>
            <div className="text-base text-[#202B4B]">
              {financialInfo.sourceOfFunds}
            </div>
          </div>
        </div>
      </div>

      {/* Occupation Info Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Occupation Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div className="md:col-span-2">
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Occupation Information
            </label>
            <div className="text-base text-[#202B4B]">
              {occupationInfo.occupationInformation}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Professional Status
            </label>
            <div className="text-base text-[#202B4B]">
              {occupationInfo.professionalStatus}
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Country of Issue
            </label>
            <div className="text-base text-[#202B4B]">
              {documents.countryOfIssue}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Document Type
            </label>
            <div className="text-base text-[#202B4B]">
              {documents.documentType}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Front Side
            </label>
            <div className="mt-2">
              <Image
                src={documents.frontSide}
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
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Back Side
            </label>
            <div className="mt-2">
              <Image
                src={documents.backSide}
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
                src={documents.selfie}
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
    </div>
  );
}
