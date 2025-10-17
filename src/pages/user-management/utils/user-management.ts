/**
 * User Management utilities and constants
 */

import {
  EmailVerificationStatus,
  KYCStatus,
} from '@/services/types/user-management';

/**
 * KYC Status options for filter dropdown
 */
export const KYCStatusOptions = [
  { label: 'All', value: '' },
  { label: 'Not Started', value: KYCStatus.NotStarted },
  { label: 'Verified', value: KYCStatus.Verified },
  { label: 'Rejected', value: KYCStatus.Rejected },
];

/**
 * Email Verification Status options for filter dropdown
 */
export const EmailVerificationOptions = [
  { label: 'All', value: '' },
  { label: 'Verified', value: EmailVerificationStatus.Verified },
  { label: 'Unverified', value: EmailVerificationStatus.Unverified },
];

/**
 * Get display text for KYC status
 */
export function getKYCStatusText(status: KYCStatus): string {
  switch (status) {
    case KYCStatus.NotStarted:
      return 'Not Started';
    case KYCStatus.Verified:
      return 'Verified';
    case KYCStatus.Rejected:
      return 'Rejected';
    default:
      return status;
  }
}

/**
 * Get CSS class for KYC status
 */
export function getKYCStatusClass(status: KYCStatus): string {
  switch (status) {
    case KYCStatus.Verified:
      return 'text-[#00C087]'; // Green
    case KYCStatus.Rejected:
      return 'text-[#FF4D4F]'; // Red
    case KYCStatus.NotStarted:
      return 'text-[#FFA940]'; // Orange
    default:
      return 'text-[#202B4B]';
  }
}

/**
 * Get display text for email verification status
 */
export function getEmailVerificationText(
  status: EmailVerificationStatus,
): string {
  switch (status) {
    case EmailVerificationStatus.Verified:
      return 'Verified';
    case EmailVerificationStatus.Unverified:
      return 'Unverified';
    default:
      return status;
  }
}

/**
 * Get CSS class for email verification status
 */
export function getEmailVerificationClass(
  status: EmailVerificationStatus,
): string {
  switch (status) {
    case EmailVerificationStatus.Verified:
      return 'text-[#00C087]'; // Green
    case EmailVerificationStatus.Unverified:
      return 'text-[#FF4D4F]'; // Red
    default:
      return 'text-[#202B4B]';
  }
}
