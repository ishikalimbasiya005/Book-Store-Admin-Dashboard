import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProfileState } from '../Types';
import { notifier } from '../Attributes/Notification';

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Ishika Limbasiya',
        email: 'ishika@gmail.com',
        phone: '+1 (555) 019-2834',
        location: 'San Francisco, CA',
        role: 'Super Admin',
        bio: 'Experienced store administrator with a passion for catalog curation, customer service, and smooth digital supply chain operations. Managing books inventory and order processing workflows.',
        avatar: '/assets/Images/female_profile_avatar.png',
        joinedDate: '2025-08-15',
        preferences: {
          notifications: true,
          emailAlerts: true,
          desktopNotif: false,
          marketing: false,
        },
      },
      updateProfile: (updated) => {
        set((state) => ({
          profile: { ...state.profile, ...updated },
        }));
        notifier.success('Profile updated successfully.');
      },
      updatePreferences: (updatedPrefs) => {
        set((state) => ({
          profile: {
            ...state.profile,
            preferences: { ...state.profile.preferences, ...updatedPrefs },
          },
        }));
        notifier.success('Preferences updated successfully.');
      },
    }),
    {
      name: 'profile-store',
    }
  )
);
