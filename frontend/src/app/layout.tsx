import '@mantine/core/styles.css';
// import other mantine extension styles after core package styles
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import {
  ColorSchemeScript,
  mantineHtmlProps,
} from '@mantine/core';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { RootProvider } from './components/RootProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FitFileViewer',
  description: 'View the raw content of your fit file.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
