import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Pigskin.pro — Professional Fantasy Intelligence',
    template: '%s · Pigskin.pro',
  },
  description:
    'Front-office style NFL and fantasy football analysis. Verified research, rolled out division by division. Built by Pigskin Professionals.',
  applicationName: 'Pigskin.pro',
  authors: [{ name: 'Pigskin Professionals' }],
  metadataBase: new URL('https://pigskin.pro'),
  openGraph: {
    title: 'Pigskin.pro — Professional Fantasy Intelligence',
    description:
      'Front-office style NFL and fantasy football analysis. Verified research. Built by Pigskin Professionals.',
    url: 'https://pigskin.pro',
    siteName: 'Pigskin.pro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pigskin.pro — Professional Fantasy Intelligence',
    description: "We don't have takes. We have reads.",
    site: '@pigskindotpro',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts loaded via <link> for portability across build envs.
            To switch to next/font (preloaded, self-hosted), see README. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-bebas: 'Bebas Neue';
            --font-inter: 'Inter';
            --font-jetbrains: 'JetBrains Mono';
          }
        `}</style>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:text-midnight focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
