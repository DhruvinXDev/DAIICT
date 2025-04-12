import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  Calendar, 
  Settings,
  Bell,
  LogOut,
  Plus
} from 'lucide-react';
import { authService } from '../services/authService';

interface LayoutProps {
  userRole: 'student' | 'mentor';
}

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
  description?: string;
  roleSpecific?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ userRole }) => {
  const location = useLocation();

  const getNavigationItems = (role: 'student' | 'mentor'): NavigationItem[] => {
    const baseNavigation: NavigationItem[] = [
      { 
        icon: LayoutDashboard, 
        label: 'Dashboard', 
        path: '/dashboard',
        description: role === 'mentor' ? '+ Upcoming Webinar Management' : undefined
      },
      { 
        icon: FileText, 
        label: 'Resume Builder', 
        path: '/dashboard/resume' 
      },
      { 
        icon: Video, 
        label: 'Interview Prep', 
        path: '/dashboard/interview' 
      },
      { 
        icon: Users, 
        label: 'Mentors', 
        path: '/dashboard/mentors',
        description: role === 'mentor' ? '+ Post/Edit mentor profile' : 'View mentors'
      },
      { 
        icon: Calendar, 
        label: 'Webinars', 
        path: '/dashboard/webinars',
        description: role === 'mentor' ? '+ Create/Edit webinar events' : 'Register'
      },
      { 
        icon: Settings, 
        label: 'Settings', 
        path: '/dashboard/settings' 
      },
    ];

    return baseNavigation;
  };

  const navigation = getNavigationItems(userRole);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">CareerVerse</h1>
          <p className="mt-2 text-sm text-gray-600">
            {userRole === 'mentor' ? 'Mentor Portal' : 'Student Portal'}
          </p>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5" />
                <span className="ml-3">{item.label}</span>
              </div>
              {item.description && (
                <span className="mt-1 ml-8 text-xs text-gray-500">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {userRole === 'mentor' ? 'Mentor Dashboard' : 'Student Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              {userRole === 'mentor' && (
                <button 
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Webinar
                </button>
              )}
              <button className="p-2 text-gray-600 hover:text-indigo-600">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;