import { Center, Container, Text, Title } from '@mantine/core'
import { IconBarrierBlock } from '@tabler/icons-react'
import AppLayout from './components/AppLayout'

export default function LandingPage() {
  return (
    <AppLayout>
      <Container
        size="sm"
        className="py-40"
      >
        <Center>
          <div className="text-center">
            <IconBarrierBlock
              size={64}
              stroke={1.5}
              color="var(--mantine-color-yellow-5)"
              className="mx-auto mb-4"
            />
            <Title order={2}>
              Under Construction
            </Title>
            <Text
              c="dimmed"
              mt="md"
            >
              We are working on a brand new landing page. Stay tuned!
            </Text>
          </div>
        </Center>
      </Container>
    </AppLayout>
  )
}
