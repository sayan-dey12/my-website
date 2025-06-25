import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';


export const metadata = {
  title: "Sayan's Portfolio",
  description: "Blog, Projects, and Video Call Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <AuthProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        <div><Toaster/></div>

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
