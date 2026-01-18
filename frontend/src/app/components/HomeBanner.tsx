import { Title, Text } from '@mantine/core';

interface Props {
  className: string;
}

export function HomeBanner({ className }: Props) {
  return (
    <div className={className}>
      <Text className="mb-3">Fit File Viewer</Text>
      <Title className="">
        <span
          style={{ color: 'var(--mantine-color-anchor)' }}
        >Analyze and Visualize</span>
        <br /> Your Activity Data
      </Title>

      <Text
        c="dimmed"
        mt="md"
        className="max-w-150"
      >
        A reliable tool for analyzing and visualizing your activity data.
        View detailed metrics, track performance, and explore your workouts
        with precision and clarity.
      </Text>
    </div>
  )
}
