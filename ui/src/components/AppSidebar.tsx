"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  // {
  //   title: "Inbox",
  //   url: "#",
  //   icon: Inbox,
  // },
  {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
  },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { authUser } = useAuth();
  return (
    <Sidebar className="font-sans w-[280px]">
      <SidebarContent className="py-[35px] px-[5px]">
        <SidebarGroup className="gap-10">
          <SidebarGroupLabel className="h-20">
            <div className="relative pl-2">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#725AF5] to-[#5E97F7] rounded-sm" />
              <div className="flex flex-col pl-2 text-2xl font-semibold transition-all">
                <div className="font-light font-sans">OPEN</div>{" "}
                <div className="font-black bg-gradient-to-r from-[#725AF5] to-[#5E97F7] bg-clip-text text-transparent">
                  SOCIAL MEDIA
                </div>{" "}
                <div className="font-light">AGENT</div>
              </div>
            </div>
          </SidebarGroupLabel>
          <div className="border-t-2 mx-2 border-[#BCD6FB]"></div>
          <SidebarGroupContent className="">
            <SidebarMenu className="mx-2 ">
              {items.map((item) => {
                const isActive = pathname === item.url; // Check if the item is active
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`w-[238px] h-[45px] flex items-center gap-2 ${
                        isActive
                          ? "bg-gradient-to-r from-[#725AF5] to-[#5E97F7] text-white hover:text-white"
                          : "hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mt-auto p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/path-to-avatar.jpg" alt="John Smith" />
              <AvatarFallback>
                {authUser?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {authUser?.name || "User"}
              </span>
            </div>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
