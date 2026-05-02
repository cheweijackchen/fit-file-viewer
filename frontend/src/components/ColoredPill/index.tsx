'use client'

import { Badge, CloseButton } from '@mantine/core'
import type { MantineColor, MantineRadius, MantineSize } from '@mantine/core'

interface Props {
  c?: MantineColor;
  color?: MantineColor;
  radius?: MantineRadius;
  size?: MantineSize;
  clearable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function ColoredPill({
  c, color, radius = 'xl', size = 'md', clearable = false, onRemove, children,
}: Props) {
  return (
    <Badge
      color={color}
      c={c}
      radius={radius}
      variant="light"
      size={size}
      classNames={{ label: 'normal-case' }}
      rightSection={
        clearable ? (
          <CloseButton
            size="xs"
            variant="transparent"
            className="text-(--mantine-color-gray-4) hover:text-(--mantine-color-gray-7)"
            onClick={(e) => {
              e.stopPropagation(); onRemove?.() 
            }}
          />
        ) : undefined
      }
    >
      {children}
    </Badge>
  )
}
