"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Wallet } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r bg-white/80 backdrop-blur-md "
    >
      <Link href="/">
        <SidebarHeader className="p-5 text-sm  font-semibold tracking-tight border-b">
          Finance
        </SidebarHeader>
      </Link>


      <SidebarContent className="py-4">
        <SidebarGroup>
          <div className="flex flex-col gap-1 px-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black transition"
            >
              <Home size={20} />
              Dashboard
            </Link>

            <Link
              href="/dashboard/transactions"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-lg font-medium hover:bg-gray-900 hover:text-white  dark:hover:bg-gray-100 dark:hover:text-black transition"
            >
              <Wallet size={20} />
              Transactions
            </Link>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
            NP
          </div>

          <Link href="https://balsam-sail-ded.notion.site/Hi-337149aec4798076add7e9a17da10c4d" target="_blank"  rel="noopener noreferrer" className="cursor-pointer">
            <div className="flex flex-col cursor-pointer">
              <span className="text-sm font-medium">Nitin Prajapat</span>
              <span className="text-xs text-muted-foreground">
                nitin@clickme.com
              </span>
            </div>
          </Link>

        </div>


      </SidebarFooter>
    </Sidebar>
  );
}