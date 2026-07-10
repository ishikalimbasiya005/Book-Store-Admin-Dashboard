import type { SuccessPresetKey, ErrorPresetKey, WarningPresetKey, InfoPresetKey } from '../Types';

export const SUCCESS_MESSAGES: Record<SuccessPresetKey, string> = {
  login: 'Login successful',
  register: 'Registration successful',
  create: 'Record created successfully',
  update: 'Record updated successfully',
  delete: 'Record deleted successfully',
  pdfExport: 'PDF exported successfully',
  upload: 'File uploaded successfully',
  passwordChange: 'Password changed successfully',
  profileUpdate: 'Profile updated successfully',
};

export const ERROR_MESSAGES: Record<ErrorPresetKey, string> = {
  login: 'Login failed',
  register: 'Registration failed',
  save: 'Failed to save changes',
  delete: 'Failed to delete record',
  pdfExport: 'Failed to export PDF',
  generic: 'Something went wrong',
  network: 'Network error',
};

export const WARNING_MESSAGES: Record<WarningPresetKey, string> = {
  selectRecord: 'Please select at least one record',
  unsavedChanges: 'Unsaved changes detected',
  sessionExpiry: 'Session will expire soon',
};

export const INFO_MESSAGES: Record<InfoPresetKey, string> = {
  logout: 'Logged out successfully',
  exportStart: 'Export started',
  loading: 'Data is loading',
};
