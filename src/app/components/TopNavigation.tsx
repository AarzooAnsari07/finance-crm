import { Bell, ChevronDown, User, Settings, Lock, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import logoImage from 'figma:asset/cd322dbdbd22d2857e84f2773e6f3c957844dfd9.png';

interface TopNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function TopNavigation({ currentPage, onNavigate }: TopNavigationProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leads', label: 'Leads' },
    { id: 'eligibility', label: 'Eligibility Checker' },
    { id: 'company', label: 'Company Checker' },
    { id: 'pincode', label: 'PIN Code Checker' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="Finance CRM" className="h-10" />
            </div>

            {/* Menu Items */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 pl-3 border-l hover:bg-gray-50 rounded-md px-2 py-1 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                      AA
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">Aarzoo Ansari</p>
                    <p className="text-xs text-gray-500">CEO · Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer" onClick={() => onNavigate('my-profile')}>
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onNavigate('account-settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onNavigate('change-password')}>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => alert('Logging out...')}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}