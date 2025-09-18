/*import React, { useState, useMemo, useEffect } from 'react';

// --- Dashboard Components ---

// Data structures
interface Company {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  scannedPages: number;
  bundleAmount: number;
  bundleDate: string;
  createdDate: string;
  status: 'active' | 'inactive';
  apiKey: string;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

// Dummy Data
const DUMMY_COMPANIES: Company[] = [
  { id: '1', name: 'test', description: 'testing', address: 'chennai', city: 'Chennai', state: 'Tamil Nadu', scannedPages: 100, bundleAmount: 500, bundleDate: '2025-08-15', createdDate: '2025-08-15', status: 'active', apiKey: 'key1' },
  { id: '2', name: 'test2', description: 'testing', address: 'chennai', city: 'San Francisco', state: 'California', scannedPages: 250, bundleAmount: 1000, bundleDate: '2025-08-20', createdDate: '2025-08-20', status: 'active', apiKey: 'key2' },
  { id: '3', name: 'HCL', description: 'hcl test', address: 'chennai', city: 'Bengaluru', state: 'Karnataka', scannedPages: 300, bundleAmount: 1200, bundleDate: '2025-08-21', createdDate: '2025-08-21', status: 'active', apiKey: 'key3' },
  { id: '4', name: 'TH3', description: 'testing', address: 'chennai', city: 'Pune', state: 'Maharashtra', scannedPages: 150, bundleAmount: 750, bundleDate: '2025-08-18', createdDate: '2025-08-18', status: 'active', apiKey: 'key4' },
  { id: '5', name: 'test3', description: 'testing', address: 'chennai', city: 'Mumbai', state: 'Maharashtra', scannedPages: 400, bundleAmount: 1500, bundleDate: '2025-08-22', createdDate: '2025-08-22', status: 'active', apiKey: 'key5' },
];

const ITEMS_PER_PAGE = 20;

// Icons replaced with inline SVGs for self-containment
const LogoIcon: React.FC = () => (
  // Add your logo here, e.g. <img src="/path/to/logo.png" alt="Logo" className="w-12 h-12" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
  </svg>
);
const DashboardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
  </svg>
);
const CompaniesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M22 17h-2v-2h2v2zm-4 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm2 2h-2v2h2v-2zm-4 0h-2v2h2v-2zm-2 0h-2v2h2v-2zm-2 0h-2v2h2v-2zm-2 0h-2v2h2v-2zm-2 0H2v-2h2v2zm12-4H2v-2h2v2zm10 0h-2v-2h2v2zm-4 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm10-4H2v-2h2v2zm10-4H2V3h20v2z" />
  </svg>
);
const UsersIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
  </svg>
);
const AddCompanyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M21 15h-2v2h2v-2zm0-2h-2v2h2v-2zm-2-2h-2v2h2v-2zm-4 4h-2v2h2v-2zm0-2h-2v2h2v-2zm0-2h-2v2h2v-2zm4 4h-2v2h2v-2zm0-2h-2v2h2v-2zm-4 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-4-4h-2v2h2v-2zm-2-2h-2v2h2v-2zm-2 2h-2v2h2v-2zm4-4h-2v2h2v-2zm-2-2h-2v2h2v-2zm2-2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2-2H2v2h2v-2zm-2-2H2v2h2v-2zm12-2H2V3h20v2z" />
  </svg>
);
const AddUserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);
const FilterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);
const BuildingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M19 11h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1H9v-1H8v1H7v-1H6v1H5V3H3v18h18V11h-2zm-7 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
  </svg>
);
const EditIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);
const DeleteIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);
const RestoreIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z" />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 3.5-4.5s3.5 2.02 3.5 4.5v6z" />
  </svg>
);

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout }) => {
  const sidebarItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Companies', icon: <CompaniesIcon /> },
    { name: 'Users', icon: <UsersIcon /> },
    { name: 'Restore', icon: <RestoreIcon /> },
    { name: 'Add Company', icon: <AddCompanyIcon /> },
    { name: 'Add User', icon: <AddUserIcon /> },
  ];

  return (
    <div className="flex flex-col w-64 bg-gradient-to-br from-purple-800 to-purple-500 text-white min-h-screen p-6 shadow-xl">
      <div className="flex justify-center mb-10">
        <LogoIcon />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name)}
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out ${
                  activePage === item.name
                    ? 'bg-purple-900 text-white shadow-inner'
                    : 'hover:bg-purple-700'
                }`}
              >
                {item.icon}
                <span className="ml-4 font-semibold">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-center p-4">
        <span className="text-xl font-bold">Super Admin</span>
      </div>
    </div>
  );
};

interface TopBarProps {
  onLogout: () => void;
  notifications: Notification[];
  onClearNotifications: () => void;
  email: string;
}

const TopBar: React.FC<TopBarProps> = ({ onLogout, notifications, onClearNotifications, email }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md rounded-b-lg">
      <div className="flex flex-col w-full text-center">
        
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <BellIcon />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">{notifications.length}</span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <li key={n.id} className="p-4 text-sm text-gray-700 hover:bg-gray-50 border-b">
                      {n.message} <span className="text-xs text-gray-400 block">{n.timestamp}</span>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-sm text-gray-500 text-center">No new notifications.</li>
                )}
              </ul>
              {notifications.length > 0 && (
                <div className="p-2 border-t text-center">
                  <button onClick={onClearNotifications} className="text-sm text-blue-500 hover:text-blue-700">Clear All</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
              S
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="font-semibold text-gray-700">Super Admin</span>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Super Admin</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, bgColor }) => (
  <div
    className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-lg ${bgColor}`}
  >
    <div className="flex flex-col">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-lg">{title}</span>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

interface EditCompanyModalProps {
  company: Company | null;
  onClose: () => void;
  onSave: (updatedCompany: Company) => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ company, onClose, onSave }) => {
  const [editedCompany, setEditedCompany] = useState<Company | null>(company);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [llamaApiKey, setLlamaApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('Gemini 2.0 Flash');
  const [status, setStatus] = useState<"active"|"inactive">("active");

  useEffect(() => {
    if (company) {
        setEditedCompany(company);
        setStatus(company.status);
    }
  }, [company]);

  if (!editedCompany) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    if (editedCompany) {
      onSave({...editedCompany, apiKey: geminiApiKey, status });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Company</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={editedCompany.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="description"
              value={editedCompany.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="address"
              value={editedCompany.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={editedCompany.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">City<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="city"
              value={editedCompany.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">API Keys Management</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Gemini API Key</label>
                <input
                  type="text"
                  placeholder="Leave blank to keep current key"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Llama API Key</label>
                <input
                  type="text"
                  placeholder="Leave blank to keep current key"
                  value={llamaApiKey}
                  onChange={(e) => setLlamaApiKey(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Gemini Model</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Gemini 2.0 Flash">Gemini 2.0 Flash</option>
                  <option value="Other Model">Other Model</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Status</label>
                <div className="flex space-x-2">
                  <button type="button"
                    onClick={() => setStatus('active')}
                    className={`px-4 py-2 rounded-lg font-semibold ${status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-green-600 transition-colors`}
                  >
                    Set Active
                  </button>
                  <button type="button"
                    onClick={() => setStatus('inactive')}
                    className={`px-4 py-2 rounded-lg font-semibold ${status === 'inactive' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-red-600 transition-colors`}
                  >
                    Set Inactive
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">API Key Actions</label>
                <div className="flex space-x-2">
                  <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    View API Keys Status
                  </button>
                  <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
                    Clear API Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
      <div className="text-gray-800 text-center mb-6">
        <h3 className="text-lg font-bold">This page says</h3>
        <p className="mt-2 text-base">Are you sure to delete this Company?</p>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

interface MainContentProps {
  activePage: string;
  companies: Company[];
  onEditCompany: (company: Company) => void;
  onDeleteCompany: (company: Company) => void;
  filter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  filteredAndSortedCompanies: Company[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activePage,
  onEditCompany,
  onDeleteCompany,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  totalPages,
  filteredAndSortedCompanies,
  statusFilter,
  setStatusFilter,
}) => {
  const content: { [key: string]: React.ReactNode } = {
    Dashboard: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Companies"
            value="4"
            icon=<BuildingIcon />
            bgColor="bg-purple-600"
          />
          <StatsCard
            title="Total Users"
            value="5"
            icon=<UsersIcon />
            bgColor="bg-green-600"
          />
          <StatsCard
            title="Inactive Companies"
            value="0"
            icon=<BuildingIcon />
            bgColor="bg-orange-600"
          />
          <StatsCard
            title="Inactive Users"
            value="1"
            icon=<UsersIcon />
            bgColor="bg-red-500"
          />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Data</h2>
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>
          </div>
          <div className="text-center text-gray-500 p-10">
            <h2 className="text-xl font-bold">Dashboard Overview</h2>
            <p className="text-lg">
              Select an option from the sidebar to view specific data.
            </p>
          </div>
        </div>
      </>
    ),
    Companies: (
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Companies</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Download Excel
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4 space-x-2">
          <button className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600" onClick={() => setStatusFilter('all')}>
            All
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600" onClick={() => setStatusFilter('active')}>
            Active
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600" onClick={() => setStatusFilter('inactive')}>
            Inactive
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Company Name</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">API Key</th>
                <th className="py-3 px-6">Created</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredAndSortedCompanies.map((company) => (
                <tr key={company.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{company.name}</td>
                  <td className="py-3 px-6">{company.description}</td>
                  <td className="py-3 px-6">{company.address}</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 rounded-full text-white ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <button className="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-6">{company.createdDate}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => onEditCompany(company)}
                      className="flex items-center bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => onDeleteCompany(company)}
                      className="flex items-center bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    ),
    Users: (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Users View</h2>
        <p className="text-gray-600 mt-2">
          This is where you would list and manage users.
        </p>
      </div>
    ),
    Restore: (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Restore</h2>
        <p className="text-gray-600 mt-2">
          This is where you would restore data.
        </p>
      </div>
    ),
    'Add Company': (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Add Company</h2>
        <p className="text-gray-600 mt-2">
          Use this form to add a new company to the system.
        </p>
      </div>
    ),
    'Add User': (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Add User</h2>
        <p className="text-gray-600 mt-2">
          Use this form to add a new user to the system.
        </p>
      </div>
    ),
  };

  return <main className="flex-1 p-8 bg-gray-100">{content[activePage]}</main>;
};

// --- Notifications Component ---
interface NotificationProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Notification disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-sm text-gray-700">{message}</span>
      </div>
    </div>
  );
};


// --- Login & Root App Component ---

interface SuperAdminDashboardProps {
  email: string;
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({onLogout,email}) => {
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [companies, setCompanies] = useState<Company[]>(DUMMY_COMPANIES);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filter, setFilter] = useState<string>('recent');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompanies((prevCompanies) => {
      const updatedList = prevCompanies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c));
      return updatedList;
    });
    setIsEditModalOpen(false);
    setSelectedCompany(null);
    addNotification('Company details updated successfully.');
  };

  const handleDeleteCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCompany) {
      setCompanies((prevCompanies) => prevCompanies.filter((c) => c.id !== selectedCompany.id));
      setIsDeleteModalOpen(false);
      setSelectedCompany(null);
      addNotification('Company successfully deleted.');
    }
  };

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(company => company.status === statusFilter);
    }

    if (filter === 'a-z') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'recent') {
      filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }
    return filtered;
  }, [companies, searchQuery, filter, statusFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredAndSortedCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
      return (
        <div className="flex min-h-screen font-sans">
          <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
          <div className="flex-1 flex flex-col">
            <TopBar onLogout={onLogout} notifications={notifications} onClearNotifications={handleClearNotifications} email={email} />
            <MainContent
              activePage={activePage}
              companies={companies}
              onEditCompany={handleEditCompany}
              onDeleteCompany={handleDeleteCompany}
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              filteredAndSortedCompanies={paginatedCompanies}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
          {isEditModalOpen && (
            <EditCompanyModal
              company={selectedCompany}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleSaveCompany}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteConfirmModal
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />
          )}
          {showToast && <NotificationToast message={toastMessage} onClose={() => setShowToast(false)} />}
        </div>
      );
    } 


export default SuperAdminDashboard;*/

