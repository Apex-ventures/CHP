
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
  LogOutIcon,
  Settings2Icon,
  UserIcon,
  UsersIcon,
  FileTextIcon,
  BarChartIcon,
  ClockIcon,
  PillIcon,
  PackageIcon,
  MessageSquareIcon,
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  const menuItems = {
    patient: [
      { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
      { icon: CalendarIcon, label: 'Appointments', path: '/appointments' },
      { icon: FileTextIcon, label: 'Medical Records', path: '/medical-records' },
      { icon: BarChartIcon, label: 'Reports', path: '/reports' },
      { icon: UserIcon, label: 'Profile', path: '/profile' },
    ],
    receptionist: [
      { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
      { icon: UsersIcon, label: 'Patients', path: '/patients' },
      { icon: CalendarIcon, label: 'Appointments', path: '/appointments' },
      { icon: ClockIcon, label: 'Schedule', path: '/schedule' },
      { icon: UserIcon, label: 'Profile', path: '/profile' },
    ],
    clinician: [
      { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
      { icon: UsersIcon, label: 'Patients', path: '/patients' },
      { icon: CalendarIcon, label: 'Appointments', path: '/appointments' },
      { icon: ClipboardIcon, label: 'Medical Records', path: '/medical-records' },
      { icon: PillIcon, label: 'Prescriptions', path: '/prescriptions' },
      { icon: BarChartIcon, label: 'Reports', path: '/reports' },
      { icon: UserIcon, label: 'Profile', path: '/profile' },
    ],
    pharmacy: [
      { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
      { icon: PillIcon, label: 'Medications', path: '/medications' },
      { icon: PackageIcon, label: 'Inventory', path: '/inventory' },
      { icon: ClipboardIcon, label: 'Prescriptions', path: '/prescriptions' },
      { icon: MessageSquareIcon, label: 'Messages', path: '/messages' },
      { icon: UserIcon, label: 'Profile', path: '/profile' },
    ],
  };

  const roleItems = menuItems[user.role] || [];

  return (
    <SidebarComponent>
      <SidebarHeader className="py-6">
        <div className="flex flex-col items-center space-y-2 px-4">
          <div className="text-xl font-bold">MedicalApp</div>
          <div className={cn('text-xs pill', {
            'bg-blue-100 text-blue-800': user.role === 'patient',
            'bg-purple-100 text-purple-800': user.role === 'receptionist',
            'bg-green-100 text-green-800': user.role === 'clinician',
            'bg-orange-100 text-orange-800': user.role === 'pharmacy',
          })}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-6">
        <SidebarMenu>
          {roleItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                className={cn({
                  'bg-sidebar-accent text-sidebar-accent-foreground': isActive(item.path),
                })}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenuButton
          onClick={logout}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOutIcon className="h-4 w-4 mr-3" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
