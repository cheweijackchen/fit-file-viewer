import { Button, Container, Flex } from '@mantine/core'
import { cookies } from 'next/headers'
import { NotFoundBackground } from './components/NotFoundBackground'
import classes from './styles/NotFound.module.css'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/i18n/routing'

const t: Record<Locale, { title: string; description: string; back: string }> = {
  'en-US': {
    title: 'Nothing to see here',
    description: 'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.',
    back: 'Take me back to home page',
  },
  'zh-TW': {
    title: '這裡沒有東西',
    description: '你嘗試開啟的頁面不存在。可能是網址輸入錯誤，或頁面已移至其他位置。如果你認為這是錯誤，請聯絡客服。',
    back: '回到首頁',
  },
}

export default async function NotFound() {
  const raw = (await cookies()).get('NEXT_LOCALE')?.value
  const locale = (raw && (LOCALES as readonly string[]).includes(raw) ? raw : DEFAULT_LOCALE) as Locale
  const msg = t[locale]

  return (
    <Container className="py-20">
      <div className="relative">
        <NotFoundBackground className={`${classes.image} absolute opacity-75`} />
        <div className="relative pt-30 sm:pt-55">
          <h1 className="text-3xl sm:text-5xl text-center font-bold">{msg.title}</h1>
          <p className="max-w-xl m-auto mt-6 mb-9 text-lg text-[#828282] text-center">
            {msg.description}
          </p>
          <Flex justify="center">
            <Button
              component="a"
              href="/"
              size="md"
            >
              {msg.back}
            </Button>
          </Flex>
        </div>
      </div>
    </Container>
  )
}
