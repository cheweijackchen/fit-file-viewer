import { Button, Divider, Flex, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUpload } from '@tabler/icons-react'
import { FitFileUploader } from '@/components/FitFileUploader'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { useFitDataStoreBase } from '@/store/app/useFitDataStore'

export function AppHeader() {
  const hasFitData = useFitDataStoreBase(state => !!state.fitData)
  const [isFitFileUploaderOpened, { open: openFitFileUploaderModal, close: closeFitFileUploaderModal }] = useDisclosure(false)

  return (
    <>
      <Group
        h="100%"
        justify="space-between"
      >
        <Flex
          align="center"
          gap={16}
        >
          <Text
            ff="mono"
            fz="lg"
            fw="bold"
          >FitFileViewer</Text>
        </Flex>
        <Flex
          align="center"
          gap="xs"
        >
          <ThemeSwitch></ThemeSwitch>
          {
            hasFitData &&
            <Button
              px="xs"
              onClick={openFitFileUploaderModal}
            >
              <IconUpload></IconUpload>
              <span className="hidden md:block ml-2">Upload New File</span>
            </Button>
          }
        </Flex>
      </Group>
      <Modal
        centered
        opened={isFitFileUploaderOpened}
        onClose={closeFitFileUploaderModal}
      >
        <FitFileUploader onSuccess={closeFitFileUploaderModal}></FitFileUploader>
      </Modal >
      <Divider></Divider>
    </>
  )
}
