import type { Metadata } from 'next';
import './globals.css';
import './brand-tokens.css';

export const metadata: Metadata = {
  title: 'Pigskin.pro',
  description: 'NFL analysis you can actually use.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
