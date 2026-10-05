import { Title, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

interface Props {
  className: string;
}

export function Banner({ className }: Props) {
  const t = useTranslations('fit-file-viewer')

  return (
    <div className={className}>
      <Text
        tt="uppercase"
        fw="bold"
        mb="sm"
      >{t('banner.title')}</Text>
      <Title className="">
        <span
          style={{ color: 'var(--mantine-color-anchor)' }}
        >{t('banner.heading')}</span>
        <br /> {t('banner.headingLine2')}
      </Title>

      <Text
        c="dimmed"
        mt="md"
        className="max-w-150"
      >
        {t('banner.description')}
      </Text>
    </div>
  )
}
