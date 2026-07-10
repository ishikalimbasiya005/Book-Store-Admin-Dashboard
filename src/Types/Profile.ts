export interface ProfilePreferences {
  notifications: boolean;
  emailAlerts: boolean;
  desktopNotif: boolean;
  marketing: boolean;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  preferences: ProfilePreferences;
}

export interface ProfileState {
  profile: ProfileData;
  updateProfile: (profile: Partial<ProfileData>) => void;
  updatePreferences: (prefs: Partial<ProfilePreferences>) => void;
}

export type TabKey = 'details' | 'security' | 'preferences';
