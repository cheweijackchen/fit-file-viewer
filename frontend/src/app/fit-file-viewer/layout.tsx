import AppLayout from '../components/AppLayout'

export default function FitFileViewerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}
