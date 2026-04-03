import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ path: string[] }>
}

export default async function CatchAll({ params }: Props) {
  const { path } = await params
  redirect('/' + path.join('/'))
}
