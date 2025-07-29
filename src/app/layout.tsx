import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import ToasterClient from "@/components/ToasterClient";


export const metadata = {
  title: 'Sayan Dey | TechWithStrider | Developer Portfolio',
  description: 'Official website of Sayan Dey aka Strider — a full-stack developer and student exploring AI, web dev, and blogging at TechWithStrider.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="google-site-verification" content="4Lpav6jpVRVtTbQDoHUjTgd4yeVPSScXYgc4pCmridE" />
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <AuthProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
       <ToasterClient />
       <main className="flex-grow">
      {children}
      </main>
        <Footer />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