import React, { useState, useMemo, useEffect } from 'react';

// --- Dashboard Components ---

// Data structures
interface Company {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  scannedPages: number;
  bundleAmount: number;
  bundleDate: string;
  createdDate: string;
  status: 'active' | 'inactive';
  apiKey: string;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

// Dummy Data
const DUMMY_COMPANIES: Company[] = [
  { id: '1', name: 'test', description: 'testing', address: 'chennai', city: 'Chennai', state: 'Tamil Nadu', scannedPages: 100, bundleAmount: 500, bundleDate: '2025-08-15', createdDate: '2025-08-15', status: 'active', apiKey: 'key1' },
  { id: '2', name: 'test2', description: 'testing', address: 'chennai', city: 'San Francisco', state: 'California', scannedPages: 250, bundleAmount: 1000, bundleDate: '2025-08-20', createdDate: '2025-08-20', status: 'active', apiKey: 'key2' },
  { id: '3', name: 'HCL', description: 'hcl test', address: 'chennai', city: 'Bengaluru', state: 'Karnataka', scannedPages: 300, bundleAmount: 1200, bundleDate: '2025-08-21', createdDate: '2025-08-21', status: 'active', apiKey: 'key3' },
  { id: '4', name: 'TH3', description: 'testing', address: 'chennai', city: 'Pune', state: 'Maharashtra', scannedPages: 150, bundleAmount: 750, bundleDate: '2025-08-18', createdDate: '2025-08-18', status: 'active', apiKey: 'key4' },
  { id: '5', name: 'test3', description: 'testing', address: 'chennai', city: 'Mumbai', state: 'Maharashtra', scannedPages: 400, bundleAmount: 1500, bundleDate: '2025-08-22', createdDate: '2025-08-22', status: 'active', apiKey: 'key5' },
];

const ITEMS_PER_PAGE = 20;

// Icons replaced with inline SVGs for self-containment
const LogoIcon: React.FC = () => (
  // Add your logo here, e.g. <img src="/path/to/logo.png" alt="Logo" className="w-12 h-12" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
  </svg>
);
const DashboardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
  </svg>
);
const CompaniesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M22 17h-2v-2h2v2zm-4 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm2 2h-2v2h2v-2zm-4 0h-2v2h2v-2zm-2 0h-2v2h2v-2zm-2 0h-2v2h2v-2zm-2 0h-2v2h2v-2zm-2 0H2v-2h2v2zm12-4H2v-2h2v2zm10 0h-2v-2h2v2zm-4 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm-2 0h-2v-2h2v2zm10-4H2v-2h2v2zm10-4H2V3h20v2z" />
  </svg>
);
const UsersIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
  </svg>
);
const AddCompanyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M21 15h-2v2h2v-2zm0-2h-2v2h2v-2zm-2-2h-2v2h2v-2zm-4 4h-2v2h2v-2zm0-2h-2v2h2v-2zm0-2h-2v2h2v-2zm4 4h-2v2h2v-2zm0-2h-2v2h2v-2zm-4 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-4-4h-2v2h2v-2zm-2-2h-2v2h2v-2zm-2 2h-2v2h2v-2zm4-4h-2v2h2v-2zm-2-2h-2v2h2v-2zm2-2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2-2H2v2h2v-2zm-2-2H2v2h2v-2zm12-2H2V3h20v2z" />
  </svg>
);
const AddUserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);
const FilterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);
const BuildingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M19 11h-1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1H9v-1H8v1H7v-1H6v1H5V3H3v18h18V11h-2zm-7 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
  </svg>
);
const EditIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);
const DeleteIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);
const RestoreIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z" />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 3.5-4.5s3.5 2.02 3.5 4.5v6z" />
  </svg>
);

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout }) => {
  const sidebarItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Companies', icon: <CompaniesIcon /> },
    { name: 'Users', icon: <UsersIcon /> },
    { name: 'Restore', icon: <RestoreIcon /> },
    { name: 'Add Company', icon: <AddCompanyIcon /> },
    { name: 'Add User', icon: <AddUserIcon /> },
  ];

  return (
    <div className="flex flex-col w-64 bg-gradient-to-br from-purple-800 to-purple-500 text-white min-h-screen p-6 shadow-xl">
      <div className="flex justify-center mb-10">
        <LogoIcon />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name)}
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out ${
                  activePage === item.name
                    ? 'bg-purple-900 text-white shadow-inner'
                    : 'hover:bg-purple-700'
                }`}
              >
                {item.icon}
                <span className="ml-4 font-semibold">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-center p-4">
        <span className="text-xl font-bold">Super Admin</span>
      </div>
    </div>
  );
};

interface TopBarProps {
  onLogout: () => void;
  notifications: Notification[];
  onClearNotifications: () => void;
  email: string;
}

const TopBar: React.FC<TopBarProps> = ({ onLogout, notifications, onClearNotifications, email }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md rounded-b-lg">
      <div className="flex flex-col w-full text-center">
        
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <BellIcon />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">{notifications.length}</span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <li key={n.id} className="p-4 text-sm text-gray-700 hover:bg-gray-50 border-b">
                      {n.message} <span className="text-xs text-gray-400 block">{n.timestamp}</span>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-sm text-gray-500 text-center">No new notifications.</li>
                )}
              </ul>
              {notifications.length > 0 && (
                <div className="p-2 border-t text-center">
                  <button onClick={onClearNotifications} className="text-sm text-blue-500 hover:text-blue-700">Clear All</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
              S
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="font-semibold text-gray-700">Super Admin</span>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Super Admin</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, bgColor }) => (
  <div
    className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-lg ${bgColor}`}
  >
    <div className="flex flex-col">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-lg">{title}</span>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

