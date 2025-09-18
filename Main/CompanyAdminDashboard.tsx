/*import type React from "react"
import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

// --- Dashboard Components ---

// Data structures
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdDate: string;
}

interface Analysis {
  id: string;
  candidateName: string;
  email: string;
  mobile?: string;
  client: string;
  jobDescription: string;
  requiredExperience: string;
  candidateExperience: string;
  experienceMatch: boolean;
  score: number;
  parsedPages: number;
  parsedDate: string;
  fileName: string;
  skills: string[];
}

interface Client {
  id: string;
  name: string;
  jobDescriptions: JobDescription[];
  status: "active" | "inactive";
  createdDate: string;
}

interface JobDescription {
  id: string;
  name: string;
  requiredExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "error" | "info";
}

// Dummy Data
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "test5.1",
    email: "test5.1@talenthive.net",
    role: "user",
    status: "inactive",
    createdDate: "2025-09-01",
  },
  {
    id: "2",
    name: "test5.2",
    email: "test5.2@talenthive.net",
    role: "admin",
    status: "active",
    createdDate: "2025-09-04",
  },
  { id: "3", name: "test5.3", email: "user3@talenthive.net", role: "user", status: "active", createdDate: "2025-09-02" },
  {
    id: "4",
    name: "test5.4",
    email: "user4@talenthive.net",
    role: "user",
    status: "active",
    createdDate: "2025-09-05",
  },
  { id: "5", name: "test5.5", email: "user5@talenthive.net", role: "user", status: "active", createdDate: "2025-09-03" },
]

// Updated DUMMY_ANALYSES with more recent dates for the "last 7 days" chart filter
const DUMMY_ANALYSES: Analysis[] = [
  {
    id: "1",
    candidateName: "John Doe",
    email: "test5.2@talenthive.net",
    client: "Zoho",
    jobDescription: "Software Engineer",
    requiredExperience: "3-5 years",
    candidateExperience: "5 years",
    experienceMatch: true,
    fileName: "resume1.pdf",
    score: 85,
    parsedDate: "2025-08-10",
    parsedPages: 2,
    skills: ["React", "Node", "JavaScript"],
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    email: "test5.2@talenthive.net",
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "3 years",
    experienceMatch: false,
    fileName: "resume2.pdf",
    score: 70,
    parsedDate: "2025-09-05",
    parsedPages: 1,
    skills: ["Python", "SQL", "Excel"],
  },
  {
    id: "3",
    candidateName: "Alice Johnson",
    email: "user3@talenthive.net", // test5.3
    client: "Tests5",
    jobDescription: "Backend Developer",
    requiredExperience: "2+ years",
    candidateExperience: "4 years",
    experienceMatch: true,
    fileName: "resume3.pdf",
    score: 90,
    parsedDate: "2025-06-15",
    parsedPages: 5,
    skills: ["React", "CSS", "UI/UX"],
  },
  {
    id: "4",
    candidateName: "Bob Brown",
    email: "user4@talenthive.net", // test5.4
    client: "Client C",
    jobDescription: "Manager",
    requiredExperience: "5+ years",
    candidateExperience: "7 years",
    experienceMatch: false,
    fileName: "resume4.pdf",
    score: 60,
    parsedDate: "2025-06-20",
    parsedPages: 23,
    skills: ["Leadership", "Python", "Project Management"],
  },
  {
    id: "5",
    candidateName: "Charlie Davis",
    email: "user5@talenthive.net", // test5.5
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "2 years",
    experienceMatch: true,
    fileName: "resume5.pdf",
    score: 75,
    parsedDate: "2025-03-12",
    parsedPages: 12,
    skills: ["SQL", "Python"],
  },
  {
    id: "6",
    candidateName: "Diana Evans",
    email: "test5.2@talenthive.net",
    client: "Zoho",
    jobDescription: "Software Engineer",
    requiredExperience: "3-5 years",
    candidateExperience: "6 years",
    experienceMatch: true,
    fileName: "resume6.pdf",
    score: 95,
    parsedDate: "2025-09-12",
    parsedPages: 51,
    skills: ["Node", "React", "TypeScript"],
  },
  {
    id: "7",
    candidateName: "Frank Green",
    email: "user3@talenthive.net", // test5.3
    client: "Tests5",
    jobDescription: "Backend Developer",
    requiredExperience: "2+ years",
    candidateExperience: "3 years",
    experienceMatch: true,
    fileName: "resume7.pdf",
    score: 88,
    parsedDate: "2025-09-02",
    parsedPages: 6,
    skills: ["Figma", "UI/UX", "CSS"],
  },
  {
    id: "8",
    candidateName: "Grace Hall",
    email: "user4@talenthive.net", // test5.4
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "4 years",
    experienceMatch: true,
    fileName: "resume8.pdf",
    score: 92,
    parsedDate: "2024-11-20",
    parsedPages: 8,
    skills: ["Python", "SQL", "Pandas"],
  },
]


const DUMMY_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Tests5",
    status: "active",
    createdDate: "2025-09-09",
    jobDescriptions: [
      {
        id: "jd1",
        name: "Backend Developer",
        requiredExperience: "2-3",
        primarySkills: ["python", "django"],
        secondarySkills: ["AWS"],
      },
      {
        id: "jd2",
        name: "Backend Developer1",
        requiredExperience: "1-2",
        primarySkills: ["python", "fastapi", "flask"],
        secondarySkills: ["None"],
      },
    ],
  },
  {
    id: "c2",
    name: "Zoho",
    status: "active",
    createdDate: "2025-09-12",
    jobDescriptions: [
      {
        id: "jd3",
        name: "Data Analyst",
        requiredExperience: "3 years",
        primarySkills: ["Python", "SQL"],
        secondarySkills: ["Tableau", "Excel"],
      },
    ],
  },
]

const ITEMS_PER_PAGE = 10
const MAX_FILE_SIZE = 1024 * 1024 // 1MB in bytes
const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#EC4899", "#9333EA", "#14B8A6"]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// --- Icon Components ---
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
  </svg>
)
const ResumeAnalyzerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h8v4h4v12zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const AnalysisHistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z" />
  </svg>
)
const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16zm-5-8l-4 4h8l-4-4z" />
  </svg>
)
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
  </svg>
)
const CompanyUsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const ResumeAnalysesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h8v4h4v12zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const ClientsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const PageCountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
)
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 3.5-4.5s3.5 2.02 3.5 4.5v6z" />
  </svg>
)
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
)
const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
      clipRule="evenodd"
    />
  </svg>
)
const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 01-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)
const ExcelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
    <path d="M21 8.29l-3.37-3.37c-.3-.3-.72-.42-1.13-.3L12 7.74V4c0-.55-.45-1-1-1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9.32c0-.42-.12-.84-.36-1.03zM5 20c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-4h-5v-2h5V5h-3.79L18 7.3V14h-5v2h5v4zm-3-2h4v-2H2v2zM6 9h2v1H6V9zm0 2h2v1H6v-1z" />
  </svg>
)
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
    <path d="M19 12v1H5v-1h14zm0-4v1H5V8h14zm0-4v1H5V4h14zm-4 10v1H5v-1h10zm0 4v1H5v-1h10z" />
  </svg>
)
const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
    <path d="M19 8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-2 2v2H7v-2h10zm-2 6c0 .55-.45 1-1 1s-1-.45-1-1-.45-1-1-1-1 .45-1 1c0 .55.45 1 1 1s1 .45 1 1zM7 16h6c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zm12-9c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1zM7 4h10v1H7V4z" />
  </svg>
)
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
  </svg>
)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const CustomTooltip = ({ active, payload, label, fullData }: any) => {
    if (active && payload && payload.length) {
        const monthData = fullData.find((d: any) => d.month === label);
        if (!monthData) return null;

        const adminTotal = monthData['Admin (Total)'] || 0;
        const userEntries = Object.entries(monthData)
            .filter(([key, value]) => key.includes('(User)') && value > 0)
            .map(([key, value]) => ({ name: key.replace(' (User)', ''), pages: value as number }));

        return (
            <div className="p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200 text-sm">
                <p className="font-bold text-gray-800 mb-2">{`${label}`}</p>
                <p className="text-blue-600 font-semibold">{`Admin (Total): ${adminTotal}`}</p>
                {userEntries.map(user => (
                    <p key={user.name} className="text-gray-700 ml-2">{`User: ${user.name} → ${user.pages}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

// --- Main App Component ---

interface CompanyAdminDashboardProps {
  email: string;
  onLogout: () => void;
}

const CompanyAdminDashboard: React.FC<CompanyAdminDashboardProps> = ({ email, onLogout }) => {
  const [activePage, setActivePage] = useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [analyses, setAnalyses] = useState<Analysis[]>(DUMMY_ANALYSES);
  const [clients, setClients] = useState<Client[]>(DUMMY_CLIENTS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserForDeactivate, setSelectedUserForDeactivate] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [clientCurrentPage, setClientCurrentPage] = useState(1);


  // Resume Analyzer State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [clientType, setClientType] = useState<"new" | "existing">("new");
  const [clientName, setClientName] = useState("");
  const [jobDescriptionName, setJobDescriptionName] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [primarySkills, setPrimarySkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const [jdError, setJdError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isJdModified, setIsJdModified] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [hasExistingJdLoaded, setHasExistingJdLoaded] = useState(false);

  // Dashboard State
  const [view, setView] = useState<'All' | 'Users' | 'Admin'>('All');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [skillUserFilter, setSkillUserFilter] = useState("All Users");

  // Analysis History State
  const [analysisSortKey, setAnalysisSortKey] = useState<"id" | "candidateName" | "score" | "parsedDate">("id")
  const [analysisSortOrder, setAnalysisSortOrder] = useState<"asc" | "desc">("asc")
  const [analysisCurrentPage, setAnalysisCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [tableSearchQuery, setTableSearchQuery] = useState("")
  const [analysisUserFilter, setAnalysisUserFilter] = useState('All Users');

  // My Users & My Clients Page State
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [userSearchInput, setUserSearchInput] = useState("")
  const [clientSearchInput, setClientSearchInput] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState<'All' | 'active' | 'inactive'>('All');


  // Report State
  const [reportFilters, setReportFilters] = useState<{
    users: string[];
    clients: string;
    jobDescriptions: string;
    experienceMatch: string;
    scoreRange: string;
    fromDate: string;
    toDate: string;
  }>({
    users: [],
    clients: 'All Clients',
    jobDescriptions: 'All Job Descriptions',
    experienceMatch: 'All',
    scoreRange: 'All Scores',
    fromDate: '',
    toDate: '',
  });
  
  // Modals State
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [isEditJdModalOpen, setIsEditJdModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  
  const [selectedClientForJds, setSelectedClientForJds] = useState<Client | null>(null);
  
  const [editingClient, setEditingClient] = useState<{ id: string; name: string } | null>(null);
  const [editingJd, setEditingJd] = useState<JobDescription & { clientId: string } | null>(null);


  const stableOnLogout = useCallback(() => {
    onLogout()
  }, [onLogout])

  const addNotification = useCallback((message: string, type: "success" | "error" | "info") => {
    const newNotification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      type,
    }
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  }, [])

  // Debounce search for My Users page
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserSearchQuery(userSearchInput);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [userSearchInput]);

  const handleClearNotifications = () => {
    setNotifications([]);
  }

  const MemoizedTopBar = useMemo(() => {
    return (
      <TopBar
        onLogout={stableOnLogout}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
        email={email}
        activePage={activePage}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
    )
  }, [notifications, activePage, email, stableOnLogout]);

  // Memoized data calculations
  const userAnalyses = useMemo(() => {
    return users.reduce((acc: { [key: string]: Analysis[] }, user) => {
      acc[user.id] = analyses.filter((a) => a.email === user.email)
      return acc;
    }, {});
  }, [users, analyses]);

  const userPages = useMemo(() => {
    return Object.fromEntries(
      Object.entries(userAnalyses).map(([id, ans]) => [id, ans.reduce((sum, a) => sum + a.parsedPages, 0)]),
    );
  }, [userAnalyses]);

  const userRole = useMemo(() => {
    const currentUser = users.find((u) => u.email === email);
    return currentUser?.role || "user";
  }, [users, email]);

  const filteredAndSortedUsers = useMemo(() => {
    let usersToShow;
    if (userRole === "admin") {
      usersToShow = users; // Admins see all users
    } else {
      usersToShow = users.filter((u) => u.email === email); // Non-admins only see themselves
    }
  
    let filtered = usersToShow.filter(
      (user) =>
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  
    return filtered;
  }, [users, userSearchQuery, userRole, email]);

  const filteredAnalyses = useMemo(() => {
  let filtered = [...analyses];

  if (analysisUserFilter !== 'All Users') {
    filtered = filtered.filter(a => a.email === analysisUserFilter);
  }

  filtered = filtered.filter(
    (analysis) =>
      analysis.candidateName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.client.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.jobDescription.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.fileName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.score.toString().includes(tableSearchQuery.toLowerCase()) ||
      analysis.email.toLowerCase().includes(tableSearchQuery.toLowerCase())
  );

  filtered = filtered.sort((a, b) => {
    let valA, valB;
    if (analysisSortKey === "score") {
      valA = a.score;
      valB = b.score;
    } else if (analysisSortKey === "parsedDate") {
      valA = new Date(a.parsedDate).getTime();
      valB = new Date(b.parsedDate).getTime();
    } else if (analysisSortKey === "id") {
      valA = parseInt(a.id, 10);
      valB = parseInt(b.id, 10);
    } else {
      // candidateName
      valA = a.candidateName.toLowerCase();
      valB = b.candidateName.toLowerCase();
    }

    if (valA < valB) return analysisSortOrder === "asc" ? -1 : 1;
    if (valA > valB) return analysisSortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return filtered;
}, [analyses, tableSearchQuery, analysisSortKey, analysisSortOrder, analysisUserFilter]);


  const paginatedUsers = useMemo(() => {
    const start = (userCurrentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredAndSortedUsers.slice(start, end);
  }, [filteredAndSortedUsers, userCurrentPage, entriesPerPage]);

  const totalPagesUsers = Math.ceil(filteredAndSortedUsers.length / entriesPerPage);

  const paginatedAnalyses = useMemo(() => {
      const start = (analysisCurrentPage - 1) * entriesPerPage;
      const end = start + entriesPerPage;
      return filteredAnalyses.slice(start, end);
  }, [filteredAnalyses, analysisCurrentPage, entriesPerPage]);

  const totalPagesAnalyses = Math.ceil(filteredAnalyses.length / entriesPerPage);

  const filteredReportAnalyses = useMemo(() => {
      let filtered = analyses;
      
      const { users: selectedUserEmails, clients, jobDescriptions, experienceMatch, scoreRange, fromDate, toDate } = reportFilters;
      
      if (selectedUserEmails.length > 0) {
        filtered = filtered.filter(a => selectedUserEmails.includes(a.email));
      }

      if (clients !== 'All Clients') {
          filtered = filtered.filter(a => a.client === clients);
      }

      if (jobDescriptions !== 'All Job Descriptions') {
          filtered = filtered.filter(a => a.jobDescription === jobDescriptions);
      }

      if (experienceMatch !== 'All') {
          filtered = filtered.filter(a => a.experienceMatch === (experienceMatch === 'Match'));
      }

      if (scoreRange !== 'All Scores') {
          const [min, max] = scoreRange.split('-').map(Number);
          filtered = filtered.filter(a => a.score >= min && a.score <= max);
      }

      if (fromDate) {
          const from = new Date(fromDate);
          filtered = filtered.filter(a => new Date(a.parsedDate) >= from);
      }
      if (toDate) {
          const to = new Date(toDate);
          filtered = filtered.filter(a => new Date(a.parsedDate) <= to);
      }

      return filtered;
  }, [analyses, reportFilters]);

  const paginatedReportAnalyses = useMemo(() => {
    const start = (analysisCurrentPage - 1) * entriesPerPage
    const end = start + entriesPerPage
    return filteredReportAnalyses.slice(start, end)
  }, [filteredReportAnalyses, analysisCurrentPage, entriesPerPage])

  const totalPagesReport = Math.ceil(filteredReportAnalyses.length / entriesPerPage);

  // --- START: New Dashboard Data Logic ---

  const analysesForCards = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    return analyses.filter(a => {
        const date = new Date(a.parsedDate);
        const yearMatch = date.getFullYear() === currentYear;
        const monthMatch = date.getMonth() + 1 === currentMonth;
        return yearMatch && monthMatch;
    });
  }, [analyses]);


  const fullChartData = useMemo(() => {
    const analysesByYear = analyses.filter(a => new Date(a.parsedDate).getFullYear() === selectedYear);
    const activeUsers = users.filter(u => u.status === 'active');
    const userMap = new Map(users.map(u => [u.email, u]));

    const monthlyData = MONTH_NAMES.map((monthName, index) => {
        const base: {[key: string]: any} = {
            month: `${monthName}`,
            monthIndex: index,
            'Admin (Total)': 0,
            'Users (Total)': 0,
        };
        activeUsers.forEach(user => {
            base[`${user.name} (${user.role === 'admin' ? 'Admin' : 'User'})`] = 0;
        });
        return base;
    });

    analysesByYear.forEach(analysis => {
      const monthIndex = new Date(analysis.parsedDate).getMonth();
      const user = userMap.get(analysis.email);
      if (!user || user.status !== 'active') return;

      const key = `${user.name} (${user.role === 'admin' ? 'Admin' : 'User'})`;
      monthlyData[monthIndex][key] = (monthlyData[monthIndex][key] || 0) + analysis.parsedPages;

      if (user.role === 'admin') {
        monthlyData[monthIndex]['Admin (Total)'] += analysis.parsedPages;
      } else {
        monthlyData[monthIndex]['Users (Total)'] += analysis.parsedPages;
      }
    });

    return monthlyData;
  }, [analyses, users, selectedYear]);

  const visibleChartData = useMemo(() => {
    if (!fullChartData.length) return [];

    const activeAdmins = users.filter(u => u.status === 'active' && u.role === 'admin').map(u => `${u.name} (Admin)`);
    const activeUsers = users.filter(u => u.status === 'active' && u.role === 'user').map(u => `${u.name} (User)`);
    
    return fullChartData.map(monthData => {
        const newMonthData: { [key: string]: any } = { month: monthData.month };
        
        if (view === 'All') {
            newMonthData['Admin (Total)'] = monthData['Admin (Total)'];
            newMonthData['Users (Total)'] = monthData['Users (Total)'];
        } else if (view === 'Admin') {
            activeAdmins.forEach(adminName => {
                newMonthData[adminName] = monthData[adminName] || 0;
            });
        } else if (view === 'Users') {
            activeUsers.forEach(userName => {
                newMonthData[userName] = monthData[userName] || 0;
            });
        }
        return newMonthData;
    });
  }, [fullChartData, view, users]);

  const analysesByYear = useMemo(() => {
    return analyses.filter(a => new Date(a.parsedDate).getFullYear() === selectedYear);
  }, [analyses, selectedYear]);
  
  const pieDataResumesByClient = useMemo(() => {
    const clientCounts: { [key: string]: number } = {};
    analysesByYear.forEach((a) => {
      clientCounts[a.client] = (clientCounts[a.client] || 0) + 1;
    });
    return Object.entries(clientCounts).map(([name, value]) => ({ name, value }))
  }, [analysesByYear]);

  const pieDataSkills = useMemo(() => {
    let filteredForSkills = analyses;

    if (skillUserFilter !== 'All Users') {
        filteredForSkills = analyses.filter(a => a.email === skillUserFilter);
    }

    const skillCounts: { [key: string]: number } = {};
    filteredForSkills.forEach((a) => {
      a.skills.forEach((s) => {
        skillCounts[s] = (skillCounts[s] || 0) + 1;
      });
    });
    return Object.entries(skillCounts).map(([name, value]) => ({ name, value }));
  }, [analyses, skillUserFilter]);
  
  // --- END: New Dashboard Data Logic ---

  // State and logic for modals and notifications
  const handleDeactivateUser = (user: User) => {
    setSelectedUserForDeactivate(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeactivate = () => {
    if (selectedUserForDeactivate) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === selectedUserForDeactivate.id ? { ...u, status: "inactive" } : u)),
      )
      setIsDeleteModalOpen(false);
      setSelectedUserForDeactivate(null);
      addNotification("User deactivated successfully.", "success");
    }
  };

  const clearJdDetails = () => {
    setRequiredExperience("");
    setPrimarySkills("");
    setSecondarySkills("");
    setIsEditMode(true);
    setHasExistingJdLoaded(false);
    setIsJdModified(false);
  };

  // State and logic for Resume Analyzer
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 1MB limit.");
      setUploadedFile(null);
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (allowedTypes.includes(file.type)) {
        setFileError(null);
        setUploadedFile(file);
      } else {
        setFileError("Invalid file type. Please upload PDF, DOC, or DOCX.");
        setUploadedFile(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError(null);
  }

  const resetJdFields = () => {
    setJobDescriptionName("");
    setJdError(null);
    clearJdDetails();
  }

  const handleClientTypeChange = (type: "new" | "existing") => {
    setClientType(type);
    setClientName("");
    setClientError(null);
    setSelectedClient(null);
    resetJdFields();
  }

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.value;
    setClientName(name);
    resetJdFields();

    const existingClient = clients.find((c) => c.name.toLowerCase() === name.toLowerCase())

    if (clientType === "new") {
      if (existingClient) {
        setClientError(`Client "${name}" already exists. You can create a new job description for this client.`)
        setSelectedClient(existingClient);
      } else {
        setClientError(null);
        setSelectedClient(null);
      }
    } else {
      setClientError(null);
      setSelectedClient(existingClient || null);
    }
  };

  const handleJdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setJobDescriptionName(name);
    setJdError(null);
    clearJdDetails();

    const clientForLogic = selectedClient;
    if (clientForLogic) {
        const existingJd = clientForLogic.jobDescriptions.find(jd => jd.name.toLowerCase() === name.toLowerCase());
        if (existingJd) {
            setJdError(`Job description "${name}" already exists for this client.`);
        }
    }
  };

  const handleJdSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.value;
      setJobDescriptionName(name);
      setJdError(null);

      if (!selectedClient || !name) {
          clearJdDetails();
          return;
      }

      const existingJd = selectedClient.jobDescriptions.find(jd => jd.name === name);

      if (existingJd) {
          setRequiredExperience(existingJd.requiredExperience);
          setPrimarySkills(existingJd.primarySkills.join(", "));
          setSecondarySkills(existingJd.secondarySkills.join(", "));
          setIsEditMode(false);
          setHasExistingJdLoaded(true);
          setIsJdModified(false);
      }
  };


  const handleJdFieldChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setIsJdModified(true);
  };

  const handleSaveJd = () => {
    if (!editingJd) return;
  
    const updatedClients = clients.map(client => {
      if (client.id === editingJd.clientId) {
        return {
          ...client,
          jobDescriptions: client.jobDescriptions.map(jd =>
            jd.id === editingJd.id ? { ...jd, ...editingJd } : jd
          ),
        };
      }
      return client;
    });
  
    setClients(updatedClients);
    addNotification("Job Description updated successfully.", "success");
    setIsEditJdModalOpen(false);
    setEditingJd(null);
  };

  const handleAnalyzeResume = () => {
    addNotification("Resume analysis initiated.", "info");
  }

  const isAnalyzeButtonEnabled = useMemo(() => {
    return (
      uploadedFile !== null &&
      clientName.trim() !== "" &&
      jobDescriptionName.trim() !== "" &&
      requiredExperience.trim() !== "" &&
      primarySkills.trim() !== "" &&
      fileError === null &&
      clientError === null &&
      jdError === null
    )
  }, [
    uploadedFile,
    clientName,
    jobDescriptionName,
    requiredExperience,
    primarySkills,
    fileError,
    clientError,
    jdError,
  ])

  // Pagination for tables
  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    setEntriesPerPage(value);
    setAnalysisCurrentPage(1);
    setUserCurrentPage(1);
    setClientCurrentPage(1);
  }

  // Logic for My Users page
  const handleUserStatusChange = useCallback((user: User, newStatus: "active" | "inactive") => {
    if (userRole !== "admin") {
      addNotification("Only admins can change user status.", "error");
      return;
    }
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    addNotification(`User ${user.name} status updated to ${newStatus}.`, "info");
  }, [userRole, addNotification]);

  // Logic for My Clients page
  const handleClientStatusChange = useCallback((client: Client, newStatus: "active" | "inactive") => {
    setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
    addNotification(`Client ${client.name} status updated to ${newStatus}.`, "info");
  }, []);

  const handleUpdateClient = () => {
    if (!editingClient) return;
    
    const oldName = clients.find(c => c.id === editingClient.id)?.name;

    // Update client name in clients state
    setClients(prevClients => prevClients.map(c => 
        c.id === editingClient.id ? { ...c, name: editingClient.name } : c
    ));

    // Update client name in all associated analyses
    if(oldName && oldName !== editingClient.name) {
        setAnalyses(prevAnalyses => prevAnalyses.map(a => 
            a.client === oldName ? { ...a, client: editingClient.name } : a
        ));
    }
    
    addNotification("Client updated successfully.", "success");
    setIsEditClientModalOpen(false);
    setEditingClient(null);
  };
  
  const handleUpdateJd = () => {
    if (!editingJd) return;

    const updatedClients = clients.map(client => {
      if (client.id === editingJd.clientId) {
        const updatedJds = client.jobDescriptions.map(jd =>
          jd.id === editingJd.id ? { ...editingJd, primarySkills: editingJd.primarySkills, secondarySkills: editingJd.secondarySkills } : jd
        );
        return { ...client, jobDescriptions: updatedJds };
      }
      return client;
    });

    setClients(updatedClients);
    addNotification("Job Description updated successfully.", "success");
    setIsEditJdModalOpen(false);
    setEditingJd(null);
  };


  const handleReportFilterChange = (key: string, value: any) => {
    setReportFilters((prev) => ({ ...prev, [key]: value }));
  }

  const handleSort = useCallback(
    (key: "id" | "candidateName" | "score" | "parsedDate") => {
      setAnalysisSortKey(key)
      setAnalysisSortOrder(analysisSortKey === key && analysisSortOrder === "asc" ? "desc" : "asc")
    },
    [analysisSortKey, analysisSortOrder],
  )

  const handleExportData = useCallback(
    (format: "excel" | "pdf") => {
      const dataToExport = filteredAnalyses.map((analysis) => ({
        "Candidate Name": analysis.candidateName,
        Experience: analysis.candidateExperience,
        "Experience Match": analysis.experienceMatch ? "Match" : "No Match",
        Score: analysis.score,
        "File Name": analysis.fileName,
        "Parsed Pages": analysis.parsedPages,
        "Parsed Date": analysis.parsedDate,
      }))

      if (format === "excel") {
        // Create CSV content
        const csvContent = [
          Object.keys(dataToExport[0]).join(","),
          ...dataToExport.map((row) => Object.values(row).join(",")),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis-history.csv"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else if (format === "pdf") {
        // Create text content for PDF simulation
        const textContent = dataToExport.map((row) => Object.values(row).join(" | ")).join("\n")
        const blob = new Blob([textContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis-history.txt"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    },
    [filteredAnalyses],
  )

 const memoizedTable = useMemo(() => {
    return (data: any[], isUserTable = false, userRole = "user", currentPage = 1) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleExportData("excel")}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Download Excel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleExportData("pdf")}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Download PDF"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Print"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={isUserTable ? "Search users..." : "Search..."}
              value={isUserTable ? userSearchInput : tableSearchQuery}
              onChange={(e) =>
                isUserTable ? setUserSearchInput(e.target.value) : setTableSearchQuery(e.target.value)
              }
              className="pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-80"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {(isUserTable ? userSearchInput : tableSearchQuery) && (
              <button
                onClick={() => (isUserTable ? setUserSearchInput("") : setTableSearchQuery(""))}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {isUserTable ? (
                // Headers for the My Users table
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Parsed Pages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Created on</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </>
              ) : (
                // Headers for the Analysis History and Report tables
                <>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     <button
                      onClick={() => handleSort("id")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>S.no</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("candidateName")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Candidate Name</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Req-Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate-Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("score")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Score</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("parsedDate")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Parsed Date</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {isUserTable ? (
                  // Data cells for the My Users table
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userPages[item.id] || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={item.status}
                          onChange={(e) => handleUserStatusChange(item, e.target.value as "active" | "inactive")}
                           className={`p-1.5 rounded-md text-xs border ${item.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                           disabled={userRole !== 'admin'}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                    </td>
                  </>
                ) : (
                  // Data cells for the Analysis History and Report tables
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.candidateName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobile || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jobDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.requiredExperience}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.candidateExperience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.experienceMatch ? (
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parsedPages}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parsedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => isUserTable ? setUserCurrentPage(Math.max(1, currentPage - 1)) : setAnalysisCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil((isUserTable ? filteredAndSortedUsers.length : filteredAnalyses.length) / entriesPerPage)}
            </span>
            <button
              onClick={() => isUserTable ? setUserCurrentPage(currentPage + 1) : setAnalysisCurrentPage(currentPage + 1)}
              disabled={
                currentPage >= Math.ceil((isUserTable ? filteredAndSortedUsers.length : filteredAnalyses.length) / entriesPerPage)
              }
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}, [
    activePage,
    tableSearchQuery,
    userSearchInput,
    entriesPerPage,
    analysisCurrentPage,
    userCurrentPage,
    analysisSortKey,
    analysisSortOrder,
    filteredAnalyses,
    filteredAndSortedUsers,
    users,
    userPages,
    handleUserStatusChange,
    handleExportData,
  ])

  const ReportPage = () => (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Report</h2>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Users</label>
            <MultiSelectUsers
                users={users.filter(u => u.status === 'active')}
                selectedUsers={reportFilters.users}
                onChange={(selected) => handleReportFilterChange('users', selected)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Client</label>
            <select
              value={reportFilters.clients}
              onChange={(e) => handleReportFilterChange("clients", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Clients">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Job Description</label>
            <select
              value={reportFilters.jobDescriptions}
              onChange={(e) => handleReportFilterChange("jobDescriptions", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Job Descriptions">All Job Descriptions</option>
              {clients
                .find((c) => c.name === reportFilters.clients)
                ?.jobDescriptions.map((jd) => (
                  <option key={jd.id} value={jd.name}>
                    {jd.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Exp. Match</label>
            <select
              value={reportFilters.experienceMatch}
              onChange={(e) => handleReportFilterChange("experienceMatch", e.target.value)}
              className="w-full px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Match">Match</option>
              <option value="No Match">No Match</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              value={reportFilters.fromDate}
              onChange={(e) => handleReportFilterChange("fromDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              value={reportFilters.toDate}
              onChange={(e) => handleReportFilterChange("toDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      {memoizedTable(paginatedReportAnalyses, false, 'user', analysisCurrentPage)}
    </div>
  )

  const MyUsersPageContent = () => {
    return (
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Users</h2>
        </div>
        {memoizedTable(paginatedUsers, true, userRole, userCurrentPage)}
      </div>
    );
  };

  const MyClientsPageContent = () => {
      const filteredClients = useMemo(() => 
        clients.filter(c => 
            c.name.toLowerCase().includes(clientSearchInput.toLowerCase()) &&
            (clientStatusFilter === 'All' || c.status === clientStatusFilter)
        ), 
        [clients, clientSearchInput, clientStatusFilter]
      );
      
      const paginatedClients = useMemo(() => {
        const start = (clientCurrentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        return filteredClients.slice(start, end);
      }, [filteredClients, clientCurrentPage, entriesPerPage]);

      return (
        <div className="p-8 bg-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Company Clients</h2>
                <div className="flex items-center space-x-4">
                    <select
                        value={clientStatusFilter}
                        onChange={(e) => setClientStatusFilter(e.target.value as any)}
                        className="p-2 rounded-lg border bg-white shadow-sm"
                    >
                        <option value="All">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={clientSearchInput}
                            onChange={(e) => setClientSearchInput(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-80"
                        />
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Descriptions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Created Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedClients.map((client, index) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(clientCurrentPage - 1) * entriesPerPage + index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setSelectedClientForJds(client);
                                                setIsJdModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-semibold hover:bg-blue-600"
                                        >
                                            View JDs ({client.jobDescriptions.length})
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.createdDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setEditingClient({ id: client.id, name: client.name });
                                                setIsEditClientModalOpen(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                         <select
                                            value={client.status}
                                            onChange={(e) => handleClientStatusChange(client, e.target.value as "active" | "inactive")}
                                            className={`p-1.5 rounded-md text-xs border ${client.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                                            >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
  };


  const AnalysisHistoryPageContent = () => (
    <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-800">Analysis History</h2>
             <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Filter by User:</label>
                <select
                    value={analysisUserFilter}
                    onChange={(e) => setAnalysisUserFilter(e.target.value)}
                    className="p-2 rounded-lg border bg-white shadow-sm"
                >
                    <option value="All Users">All Users</option>
                    {users.filter(u => u.status === 'active').map(user => (
                        <option key={user.id} value={user.email}>{user.name}</option>
                    ))}
                </select>
             </div>
        </div>
      {memoizedTable(paginatedAnalyses, false, 'user', analysisCurrentPage)}
    </div>
  );

  const resumeAnalyzerContent = (
    <div className="p-8 bg-gray-100">
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Resume Upload</h3>
                <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2 w-full h-20 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById("file-upload-input")?.click()}
                >
                    <input type="file" id="file-upload-input" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    <p className="text-sm text-gray-600">Drag & drop or click</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max: 1MB)</p>
                </div>
                 {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                {uploadedFile && (
                    <div className="flex items-center justify-between p-3 mt-4 bg-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 truncate">{uploadedFile.name}</span>
                        <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2">
                           <XCircleIcon />
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Client Section</h3>
                    <div>
                        <div className="flex space-x-4 mb-2">
                            <label className="inline-flex items-center"><input type="radio" name="clientType" value="new" checked={clientType === "new"} onChange={() => handleClientTypeChange("new")} className="form-radio text-indigo-600" /><span className="ml-2 text-sm">New Client</span></label>
                            <label className="inline-flex items-center"><input type="radio" name="clientType" value="existing" checked={clientType === "existing"} onChange={() => handleClientTypeChange("existing")} className="form-radio text-indigo-600" /><span className="ml-2 text-sm">Existing Client</span></label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-sm">
                            {clientType === 'new' ? 'Client Name' : 'Select Client'} <span className="text-red-500">*</span>
                        </label>
                        {clientType === "new" ? (<input type="text" placeholder="e.g., Test5" value={clientName} onChange={handleClientNameChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />) : (<select value={clientName} onChange={handleClientNameChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"><option value="">Choose a Client</option>{clients.filter(c => c.status === 'active').map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}</select>)}
                        {clientError && <p className="text-red-600 text-sm mt-1">{clientError}</p>}
                    </div>
                </div>

                {(clientType === 'new' || selectedClient) && (
                    <div className="space-y-4 border-t pt-4">
                         <h3 className="text-xl font-semibold text-gray-800">Job Description Section</h3>
                        <div>
                            <label htmlFor="jd-input" className="block text-gray-700 font-medium mb-1 text-sm">Job Description Name <span className="text-red-500">*</span></label>
                            
                            {clientType === 'existing' && selectedClient ? (
                                <select
                                    value={jobDescriptionName}
                                    onChange={handleJdSelectChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Select Job Description</option>
                                    {selectedClient.jobDescriptions.map(jd => (
                                        <option key={jd.id} value={jd.name}>{jd.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    id="jd-input" 
                                    placeholder="e.g., Backend Developer" 
                                    value={jobDescriptionName} 
                                    onChange={handleJdInputChange} 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            )}
                            {jdError && <p className="text-red-600 text-sm mt-1">{jdError}</p>}
                        </div>
                    </div>
                )}
                
                {(clientType === 'new' || (jobDescriptionName.trim() !== "" && !jdError)) && (
                    <div className="space-y-4">
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Required Experience <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., 3-5, 4+, 5+" value={requiredExperience} onChange={(e) => handleJdFieldChange(setRequiredExperience, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Primary Skills (Must Have) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g. Python, Java, SQL" value={primarySkills} onChange={(e) => handleJdFieldChange(setPrimarySkills, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Secondary Skills (Nice to Have)</label><input type="text" placeholder="e.g. Docker, AWS, CI/CD" value={secondarySkills} onChange={(e) => handleJdFieldChange(setSecondarySkills, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div className="flex justify-end pt-2">{hasExistingJdLoaded && !isEditMode && (<button onClick={() => setIsEditMode(true)} className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"><EditIcon /> Edit</button>)}{hasExistingJdLoaded && isEditMode && (<button onClick={handleSaveJd} disabled={!isJdModified} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300">Save Changes</button>)}</div>
                    </div>
                 )}
            </div>
        </div>
        <div className="flex justify-center mt-8">
            <button
                onClick={handleAnalyzeResume}
                disabled={!isAnalyzeButtonEnabled}
                className={`w-full max-w-md py-3 rounded-lg text-white font-semibold transition-colors ${isAnalyzeButtonEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
            >
                Analyze Resume
            </button>
        </div>
    </div>
  )
  const dashboardContent = (
  <div className="flex-1 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
              title="Active Users"
              value={users.filter(u => u.status === "active").length.toString()}
              icon={<UsersIcon />}
              bgColor="bg-blue-500"
              onClick={() => setActivePage("My Users")}
          />
          <StatsCard
              title="Analysed Resume (Current Year & Month)"
              value={analysesForCards.length.toString()}
              icon={<ResumeAnalysesIcon />}
              bgColor="bg-yellow-500"
              onClick={() => setActivePage("Analysis History")}
          />
          <StatsCard
              title="Pages Count (Current Year & Month)"
              value={analysesForCards.reduce((acc, a) => acc + a.parsedPages, 0).toString()}
              icon={<PageCountIcon />}
              bgColor="bg-green-500"
              onClick={() => {}}
          />
          <StatsCard
              title="Active Clients"
              value={clients.filter(c => c.status === 'active').length.toString()}
              icon={<ClientsIcon />}
              bgColor="bg-red-500"
              onClick={() => setActivePage("My Clients")}
          />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-bold text-gray-800">Company Data</h2>
              <div className="flex items-center space-x-4">
                  <select value={view} onChange={(e) => setView(e.target.value as any)} className="p-2 rounded-lg border bg-gray-50 shadow-sm">
                      <option value="All">View: Admin & Users</option>
                      <option value="Users">View: Users</option>
                      <option value="Admin">View: Admin</option>
                  </select>
                  <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 rounded-lg border bg-gray-50 shadow-sm">
                      {[2025, 2024, 2023].map(year => <option key={year} value={year}>Year: {year}</option>)}
                  </select>
              </div>
          </div>

          <div style={{ height: "450px" }}>
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visibleChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Number of Pages', angle: -90, position: 'insideLeft' }} />
                      <Tooltip content={<CustomTooltip fullData={fullChartData} />} />
                      <Legend />
                      {visibleChartData.length > 0 && Object.keys(visibleChartData[0]).filter(key => key !== 'month').map((key, index) => (
                          <Bar 
                              key={key} 
                              dataKey={key} 
                              fill={
                                  key === 'Admin (Total)' ? '#3B82F6' :
                                  key === 'Users (Total)' ? '#EF4444' :
                                  COLORS[index % COLORS.length]
                              } 
                              radius={[4, 4, 0, 0]} 
                           />
                      ))}
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "450px" }}>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumes by Client ({selectedYear})</h3>
                <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                    data={pieDataResumesByClient}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    >
                    {pieDataResumesByClient.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "450px" }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Skills Distribution</h3>
                    <select
                        value={skillUserFilter}
                        onChange={(e) => setSkillUserFilter(e.target.value)}
                        className="p-1 text-sm rounded-lg border bg-gray-50 shadow-sm"
                    >
                        <option value="All Users">All Users</option>
                        {users.filter(u => u.status === 'active').map(user => (
                            <option key={user.id} value={user.email}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie data={pieDataSkills} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
                    {pieDataSkills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconSize={10}
                    wrapperStyle={{ overflowY: "auto", maxHeight: "300px" }}
                    />
                </PieChart>
                </ResponsiveContainer>
            </div>
       </div>
  </div>
);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {MemoizedTopBar}
        <main className="flex-1">
          {activePage === "Dashboard" && dashboardContent}
          {activePage === "My Users" && <MyUsersPageContent />}
          {activePage === "My Clients" && <MyClientsPageContent />}
          {activePage === "Analysis History" && <AnalysisHistoryPageContent />}
          {activePage === "Report" && <ReportPage />}
          {activePage === "Resume Analyzer" && resumeAnalyzerContent}
          {activePage === "Company Info" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold">Company Info</h2>
              <p className="text-gray-600 mt-2">This is where you would view company info.</p>
            </div>
          )}
        </main>

      </div>
        {isJdModalOpen && selectedClientForJds && (
            <JdListModal
                client={selectedClientForJds}
                onClose={() => setIsJdModalOpen(false)}
                onEditJd={(jd) => {
                    setEditingJd({ ...jd, clientId: selectedClientForJds.id });
                    setIsEditJdModalOpen(true);
                }}
            />
        )}
        {isEditClientModalOpen && editingClient && (
            <EditClientModal
                client={editingClient}
                onClose={() => setIsEditClientModalOpen(false)}
                onSave={handleUpdateClient}
                setEditingClient={setEditingClient}
            />
        )}
        {isEditJdModalOpen && editingJd && (
            <EditJdModal
                jd={editingJd}
                onClose={() => setIsEditJdModalOpen(false)}
                onSave={handleUpdateJd}
                setEditingJd={setEditingJd}
            />
        )}
      {isDeleteModalOpen && (
        <DeleteConfirmModal onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeactivate} />
      )}
      {showToast && <NotificationToast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />}
    </div>
  )
}

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) => {
  const sidebarItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Resume Analyzer", icon: <ResumeAnalyzerIcon /> },
    { name: "Analysis History", icon: <AnalysisHistoryIcon /> },
    { name: "Report", icon: <ReportIcon /> },
    { name: "My Users", icon: <UsersIcon /> },
    { name: "My Clients", icon: <ClientsIcon /> },
  ]
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`flex-col w-64 bg-gradient-to-br from-green-800 to-green-500 text-white min-h-screen p-6 shadow-xl fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-white"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActivePage(item.name)}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out ${
                    activePage === item.name ? "bg-green-900 text-white shadow-inner" : "hover:bg-green-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-4 font-semibold">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

const TopBar = ({
  onLogout,
  notifications,
  onClearNotifications,
  email,
  activePage,
  onMenuClick,
}: {
  onLogout: () => void;
  notifications: Notification[];
  onClearNotifications: () => void;
  email: string;
  activePage: string;
  onMenuClick: () => void;
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const userInitial = email ? email.charAt(0).toUpperCase() : "?";

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md rounded-b-lg">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="p-2 mr-4 text-gray-600 hover:text-gray-800 lg:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{activePage}</h1>
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative" ref={notificationsDropdownRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          >
            <BellIcon />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {notifications.length}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
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
                  <button onClick={onClearNotifications} className="text-sm text-blue-500 hover:text-blue-700">
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg">
              {userInitial}
            </div>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Profile</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Company Info</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const StatsCard = ({
  title,
  value,
  icon,
  bgColor,
  onClick,
}: {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
  onClick: () => void
}) => (
  <div
    className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-lg ${bgColor} ${onClick !== null && onClick.toString() !== '() => {}' ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
    onClick={onClick}
  >
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-lg">{title}</span>
    </div>
    <div className="text-4xl opacity-80">{icon}</div>
  </div>
)

const DeleteConfirmModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
      <div className="text-gray-800 text-center mb-6">
        <h3 className="text-lg font-bold">This page says</h3>
        <p className="mt-2 text-base">Are you sure to perform this action?</p>
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
)

const NotificationToast = ({
  message,
  onClose,
  type,
}: {
  message: string
  onClose: () => void
  type: "success" | "error" | "info"
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000) // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type]

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`p-4 rounded-lg shadow-lg text-white flex items-center space-x-3 ${bgColor}`}>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  )
}

const MultiSelectUsers = ({ users, selectedUsers, onChange }: { users: User[], selectedUsers: string[], onChange: (selected: string[]) => void}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const userMap = useMemo(() => new Map(users.map(u => [u.email, u.name])), [users]);

    const toggleUser = (email: string) => {
        const newSelection = selectedUsers.includes(email)
            ? selectedUsers.filter(u => u !== email)
            : [...selectedUsers, email];
        onChange(newSelection);
    };

    const removeUser = (email: string) => {
        onChange(selectedUsers.filter(u => u !== email));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[42px] p-1 flex flex-wrap items-center gap-1 cursor-pointer">
                {selectedUsers.length === 0 && <span className="text-gray-400 px-2">Select users...</span>}
                {selectedUsers.map(email => (
                    <span key={email} className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        {userMap.get(email) || email}
                        <button onClick={(e) => { e.stopPropagation(); removeUser(email); }} className="text-white hover:text-blue-200">
                            <XMarkIcon />
                        </button>
                    </span>
                ))}
            </div>
            {isOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <ul>
                        {users.map(user => (
                            <li 
                                key={user.id} 
                                onClick={() => { toggleUser(user.email); }}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${selectedUsers.includes(user.email) ? 'bg-blue-100' : ''}`}
                            >
                                <span>{user.name} ({user.role})</span>
                                {selectedUsers.includes(user.email) && <CheckCircleIcon className="w-4 h-4 text-blue-600"/>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


// --- My Clients Page Modals ---
const JdListModal = ({ client, onClose, onEditJd }: { client: Client, onClose: () => void, onEditJd: (jd: JobDescription) => void }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Job Descriptions - {client.name}</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div className="overflow-x-auto max-h-[60vh]">
                 <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">JD Title</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required Experience</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Primary Skills</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Secondary Skills</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {client.jobDescriptions.map((jd, index) => (
                            <tr key={jd.id}>
                                <td className="px-4 py-2 text-sm">{index + 1}</td>
                                <td className="px-4 py-2 text-sm">{jd.name}</td>
                                <td className="px-4 py-2 text-sm">{jd.requiredExperience}</td>
                                <td className="px-4 py-2 text-sm">{jd.primarySkills.join(', ')}</td>
                                <td className="px-4 py-2 text-sm">{jd.secondarySkills.join(', ')}</td>
                                <td className="px-4 py-2 text-sm">
                                    <button onClick={() => onEditJd(jd)} className="text-indigo-600 hover:text-indigo-900"><EditIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
            <div className="flex justify-end pt-4 border-t mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Close</button>
            </div>
        </div>
    </div>
);

const EditClientModal = ({ client, onClose, onSave, setEditingClient }: { client: {id: string, name: string}, onClose: () => void, onSave: () => void, setEditingClient: React.Dispatch<React.SetStateAction<{id: string, name: string} | null>> }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Edit Client</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Client Name</label>
                 <input 
                    type="text" 
                    value={client.name}
                    onChange={(e) => setEditingClient({ ...client, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
             <div className="flex justify-end pt-4 border-t mt-4 space-x-2">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600">Save Changes</button>
            </div>
        </div>
    </div>
);

const EditJdModal = ({ jd, onClose, onSave, setEditingJd }: { jd: JobDescription & { clientId: string }, onClose: () => void, onSave: () => void, setEditingJd: React.Dispatch<React.SetStateAction<(JobDescription & { clientId: string }) | null>> }) => {
    const handleSkillChange = (field: 'primarySkills' | 'secondarySkills', value: string) => {
        setEditingJd(prev => prev ? { ...prev, [field]: value.split(',').map(s => s.trim()) } : null);
    };

    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Edit Job Description</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" value={jd.name} onChange={(e) => setEditingJd(prev => prev ? { ...prev, name: e.target.value } : null)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Required Experience</label>
                    <input type="text" value={jd.requiredExperience} onChange={(e) => setEditingJd(prev => prev ? { ...prev, requiredExperience: e.target.value } : null)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Skills (comma separated)</label>
                    <textarea value={jd.primarySkills.join(', ')} onChange={(e) => handleSkillChange('primarySkills', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-20"/>
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Secondary Skills (comma separated)</label>
                    <textarea value={jd.secondarySkills.join(', ')} onChange={(e) => handleSkillChange('secondarySkills', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-20"/>
                 </div>
            </div>
             <div className="flex justify-end pt-4 border-t mt-4 space-x-2">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600">Save Changes</button>
            </div>
        </div>
    </div>
)};


export default CompanyAdminDashboard;
*/

