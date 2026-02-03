import { Stack } from '@mantine/core'

interface Props {
  title: string;
  unit?: string;
  hiddenUnit?: boolean;
  align?: 'left' | 'right' | 'center';
}

export function ColumnTitleWithUnit(props: Props) {
  return (
    <Stack
      align={props.align ?? 'center'}
      gap={0}
    >
      <div>{props.title}</div>
      {!props.hiddenUnit && <div className="h-5 font-normal">{props.unit && `(${props.unit})`}</div>}
    </Stack>
  )
}
