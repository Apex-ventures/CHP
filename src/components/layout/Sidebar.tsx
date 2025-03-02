
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  BarChart3, 
  User, 
  PanelLeft,
  Home,
  LucideIcon,
  Pill,
  PackageOpen,
  FileText,
  MessageSquare,
  ShieldAlert,
  Settings,
  UserCog,
  FileBarChart,
  ActivityLog
} from 'lucide-react';

interface SidebarNavItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
  disabled?: boolean;
}

const SidebarNavItem = ({ icon: Icon, title, href, disabled }: SidebarNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <Link 
      to={disabled ? '#' : href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-muted text-muted-foreground hover:text-foreground',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

interface NavGroupProps {
  title: string;
  items: SidebarNavItemProps[];
}

const NavGroup = ({ title, items }: NavGroupProps) => {
  return (
    <div className="pb-4">
      <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="space-y-1 px-1">
        {items.map((item, index) => (
          <SidebarNavItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const { user } = useAuth();

  // Common items for all users
  const commonNavItems: SidebarNavItemProps[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: User
    }
  ];
  
  // Patient management for clinicians and receptionists
  const patientNavItems: SidebarNavItemProps[] = [
    {
      title: 'Patients',
      href: '/patients',
      icon: Users
    },
    {
      title: 'Appointments',
      href: '/appointments',
      icon: Calendar
    },
    {
      title: 'Medical Records',
      href: '/medical-records',
      icon: ClipboardList
    }
  ];

  // Pharmacy items for pharmacy staff
  const pharmacyNavItems: SidebarNavItemProps[] = [
    {
      title: 'Medications',
      href: '/medications',
      icon: Pill
    },
    {
      title: 'Inventory',
      href: '/inventory',
      icon: PackageOpen
    },
    {
      title: 'Prescriptions',
      href: '/prescriptions',
      icon: FileText
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: MessageSquare
    }
  ];
  
  // Admin items for administrators
  const adminNavItems: SidebarNavItemProps[] = [
    {
      title: 'Admin Dashboard',
      href: '/admin',
      icon: ShieldAlert
    },
    {
      title: 'Hospital Statistics',
      href: '/admin/statistics',
      icon: FileBarChart
    },
    {
      title: 'User Management',
      href: '/admin/users',
      icon: UserCog
    },
    {
      title: 'System Settings',
      href: '/admin/settings',
      icon: Settings
    },
    {
      title: 'Audit Logs',
      href: '/admin/audit',
      icon: ActivityLog
    }
  ];

  // Common for all users
  const reportingNavItems: SidebarNavItemProps[] = [
    {
      title: 'Reports',
      href: '/reports',
      icon: BarChart3
    }
  ];

  return (
    <div className="hidden border-r bg-background lg:block">
      <div className="flex flex-col gap-2 h-[calc(100vh-3.5rem)]">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <PanelLeft className="h-6 w-6" />
            <span>Medical App</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-4 py-3">
          <NavGroup title="Navigation" items={commonNavItems} />
          
          {/* Show patient management for clinicians and receptionists */}
          {(user?.role === 'clinician' || user?.role === 'receptionist' || user?.role === 'admin') && (
            <NavGroup title="Patient Management" items={patientNavItems} />
          )}
          
          {/* Show pharmacy items for pharmacy staff */}
          {(user?.role === 'pharmacy' || user?.role === 'admin') && (
            <NavGroup title="Pharmacy" items={pharmacyNavItems} />
          )}
          
          {/* Show admin section for administrators */}
          {user?.role === 'admin' && (
            <NavGroup title="Administration" items={adminNavItems} />
          )}
          
          {/* Reports available to all staff */}
          {user?.role !== 'patient' && (
            <NavGroup title="Reporting" items={reportingNavItems} />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