/*import type React from "react"
import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

// --- Dashboard Components ---

// Data structures
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdDate: string;
}

interface Analysis {
  id: string;
  candidateName: string;
  email: string;
  mobile?: string;
  client: string;
  jobDescription: string;
  requiredExperience: string;
  candidateExperience: string;
  experienceMatch: boolean;
  score: number;
  parsedPages: number;
  parsedDate: string;
  fileName: string;
  skills: string[];
}

interface Client {
  id: string;
  name: string;
  jobDescriptions: JobDescription[];
  status: "active" | "inactive";
  createdDate: string;
}

interface JobDescription {
  id: string;
  name: string;
  requiredExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "error" | "info";
}

// Dummy Data
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "test5.1",
    email: "test5.1@talenthive.net",
    role: "user",
    status: "inactive",
    createdDate: "2025-09-01",
  },
  {
    id: "2",
    name: "test5.2",
    email: "test5.2@talenthive.net",
    role: "admin",
    status: "active",
    createdDate: "2025-09-04",
  },
  { id: "3", name: "test5.3", email: "user3@talenthive.net", role: "user", status: "active", createdDate: "2025-09-02" },
  {
    id: "4",
    name: "test5.4",
    email: "user4@talenthive.net",
    role: "user",
    status: "active",
    createdDate: "2025-09-05",
  },
  { id: "5", name: "test5.5", email: "user5@talenthive.net", role: "user", status: "active", createdDate: "2025-09-03" },
]

// Updated DUMMY_ANALYSES with more recent dates for the "last 7 days" chart filter
const DUMMY_ANALYSES: Analysis[] = [
  {
    id: "1",
    candidateName: "John Doe",
    email: "test5.2@talenthive.net",
    client: "Zoho",
    jobDescription: "Software Engineer",
    requiredExperience: "3-5 years",
    candidateExperience: "5 years",
    experienceMatch: true,
    fileName: "resume1.pdf",
    score: 85,
    parsedDate: "2025-08-10",
    parsedPages: 2,
    skills: ["React", "Node", "JavaScript"],
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    email: "test5.2@talenthive.net",
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "3 years",
    experienceMatch: false,
    fileName: "resume2.pdf",
    score: 70,
    parsedDate: "2025-09-05",
    parsedPages: 1,
    skills: ["Python", "SQL", "Excel"],
  },
  {
    id: "3",
    candidateName: "Alice Johnson",
    email: "user3@talenthive.net", // test5.3
    client: "Tests5",
    jobDescription: "Backend Developer",
    requiredExperience: "2+ years",
    candidateExperience: "4 years",
    experienceMatch: true,
    fileName: "resume3.pdf",
    score: 90,
    parsedDate: "2025-06-15",
    parsedPages: 5,
    skills: ["React", "CSS", "UI/UX"],
  },
  {
    id: "4",
    candidateName: "Bob Brown",
    email: "user4@talenthive.net", // test5.4
    client: "Client C",
    jobDescription: "Manager",
    requiredExperience: "5+ years",
    candidateExperience: "7 years",
    experienceMatch: false,
    fileName: "resume4.pdf",
    score: 60,
    parsedDate: "2025-06-20",
    parsedPages: 23,
    skills: ["Leadership", "Python", "Project Management"],
  },
  {
    id: "5",
    candidateName: "Charlie Davis",
    email: "user5@talenthive.net", // test5.5
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "2 years",
    experienceMatch: true,
    fileName: "resume5.pdf",
    score: 75,
    parsedDate: "2025-03-12",
    parsedPages: 12,
    skills: ["SQL", "Python"],
  },
  {
    id: "6",
    candidateName: "Diana Evans",
    email: "test5.2@talenthive.net",
    client: "Zoho",
    jobDescription: "Software Engineer",
    requiredExperience: "3-5 years",
    candidateExperience: "6 years",
    experienceMatch: true,
    fileName: "resume6.pdf",
    score: 95,
    parsedDate: "2025-09-12",
    parsedPages: 51,
    skills: ["Node", "React", "TypeScript"],
  },
  {
    id: "7",
    candidateName: "Frank Green",
    email: "user3@talenthive.net", // test5.3
    client: "Tests5",
    jobDescription: "Backend Developer",
    requiredExperience: "2+ years",
    candidateExperience: "3 years",
    experienceMatch: true,
    fileName: "resume7.pdf",
    score: 88,
    parsedDate: "2025-09-02",
    parsedPages: 6,
    skills: ["Figma", "UI/UX", "CSS"],
  },
  {
    id: "8",
    candidateName: "Grace Hall",
    email: "user4@talenthive.net", // test5.4
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "4 years",
    experienceMatch: true,
    fileName: "resume8.pdf",
    score: 92,
    parsedDate: "2024-11-20",
    parsedPages: 8,
    skills: ["Python", "SQL", "Pandas"],
  },
]


const DUMMY_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Tests5",
    status: "active",
    createdDate: "2025-09-09",
    jobDescriptions: [
      {
        id: "jd1",
        name: "Backend Developer",
        requiredExperience: "2-3",
        primarySkills: ["python", "django"],
        secondarySkills: ["AWS"],
      },
      {
        id: "jd2",
        name: "Backend Developer1",
        requiredExperience: "1-2",
        primarySkills: ["python", "fastapi", "flask"],
        secondarySkills: ["None"],
      },
    ],
  },
  {
    id: "c2",
    name: "Zoho",
    status: "active",
    createdDate: "2025-09-12",
    jobDescriptions: [
      {
        id: "jd3",
        name: "Data Analyst",
        requiredExperience: "3 years",
        primarySkills: ["Python", "SQL"],
        secondarySkills: ["Tableau", "Excel"],
      },
    ],
  },
]

const ITEMS_PER_PAGE = 10
const MAX_FILE_SIZE = 1024 * 1024 // 1MB in bytes
const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#EC4899", "#9333EA", "#14B8A6"]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// --- Icon Components ---
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
  </svg>
)
const ResumeAnalyzerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h8v4h4v12zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const AnalysisHistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z" />
  </svg>
)
const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16zm-5-8l-4 4h8l-4-4z" />
  </svg>
)
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
  </svg>
)
const CompanyUsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const ResumeAnalysesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h8v4h4v12zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const ClientsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const PageCountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
)
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 3.5-4.5s3.5 2.02 3.5 4.5v6z" />
  </svg>
)
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
)
const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
      clipRule="evenodd"
    />
  </svg>
)
const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 01-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)
const ExcelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
    <path d="M21 8.29l-3.37-3.37c-.3-.3-.72-.42-1.13-.3L12 7.74V4c0-.55-.45-1-1-1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9.32c0-.42-.12-.84-.36-1.03zM5 20c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-4h-5v-2h5V5h-3.79L18 7.3V14h-5v2h5v4zm-3-2h4v-2H2v2zM6 9h2v1H6V9zm0 2h2v1H6v-1z" />
  </svg>
)
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
    <path d="M19 12v1H5v-1h14zm0-4v1H5V8h14zm0-4v1H5V4h14zm-4 10v1H5v-1h10zm0 4v1H5v-1h10z" />
  </svg>
)
const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
    <path d="M19 8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-2 2v2H7v-2h10zm-2 6c0 .55-.45 1-1 1s-1-.45-1-1-.45-1-1-1-1 .45-1 1c0 .55.45 1 1 1s1 .45 1 1zM7 16h6c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zm12-9c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1zM7 4h10v1H7V4z" />
  </svg>
)
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
  </svg>
)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const CustomTooltip = ({ active, payload, label, fullData }: any) => {
    if (active && payload && payload.length) {
        const monthData = fullData.find((d: any) => d.month === label);
        if (!monthData) return null;

        const adminTotal = monthData['Admin (Total)'] || 0;
        const userEntries = Object.entries(monthData)
            .filter(([key, value]) => key.includes('(User)') && value > 0)
            .map(([key, value]) => ({ name: key.replace(' (User)', ''), pages: value as number }));

        return (
            <div className="p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200 text-sm">
                <p className="font-bold text-gray-800 mb-2">{`${label}`}</p>
                <p className="text-blue-600 font-semibold">{`Admin (Total): ${adminTotal}`}</p>
                {userEntries.map(user => (
                    <p key={user.name} className="text-gray-700 ml-2">{`User: ${user.name} → ${user.pages}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

// --- Main App Component ---

interface CompanyAdminDashboardProps {
  email: string;
  onLogout: () => void;
}

const CompanyAdminDashboard: React.FC<CompanyAdminDashboardProps> = ({ email, onLogout }) => {
  const [activePage, setActivePage] = useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [analyses, setAnalyses] = useState<Analysis[]>(DUMMY_ANALYSES);
  const [clients, setClients] = useState<Client[]>(DUMMY_CLIENTS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserForDeactivate, setSelectedUserForDeactivate] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [clientCurrentPage, setClientCurrentPage] = useState(1);


  // Resume Analyzer State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [clientType, setClientType] = useState<"new" | "existing">("new");
  const [clientName, setClientName] = useState("");
  const [jobDescriptionName, setJobDescriptionName] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [primarySkills, setPrimarySkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const [jdError, setJdError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isJdModified, setIsJdModified] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [hasExistingJdLoaded, setHasExistingJdLoaded] = useState(false);

  // Dashboard State
  const [view, setView] = useState<'All' | 'Users' | 'Admin'>('All');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [skillUserFilter, setSkillUserFilter] = useState("All Users");

  // Analysis History State
  const [analysisSortKey, setAnalysisSortKey] = useState<"id" | "candidateName" | "score" | "parsedDate">("id")
  const [analysisSortOrder, setAnalysisSortOrder] = useState<"asc" | "desc">("asc")
  const [analysisCurrentPage, setAnalysisCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [tableSearchQuery, setTableSearchQuery] = useState("")
  const [analysisUserFilter, setAnalysisUserFilter] = useState('All Users');

  // My Users & My Clients Page State
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [userSearchInput, setUserSearchInput] = useState("")
  const [clientSearchInput, setClientSearchInput] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState<'All' | 'active' | 'inactive'>('All');


  // Report State
  const [reportFilters, setReportFilters] = useState<{
    users: string[];
    clients: string;
    jobDescriptions: string;
    experienceMatch: string;
    scoreRange: string;
    fromDate: string;
    toDate: string;
  }>({
    users: [],
    clients: 'All Clients',
    jobDescriptions: 'All Job Descriptions',
    experienceMatch: 'All',
    scoreRange: 'All Scores',
    fromDate: '',
    toDate: '',
  });
  
  // Modals State
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [isEditJdModalOpen, setIsEditJdModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  
  const [selectedClientForJds, setSelectedClientForJds] = useState<Client | null>(null);
  
  const [editingClient, setEditingClient] = useState<{ id: string; name: string } | null>(null);
  const [editingJd, setEditingJd] = useState<JobDescription & { clientId: string } | null>(null);


  const stableOnLogout = useCallback(() => {
    onLogout()
  }, [onLogout])

  const addNotification = useCallback((message: string, type: "success" | "error" | "info") => {
    const newNotification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      type,
    }
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  }, [])

  // Debounce search for My Users page
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserSearchQuery(userSearchInput);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [userSearchInput]);

  const handleClearNotifications = () => {
    setNotifications([]);
  }

  const MemoizedTopBar = useMemo(() => {
    return (
      <TopBar
        onLogout={stableOnLogout}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
        email={email}
        activePage={activePage}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
    )
  }, [notifications, activePage, email, stableOnLogout]);

  // Memoized data calculations
  const userAnalyses = useMemo(() => {
    return users.reduce((acc: { [key: string]: Analysis[] }, user) => {
      acc[user.id] = analyses.filter((a) => a.email === user.email)
      return acc;
    }, {});
  }, [users, analyses]);

  const userPages = useMemo(() => {
    return Object.fromEntries(
      Object.entries(userAnalyses).map(([id, ans]) => [id, ans.reduce((sum, a) => sum + a.parsedPages, 0)]),
    );
  }, [userAnalyses]);

  const userRole = useMemo(() => {
    const currentUser = users.find((u) => u.email === email);
    return currentUser?.role || "user";
  }, [users, email]);

  const filteredAndSortedUsers = useMemo(() => {
    let usersToShow;
    if (userRole === "admin") {
      usersToShow = users; // Admins see all users
    } else {
      usersToShow = users.filter((u) => u.email === email); // Non-admins only see themselves
    }
  
    let filtered = usersToShow.filter(
      (user) =>
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  
    return filtered;
  }, [users, userSearchQuery, userRole, email]);

  const filteredAnalyses = useMemo(() => {
  let filtered = [...analyses];

  if (analysisUserFilter !== 'All Users') {
    filtered = filtered.filter(a => a.email === analysisUserFilter);
  }

  filtered = filtered.filter(
    (analysis) =>
      analysis.candidateName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.client.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.jobDescription.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.fileName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.score.toString().includes(tableSearchQuery.toLowerCase()) ||
      analysis.email.toLowerCase().includes(tableSearchQuery.toLowerCase())
  );

  filtered = filtered.sort((a, b) => {
    let valA, valB;
    if (analysisSortKey === "score") {
      valA = a.score;
      valB = b.score;
    } else if (analysisSortKey === "parsedDate") {
      valA = new Date(a.parsedDate).getTime();
      valB = new Date(b.parsedDate).getTime();
    } else if (analysisSortKey === "id") {
      valA = parseInt(a.id, 10);
      valB = parseInt(b.id, 10);
    } else {
      // candidateName
      valA = a.candidateName.toLowerCase();
      valB = b.candidateName.toLowerCase();
    }

    if (valA < valB) return analysisSortOrder === "asc" ? -1 : 1;
    if (valA > valB) return analysisSortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return filtered;
}, [analyses, tableSearchQuery, analysisSortKey, analysisSortOrder, analysisUserFilter]);


  const paginatedUsers = useMemo(() => {
    const start = (userCurrentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredAndSortedUsers.slice(start, end);
  }, [filteredAndSortedUsers, userCurrentPage, entriesPerPage]);

  const totalPagesUsers = Math.ceil(filteredAndSortedUsers.length / entriesPerPage);

  const paginatedAnalyses = useMemo(() => {
      const start = (analysisCurrentPage - 1) * entriesPerPage;
      const end = start + entriesPerPage;
      return filteredAnalyses.slice(start, end);
  }, [filteredAnalyses, analysisCurrentPage, entriesPerPage]);

  const totalPagesAnalyses = Math.ceil(filteredAnalyses.length / entriesPerPage);

  const filteredReportAnalyses = useMemo(() => {
      let filtered = analyses;
      
      const { users: selectedUserEmails, clients, jobDescriptions, experienceMatch, scoreRange, fromDate, toDate } = reportFilters;
      
      if (selectedUserEmails.length > 0) {
        filtered = filtered.filter(a => selectedUserEmails.includes(a.email));
      }

      if (clients !== 'All Clients') {
          filtered = filtered.filter(a => a.client === clients);
      }

      if (jobDescriptions !== 'All Job Descriptions') {
          filtered = filtered.filter(a => a.jobDescription === jobDescriptions);
      }

      if (experienceMatch !== 'All') {
          filtered = filtered.filter(a => a.experienceMatch === (experienceMatch === 'Match'));
      }

      if (scoreRange !== 'All Scores') {
          const [min, max] = scoreRange.split('-').map(Number);
          filtered = filtered.filter(a => a.score >= min && a.score <= max);
      }

      if (fromDate) {
          const from = new Date(fromDate);
          filtered = filtered.filter(a => new Date(a.parsedDate) >= from);
      }
      if (toDate) {
          const to = new Date(toDate);
          filtered = filtered.filter(a => new Date(a.parsedDate) <= to);
      }

      return filtered;
  }, [analyses, reportFilters]);

  const paginatedReportAnalyses = useMemo(() => {
    const start = (analysisCurrentPage - 1) * entriesPerPage
    const end = start + entriesPerPage
    return filteredReportAnalyses.slice(start, end)
  }, [filteredReportAnalyses, analysisCurrentPage, entriesPerPage])

  const totalPagesReport = Math.ceil(filteredReportAnalyses.length / entriesPerPage);

  // --- START: New Dashboard Data Logic ---

  const analysesForCards = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    return analyses.filter(a => {
        const date = new Date(a.parsedDate);
        const yearMatch = date.getFullYear() === currentYear;
        const monthMatch = date.getMonth() + 1 === currentMonth;
        return yearMatch && monthMatch;
    });
  }, [analyses]);


  const fullChartData = useMemo(() => {
    const analysesByYear = analyses.filter(a => new Date(a.parsedDate).getFullYear() === selectedYear);
    const activeUsers = users.filter(u => u.status === 'active');
    const userMap = new Map(users.map(u => [u.email, u]));

    const monthlyData = MONTH_NAMES.map((monthName, index) => {
        const base: {[key: string]: any} = {
            month: `${monthName}`,
            monthIndex: index,
            'Admin (Total)': 0,
            'Users (Total)': 0,
        };
        activeUsers.forEach(user => {
            base[`${user.name} (${user.role === 'admin' ? 'Admin' : 'User'})`] = 0;
        });
        return base;
    });

    analysesByYear.forEach(analysis => {
      const monthIndex = new Date(analysis.parsedDate).getMonth();
      const user = userMap.get(analysis.email);
      if (!user || user.status !== 'active') return;

      const key = `${user.name} (${user.role === 'admin' ? 'Admin' : 'User'})`;
      monthlyData[monthIndex][key] = (monthlyData[monthIndex][key] || 0) + analysis.parsedPages;

      if (user.role === 'admin') {
        monthlyData[monthIndex]['Admin (Total)'] += analysis.parsedPages;
      } else {
        monthlyData[monthIndex]['Users (Total)'] += analysis.parsedPages;
      }
    });

    return monthlyData;
  }, [analyses, users, selectedYear]);

  const visibleChartData = useMemo(() => {
    if (!fullChartData.length) return [];

    const activeAdmins = users.filter(u => u.status === 'active' && u.role === 'admin').map(u => `${u.name} (Admin)`);
    const activeUsers = users.filter(u => u.status === 'active' && u.role === 'user').map(u => `${u.name} (User)`);
    
    return fullChartData.map(monthData => {
        const newMonthData: { [key: string]: any } = { month: monthData.month };
        
        if (view === 'All') {
            newMonthData['Admin (Total)'] = monthData['Admin (Total)'];
            newMonthData['Users (Total)'] = monthData['Users (Total)'];
        } else if (view === 'Admin') {
            activeAdmins.forEach(adminName => {
                newMonthData[adminName] = monthData[adminName] || 0;
            });
        } else if (view === 'Users') {
            activeUsers.forEach(userName => {
                newMonthData[userName] = monthData[userName] || 0;
            });
        }
        return newMonthData;
    });
  }, [fullChartData, view, users]);

  const analysesByYear = useMemo(() => {
    return analyses.filter(a => new Date(a.parsedDate).getFullYear() === selectedYear);
  }, [analyses, selectedYear]);
  
  const pieDataResumesByClient = useMemo(() => {
    const clientCounts: { [key: string]: number } = {};
    analysesByYear.forEach((a) => {
      clientCounts[a.client] = (clientCounts[a.client] || 0) + 1;
    });
    return Object.entries(clientCounts).map(([name, value]) => ({ name, value }))
  }, [analysesByYear]);

  const pieDataSkills = useMemo(() => {
    let filteredForSkills = analyses;

    if (skillUserFilter !== 'All Users') {
        filteredForSkills = analyses.filter(a => a.email === skillUserFilter);
    }

    const skillCounts: { [key: string]: number } = {};
    filteredForSkills.forEach((a) => {
      a.skills.forEach((s) => {
        skillCounts[s] = (skillCounts[s] || 0) + 1;
      });
    });
    return Object.entries(skillCounts).map(([name, value]) => ({ name, value }));
  }, [analyses, skillUserFilter]);
  
  // --- END: New Dashboard Data Logic ---

  // State and logic for modals and notifications
  const handleDeactivateUser = (user: User) => {
    setSelectedUserForDeactivate(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeactivate = () => {
    if (selectedUserForDeactivate) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === selectedUserForDeactivate.id ? { ...u, status: "inactive" } : u)),
      )
      setIsDeleteModalOpen(false);
      setSelectedUserForDeactivate(null);
      addNotification("User deactivated successfully.", "success");
    }
  };

  const clearJdDetails = () => {
    setRequiredExperience("");
    setPrimarySkills("");
    setSecondarySkills("");
    setIsEditMode(true);
    setHasExistingJdLoaded(false);
    setIsJdModified(false);
  };

  // State and logic for Resume Analyzer
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 1MB limit.");
      setUploadedFile(null);
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (allowedTypes.includes(file.type)) {
        setFileError(null);
        setUploadedFile(file);
      } else {
        setFileError("Invalid file type. Please upload PDF, DOC, or DOCX.");
        setUploadedFile(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError(null);
  }

  const resetJdFields = () => {
    setJobDescriptionName("");
    setJdError(null);
    clearJdDetails();
  }

  const handleClientTypeChange = (type: "new" | "existing") => {
    setClientType(type);
    setClientName("");
    setClientError(null);
    setSelectedClient(null);
    resetJdFields();
  }

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.value;
    setClientName(name);
    resetJdFields();

    const existingClient = clients.find((c) => c.name.toLowerCase() === name.toLowerCase())

    if (clientType === "new") {
      if (existingClient) {
        setClientError(`Client "${name}" already exists. You can create a new job description for this client.`)
        setSelectedClient(existingClient);
      } else {
        setClientError(null);
        setSelectedClient(null);
      }
    } else {
      setClientError(null);
      setSelectedClient(existingClient || null);
    }
  };

  const handleJdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setJobDescriptionName(name);
    setJdError(null);
    clearJdDetails();

    const clientForLogic = selectedClient;
    if (clientForLogic) {
        const existingJd = clientForLogic.jobDescriptions.find(jd => jd.name.toLowerCase() === name.toLowerCase());
        if (existingJd) {
            setJdError(`Job description "${name}" already exists for this client.`);
        }
    }
  };

  const handleJdSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.value;
      setJobDescriptionName(name);
      setJdError(null);

      if (!selectedClient || !name) {
          clearJdDetails();
          return;
      }

      const existingJd = selectedClient.jobDescriptions.find(jd => jd.name === name);

      if (existingJd) {
          setRequiredExperience(existingJd.requiredExperience);
          setPrimarySkills(existingJd.primarySkills.join(", "));
          setSecondarySkills(existingJd.secondarySkills.join(", "));
          setIsEditMode(false);
          setHasExistingJdLoaded(true);
          setIsJdModified(false);
      }
  };


  const handleJdFieldChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setIsJdModified(true);
  };

  const handleSaveJd = () => {
    if (!editingJd) return;
  
    const updatedClients = clients.map(client => {
      if (client.id === editingJd.clientId) {
        return {
          ...client,
          jobDescriptions: client.jobDescriptions.map(jd =>
            jd.id === editingJd.id ? { ...jd, ...editingJd } : jd
          ),
        };
      }
      return client;
    });
  
    setClients(updatedClients);
    addNotification("Job Description updated successfully.", "success");
    setIsEditJdModalOpen(false);
    setEditingJd(null);
  };

  const handleAnalyzeResume = () => {
    addNotification("Resume analysis initiated.", "info");
  }

  const isAnalyzeButtonEnabled = useMemo(() => {
    return (
      uploadedFile !== null &&
      clientName.trim() !== "" &&
      jobDescriptionName.trim() !== "" &&
      requiredExperience.trim() !== "" &&
      primarySkills.trim() !== "" &&
      fileError === null &&
      clientError === null &&
      jdError === null
    )
  }, [
    uploadedFile,
    clientName,
    jobDescriptionName,
    requiredExperience,
    primarySkills,
    fileError,
    clientError,
    jdError,
  ])

  // Pagination for tables
  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    setEntriesPerPage(value);
    setAnalysisCurrentPage(1);
    setUserCurrentPage(1);
    setClientCurrentPage(1);
  }

  // Logic for My Users page
  const handleUserStatusChange = useCallback((user: User, newStatus: "active" | "inactive") => {
    if (userRole !== "admin") {
      addNotification("Only admins can change user status.", "error");
      return;
    }
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    addNotification(`User ${user.name} status updated to ${newStatus}.`, "info");
  }, [userRole, addNotification]);

  // Logic for My Clients page
  const handleClientStatusChange = useCallback((client: Client, newStatus: "active" | "inactive") => {
    setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
    addNotification(`Client ${client.name} status updated to ${newStatus}.`, "info");
  }, []);

  const handleUpdateClient = () => {
    if (!editingClient) return;
    
    const oldName = clients.find(c => c.id === editingClient.id)?.name;

    // Update client name in clients state
    setClients(prevClients => prevClients.map(c => 
        c.id === editingClient.id ? { ...c, name: editingClient.name } : c
    ));

    // Update client name in all associated analyses
    if(oldName && oldName !== editingClient.name) {
        setAnalyses(prevAnalyses => prevAnalyses.map(a => 
            a.client === oldName ? { ...a, client: editingClient.name } : a
        ));
    }
    
    addNotification("Client updated successfully.", "success");
    setIsEditClientModalOpen(false);
    setEditingClient(null);
  };
  
  const handleUpdateJd = () => {
    if (!editingJd) return;

    const updatedClients = clients.map(client => {
      if (client.id === editingJd.clientId) {
        const updatedJds = client.jobDescriptions.map(jd =>
          jd.id === editingJd.id ? { ...editingJd, primarySkills: editingJd.primarySkills, secondarySkills: editingJd.secondarySkills } : jd
        );
        return { ...client, jobDescriptions: updatedJds };
      }
      return client;
    });

    setClients(updatedClients);
    addNotification("Job Description updated successfully.", "success");
    setIsEditJdModalOpen(false);
    setEditingJd(null);
  };


  const handleReportFilterChange = (key: string, value: any) => {
    setReportFilters((prev) => ({ ...prev, [key]: value }));
  }

  const handleSort = useCallback(
    (key: "id" | "candidateName" | "score" | "parsedDate") => {
      setAnalysisSortKey(key)
      setAnalysisSortOrder(analysisSortKey === key && analysisSortOrder === "asc" ? "desc" : "asc")
    },
    [analysisSortKey, analysisSortOrder],
  )

  const handleExportData = useCallback(
    (format: "excel" | "pdf") => {
      const dataToExport = filteredAnalyses.map((analysis) => ({
        "Candidate Name": analysis.candidateName,
        Experience: analysis.candidateExperience,
        "Experience Match": analysis.experienceMatch ? "Match" : "No Match",
        Score: analysis.score,
        "File Name": analysis.fileName,
        "Parsed Pages": analysis.parsedPages,
        "Parsed Date": analysis.parsedDate,
      }))

      if (format === "excel") {
        // Create CSV content
        const csvContent = [
          Object.keys(dataToExport[0]).join(","),
          ...dataToExport.map((row) => Object.values(row).join(",")),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis-history.csv"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else if (format === "pdf") {
        // Create text content for PDF simulation
        const textContent = dataToExport.map((row) => Object.values(row).join(" | ")).join("\n")
        const blob = new Blob([textContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis-history.txt"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    },
    [filteredAnalyses],
  )

 const memoizedTable = useMemo(() => {
    return (data: any[], isUserTable = false, userRole = "user", currentPage = 1) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleExportData("excel")}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Download Excel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleExportData("pdf")}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Download PDF"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Print"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={isUserTable ? "Search users..." : "Search..."}
              value={isUserTable ? userSearchInput : tableSearchQuery}
              onChange={(e) =>
                isUserTable ? setUserSearchInput(e.target.value) : setTableSearchQuery(e.target.value)
              }
              className="pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-80"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {(isUserTable ? userSearchInput : tableSearchQuery) && (
              <button
                onClick={() => (isUserTable ? setUserSearchInput("") : setTableSearchQuery(""))}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {isUserTable ? (
                // Headers for the My Users table
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Parsed Pages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Created on</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </>
              ) : (
                // Headers for the Analysis History and Report tables
                <>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     <button
                      onClick={() => handleSort("id")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>S.no</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("candidateName")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Candidate Name</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Req-Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate-Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("score")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Score</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("parsedDate")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Parsed Date</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {isUserTable ? (
                  // Data cells for the My Users table
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userPages[item.id] || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={item.status}
                          onChange={(e) => handleUserStatusChange(item, e.target.value as "active" | "inactive")}
                           className={`p-1.5 rounded-md text-xs border ${item.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                           disabled={userRole !== 'admin'}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                    </td>
                  </>
                ) : (
                  // Data cells for the Analysis History and Report tables
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.candidateName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobile || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jobDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.requiredExperience}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.candidateExperience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.experienceMatch ? (
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parsedPages}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parsedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => isUserTable ? setUserCurrentPage(Math.max(1, currentPage - 1)) : setAnalysisCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil((isUserTable ? filteredAndSortedUsers.length : filteredAnalyses.length) / entriesPerPage)}
            </span>
            <button
              onClick={() => isUserTable ? setUserCurrentPage(currentPage + 1) : setAnalysisCurrentPage(currentPage + 1)}
              disabled={
                currentPage >= Math.ceil((isUserTable ? filteredAndSortedUsers.length : filteredAnalyses.length) / entriesPerPage)
              }
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}, [
    activePage,
    tableSearchQuery,
    userSearchInput,
    entriesPerPage,
    analysisCurrentPage,
    userCurrentPage,
    analysisSortKey,
    analysisSortOrder,
    filteredAnalyses,
    filteredAndSortedUsers,
    users,
    userPages,
    handleUserStatusChange,
    handleExportData,
  ])

  const ReportPage = () => (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Report</h2>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Users</label>
            <MultiSelectUsers
                users={users.filter(u => u.status === 'active')}
                selectedUsers={reportFilters.users}
                onChange={(selected) => handleReportFilterChange('users', selected)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Client</label>
            <select
              value={reportFilters.clients}
              onChange={(e) => handleReportFilterChange("clients", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Clients">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Job Description</label>
            <select
              value={reportFilters.jobDescriptions}
              onChange={(e) => handleReportFilterChange("jobDescriptions", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Job Descriptions">All Job Descriptions</option>
              {clients
                .find((c) => c.name === reportFilters.clients)
                ?.jobDescriptions.map((jd) => (
                  <option key={jd.id} value={jd.name}>
                    {jd.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Exp. Match</label>
            <select
              value={reportFilters.experienceMatch}
              onChange={(e) => handleReportFilterChange("experienceMatch", e.target.value)}
              className="w-full px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Match">Match</option>
              <option value="No Match">No Match</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              value={reportFilters.fromDate}
              onChange={(e) => handleReportFilterChange("fromDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              value={reportFilters.toDate}
              onChange={(e) => handleReportFilterChange("toDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      {memoizedTable(paginatedReportAnalyses, false, 'user', analysisCurrentPage)}
    </div>
  )

  const MyUsersPageContent = () => {
    return (
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Users</h2>
        </div>
        {memoizedTable(paginatedUsers, true, userRole, userCurrentPage)}
      </div>
    );
  };

  const MyClientsPageContent = () => {
      const filteredClients = useMemo(() => 
        clients.filter(c => 
            c.name.toLowerCase().includes(clientSearchInput.toLowerCase()) &&
            (clientStatusFilter === 'All' || c.status === clientStatusFilter)
        ), 
        [clients, clientSearchInput, clientStatusFilter]
      );
      
      const paginatedClients = useMemo(() => {
        const start = (clientCurrentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        return filteredClients.slice(start, end);
      }, [filteredClients, clientCurrentPage, entriesPerPage]);

      return (
        <div className="p-8 bg-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Company Clients</h2>
                <div className="flex items-center space-x-4">
                    <select
                        value={clientStatusFilter}
                        onChange={(e) => setClientStatusFilter(e.target.value as any)}
                        className="p-2 rounded-lg border bg-white shadow-sm"
                    >
                        <option value="All">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={clientSearchInput}
                            onChange={(e) => setClientSearchInput(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-80"
                        />
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Descriptions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Created Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedClients.map((client, index) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(clientCurrentPage - 1) * entriesPerPage + index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setSelectedClientForJds(client);
                                                setIsJdModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-semibold hover:bg-blue-600"
                                        >
                                            View JDs ({client.jobDescriptions.length})
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.createdDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setEditingClient({ id: client.id, name: client.name });
                                                setIsEditClientModalOpen(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                         <select
                                            value={client.status}
                                            onChange={(e) => handleClientStatusChange(client, e.target.value as "active" | "inactive")}
                                            className={`p-1.5 rounded-md text-xs border ${client.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                                            >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
  };


  const AnalysisHistoryPageContent = () => (
    <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-800">Analysis History</h2>
             <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Filter by User:</label>
                <select
                    value={analysisUserFilter}
                    onChange={(e) => setAnalysisUserFilter(e.target.value)}
                    className="p-2 rounded-lg border bg-white shadow-sm"
                >
                    <option value="All Users">All Users</option>
                    {users.filter(u => u.status === 'active').map(user => (
                        <option key={user.id} value={user.email}>{user.name}</option>
                    ))}
                </select>
             </div>
        </div>
      {memoizedTable(paginatedAnalyses, false, 'user', analysisCurrentPage)}
    </div>
  );

  const resumeAnalyzerContent = (
    <div className="p-8 bg-gray-100">
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Resume Upload</h3>
                <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2 w-full h-20 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById("file-upload-input")?.click()}
                >
                    <input type="file" id="file-upload-input" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    <p className="text-sm text-gray-600">Drag & drop or click</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max: 1MB)</p>
                </div>
                 {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                {uploadedFile && (
                    <div className="flex items-center justify-between p-3 mt-4 bg-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 truncate">{uploadedFile.name}</span>
                        <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2">
                           <XCircleIcon />
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Client Section</h3>
                    <div>
                        <div className="flex space-x-4 mb-2">
                            <label className="inline-flex items-center"><input type="radio" name="clientType" value="new" checked={clientType === "new"} onChange={() => handleClientTypeChange("new")} className="form-radio text-indigo-600" /><span className="ml-2 text-sm">New Client</span></label>
                            <label className="inline-flex items-center"><input type="radio" name="clientType" value="existing" checked={clientType === "existing"} onChange={() => handleClientTypeChange("existing")} className="form-radio text-indigo-600" /><span className="ml-2 text-sm">Existing Client</span></label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-sm">
                            {clientType === 'new' ? 'Client Name' : 'Select Client'} <span className="text-red-500">*</span>
                        </label>
                        {clientType === "new" ? (<input type="text" placeholder="e.g., Test5" value={clientName} onChange={handleClientNameChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />) : (<select value={clientName} onChange={handleClientNameChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"><option value="">Choose a Client</option>{clients.filter(c => c.status === 'active').map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}</select>)}
                        {clientError && <p className="text-red-600 text-sm mt-1">{clientError}</p>}
                    </div>
                </div>

                {(clientType === 'new' || selectedClient) && (
                    <div className="space-y-4 border-t pt-4">
                         <h3 className="text-xl font-semibold text-gray-800">Job Description Section</h3>
                        <div>
                            <label htmlFor="jd-input" className="block text-gray-700 font-medium mb-1 text-sm">Job Description Name <span className="text-red-500">*</span></label>
                            
                            {clientType === 'existing' && selectedClient ? (
                                <select
                                    value={jobDescriptionName}
                                    onChange={handleJdSelectChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Select Job Description</option>
                                    {selectedClient.jobDescriptions.map(jd => (
                                        <option key={jd.id} value={jd.name}>{jd.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    id="jd-input" 
                                    placeholder="e.g., Backend Developer" 
                                    value={jobDescriptionName} 
                                    onChange={handleJdInputChange} 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            )}
                            {jdError && <p className="text-red-600 text-sm mt-1">{jdError}</p>}
                        </div>
                    </div>
                )}
                
                {(clientType === 'new' || (jobDescriptionName.trim() !== "" && !jdError)) && (
                    <div className="space-y-4">
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Required Experience <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., 3-5, 4+, 5+" value={requiredExperience} onChange={(e) => handleJdFieldChange(setRequiredExperience, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Primary Skills (Must Have) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g. Python, Java, SQL" value={primarySkills} onChange={(e) => handleJdFieldChange(setPrimarySkills, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Secondary Skills (Nice to Have)</label><input type="text" placeholder="e.g. Docker, AWS, CI/CD" value={secondarySkills} onChange={(e) => handleJdFieldChange(setSecondarySkills, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div className="flex justify-end pt-2">{hasExistingJdLoaded && !isEditMode && (<button onClick={() => setIsEditMode(true)} className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"><EditIcon /> Edit</button>)}{hasExistingJdLoaded && isEditMode && (<button onClick={handleSaveJd} disabled={!isJdModified} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300">Save Changes</button>)}</div>
                    </div>
                 )}
            </div>
        </div>
        <div className="flex justify-center mt-8">
            <button
                onClick={handleAnalyzeResume}
                disabled={!isAnalyzeButtonEnabled}
                className={`w-full max-w-md py-3 rounded-lg text-white font-semibold transition-colors ${isAnalyzeButtonEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
            >
                Analyze Resume
            </button>
        </div>
    </div>
  )
  const dashboardContent = (
  <div className="flex-1 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
              title="Active Users"
              value={users.filter(u => u.status === "active").length.toString()}
              icon={<UsersIcon />}
              bgColor="bg-blue-500"
              onClick={() => setActivePage("My Users")}
          />
          <StatsCard
              title="Analysed Resume (Current Year & Month)"
              value={analysesForCards.length.toString()}
              icon={<ResumeAnalysesIcon />}
              bgColor="bg-yellow-500"
              onClick={() => setActivePage("Analysis History")}
          />
          <StatsCard
              title="Pages Count (Current Year & Month)"
              value={analysesForCards.reduce((acc, a) => acc + a.parsedPages, 0).toString()}
              icon={<PageCountIcon />}
              bgColor="bg-green-500"
              onClick={() => {}}
          />
          <StatsCard
              title="Active Clients"
              value={clients.filter(c => c.status === 'active').length.toString()}
              icon={<ClientsIcon />}
              bgColor="bg-red-500"
              onClick={() => setActivePage("My Clients")}
          />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-bold text-gray-800">Company Data</h2>
              <div className="flex items-center space-x-4">
                  <select value={view} onChange={(e) => setView(e.target.value as any)} className="p-2 rounded-lg border bg-gray-50 shadow-sm">
                      <option value="All">View: Admin & Users</option>
                      <option value="Users">View: Users</option>
                      <option value="Admin">View: Admin</option>
                  </select>
                  <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 rounded-lg border bg-gray-50 shadow-sm">
                      {[2025, 2024, 2023].map(year => <option key={year} value={year}>Year: {year}</option>)}
                  </select>
              </div>
          </div>

          <div style={{ height: "450px" }}>
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visibleChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Number of Pages', angle: -90, position: 'insideLeft' }} />
                      <Tooltip content={<CustomTooltip fullData={fullChartData} />} />
                      <Legend />
                      {visibleChartData.length > 0 && Object.keys(visibleChartData[0]).filter(key => key !== 'month').map((key, index) => (
                          <Bar 
                              key={key} 
                              dataKey={key} 
                              fill={
                                  key === 'Admin (Total)' ? '#3B82F6' :
                                  key === 'Users (Total)' ? '#EF4444' :
                                  COLORS[index % COLORS.length]
                              } 
                              radius={[4, 4, 0, 0]} 
                           />
                      ))}
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "450px" }}>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumes by Client ({selectedYear})</h3>
                <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                    data={pieDataResumesByClient}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    >
                    {pieDataResumesByClient.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "450px" }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Skills Distribution</h3>
                    <select
                        value={skillUserFilter}
                        onChange={(e) => setSkillUserFilter(e.target.value)}
                        className="p-1 text-sm rounded-lg border bg-gray-50 shadow-sm"
                    >
                        <option value="All Users">All Users</option>
                        {users.filter(u => u.status === 'active').map(user => (
                            <option key={user.id} value={user.email}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie data={pieDataSkills} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
                    {pieDataSkills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconSize={10}
                    wrapperStyle={{ overflowY: "auto", maxHeight: "300px" }}
                    />
                </PieChart>
                </ResponsiveContainer>
            </div>
       </div>
  </div>
);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {MemoizedTopBar}
        <main className="flex-1">
          {activePage === "Dashboard" && dashboardContent}
          {activePage === "My Users" && <MyUsersPageContent />}
          {activePage === "My Clients" && <MyClientsPageContent />}
          {activePage === "Analysis History" && <AnalysisHistoryPageContent />}
          {activePage === "Report" && <ReportPage />}
          {activePage === "Resume Analyzer" && resumeAnalyzerContent}
          {activePage === "Company Info" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold">Company Info</h2>
              <p className="text-gray-600 mt-2">This is where you would view company info.</p>
            </div>
          )}
        </main>

      </div>
        {isJdModalOpen && selectedClientForJds && (
            <JdListModal
                client={selectedClientForJds}
                onClose={() => setIsJdModalOpen(false)}
                onEditJd={(jd) => {
                    setEditingJd({ ...jd, clientId: selectedClientForJds.id });
                    setIsEditJdModalOpen(true);
                }}
            />
        )}
        {isEditClientModalOpen && editingClient && (
            <EditClientModal
                client={editingClient}
                onClose={() => setIsEditClientModalOpen(false)}
                onSave={handleUpdateClient}
                setEditingClient={setEditingClient}
            />
        )}
        {isEditJdModalOpen && editingJd && (
            <EditJdModal
                jd={editingJd}
                onClose={() => setIsEditJdModalOpen(false)}
                onSave={handleUpdateJd}
                setEditingJd={setEditingJd}
            />
        )}
      {isDeleteModalOpen && (
        <DeleteConfirmModal onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeactivate} />
      )}
      {showToast && <NotificationToast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />}
    </div>
  )
}

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) => {
  const sidebarItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Resume Analyzer", icon: <ResumeAnalyzerIcon /> },
    { name: "Analysis History", icon: <AnalysisHistoryIcon /> },
    { name: "Report", icon: <ReportIcon /> },
    { name: "My Users", icon: <UsersIcon /> },
    { name: "My Clients", icon: <ClientsIcon /> },
  ]
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`flex-col w-64 bg-gradient-to-br from-green-800 to-green-500 text-white min-h-screen p-6 shadow-xl fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-white"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActivePage(item.name)}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out ${
                    activePage === item.name ? "bg-green-900 text-white shadow-inner" : "hover:bg-green-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-4 font-semibold">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

const TopBar = ({
  onLogout,
  notifications,
  onClearNotifications,
  email,
  activePage,
  onMenuClick,
}: {
  onLogout: () => void;
  notifications: Notification[];
  onClearNotifications: () => void;
  email: string;
  activePage: string;
  onMenuClick: () => void;
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const userInitial = email ? email.charAt(0).toUpperCase() : "?";

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md rounded-b-lg">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="p-2 mr-4 text-gray-600 hover:text-gray-800 lg:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{activePage}</h1>
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative" ref={notificationsDropdownRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          >
            <BellIcon />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {notifications.length}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
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
                  <button onClick={onClearNotifications} className="text-sm text-blue-500 hover:text-blue-700">
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg">
              {userInitial}
            </div>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Profile</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Company Info</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const StatsCard = ({
  title,
  value,
  icon,
  bgColor,
  onClick,
}: {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
  onClick: () => void
}) => (
  <div
    className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-lg ${bgColor} ${onClick !== null && onClick.toString() !== '() => {}' ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
    onClick={onClick}
  >
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-lg">{title}</span>
    </div>
    <div className="text-4xl opacity-80">{icon}</div>
  </div>
)

const DeleteConfirmModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
      <div className="text-gray-800 text-center mb-6">
        <h3 className="text-lg font-bold">This page says</h3>
        <p className="mt-2 text-base">Are you sure to perform this action?</p>
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
)

const NotificationToast = ({
  message,
  onClose,
  type,
}: {
  message: string
  onClose: () => void
  type: "success" | "error" | "info"
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000) // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type]

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`p-4 rounded-lg shadow-lg text-white flex items-center space-x-3 ${bgColor}`}>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  )
}

const MultiSelectUsers = ({ users, selectedUsers, onChange }: { users: User[], selectedUsers: string[], onChange: (selected: string[]) => void}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const userMap = useMemo(() => new Map(users.map(u => [u.email, u.name])), [users]);

    const toggleUser = (email: string) => {
        const newSelection = selectedUsers.includes(email)
            ? selectedUsers.filter(u => u !== email)
            : [...selectedUsers, email];
        onChange(newSelection);
    };

    const removeUser = (email: string) => {
        onChange(selectedUsers.filter(u => u !== email));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[42px] p-1 flex flex-wrap items-center gap-1 cursor-pointer">
                {selectedUsers.length === 0 && <span className="text-gray-400 px-2">Select users...</span>}
                {selectedUsers.map(email => (
                    <span key={email} className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        {userMap.get(email) || email}
                        <button onClick={(e) => { e.stopPropagation(); removeUser(email); }} className="text-white hover:text-blue-200">
                            <XMarkIcon />
                        </button>
                    </span>
                ))}
            </div>
            {isOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <ul>
                        {users.map(user => (
                            <li 
                                key={user.id} 
                                onClick={() => { toggleUser(user.email); }}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${selectedUsers.includes(user.email) ? 'bg-blue-100' : ''}`}
                            >
                                <span>{user.name} ({user.role})</span>
                                {selectedUsers.includes(user.email) && <CheckCircleIcon className="w-4 h-4 text-blue-600"/>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


// --- My Clients Page Modals ---
const JdListModal = ({ client, onClose, onEditJd }: { client: Client, onClose: () => void, onEditJd: (jd: JobDescription) => void }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Job Descriptions - {client.name}</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div className="overflow-x-auto max-h-[60vh]">
                 <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">JD Title</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required Experience</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Primary Skills</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Secondary Skills</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {client.jobDescriptions.map((jd, index) => (
                            <tr key={jd.id}>
                                <td className="px-4 py-2 text-sm">{index + 1}</td>
                                <td className="px-4 py-2 text-sm">{jd.name}</td>
                                <td className="px-4 py-2 text-sm">{jd.requiredExperience}</td>
                                <td className="px-4 py-2 text-sm">{jd.primarySkills.join(', ')}</td>
                                <td className="px-4 py-2 text-sm">{jd.secondarySkills.join(', ')}</td>
                                <td className="px-4 py-2 text-sm">
                                    <button onClick={() => onEditJd(jd)} className="text-indigo-600 hover:text-indigo-900"><EditIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
            <div className="flex justify-end pt-4 border-t mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Close</button>
            </div>
        </div>
    </div>
);

const EditClientModal = ({ client, onClose, onSave, setEditingClient }: { client: {id: string, name: string}, onClose: () => void, onSave: () => void, setEditingClient: React.Dispatch<React.SetStateAction<{id: string, name: string} | null>> }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Edit Client</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Client Name</label>
                 <input 
                    type="text" 
                    value={client.name}
                    onChange={(e) => setEditingClient({ ...client, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
             <div className="flex justify-end pt-4 border-t mt-4 space-x-2">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600">Save Changes</button>
            </div>
        </div>
    </div>
);

const EditJdModal = ({ jd, onClose, onSave, setEditingJd }: { jd: JobDescription & { clientId: string }, onClose: () => void, onSave: () => void, setEditingJd: React.Dispatch<React.SetStateAction<(JobDescription & { clientId: string }) | null>> }) => {
    const handleSkillChange = (field: 'primarySkills' | 'secondarySkills', value: string) => {
        setEditingJd(prev => prev ? { ...prev, [field]: value.split(',').map(s => s.trim()) } : null);
    };

    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Edit Job Description</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" value={jd.name} onChange={(e) => setEditingJd(prev => prev ? { ...prev, name: e.target.value } : null)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Required Experience</label>
                    <input type="text" value={jd.requiredExperience} onChange={(e) => setEditingJd(prev => prev ? { ...prev, requiredExperience: e.target.value } : null)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Skills (comma separated)</label>
                    <textarea value={jd.primarySkills.join(', ')} onChange={(e) => handleSkillChange('primarySkills', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-20"/>
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Secondary Skills (comma separated)</label>
                    <textarea value={jd.secondarySkills.join(', ')} onChange={(e) => handleSkillChange('secondarySkills', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-20"/>
                 </div>
            </div>
             <div className="flex justify-end pt-4 border-t mt-4 space-x-2">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600">Save Changes</button>
            </div>
        </div>
    </div>
)};


export default CompanyAdminDashboard;*/
import type React from "react"
import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

