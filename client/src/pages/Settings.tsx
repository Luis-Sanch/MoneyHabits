import React, { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Moon, 
  Sun, 
  Globe, 
  Download,
  Trash2,
  LogOut,
  ChevronRight,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const Settings: React.FC = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'security' | 'accounts' | 'preferences'>('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    timezone: 'America/New_York',
    currency: 'USD'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: false,
    transactionAlerts: true
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    console.log('Saving profile:', profileData)
  }

  const handleSaveNotifications = () => {
    // TODO: Implement notification settings update
    console.log('Saving notifications:', notificationSettings)
  }

  const handleChangePassword = () => {
    // TODO: Implement password change
    console.log('Changing password')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement account deletion
      console.log('Deleting account')
    }
  }

  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Exporting data')
  }

  const SettingSection: React.FC<{
    id: string
    title: string
    description: string
    icon: React.ReactNode
    isActive: boolean
    onClick: () => void
  }> = ({ id, title, description, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
        isActive 
          ? 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          isActive 
            ? 'bg-primary-100 dark:bg-primary-900/30' 
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          {icon}
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </button>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Profile Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0ea5e9&color=fff&size=80`}
                    alt={user?.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div>
                    <button className="btn-secondary text-sm">
                      Change Photo
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                      className="input-field"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Currency
                  </label>
                  <select
                    value={profileData.currency}
                    onChange={(e) => setProfileData(prev => ({ ...prev, currency: e.target.value }))}
                    className="input-field w-full md:w-64"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button onClick={handleSaveProfile} className="btn-primary flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Notification Preferences
              </h3>
              
              <div className="space-y-4">
                {[
                  { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive notifications on your device' },
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'budgetAlerts', label: 'Budget Alerts', description: 'Get notified when you exceed budget limits' },
                  { key: 'goalReminders', label: 'Goal Reminders', description: 'Reminders about your financial goals' },
                  { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly summary of your financial activity' },
                  { key: 'transactionAlerts', label: 'Transaction Alerts', description: 'Notifications for large or unusual transactions' }
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {setting.label}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          [setting.key]: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <button onClick={handleSaveNotifications} className="btn-primary flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Security Settings
              </h3>
              
              <div className="space-y-6">
                <div className="card">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Change Password
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="input-field pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="input-field pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    
                    <button onClick={handleChangePassword} className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="btn-secondary">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'accounts':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Connected Accounts
              </h3>
              
              <div className="space-y-4">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Chase Checking ****1234
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last synced 2 hours ago
                        </p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">
                      Disconnect
                    </button>
                  </div>
                </div>
                
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Wells Fargo Credit ****5678
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last synced 1 day ago
                        </p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">
                      Disconnect
                    </button>
                  </div>
                </div>
                
                <button className="btn-primary w-full flex items-center justify-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Connect New Account</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                App Preferences
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {theme === 'light' ? (
                        <Sun className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Dark Mode
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Switch between light and dark themes
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={toggleTheme}
                    className="btn-secondary"
                  >
                    {theme === 'light' ? 'Enable' : 'Disable'}
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Data & Privacy
                  </h4>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleExportData}
                      className="btn-secondary w-full flex items-center justify-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export My Data</span>
                    </button>
                    
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-700 dark:text-red-400 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <button
                    onClick={logout}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            <SettingSection
              id="profile"
              title="Profile"
              description="Personal information and preferences"
              icon={<User className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
              isActive={activeSection === 'profile'}
              onClick={() => setActiveSection('profile')}
            />
            
            <SettingSection
              id="notifications"
              title="Notifications"
              description="Manage your notification preferences"
              icon={<Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
              isActive={activeSection === 'notifications'}
              onClick={() => setActiveSection('notifications')}
            />
            
            <SettingSection
              id="security"
              title="Security"
              description="Password and authentication settings"
              icon={<Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
              isActive={activeSection === 'security'}
              onClick={() => setActiveSection('security')}
            />
            
            <SettingSection
              id="accounts"
              title="Connected Accounts"
              description="Manage your linked bank accounts"
              icon={<CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
              isActive={activeSection === 'accounts'}
              onClick={() => setActiveSection('accounts')}
            />
            
            <SettingSection
              id="preferences"
              title="Preferences"
              description="App settings and data management"
              icon={<Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
              isActive={activeSection === 'preferences'}
              onClick={() => setActiveSection('preferences')}
            />
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="card">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings