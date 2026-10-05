import { IconBolt } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export function QuickJumpButton({ onClick, disabled = false }: Props) {
  const t = useTranslations('hiking-trail-planner')
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-(--mantine-color-yellow-5) bg-(--mantine-color-stone-1) hover:border-(--mantine-color-yellow-6) hover:bg-(--mantine-color-stone-1)/75 px-3 py-2 ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
      onClick={onClick}
    >
      <IconBolt
        size={14}
        stroke={2}
        color="var(--mantine-color-yellow-6)"
      />
      <span className="text-sm font-semibold text-(--mantine-color-yellow-7)">
        {t('planDetail.dayPlanCard.quickJump.title')}
      </span>
    </button>
  )
}
