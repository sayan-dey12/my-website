import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import ToasterClient from "@/components/ToasterClient";


export const metadata = {
  title: 'Sayan Dey | TechWithStrider | Developer Portfolio',
  description:
    'Official website of Sayan Dey aka Strider — a full-stack developer and student exploring AI, web dev, and blogging at TechWithStrider.',
  metadataBase: new URL("https://techwithstrider.vercel.app"),
  openGraph: {
    title: 'Sayan Dey | TechWithStrider | Developer Portfolio',
    description:
      'Official website of Sayan Dey aka Strider — a full-stack developer and student exploring AI, web dev, and blogging at TechWithStrider.',
    url: 'https://techwithstrider.vercel.app',
    siteName: 'TechWithStrider',
    images: [
      {
        url: '/og-image.png', // put this image inside the /public folder
        width: 1200,
        height: 630,
        alt: 'TechWithStrider – Sayan Dey',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayan Dey | TechWithStrider',
    description:
      'Official portfolio and blog of Sayan Dey aka Strider – full-stack development, AI, open source, and more.',
    images: ['/og-image.png'],
    creator: '@sayan_dey12', // Optional: Your Twitter handle
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
              <meta name="google-site-verification" content="4Lpav6jpVRVtTbQDoHUjTgd4yeVPSScXYgc4pCmridE" />
              <meta name="msvalidate.01" content="0C04C46F043F2DB19A97267E3D33D321" />
      </head>
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