// --- Dashboard Components ---

// Data structures
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdDate: string;
}

interface Analysis {
  id: string;
  candidateName: string;
  email: string;
  mobile?: string;
  client: string;
  jobDescription: string;
  requiredExperience: string;
  candidateExperience: string;
  experienceMatch: boolean;
  score: number;
  parsedPages: number;
  parsedDate: string;
  fileName: string;
  skills: string[];
}

interface Client {
  id: string;
  name: string;
  jobDescriptions: JobDescription[];
  status: "active" | "inactive";
  createdDate: string;
}

interface JobDescription {
  id: string;
  name: string;
  requiredExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "error" | "info";
}

// Dummy Data
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "test5.1",
    email: "test5.1@talenthive.net",
    role: "user",
    status: "inactive",
    createdDate: "2025-09-01",
  },
  {
    id: "2",
    name: "test5.2",
    email: "test5.2@talenthive.net",
    role: "admin",
    status: "active",
    createdDate: "2025-09-04",
  },
  { id: "3", name: "test5.3", email: "user3@talenthive.net", role: "user", status: "active", createdDate: "2025-09-02" },
  {
    id: "4",
    name: "test5.4",
    email: "user4@talenthive.net",
    role: "user",
    status: "active",
    createdDate: "2025-09-05",
  },
  { id: "5", name: "test5.5", email: "user5@talenthive.net", role: "user", status: "active", createdDate: "2025-09-03" },
]

