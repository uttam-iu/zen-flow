import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Toolbar from "@/components/ui/Toolbar";

const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", raleway.variable)}
    >
      <body className="min-h-full flex flex-col overflow-hidden">
        <div className="relative">
<Toolbar/>
        <div className="overflow-auto p-1" style={{height: `calc(100vh - 48px)`}}>
          {children}
        </div>
        </div>
        
      </body>
    </html>
  );
}
