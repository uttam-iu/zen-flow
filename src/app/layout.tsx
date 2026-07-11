import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Toolbar from "@/components/ui/Toolbar";
import { cookies } from "next/headers";

const raleway = Raleway({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZenFlow",
  description: "Manage Your Task...",
};

// const isLoggedIn =false;

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const isLoggedIn = !!token;

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", raleway.variable)}
    >
      <body className="min-h-full flex flex-col overflow-hidden">
        {isLoggedIn ? (
          <div className="flex min-h-screen">
            <aside id='left-side-bar' className="w-64 bg-white border-r-1 p-4 hidden">
              <nav className="space-y-2">
                <a href="/dashboard" className="block p-2 hover:bg-teal-800 hover:text-white rounded">Dashboard</a>
                <a href="/profile" className="block p-2 hover:bg-teal-800 hover:text-white rounded">Profile</a>
              </nav>
            </aside>
            <main className="flex-1 bg-slate-50">
              <div className="relative">
                <Toolbar />
                <div className="overflow-auto p-1" style={{ height: `calc(100vh - 48px)` }}>
                  {children}
                </div>
              </div>
            </main>
          </div>
        ) : (
          <div className="min-h-screen bg-background">{children}</div>
        )}
      </body>

    </html>
  );
}
