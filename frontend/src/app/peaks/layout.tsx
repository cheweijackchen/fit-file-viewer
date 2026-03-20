import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '台灣百岳追蹤器',
  description: '追蹤你的台灣百岳攀登進度',
}

export default function PeaksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  )
}
