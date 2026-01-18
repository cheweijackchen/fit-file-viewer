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
import { Inter, Noto_Sans_TC, JetBrains_Mono } from 'next/font/google';
import { RootProvider } from './components/RootProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-tc',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-jetbrains-mono'
})

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
        className={`${inter.variable} ${notoSansTC.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