interface EditCompanyModalProps {
  company: Company | null;
  onClose: () => void;
  onSave: (updatedCompany: Company) => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ company, onClose, onSave }) => {
  const [editedCompany, setEditedCompany] = useState<Company | null>(company);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [llamaApiKey, setLlamaApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('Gemini 2.0 Flash');
  const [status, setStatus] = useState<"active"|"inactive">("active");

  useEffect(() => {
    if (company) {
        setEditedCompany(company);
        setStatus(company.status);
    }
  }, [company]);

  if (!editedCompany) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    if (editedCompany) {
      onSave({...editedCompany, apiKey: geminiApiKey, status });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Company</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={editedCompany.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="description"
              value={editedCompany.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="address"
              value={editedCompany.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={editedCompany.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">City<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="city"
              value={editedCompany.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">API Keys Management</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Gemini API Key</label>
                <input
                  type="text"
                  placeholder="Leave blank to keep current key"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Llama API Key</label>
                <input
                  type="text"
                  placeholder="Leave blank to keep current key"
                  value={llamaApiKey}
                  onChange={(e) => setLlamaApiKey(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Gemini Model</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Gemini 2.0 Flash">Gemini 2.0 Flash</option>
                  <option value="Other Model">Other Model</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Status</label>
                <div className="flex space-x-2">
                  <button type="button"
                    onClick={() => setStatus('active')}
                    className={`px-4 py-2 rounded-lg font-semibold ${status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-green-600 transition-colors`}
                  >
                    Set Active
                  </button>
                  <button type="button"
                    onClick={() => setStatus('inactive')}
                    className={`px-4 py-2 rounded-lg font-semibold ${status === 'inactive' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-red-600 transition-colors`}
                  >
                    Set Inactive
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">API Key Actions</label>
                <div className="flex space-x-2">
                  <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    View API Keys Status
                  </button>
                  <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
                    Clear API Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
      <div className="text-gray-800 text-center mb-6">
        <h3 className="text-lg font-bold">This page says</h3>
        <p className="mt-2 text-base">Are you sure to delete this Company?</p>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

interface MainContentProps {
  activePage: string;
  companies: Company[];
  onEditCompany: (company: Company) => void;
  onDeleteCompany: (company: Company) => void;
  filter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  filteredAndSortedCompanies: Company[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activePage,
  onEditCompany,
  onDeleteCompany,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  totalPages,
  filteredAndSortedCompanies,
  statusFilter,
  setStatusFilter,
}) => {
  const content: { [key: string]: React.ReactNode } = {
    Dashboard: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Companies"
            value="4"
            icon=<BuildingIcon />
            bgColor="bg-purple-600"
          />
          <StatsCard
            title="Total Users"
            value="5"
            icon=<UsersIcon />
            bgColor="bg-green-600"
          />
          <StatsCard
            title="Inactive Companies"
            value="0"
            icon=<BuildingIcon />
            bgColor="bg-orange-600"
          />
          <StatsCard
            title="Inactive Users"
            value="1"
            icon=<UsersIcon />
            bgColor="bg-red-500"
          />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Data</h2>
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>
          </div>
          <div className="text-center text-gray-500 p-10">
            <h2 className="text-xl font-bold">Dashboard Overview</h2>
            <p className="text-lg">
              Select an option from the sidebar to view specific data.
            </p>
          </div>
        </div>
      </>
    ),
    Companies: (
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Companies</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Download Excel
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4 space-x-2">
          <button className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600" onClick={() => setStatusFilter('all')}>
            All
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600" onClick={() => setStatusFilter('active')}>
            Active
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600" onClick={() => setStatusFilter('inactive')}>
            Inactive
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Company Name</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">API Key</th>
                <th className="py-3 px-6">Created</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredAndSortedCompanies.map((company) => (
                <tr key={company.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{company.name}</td>
                  <td className="py-3 px-6">{company.description}</td>
                  <td className="py-3 px-6">{company.address}</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 rounded-full text-white ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <button className="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-6">{company.createdDate}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => onEditCompany(company)}
                      className="flex items-center bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => onDeleteCompany(company)}
                      className="flex items-center bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    ),
    Users: (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Users View</h2>
        <p className="text-gray-600 mt-2">
          This is where you would list and manage users.
        </p>
      </div>
    ),
    Restore: (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Restore</h2>
        <p className="text-gray-600 mt-2">
          This is where you would restore data.
        </p>
      </div>
    ),
    'Add Company': (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Add Company</h2>
        <p className="text-gray-600 mt-2">
          Use this form to add a new company to the system.
        </p>
      </div>
    ),
    'Add User': (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Add User</h2>
        <p className="text-gray-600 mt-2">
          Use this form to add a new user to the system.
        </p>
      </div>
    ),
  };

  return <main className="flex-1 p-8 bg-gray-100">{content[activePage]}</main>;
};

// --- Notifications Component ---
interface NotificationProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Notification disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-sm text-gray-700">{message}</span>
      </div>
    </div>
  );
};


// --- Login & Root App Component ---

interface SuperAdminDashboardProps {
  email: string;
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({onLogout,email}) => {
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [companies, setCompanies] = useState<Company[]>(DUMMY_COMPANIES);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filter, setFilter] = useState<string>('recent');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompanies((prevCompanies) => {
      const updatedList = prevCompanies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c));
      return updatedList;
    });
    setIsEditModalOpen(false);
    setSelectedCompany(null);
    addNotification('Company details updated successfully.');
  };

  const handleDeleteCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCompany) {
      setCompanies((prevCompanies) => prevCompanies.filter((c) => c.id !== selectedCompany.id));
      setIsDeleteModalOpen(false);
      setSelectedCompany(null);
      addNotification('Company successfully deleted.');
    }
  };

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(company => company.status === statusFilter);
    }

    if (filter === 'a-z') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'recent') {
      filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }
    return filtered;
  }, [companies, searchQuery, filter, statusFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredAndSortedCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
      return (
        <div className="flex min-h-screen font-sans">
          <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
          <div className="flex-1 flex flex-col">
            <TopBar onLogout={onLogout} notifications={notifications} onClearNotifications={handleClearNotifications} email={email} />
            <MainContent
              activePage={activePage}
              companies={companies}
              onEditCompany={handleEditCompany}
              onDeleteCompany={handleDeleteCompany}
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              filteredAndSortedCompanies={paginatedCompanies}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
          {isEditModalOpen && (
            <EditCompanyModal
              company={selectedCompany}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleSaveCompany}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteConfirmModal
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />
          )}
          {showToast && <NotificationToast message={toastMessage} onClose={() => setShowToast(false)} />}
        </div>
      );
    } 


export default SuperAdminDashboard;


