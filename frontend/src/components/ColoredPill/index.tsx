'use client'

import { Badge, CloseButton } from '@mantine/core'
import type { BadgeVariant, MantineColor, MantineRadius, MantineSize } from '@mantine/core'

interface Props {
  c?: MantineColor;
  color?: MantineColor;
  radius?: MantineRadius;
  size?: MantineSize;
  variant?: BadgeVariant;
  clearable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function ColoredPill({
  c, color, radius = 'xl', size = 'md', variant = 'filled', clearable = false, onRemove, children,
}: Props) {
  return (
    <Badge
      color={color}
      c={c}
      radius={radius}
      variant={variant}
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
