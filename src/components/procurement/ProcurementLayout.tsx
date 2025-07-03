"use client";

import { ReactNode, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  Home
} from "lucide-react";

interface ProcurementLayoutProps {
  children: ReactNode;
}

export default function ProcurementLayout({ children }: ProcurementLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentPath, setCurrentPath] = useState("/");
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/", current: currentPath === "/" },
    { name: "Purchase Orders", icon: ShoppingCart, href: "/orders", current: currentPath === "/orders" },
    { name: "Suppliers", icon: Users, href: "/suppliers", current: currentPath === "/suppliers" },
    { name: "Inventory", icon: Package, href: "/inventory", current: currentPath === "/inventory" },
    { name: "Budget", icon: DollarSign, href: "/budget", current: currentPath === "/budget" },
    { name: "Reports", icon: FileText, href: "/reports", current: currentPath === "/reports" },
    { name: "Calendar", icon: Calendar, href: "/calendar", current: currentPath === "/calendar" },
  ];

  const notifications = [
    { id: 1, message: "New purchase order requires approval", type: "urgent" },
    { id: 2, message: "Budget threshold reached for Q1", type: "warning" },
    { id: 3, message: "Supplier payment due tomorrow", type: "info" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-lg">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">ProcureFlow</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 bg-white px-2 py-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPath(item.href);
                    window.history.pushState({}, '', item.href);
                    window.location.href = item.href;
                  }}
                  className={`${
                    item.current
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium border-l-4`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">ProcureFlow</h1>
          </div>
          <nav className="flex-1 space-y-1 bg-white px-2 py-4">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPath(item.href);
                  setIsMobileMenuOpen(false);
                  window.history.pushState({}, '', item.href);
                  window.location.href = item.href;
                }}
                className={`${
                  item.current
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium border-l-4`}
              >
                <item.icon
                  className={`${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center flex-1">
              <div className="ml-12 md:ml-0">
                <h2 className="text-2xl font-bold text-gray-900">Procurement Dashboard</h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Settings */}
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>

              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Procurement Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 