// Updated DUMMY_ANALYSES with more recent dates for the "last 7 days" chart filter
const DUMMY_ANALYSES: Analysis[] = [
  {
    id: "1",
    candidateName: "John Doe",
    email: "test5.2@talenthive.net",
    client: "Zoho",
    jobDescription: "Software Engineer",
    requiredExperience: "3-5 years",
    candidateExperience: "5 years",
    experienceMatch: true,
    fileName: "resume1.pdf",
    score: 85,
    parsedDate: "2025-08-10",
    parsedPages: 2,
    skills: ["React", "Node", "JavaScript"],
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    email: "test5.2@talenthive.net",
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "3 years",
    experienceMatch: false,
    fileName: "resume2.pdf",
    score: 70,
    parsedDate: "2025-09-05",
    parsedPages: 1,
    skills: ["Python", "SQL", "Excel"],
  },
  {
    id: "3",
    candidateName: "Alice Johnson",
    email: "user3@talenthive.net", // test5.3
    client: "Tests5",
    jobDescription: "Backend Developer",
    requiredExperience: "2+ years",
    candidateExperience: "4 years",
    experienceMatch: true,
    fileName: "resume3.pdf",
    score: 90,
    parsedDate: "2025-06-15",
    parsedPages: 5,
    skills: ["React", "CSS", "UI/UX"],
  },
  {
    id: "4",
    candidateName: "Bob Brown",
    email: "user4@talenthive.net", // test5.4
    client: "Client C",
    jobDescription: "Manager",
    requiredExperience: "5+ years",
    candidateExperience: "7 years",
    experienceMatch: false,
    fileName: "resume4.pdf",
    score: 60,
    parsedDate: "2025-06-20",
    parsedPages: 23,
    skills: ["Leadership", "Python", "Project Management"],
  },
  {
    id: "5",
    candidateName: "Charlie Davis",
    email: "user5@talenthive.net", // test5.5
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "2 years",
    experienceMatch: true,
    fileName: "resume5.pdf",
    score: 75,
    parsedDate: "2025-03-12",
    parsedPages: 12,
    skills: ["SQL", "Python"],
  },
  {
    id: "6",
    candidateName: "Diana Evans",
    email: "test5.2@talenthive.net",
    client: "Zoho",
    jobDescription: "Software Engineer",
    requiredExperience: "3-5 years",
    candidateExperience: "6 years",
    experienceMatch: true,
    fileName: "resume6.pdf",
    score: 95,
    parsedDate: "2025-09-12",
    parsedPages: 51,
    skills: ["Node", "React", "TypeScript"],
  },
  {
    id: "7",
    candidateName: "Frank Green",
    email: "user3@talenthive.net", // test5.3
    client: "Tests5",
    jobDescription: "Backend Developer",
    requiredExperience: "2+ years",
    candidateExperience: "3 years",
    experienceMatch: true,
    fileName: "resume7.pdf",
    score: 88,
    parsedDate: "2025-09-02",
    parsedPages: 6,
    skills: ["Figma", "UI/UX", "CSS"],
  },
  {
    id: "8",
    candidateName: "Grace Hall",
    email: "user4@talenthive.net", // test5.4
    client: "Client B",
    jobDescription: "Data Analyst",
    requiredExperience: "3 years",
    candidateExperience: "4 years",
    experienceMatch: true,
    fileName: "resume8.pdf",
    score: 92,
    parsedDate: "2024-11-20",
    parsedPages: 8,
    skills: ["Python", "SQL", "Pandas"],
  },
]


