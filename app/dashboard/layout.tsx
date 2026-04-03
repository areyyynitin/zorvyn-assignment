"use client";

import { AppSidebar } from "@/components/App-sidebar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
      
        <AppSidebar />

        <main className="flex-1">
          <div className="p-4 border-b flex items-center justify-between gap-4">
            <SidebarTrigger />
             <AnimatedThemeToggler className="h-5 w-5" />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}