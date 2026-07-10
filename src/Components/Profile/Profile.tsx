import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiBookOpen, FiShoppingBag, FiMessageSquare, FiLock, FiSettings } from 'react-icons/fi';
import { useProfileStore } from '../../Store/useProfileStore';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks';
import { toggleTheme } from '../../Store/Slice/LayoutSlice';
import { CommonButton, CommonInput } from '../../Attributes';
import { notifier } from '../../Attributes/Notification';
import type { TabKey } from '../../Types';

const ProfileComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.layout.theme);
  const { profile, updateProfile, updatePreferences } = useProfileStore();

  const [activeTab, setActiveTab] = useState<TabKey>('details');

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [location, setLocation] = useState(profile.location);
  const [bio, setBio] = useState(profile.bio);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notifPreferences, setNotifPreferences] = useState(profile.preferences);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      notifier.error('Name and Email are required.');
      return;
    }
    updateProfile({ name, email, phone, location, bio });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      notifier.error('All password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      notifier.error('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      notifier.error('Password must be at least 6 characters.');
      return;
    }
    notifier.success('Password changed successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleTogglePreference = (key: keyof typeof notifPreferences) => {
    const updated = { ...notifPreferences, [key]: !notifPreferences[key] };
    setNotifPreferences(updated);
    updatePreferences(updated);
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'details', label: 'Profile Details', icon: <FiUser size={16} /> },
    { key: 'security', label: 'Security & Password', icon: <FiLock size={16} /> },
    { key: 'preferences', label: 'Preferences', icon: <FiSettings size={16} /> }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto p-4 md:p-6">
      {/* Profile Header Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative h-[260px] md:h-[220px] rounded-2xl overflow-hidden shadow-lg border border-border-color"
        style={{ backgroundImage: 'url(/assets/Images/upgrade_banner.webp)', backgroundSize: 'cover', backgroundPosition: 'center', }}>
        {/* Glassmorphic overlay that matches light/dark theme backgrounds */}
        <div className="profile-banner__overlay" />
        
        {/* Profile Summary Overlay */}
        <div className="absolute bottom-6 left-6 md:left-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 z-10">
          <div className="relative group">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-main-background overflow-hidden bg-main-background shadow-md transform transition-transform duration-300 group-hover:scale-105">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
              <span className="text-white text-xs font-semibold">Admin Picture</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-banner-text">{profile.name}</h2>
            <p className="text-banner-text opacity-95 text-sm md:text-base flex items-center justify-center md:justify-start gap-2 mt-1">
              <span className="profile-badge"> {profile.role} </span>
              <span className="flex items-center gap-1 opacity-90"><FiMapPin size={14} /> {profile.location}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Summary Card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-1" >
          <div className="bg-background border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6 h-full">
          {/* About Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-placeholder">About Me</h3>
            <p className="text-primary-text text-sm leading-relaxed">{profile.bio}</p>
          </div>

          <div className="h-px bg-border-color w-full" />

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-placeholder">Contact Info</h3>
            <div className="flex items-center gap-3 text-sm text-primary-text">
              <FiMail className="text-placeholder shrink-0" size={16} />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-text">
              <FiPhone className="text-placeholder shrink-0" size={16} />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-text">
              <FiCalendar className="text-placeholder shrink-0" size={16} />
              <span>Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="h-px bg-border-color w-full" />

          {/* Statistics Grid */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-placeholder">Management Overview</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-main-background p-3 rounded-xl border border-border-color text-center hover:border-sidebar-active transition-colors duration-300">
                <FiBookOpen className="mx-auto text-sidebar-active mb-1" size={18} />
                <span className="block text-lg font-bold text-primary-text">150+</span>
                <span className="text-[10px] text-placeholder uppercase font-medium">Books</span>
              </div>
              <div className="bg-main-background p-3 rounded-xl border border-border-color text-center hover:border-sidebar-active transition-colors duration-300">
                <FiShoppingBag className="mx-auto text-amber-500 mb-1" size={18} />
                <span className="block text-lg font-bold text-primary-text">1.2k</span>
                <span className="text-[10px] text-placeholder uppercase font-medium">Orders</span>
              </div>
              <div className="bg-main-background p-3 rounded-xl border border-border-color text-center hover:border-sidebar-active transition-colors duration-300">
                <FiMessageSquare className="mx-auto text-emerald-500 mb-1" size={18} />
                <span className="block text-lg font-bold text-primary-text">98%</span>
                <span className="text-[10px] text-placeholder uppercase font-medium">Reply</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

        {/* Right Side: Tab Forms */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-2" >
          <div className="bg-background border border-border-color rounded-2xl overflow-hidden shadow-sm h-full flex flex-col" style={{ minHeight: '100%' }}>
          {/* Tab Navigation */}
          <div className="flex border-b border-border-color bg-main-background px-4 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => { const isActive = activeTab === tab.key; return (
                <CommonButton key={tab.key} onClick={() => setActiveTab(tab.key)} unstyled={true} className={`profile-tab-btn ${isActive ? 'profile-tab-btn--active' : ''}`} >
                  {tab.icon}
                  {tab.label}
                </CommonButton>
              );
            })}
          </div>

          {/* Tab Content Panel with Animation */}
          <div className="p-6 flex-grow flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.form key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} onSubmit={handleUpdateProfile} className="flex flex-col gap-4 flex-grow justify-between" >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-placeholder">Full Name</label>
                      <CommonInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ishika Sharma" className="profile-input" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-placeholder">Email Address</label>
                      <CommonInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. admin@example.com" className="profile-input" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-placeholder">Phone Number</label>
                      <CommonInput type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +1 (555) 019-2834" className="profile-input" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-placeholder">Office Location</label>
                      <CommonInput type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. San Francisco, CA" className="profile-input" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-placeholder">Biography</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a short summary about yourself..." rows={4} className="profile-textarea" />
                  </div>

                  <div className="flex justify-end mt-2">
                    <CommonButton type="submit" className="profile-submit-btn" text="Save Changes" />
                  </div>
                </motion.form>
              )}

              {activeTab === 'security' && (
                <motion.form key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} onSubmit={handleUpdatePassword} className="flex flex-col gap-4 flex-grow justify-between">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-placeholder">Current Password</label>
                    <CommonInput type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" className="profile-input" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-placeholder">New Password</label>
                    <CommonInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 6 characters" className="profile-input" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-placeholder">Confirm New Password</label>
                    <CommonInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" className="profile-input" />
                  </div>

                  <div className="flex justify-end mt-2">
                    <CommonButton type="submit" className="profile-submit-btn" text="Update Password" />
                  </div>
                </motion.form>
              )}

              {activeTab === 'preferences' && (
                <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 flex-grow" >
                  {/* Theme Selector */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-primary-text">Theme Preference</h4>
                    <p className="text-xs text-placeholder">Select how the store layout should look on your device.</p>
                    <div className="flex gap-4 mt-2">
                      <CommonButton type="button" onClick={() => { if (currentTheme !== 'light') dispatch(toggleTheme()); }} unstyled={true} className={`profile-theme-btn ${currentTheme === 'light' ? 'profile-theme-btn--active' : ''}`} > Light Theme </CommonButton>
                      <CommonButton type="button" onClick={() => { if (currentTheme !== 'dark') dispatch(toggleTheme()); }} unstyled={true} className={`profile-theme-btn ${currentTheme === 'dark' ? 'profile-theme-btn--active' : ''}`} > Dark Theme </CommonButton>
                    </div>
                  </div>

                  <div className="h-px bg-border-color w-full" />

                  {/* Notification Toggles */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-primary-text">System Alerts & Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-primary-text">In-app notifications</span>
                        <span className="text-xs text-placeholder">Show red dot alerts and popups on the dashboard.</span>
                      </div>
                      <CommonInput type="checkbox" checked={notifPreferences.notifications} onChange={() => handleTogglePreference('notifications')} wrapperClassName="" className="w-4 h-4 text-sidebar-active border-border-color rounded focus:ring-sidebar-active cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-primary-text">Email customer alerts</span>
                        <span className="text-xs text-placeholder">Send email updates when catalog or inventory shifts.</span>
                      </div>
                      <CommonInput type="checkbox" checked={notifPreferences.emailAlerts} onChange={() => handleTogglePreference('emailAlerts')} wrapperClassName="" className="w-4 h-4 text-sidebar-active border-border-color rounded focus:ring-sidebar-active cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-primary-text">Desktop notifications</span>
                        <span className="text-xs text-placeholder">Show push notifications on desktop browser events.</span>
                      </div>
                      <CommonInput type="checkbox" checked={notifPreferences.desktopNotif} onChange={() => handleTogglePreference('desktopNotif')} wrapperClassName="" className="w-4 h-4 text-sidebar-active border-border-color rounded focus:ring-sidebar-active cursor-pointer" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  );
};

export default ProfileComponent;