const DUMMY_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Tests5",
    status: "active",
    createdDate: "2025-09-09",
    jobDescriptions: [
      {
        id: "jd1",
        name: "Backend Developer",
        requiredExperience: "2-3",
        primarySkills: ["python", "django"],
        secondarySkills: ["AWS"],
      },
      {
        id: "jd2",
        name: "Backend Developer1",
        requiredExperience: "1-2",
        primarySkills: ["python", "fastapi", "flask"],
        secondarySkills: ["None"],
      },
    ],
  },
  {
    id: "c2",
    name: "Zoho",
    status: "active",
    createdDate: "2025-09-12",
    jobDescriptions: [
      {
        id: "jd3",
        name: "Data Analyst",
        requiredExperience: "3 years",
        primarySkills: ["Python", "SQL"],
        secondarySkills: ["Tableau", "Excel"],
      },
    ],
  },
]

const ITEMS_PER_PAGE = 10
const MAX_FILE_SIZE = 1024 * 1024 // 1MB in bytes
const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#EC4899", "#9333EA", "#14B8A6"]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// --- Icon Components ---
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
  </svg>
)
const ResumeAnalyzerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h8v4h4v12zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const AnalysisHistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z" />
  </svg>
)
const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16zm-5-8l-4 4h8l-4-4z" />
  </svg>
)
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
  </svg>
)
const CompanyUsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const ResumeAnalysesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h8v4h4v12zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const ClientsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const PageCountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16zm-5-9h-2v2h2v-2zm0 4h-2v2h2v-2zm0-8h-2v2h2v-2z" />
  </svg>
)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
)
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 3.5-4.5s3.5 2.02 3.5 4.5v6z" />
  </svg>
)
const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
      clipRule="evenodd"
    />
  </svg>
)
const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 01-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)
const ExcelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
    <path d="M21 8.29l-3.37-3.37c-.3-.3-.72-.42-1.13-.3L12 7.74V4c0-.55-.45-1-1-1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9.32c0-.42-.12-.84-.36-1.03zM5 20c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-4h-5v-2h5V5h-3.79L18 7.3V14h-5v2h5v4zm-3-2h4v-2H2v2zM6 9h2v1H6V9zm0 2h2v1H6v-1z" />
  </svg>
)
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
    <path d="M19 12v1H5v-1h14zm0-4v1H5V8h14zm0-4v1H5V4h14zm-4 10v1H5v-1h10zm0 4v1H5v-1h10z" />
  </svg>
)
const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
    <path d="M19 8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-2 2v2H7v-2h10zm-2 6c0 .55-.45 1-1 1s-1-.45-1-1-.45-1-1-1-1 .45-1 1c0 .55.45 1 1 1s1 .45 1 1zM7 16h6c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zm12-9c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1zM7 4h10v1H7V4z" />
  </svg>
)
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
  </svg>
)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const CustomTooltip = ({ active, payload, label, fullData }: any) => {
    if (active && payload && payload.length) {
        const monthData = fullData.find((d: any) => d.month === label);
        if (!monthData) return null;

        const adminTotal = monthData['Admin (Total)'] || 0;
        const userEntries = Object.entries(monthData)
            .filter(([key, value]) => key.includes('(User)') && value as number > 0)
            .map(([key, value]) => ({ name: key.replace(' (User)', ''), pages: value as number }));

        return (
            <div className="p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200 text-sm">
                <p className="font-bold text-gray-800 mb-2">{`${label}`}</p>
                <p className="text-blue-600 font-semibold">{`Admin (Total): ${adminTotal}`}</p>
                {userEntries.map(user => (
                    <p key={user.name} className="text-gray-700 ml-2">{`User: ${user.name} → ${user.pages}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

// --- Main App Component ---

interface CompanyAdminDashboardProps {
  email: string;
  onLogout: () => void;
}

const CompanyAdminDashboard: React.FC<CompanyAdminDashboardProps> = ({ email, onLogout }) => {
  const [activePage, setActivePage] = useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [analyses, setAnalyses] = useState<Analysis[]>(DUMMY_ANALYSES);
  const [clients, setClients] = useState<Client[]>(DUMMY_CLIENTS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserForDeactivate, setSelectedUserForDeactivate] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [clientCurrentPage, setClientCurrentPage] = useState(1);


  // Resume Analyzer State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [clientType, setClientType] = useState<"new" | "existing">("new");
  const [clientName, setClientName] = useState("");
  const [jobDescriptionName, setJobDescriptionName] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [primarySkills, setPrimarySkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const [jdError, setJdError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isJdModified, setIsJdModified] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [hasExistingJdLoaded, setHasExistingJdLoaded] = useState(false);

  // Dashboard State
  const [view, setView] = useState<'All' | 'Users' | 'Admin'>('All');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [skillUserFilter, setSkillUserFilter] = useState("All Users");

  // Analysis History State
  const [analysisSortKey, setAnalysisSortKey] = useState<"id" | "candidateName" | "score" | "parsedDate">("id")
  const [analysisSortOrder, setAnalysisSortOrder] = useState<"asc" | "desc">("asc")
  const [analysisCurrentPage, setAnalysisCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [tableSearchQuery, setTableSearchQuery] = useState("")
  const [analysisUserFilter, setAnalysisUserFilter] = useState('All Users');

  // My Users & My Clients Page State
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [userSearchInput, setUserSearchInput] = useState("")
  const [clientSearchInput, setClientSearchInput] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState<'All' | 'active' | 'inactive'>('All');


  // Report State
  const [reportFilters, setReportFilters] = useState<{
    users: string[];
    clients: string;
    jobDescriptions: string;
    experienceMatch: string;
    scoreRange: string;
    fromDate: string;
    toDate: string;
  }>({
    users: [],
    clients: 'All Clients',
    jobDescriptions: 'All Job Descriptions',
    experienceMatch: 'All',
    scoreRange: 'All Scores',
    fromDate: '',
    toDate: '',
  });
  
  // Modals State
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [isEditJdModalOpen, setIsEditJdModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  
  const [selectedClientForJds, setSelectedClientForJds] = useState<Client | null>(null);
  
  const [editingClient, setEditingClient] = useState<{ id: string; name: string } | null>(null);
  const [editingJd, setEditingJd] = useState<JobDescription & { clientId: string } | null>(null);


  const stableOnLogout = useCallback(() => {
    onLogout()
  }, [onLogout])

  const addNotification = useCallback((message: string, type: "success" | "error" | "info") => {
    const newNotification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      type,
    }
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  }, [])

  // Debounce search for My Users page
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserSearchQuery(userSearchInput);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [userSearchInput]);

  const handleClearNotifications = () => {
    setNotifications([]);
  }

  const MemoizedTopBar = useMemo(() => {
    return (
      <TopBar
        onLogout={stableOnLogout}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
        email={email}
        activePage={activePage}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
    )
  }, [notifications, activePage, email, stableOnLogout]);

  // Memoized data calculations
  const userAnalyses = useMemo(() => {
    return users.reduce((acc: { [key: string]: Analysis[] }, user) => {
      acc[user.id] = analyses.filter((a) => a.email === user.email)
      return acc;
    }, {});
  }, [users, analyses]);

  const userPages = useMemo(() => {
    return Object.fromEntries(
      Object.entries(userAnalyses).map(([id, ans]) => [id, ans.reduce((sum, a) => sum + a.parsedPages, 0)]),
    );
  }, [userAnalyses]);

  const userRole = useMemo(() => {
    const currentUser = users.find((u) => u.email === email);
    return currentUser?.role || "user";
  }, [users, email]);

  const filteredAndSortedUsers = useMemo(() => {
    let usersToShow;
    if (userRole === "admin") {
      usersToShow = users; // Admins see all users
    } else {
      usersToShow = users.filter((u) => u.email === email); // Non-admins only see themselves
    }
  
    let filtered = usersToShow.filter(
      (user) =>
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  
    return filtered;
  }, [users, userSearchQuery, userRole, email]);

  const filteredAnalyses = useMemo(() => {
  let filtered = [...analyses];

  if (analysisUserFilter !== 'All Users') {
    filtered = filtered.filter(a => a.email === analysisUserFilter);
  }

  filtered = filtered.filter(
    (analysis) =>
      analysis.candidateName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.client.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.jobDescription.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.fileName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      analysis.score.toString().includes(tableSearchQuery.toLowerCase()) ||
      analysis.email.toLowerCase().includes(tableSearchQuery.toLowerCase())
  );

  filtered = filtered.sort((a, b) => {
    let valA, valB;
    if (analysisSortKey === "score") {
      valA = a.score;
      valB = b.score;
    } else if (analysisSortKey === "parsedDate") {
      valA = new Date(a.parsedDate).getTime();
      valB = new Date(b.parsedDate).getTime();
    } else if (analysisSortKey === "id") {
      valA = parseInt(a.id, 10);
      valB = parseInt(b.id, 10);
    } else {
      // candidateName
      valA = a.candidateName.toLowerCase();
      valB = b.candidateName.toLowerCase();
    }

    if (valA < valB) return analysisSortOrder === "asc" ? -1 : 1;
    if (valA > valB) return analysisSortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return filtered;
}, [analyses, tableSearchQuery, analysisSortKey, analysisSortOrder, analysisUserFilter]);


  const paginatedUsers = useMemo(() => {
    const start = (userCurrentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredAndSortedUsers.slice(start, end);
  }, [filteredAndSortedUsers, userCurrentPage, entriesPerPage]);

  const totalPagesUsers = Math.ceil(filteredAndSortedUsers.length / entriesPerPage);

  const paginatedAnalyses = useMemo(() => {
      const start = (analysisCurrentPage - 1) * entriesPerPage;
      const end = start + entriesPerPage;
      return filteredAnalyses.slice(start, end);
  }, [filteredAnalyses, analysisCurrentPage, entriesPerPage]);

  const totalPagesAnalyses = Math.ceil(filteredAnalyses.length / entriesPerPage);

  const filteredReportAnalyses = useMemo(() => {
      let filtered = analyses;
      
      const { users: selectedUserEmails, clients, jobDescriptions, experienceMatch, scoreRange, fromDate, toDate } = reportFilters;
      
      if (selectedUserEmails.length > 0) {
        filtered = filtered.filter(a => selectedUserEmails.includes(a.email));
      }

      if (clients !== 'All Clients') {
          filtered = filtered.filter(a => a.client === clients);
      }

      if (jobDescriptions !== 'All Job Descriptions') {
          filtered = filtered.filter(a => a.jobDescription === jobDescriptions);
      }

      if (experienceMatch !== 'All') {
          filtered = filtered.filter(a => a.experienceMatch === (experienceMatch === 'Match'));
      }

      if (scoreRange !== 'All Scores') {
          const [min, max] = scoreRange.split('-').map(Number);
          filtered = filtered.filter(a => a.score >= min && a.score <= max);
      }

      if (fromDate) {
          const from = new Date(fromDate);
          filtered = filtered.filter(a => new Date(a.parsedDate) >= from);
      }
      if (toDate) {
          const to = new Date(toDate);
          filtered = filtered.filter(a => new Date(a.parsedDate) <= to);
      }

      return filtered;
  }, [analyses, reportFilters]);

  const paginatedReportAnalyses = useMemo(() => {
    const start = (analysisCurrentPage - 1) * entriesPerPage
    const end = start + entriesPerPage
    return filteredReportAnalyses.slice(start, end)
  }, [filteredReportAnalyses, analysisCurrentPage, entriesPerPage])

  const totalPagesReport = Math.ceil(filteredReportAnalyses.length / entriesPerPage);

  // --- START: New Dashboard Data Logic ---

  const analysesForCards = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    return analyses.filter(a => {
        const date = new Date(a.parsedDate);
        const yearMatch = date.getFullYear() === currentYear;
        const monthMatch = date.getMonth() + 1 === currentMonth;
        return yearMatch && monthMatch;
    });
  }, [analyses]);


  const fullChartData = useMemo(() => {
    const analysesByYear = analyses.filter(a => new Date(a.parsedDate).getFullYear() === selectedYear);
    const activeUsers = users.filter(u => u.status === 'active');
    const userMap = new Map(users.map(u => [u.email, u]));

    const monthlyData = MONTH_NAMES.map((monthName, index) => {
        const base: {[key: string]: any} = {
            month: `${monthName}`,
            monthIndex: index,
            'Admin (Total)': 0,
            'Users (Total)': 0,
        };
        activeUsers.forEach(user => {
            base[`${user.name} (${user.role === 'admin' ? 'Admin' : 'User'})`] = 0;
        });
        return base;
    });

    analysesByYear.forEach(analysis => {
      const monthIndex = new Date(analysis.parsedDate).getMonth();
      const user = userMap.get(analysis.email);
      if (!user || user.status !== 'active') return;

      const key = `${user.name} (${user.role === 'admin' ? 'Admin' : 'User'})`;
      monthlyData[monthIndex][key] = (monthlyData[monthIndex][key] || 0) + analysis.parsedPages;

      if (user.role === 'admin') {
        monthlyData[monthIndex]['Admin (Total)'] += analysis.parsedPages;
      } else {
        monthlyData[monthIndex]['Users (Total)'] += analysis.parsedPages;
      }
    });

    return monthlyData;
  }, [analyses, users, selectedYear]);

  const visibleChartData = useMemo(() => {
    if (!fullChartData.length) return [];

    const activeAdmins = users.filter(u => u.status === 'active' && u.role === 'admin').map(u => `${u.name} (Admin)`);
    const activeUsers = users.filter(u => u.status === 'active' && u.role === 'user').map(u => `${u.name} (User)`);
    
    return fullChartData.map(monthData => {
        const newMonthData: { [key: string]: any } = { month: monthData.month };
        
        if (view === 'All') {
            newMonthData['Admin (Total)'] = monthData['Admin (Total)'];
            newMonthData['Users (Total)'] = monthData['Users (Total)'];
        } else if (view === 'Admin') {
            activeAdmins.forEach(adminName => {
                newMonthData[adminName] = monthData[adminName] || 0;
            });
        } else if (view === 'Users') {
            activeUsers.forEach(userName => {
                newMonthData[userName] = monthData[userName] || 0;
            });
        }
        return newMonthData;
    });
  }, [fullChartData, view, users]);

  const analysesByYear = useMemo(() => {
    return analyses.filter(a => new Date(a.parsedDate).getFullYear() === selectedYear);
  }, [analyses, selectedYear]);
  
  const pieDataResumesByClient = useMemo(() => {
    const clientCounts: { [key: string]: number } = {};
    analysesByYear.forEach((a) => {
      clientCounts[a.client] = (clientCounts[a.client] || 0) + 1;
    });
    return Object.entries(clientCounts).map(([name, value]) => ({ name, value }))
  }, [analysesByYear]);

  const pieDataSkills = useMemo(() => {
    let filteredForSkills = analyses;

    if (skillUserFilter !== 'All Users') {
        filteredForSkills = analyses.filter(a => a.email === skillUserFilter);
    }

    const skillCounts: { [key: string]: number } = {};
    filteredForSkills.forEach((a) => {
      a.skills.forEach((s) => {
        skillCounts[s] = (skillCounts[s] || 0) + 1;
      });
    });
    return Object.entries(skillCounts).map(([name, value]) => ({ name, value }));
  }, [analyses, skillUserFilter]);
  
  // --- END: New Dashboard Data Logic ---

  // State and logic for modals and notifications
  const handleDeactivateUser = (user: User) => {
    setSelectedUserForDeactivate(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeactivate = () => {
    if (selectedUserForDeactivate) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === selectedUserForDeactivate.id ? { ...u, status: "inactive" } : u)),
      )
      setIsDeleteModalOpen(false);
      setSelectedUserForDeactivate(null);
      addNotification("User deactivated successfully.", "success");
    }
  };

  const clearJdDetails = () => {
    setRequiredExperience("");
    setPrimarySkills("");
    setSecondarySkills("");
    setIsEditMode(true);
    setHasExistingJdLoaded(false);
    setIsJdModified(false);
  };

  // State and logic for Resume Analyzer
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 1MB limit.");
      setUploadedFile(null);
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (allowedTypes.includes(file.type)) {
        setFileError(null);
        setUploadedFile(file);
      } else {
        setFileError("Invalid file type. Please upload PDF, DOC, or DOCX.");
        setUploadedFile(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError(null);
  }

  const resetJdFields = () => {
    setJobDescriptionName("");
    setJdError(null);
    clearJdDetails();
  }

  const handleClientTypeChange = (type: "new" | "existing") => {
    setClientType(type);
    setClientName("");
    setClientError(null);
    setSelectedClient(null);
    resetJdFields();
  }

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.value;
    setClientName(name);
    resetJdFields();

    const existingClient = clients.find((c) => c.name.toLowerCase() === name.toLowerCase())

    if (clientType === "new") {
      if (existingClient) {
        setClientError(`Client "${name}" already exists. You can create a new job description for this client.`)
        setSelectedClient(existingClient);
      } else {
        setClientError(null);
        setSelectedClient(null);
      }
    } else {
      setClientError(null);
      setSelectedClient(existingClient || null);
    }
  };

  const handleJdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setJobDescriptionName(name);
    setJdError(null);
    clearJdDetails();

    const clientForLogic = selectedClient;
    if (clientForLogic) {
        const existingJd = clientForLogic.jobDescriptions.find(jd => jd.name.toLowerCase() === name.toLowerCase());
        if (existingJd) {
            setJdError(`Job description "${name}" already exists for this client.`);
        }
    }
  };

  const handleJdSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.value;
      setJobDescriptionName(name);
      setJdError(null);

      if (!selectedClient || !name) {
          clearJdDetails();
          return;
      }

      const existingJd = selectedClient.jobDescriptions.find(jd => jd.name === name);

      if (existingJd) {
          setRequiredExperience(existingJd.requiredExperience);
          setPrimarySkills(existingJd.primarySkills.join(", "));
          setSecondarySkills(existingJd.secondarySkills.join(", "));
          setIsEditMode(false);
          setHasExistingJdLoaded(true);
          setIsJdModified(false);
      }
  };


  const handleJdFieldChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setIsJdModified(true);
  };

  const handleSaveJd = () => {
    if (!editingJd) return;
  
    const updatedClients = clients.map(client => {
      if (client.id === editingJd.clientId) {
        return {
          ...client,
          jobDescriptions: client.jobDescriptions.map(jd =>
            jd.id === editingJd.id ? { ...jd, ...editingJd } : jd
          ),
        };
      }
      return client;
    });
  
    setClients(updatedClients);
    addNotification("Job Description updated successfully.", "success");
    setIsEditJdModalOpen(false);
    setEditingJd(null);
  };

  const handleAnalyzeResume = () => {
    addNotification("Resume analysis initiated.", "info");
  }

  const isAnalyzeButtonEnabled = useMemo(() => {
    return (
      uploadedFile !== null &&
      clientName.trim() !== "" &&
      jobDescriptionName.trim() !== "" &&
      requiredExperience.trim() !== "" &&
      primarySkills.trim() !== "" &&
      fileError === null &&
      clientError === null &&
      jdError === null
    )
  }, [
    uploadedFile,
    clientName,
    jobDescriptionName,
    requiredExperience,
    primarySkills,
    fileError,
    clientError,
    jdError,
  ])

  // Pagination for tables
  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    setEntriesPerPage(value);
    setAnalysisCurrentPage(1);
    setUserCurrentPage(1);
    setClientCurrentPage(1);
  }

  // Logic for My Users page
  const handleUserStatusChange = useCallback((user: User, newStatus: "active" | "inactive") => {
    if (userRole !== "admin") {
      addNotification("Only admins can change user status.", "error");
      return;
    }
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    addNotification(`User ${user.name} status updated to ${newStatus}.`, "info");
  }, [userRole, addNotification]);

  // Logic for My Clients page
  const handleClientStatusChange = useCallback((client: Client, newStatus: "active" | "inactive") => {
    setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
    addNotification(`Client ${client.name} status updated to ${newStatus}.`, "info");
  }, []);

  const handleUpdateClient = () => {
    if (!editingClient) return;
    
    const oldName = clients.find(c => c.id === editingClient.id)?.name;

    // Update client name in clients state
    setClients(prevClients => prevClients.map(c => 
        c.id === editingClient.id ? { ...c, name: editingClient.name } : c
    ));

    // Update client name in all associated analyses
    if(oldName && oldName !== editingClient.name) {
        setAnalyses(prevAnalyses => prevAnalyses.map(a => 
            a.client === oldName ? { ...a, client: editingClient.name } : a
        ));
    }
    
    addNotification("Client updated successfully.", "success");
    setIsEditClientModalOpen(false);
    setEditingClient(null);
  };
  
  const handleUpdateJd = () => {
    if (!editingJd) return;

    const updatedClients = clients.map(client => {
      if (client.id === editingJd.clientId) {
        const updatedJds = client.jobDescriptions.map(jd =>
          jd.id === editingJd.id ? { ...editingJd, primarySkills: editingJd.primarySkills, secondarySkills: editingJd.secondarySkills } : jd
        );
        return { ...client, jobDescriptions: updatedJds };
      }
      return client;
    });

    setClients(updatedClients);
    addNotification("Job Description updated successfully.", "success");
    setIsEditJdModalOpen(false);
    setEditingJd(null);
  };


  const handleReportFilterChange = (key: string, value: any) => {
    setReportFilters((prev) => ({ ...prev, [key]: value }));
  }

  const handleSort = useCallback(
    (key: "id" | "candidateName" | "score" | "parsedDate") => {
      setAnalysisSortKey(key)
      setAnalysisSortOrder(analysisSortKey === key && analysisSortOrder === "asc" ? "desc" : "asc")
    },
    [analysisSortKey, analysisSortOrder],
  )

  const handleExportData = useCallback(
    (format: "excel" | "pdf") => {
      const dataToExport = filteredAnalyses.map((analysis) => ({
        "Candidate Name": analysis.candidateName,
        Experience: analysis.candidateExperience,
        "Experience Match": analysis.experienceMatch ? "Match" : "No Match",
        Score: analysis.score,
        "File Name": analysis.fileName,
        "Parsed Pages": analysis.parsedPages,
        "Parsed Date": analysis.parsedDate,
      }))

      if (format === "excel") {
        // Create CSV content
        const csvContent = [
          Object.keys(dataToExport[0]).join(","),
          ...dataToExport.map((row) => Object.values(row).join(",")),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis-history.csv"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else if (format === "pdf") {
        // Create text content for PDF simulation
        const textContent = dataToExport.map((row) => Object.values(row).join(" | ")).join("\n")
        const blob = new Blob([textContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "analysis-history.txt"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    },
    [filteredAnalyses],
  )

 const memoizedTable = useMemo(() => {
    return (data: any[], isUserTable = false, userRole = "user", currentPage = 1) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleExportData("excel")}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Download Excel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleExportData("pdf")}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Download PDF"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Print"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={isUserTable ? "Search users..." : "Search..."}
              value={isUserTable ? userSearchInput : tableSearchQuery}
              onChange={(e) =>
                isUserTable ? setUserSearchInput(e.target.value) : setTableSearchQuery(e.target.value)
              }
              className="pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-80"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {(isUserTable ? userSearchInput : tableSearchQuery) && (
              <button
                onClick={() => (isUserTable ? setUserSearchInput("") : setTableSearchQuery(""))}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {isUserTable ? (
                // Headers for the My Users table
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Parsed Pages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Created on</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </>
              ) : (
                // Headers for the Analysis History and Report tables
                <>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     <button
                      onClick={() => handleSort("id")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>S.no</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("candidateName")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Candidate Name</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Req-Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate-Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("score")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Score</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("parsedDate")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Parsed Date</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {isUserTable ? (
                  // Data cells for the My Users table
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userPages[item.id] || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={item.status}
                          onChange={(e) => handleUserStatusChange(item, e.target.value as "active" | "inactive")}
                           className={`p-1.5 rounded-md text-xs border ${item.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                           disabled={userRole !== 'admin'}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                    </td>
                  </>
                ) : (
                  // Data cells for the Analysis History and Report tables
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.candidateName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobile || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jobDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.requiredExperience}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.candidateExperience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.experienceMatch ? (
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parsedPages}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parsedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => isUserTable ? setUserCurrentPage(Math.max(1, currentPage - 1)) : setAnalysisCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil((isUserTable ? filteredAndSortedUsers.length : filteredAnalyses.length) / entriesPerPage)}
            </span>
            <button
              onClick={() => isUserTable ? setUserCurrentPage(currentPage + 1) : setAnalysisCurrentPage(currentPage + 1)}
              disabled={
                currentPage >= Math.ceil((isUserTable ? filteredAndSortedUsers.length : filteredAnalyses.length) / entriesPerPage)
              }
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}, [
    activePage,
    tableSearchQuery,
    userSearchInput,
    entriesPerPage,
    analysisCurrentPage,
    userCurrentPage,
    analysisSortKey,
    analysisSortOrder,
    filteredAnalyses,
    filteredAndSortedUsers,
    users,
    userPages,
    handleUserStatusChange,
    handleExportData,
  ])

  const ReportPage = () => (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Report</h2>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Users</label>
            <MultiSelectUsers
                users={users.filter(u => u.status === 'active')}
                selectedUsers={reportFilters.users}
                onChange={(selected) => handleReportFilterChange('users', selected)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Client</label>
            <select
              value={reportFilters.clients}
              onChange={(e) => handleReportFilterChange("clients", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Clients">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Job Description</label>
            <select
              value={reportFilters.jobDescriptions}
              onChange={(e) => handleReportFilterChange("jobDescriptions", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Job Descriptions">All Job Descriptions</option>
              {clients
                .find((c) => c.name === reportFilters.clients)
                ?.jobDescriptions.map((jd) => (
                  <option key={jd.id} value={jd.name}>
                    {jd.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Exp. Match</label>
            <select
              value={reportFilters.experienceMatch}
              onChange={(e) => handleReportFilterChange("experienceMatch", e.target.value)}
              className="w-full px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Match">Match</option>
              <option value="No Match">No Match</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              value={reportFilters.fromDate}
              onChange={(e) => handleReportFilterChange("fromDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              value={reportFilters.toDate}
              onChange={(e) => handleReportFilterChange("toDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      {memoizedTable(paginatedReportAnalyses, false, 'user', analysisCurrentPage)}
    </div>
  )

  const MyUsersPageContent = () => {
    return (
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Users</h2>
        </div>
        {memoizedTable(paginatedUsers, true, userRole, userCurrentPage)}
      </div>
    );
  };

  const MyClientsPageContent = () => {
      const filteredClients = useMemo(() => 
        clients.filter(c => 
            c.name.toLowerCase().includes(clientSearchInput.toLowerCase()) &&
            (clientStatusFilter === 'All' || c.status === clientStatusFilter)
        ), 
        [clients, clientSearchInput, clientStatusFilter]
      );
      
      const paginatedClients = useMemo(() => {
        const start = (clientCurrentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        return filteredClients.slice(start, end);
      }, [filteredClients, clientCurrentPage, entriesPerPage]);

      return (
        <div className="p-8 bg-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Company Clients</h2>
                <div className="flex items-center space-x-4">
                    <select
                        value={clientStatusFilter}
                        onChange={(e) => setClientStatusFilter(e.target.value as any)}
                        className="p-2 rounded-lg border bg-white shadow-sm"
                    >
                        <option value="All">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={clientSearchInput}
                            onChange={(e) => setClientSearchInput(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-80"
                        />
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Descriptions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Created Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedClients.map((client, index) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(clientCurrentPage - 1) * entriesPerPage + index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setSelectedClientForJds(client);
                                                setIsJdModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-semibold hover:bg-blue-600"
                                        >
                                            View JDs ({client.jobDescriptions.length})
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.createdDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setEditingClient({ id: client.id, name: client.name });
                                                setIsEditClientModalOpen(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                         <select
                                            value={client.status}
                                            onChange={(e) => handleClientStatusChange(client, e.target.value as "active" | "inactive")}
                                            className={`p-1.5 rounded-md text-xs border ${client.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                                            >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
  };


  const AnalysisHistoryPageContent = () => (
    <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-800">Analysis History</h2>
             <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Filter by User:</label>
                <select
                    value={analysisUserFilter}
                    onChange={(e) => setAnalysisUserFilter(e.target.value)}
                    className="p-2 rounded-lg border bg-white shadow-sm"
                >
                    <option value="All Users">All Users</option>
                    {users.filter(u => u.status === 'active').map(user => (
                        <option key={user.id} value={user.email}>{user.name}</option>
                    ))}
                </select>
             </div>
        </div>
      {memoizedTable(paginatedAnalyses, false, 'user', analysisCurrentPage)}
    </div>
  );

  const resumeAnalyzerContent = (
    <div className="p-8 bg-gray-100">
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Resume Upload</h3>
                <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2 w-full h-20 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById("file-upload-input")?.click()}
                >
                    <input type="file" id="file-upload-input" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    <p className="text-sm text-gray-600">Drag & drop or click</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max: 1MB)</p>
                </div>
                 {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                {uploadedFile && (
                    <div className="flex items-center justify-between p-3 mt-4 bg-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 truncate">{uploadedFile.name}</span>
                        <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2">
                           <XCircleIcon />
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Client Section</h3>
                    <div>
                        <div className="flex space-x-4 mb-2">
                            <label className="inline-flex items-center"><input type="radio" name="clientType" value="new" checked={clientType === "new"} onChange={() => handleClientTypeChange("new")} className="form-radio text-indigo-600" /><span className="ml-2 text-sm">New Client</span></label>
                            <label className="inline-flex items-center"><input type="radio" name="clientType" value="existing" checked={clientType === "existing"} onChange={() => handleClientTypeChange("existing")} className="form-radio text-indigo-600" /><span className="ml-2 text-sm">Existing Client</span></label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-sm">
                            {clientType === 'new' ? 'Client Name' : 'Select Client'} <span className="text-red-500">*</span>
                        </label>
                        {clientType === "new" ? (<input type="text" placeholder="e.g., Test5" value={clientName} onChange={handleClientNameChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />) : (<select value={clientName} onChange={handleClientNameChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"><option value="">Choose a Client</option>{clients.filter(c => c.status === 'active').map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}</select>)}
                        {clientError && <p className="text-red-600 text-sm mt-1">{clientError}</p>}
                    </div>
                </div>

                {(clientType === 'new' || selectedClient) && (
                    <div className="space-y-4 border-t pt-4">
                         <h3 className="text-xl font-semibold text-gray-800">Job Description Section</h3>
                        <div>
                            <label htmlFor="jd-input" className="block text-gray-700 font-medium mb-1 text-sm">Job Description Name <span className="text-red-500">*</span></label>
                            
                            {clientType === 'existing' && selectedClient ? (
                                <select
                                    value={jobDescriptionName}
                                    onChange={handleJdSelectChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Select Job Description</option>
                                    {selectedClient.jobDescriptions.map(jd => (
                                        <option key={jd.id} value={jd.name}>{jd.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    id="jd-input" 
                                    placeholder="e.g., Backend Developer" 
                                    value={jobDescriptionName} 
                                    onChange={handleJdInputChange} 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            )}
                            {jdError && <p className="text-red-600 text-sm mt-1">{jdError}</p>}
                        </div>
                    </div>
                )}
                
                {(clientType === 'new' || (jobDescriptionName.trim() !== "" && !jdError)) && (
                    <div className="space-y-4">
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Required Experience <span className="text-red-500">*</span></label><input type="text" placeholder="e.g., 3-5, 4+, 5+" value={requiredExperience} onChange={(e) => handleJdFieldChange(setRequiredExperience, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Primary Skills (Must Have) <span className="text-red-500">*</span></label><input type="text" placeholder="e.g. Python, Java, SQL" value={primarySkills} onChange={(e) => handleJdFieldChange(setPrimarySkills, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div><label className="block text-gray-700 font-medium mb-1 text-sm">Secondary Skills (Nice to Have)</label><input type="text" placeholder="e.g. Docker, AWS, CI/CD" value={secondarySkills} onChange={(e) => handleJdFieldChange(setSecondarySkills, e.target.value)} disabled={!isEditMode} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed" /></div>
                        <div className="flex justify-end pt-2">{hasExistingJdLoaded && !isEditMode && (<button onClick={() => setIsEditMode(true)} className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"><EditIcon /> Edit</button>)}{hasExistingJdLoaded && isEditMode && (<button onClick={handleSaveJd} disabled={!isJdModified} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300">Save Changes</button>)}</div>
                    </div>
                 )}
            </div>
        </div>
        <div className="flex justify-center mt-8">
            <button
                onClick={handleAnalyzeResume}
                disabled={!isAnalyzeButtonEnabled}
                className={`w-full max-w-md py-3 rounded-lg text-white font-semibold transition-colors ${isAnalyzeButtonEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
            >
                Analyze Resume
            </button>
        </div>
    </div>
  )
  const dashboardContent = (
  <div className="flex-1 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
              title="Active Users"
              value={users.filter(u => u.status === "active").length.toString()}
              icon={<UsersIcon />}
              bgColor="bg-blue-500"
              onClick={() => setActivePage("My Users")}
          />
          <StatsCard
              title="Analysed Resume (Current Year & Month)"
              value={analysesForCards.length.toString()}
              icon={<ResumeAnalysesIcon />}
              bgColor="bg-yellow-500"
              onClick={() => setActivePage("Analysis History")}
          />
          <StatsCard
              title="Pages Count (Current Year & Month)"
              value={analysesForCards.reduce((acc, a) => acc + a.parsedPages, 0).toString()}
              icon={<PageCountIcon />}
              bgColor="bg-green-500"
              onClick={() => {}}
          />
          <StatsCard
              title="Active Clients"
              value={clients.filter(c => c.status === 'active').length.toString()}
              icon={<ClientsIcon />}
              bgColor="bg-red-500"
              onClick={() => setActivePage("My Clients")}
          />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-bold text-gray-800">Company Data</h2>
              <div className="flex items-center space-x-4">
                  <select value={view} onChange={(e) => setView(e.target.value as any)} className="p-2 rounded-lg border bg-gray-50 shadow-sm">
                      <option value="All">View: Admin & Users</option>
                      <option value="Users">View: Users</option>
                      <option value="Admin">View: Admin</option>
                  </select>
                  <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 rounded-lg border bg-gray-50 shadow-sm">
                      {[2025, 2024, 2023].map(year => <option key={year} value={year}>Year: {year}</option>)}
                  </select>
              </div>
          </div>

          <div style={{ height: "450px" }}>
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visibleChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Number of Pages', angle: -90, position: 'insideLeft' }} />
                      <Tooltip content={<CustomTooltip fullData={fullChartData} />} />
                      <Legend />
                      {visibleChartData.length > 0 && Object.keys(visibleChartData[0]).filter(key => key !== 'month').map((key, index) => (
                          <Bar 
                              key={key} 
                              dataKey={key} 
                              fill={
                                  key === 'Admin (Total)' ? '#3B82F6' :
                                  key === 'Users (Total)' ? '#EF4444' :
                                  COLORS[index % COLORS.length]
                              } 
                              radius={[4, 4, 0, 0]} 
                           />
                      ))}
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "450px" }}>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumes by Client ({selectedYear})</h3>
                <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                    data={pieDataResumesByClient}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    >
                    {pieDataResumesByClient.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "450px" }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Skills Distribution</h3>
                    <select
                        value={skillUserFilter}
                        onChange={(e) => setSkillUserFilter(e.target.value)}
                        className="p-1 text-sm rounded-lg border bg-gray-50 shadow-sm"
                    >
                        <option value="All Users">All Users</option>
                        {users.filter(u => u.status === 'active').map(user => (
                            <option key={user.id} value={user.email}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie data={pieDataSkills} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
                    {pieDataSkills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconSize={10}
                    wrapperStyle={{ overflowY: "auto", maxHeight: "300px" }}
                    />
                </PieChart>
                </ResponsiveContainer>
            </div>
       </div>
  </div>
);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {MemoizedTopBar}
        <main className="flex-1">
          {activePage === "Dashboard" && dashboardContent}
          {activePage === "My Users" && <MyUsersPageContent />}
          {activePage === "My Clients" && <MyClientsPageContent />}
          {activePage === "Analysis History" && <AnalysisHistoryPageContent />}
          {activePage === "Report" && <ReportPage />}
          {activePage === "Resume Analyzer" && resumeAnalyzerContent}
          {activePage === "Company Info" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold">Company Info</h2>
              <p className="text-gray-600 mt-2">This is where you would view company info.</p>
            </div>
          )}
        </main>

      </div>
        {isJdModalOpen && selectedClientForJds && (
            <JdListModal
                client={selectedClientForJds}
                onClose={() => setIsJdModalOpen(false)}
                onEditJd={(jd) => {
                    setEditingJd({ ...jd, clientId: selectedClientForJds.id });
                    setIsEditJdModalOpen(true);
                }}
            />
        )}
        {isEditClientModalOpen && editingClient && (
            <EditClientModal
                client={editingClient}
                onClose={() => setIsEditClientModalOpen(false)}
                onSave={handleUpdateClient}
                setEditingClient={setEditingClient}
            />
        )}
        {isEditJdModalOpen && editingJd && (
            <EditJdModal
                jd={editingJd}
                onClose={() => setIsEditJdModalOpen(false)}
                onSave={handleUpdateJd}
                setEditingJd={setEditingJd}
            />
        )}
      {isDeleteModalOpen && (
        <DeleteConfirmModal onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeactivate} />
      )}
      {showToast && <NotificationToast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />}
    </div>
  )
}

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) => {
  const sidebarItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Resume Analyzer", icon: <ResumeAnalyzerIcon /> },
    { name: "Analysis History", icon: <AnalysisHistoryIcon /> },
    { name: "Report", icon: <ReportIcon /> },
    { name: "My Users", icon: <UsersIcon /> },
    { name: "My Clients", icon: <ClientsIcon /> },
  ]
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`flex-col w-64 bg-gradient-to-br from-green-800 to-green-500 text-white min-h-screen p-6 shadow-xl fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-white"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActivePage(item.name)}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out ${
                    activePage === item.name ? "bg-green-900 text-white shadow-inner" : "hover:bg-green-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-4 font-semibold">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

const TopBar = ({
  onLogout,
  notifications,
  onClearNotifications,
  email,
  activePage,
  onMenuClick,
}: {
  onLogout: () => void;
  notifications: Notification[];
  onClearNotifications: () => void;
  email: string;
  activePage: string;
  onMenuClick: () => void;
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const userInitial = email ? email.charAt(0).toUpperCase() : "?";

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md rounded-b-lg">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="p-2 mr-4 text-gray-600 hover:text-gray-800 lg:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{activePage}</h1>
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="relative" ref={notificationsDropdownRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          >
            <BellIcon />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {notifications.length}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
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
                  <button onClick={onClearNotifications} className="text-sm text-blue-500 hover:text-blue-700">
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg">
              {userInitial}
            </div>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Profile</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Company Info</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const StatsCard = ({
  title,
  value,
  icon,
  bgColor,
  onClick,
}: {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
  onClick: () => void
}) => (
  <div
    className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-lg ${bgColor} ${onClick !== null && onClick.toString() !== '() => {}' ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
    onClick={onClick}
  >
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-lg">{title}</span>
    </div>
    <div className="text-4xl opacity-80">{icon}</div>
  </div>
)

const DeleteConfirmModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
      <div className="text-gray-800 text-center mb-6">
        <h3 className="text-lg font-bold">This page says</h3>
        <p className="mt-2 text-base">Are you sure to perform this action?</p>
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
)

const NotificationToast = ({
  message,
  onClose,
  type,
}: {
  message: string
  onClose: () => void
  type: "success" | "error" | "info"
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000) // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type]

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`p-4 rounded-lg shadow-lg text-white flex items-center space-x-3 ${bgColor}`}>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  )
}

const MultiSelectUsers = ({ users, selectedUsers, onChange }: { users: User[], selectedUsers: string[], onChange: (selected: string[]) => void}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const userMap = useMemo(() => new Map(users.map(u => [u.email, u.name])), [users]);

    const toggleUser = (email: string) => {
        const newSelection = selectedUsers.includes(email)
            ? selectedUsers.filter(u => u !== email)
            : [...selectedUsers, email];
        onChange(newSelection);
    };

    const removeUser = (email: string) => {
        onChange(selectedUsers.filter(u => u !== email));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[42px] p-1 flex flex-wrap items-center gap-1 cursor-pointer">
                {selectedUsers.length === 0 && <span className="text-gray-400 px-2">Select users...</span>}
                {selectedUsers.map(email => (
                    <span key={email} className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        {userMap.get(email) || email}
                        <button onClick={(e) => { e.stopPropagation(); removeUser(email); }} className="text-white hover:text-blue-200">
                            <XMarkIcon />
                        </button>
                    </span>
                ))}
            </div>
            {isOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <ul>
                        {users.map(user => (
                            <li 
                                key={user.id} 
                                onClick={() => { toggleUser(user.email); }}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${selectedUsers.includes(user.email) ? 'bg-blue-100' : ''}`}
                            >
                                <span>{user.name} ({user.role})</span>
                                {selectedUsers.includes(user.email) && <CheckCircleIcon className="w-4 h-4 text-blue-600"/>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


// --- My Clients Page Modals ---
const JdListModal = ({ client, onClose, onEditJd }: { client: Client, onClose: () => void, onEditJd: (jd: JobDescription) => void }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Job Descriptions - {client.name}</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div className="overflow-x-auto max-h-[60vh]">
                 <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">JD Title</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required Experience</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Primary Skills</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Secondary Skills</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {client.jobDescriptions.map((jd, index) => (
                            <tr key={jd.id}>
                                <td className="px-4 py-2 text-sm">{index + 1}</td>
                                <td className="px-4 py-2 text-sm">{jd.name}</td>
                                <td className="px-4 py-2 text-sm">{jd.requiredExperience}</td>
                                <td className="px-4 py-2 text-sm">{jd.primarySkills.join(', ')}</td>
                                <td className="px-4 py-2 text-sm">{jd.secondarySkills.join(', ')}</td>
                                <td className="px-4 py-2 text-sm">
                                    <button onClick={() => onEditJd(jd)} className="text-indigo-600 hover:text-indigo-900"><EditIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
            <div className="flex justify-end pt-4 border-t mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Close</button>
            </div>
        </div>
    </div>
);

const EditClientModal = ({ client, onClose, onSave, setEditingClient }: { client: {id: string, name: string}, onClose: () => void, onSave: () => void, setEditingClient: React.Dispatch<React.SetStateAction<{id: string, name: string} | null>> }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Edit Client</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Client Name</label>
                 <input 
                    type="text" 
                    value={client.name}
                    onChange={(e) => setEditingClient({ ...client, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
             <div className="flex justify-end pt-4 border-t mt-4 space-x-2">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600">Save Changes</button>
            </div>
        </div>
    </div>
);

const EditJdModal = ({ jd, onClose, onSave, setEditingJd }: { jd: JobDescription & { clientId: string }, onClose: () => void, onSave: () => void, setEditingJd: React.Dispatch<React.SetStateAction<(JobDescription & { clientId: string }) | null>> }) => {
    const handleSkillChange = (field: 'primarySkills' | 'secondarySkills', value: string) => {
        setEditingJd(prev => prev ? { ...prev, [field]: value.split(',').map(s => s.trim()) } : null);
    };

    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold">Edit Job Description</h3>
                <button onClick={onClose}><XMarkIcon /></button>
            </div>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" value={jd.name} onChange={(e) => setEditingJd(prev => prev ? { ...prev, name: e.target.value } : null)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Required Experience</label>
                    <input type="text" value={jd.requiredExperience} onChange={(e) => setEditingJd(prev => prev ? { ...prev, requiredExperience: e.target.value } : null)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Skills (comma separated)</label>
                    <textarea value={jd.primarySkills.join(', ')} onChange={(e) => handleSkillChange('primarySkills', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-20"/>
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Secondary Skills (comma separated)</label>
                    <textarea value={jd.secondarySkills.join(', ')} onChange={(e) => handleSkillChange('secondarySkills', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-20"/>
                 </div>
            </div>
             <div className="flex justify-end pt-4 border-t mt-4 space-x-2">
                <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600">Save Changes</button>
            </div>
        </div>
    </div>
)};


export default CompanyAdminDashboard;
