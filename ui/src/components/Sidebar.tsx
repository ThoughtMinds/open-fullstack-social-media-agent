// import React from 'react'
// import { 
//     Sidebar as ShadcnSidebar,
//     SidebarContent,
//     SidebarMenuItem,
//     SidebarTrigger,
//   } from "@/components/ui/sidebar";

// const SideBar = () => {
//   return (
//         <ShadcnSidebar>
//           <SidebarTrigger />
//           <SidebarContent>
//             <SidebarMenuItem>
//               <a href="/dashboard">Dashboard</a>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <a href="/schedule">Schedule</a>
//             </SidebarMenuItem>
//             <SidebarMenuItem>
//               <a href="/settings">Settings</a>
//             </SidebarMenuItem>
//           </SidebarContent>
//         </ShadcnSidebar>
//   )
// }

// export default SideBar


// import React from 'react'
// import { 
//     Sidebar as ShadcnSidebar,
//     SidebarContent,
//     SidebarMenuItem,
//     SidebarTrigger,
// } from "@/components/ui/sidebar";

// const SideBar = () => {
//   return (
//     <ShadcnSidebar className="h-full">
//       <SidebarTrigger className="p-4" />
//       <SidebarContent className="p-2">
//         <SidebarMenuItem>
//           <a href="/dashboard" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</a>
//         </SidebarMenuItem>
//         <SidebarMenuItem>
//           <a href="/schedule" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">Schedule</a>
//         </SidebarMenuItem>
//         <SidebarMenuItem>
//           <a href="/settings" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">Settings</a>
//         </SidebarMenuItem>
//       </SidebarContent>
//     </ShadcnSidebar>
//   )
// }

// export default SideBar



// 'use client';

// import React, { useEffect, useState } from "react";
// import {
//   Sidebar as ShadcnSidebar,
//   SidebarContent,
//   SidebarMenuItem,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Home, Calendar, Settings } from "lucide-react";
// import clsx from "clsx";

// const menuItems = [
//   { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
//   { href: "/schedule", label: "Schedule", icon: <Calendar size={18} /> },
//   { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
// ];

// const SideBar = () => {
//   const [currentPath, setCurrentPath] = useState<string>("");

//   useEffect(() => {
//     setCurrentPath(window.location.pathname);
//   }, []);

//   return (
//     <ShadcnSidebar className="h-full bg-white shadow-md border-r">
//       <SidebarTrigger className="p-4 md:hidden" />

//       <SidebarContent className="p-4 space-y-2 list-none">
//         <h2>CopilotKit</h2>
//         {menuItems.map(({ href, label, icon }) => (
//           <SidebarMenuItem key={href}>
//             <a
//               href={href}
//               className={clsx(
//                 "flex items-center gap-3 p-1 rounded-lg transition-colors text-sm font-medium",
//                 {
//                   "bg-gray-100 text-blue-600": currentPath === href,
//                   "text-gray-700 hover:bg-gray-50": currentPath !== href,
//                 }
//               )}
//             >
//               {icon}
//               {label}
//             </a>
//           </SidebarMenuItem>
//         ))}
//       </SidebarContent>
//     </ShadcnSidebar>
//   );
// };

// export default SideBar;

'use client';

// import React, { useEffect, useState } from "react";
// import {
//   Sidebar as ShadcnSidebar,
//   SidebarContent,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { Home, Calendar, Settings } from "lucide-react";
// import clsx from "clsx";
// import { useTheme } from "next-themes";

// const menuItems = [
//   { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
//   { href: "/schedule", label: "Schedule", icon: <Calendar size={18} /> },
//   { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
// ];

// const SideBar = () => {
//   const [currentPath, setCurrentPath] = useState<string>("");

//   useEffect(() => {
//     setCurrentPath(window.location.pathname);
//   }, []);

//   return (
//     <ShadcnSidebar className="h-full bg-white shadow-md border-r w-55 overflow-hidden">
//       <SidebarContent className="p-4 space-y-2 list-none">
//         <h2 className="text-lg font-semibold">CopilotKit</h2>
//         {menuItems.map(({ href, label, icon }) => (
//           <SidebarMenuItem key={href}>
//             <div
//             //   href={href}
//               className={clsx(
//                 "flex items-center gap-3 p-1 rounded-lg transition-colors text-sm font-medium",
//                 {
//                   "bg-gray-100 text-blue-600": currentPath === href,
//                   "text-gray-700 hover:bg-gray-50": currentPath !== href,
//                 }
//               )}
//             >
//               {icon}
//               {label}
//             </div>
//           </SidebarMenuItem>
//         ))}
//       </SidebarContent>
//     </ShadcnSidebar>
//   );
// };

// export default SideBar;


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