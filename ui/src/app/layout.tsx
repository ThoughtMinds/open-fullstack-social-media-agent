import "./globals.css";
import { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@copilotkit/react-ui/styles.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <CopilotKit 
        runtimeUrl="/api/copilotkit"
        showDevConsole={false}
        
        
        >
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarTrigger />
              {children}
            </ThemeProvider>
          </SidebarProvider>
        </CopilotKit>
        </AuthProvider>
      </body>
    </html>
  );
}
