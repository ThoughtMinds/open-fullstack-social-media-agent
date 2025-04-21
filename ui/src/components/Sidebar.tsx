import React, { useEffect, useState } from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Calendar, Settings } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "next-themes";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { href: "/schedule", label: "Schedule", icon: <Calendar size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

const SideBar = () => {
  const [currentPath, setCurrentPath] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <ShadcnSidebar className="h-full bg-white dark:bg-gray-800 shadow-md border-r dark:border-gray-700 w-55 overflow-hidden">
      <SidebarContent className="p-4 space-y-2 list-none">
        <h2 className="text-lg font-semibold dark:text-gray-100">CopilotKit</h2>
        {menuItems.map(({ href, label, icon }) => (
          <SidebarMenuItem key={href}>
            <div
              className={clsx(
                "flex items-center gap-3 p-1 rounded-lg transition-colors text-sm font-medium",
                {
                  "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400": currentPath === href,
                  "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700": currentPath !== href,
                }
              )}
            >
              {icon}
              {label}
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default SideBar;