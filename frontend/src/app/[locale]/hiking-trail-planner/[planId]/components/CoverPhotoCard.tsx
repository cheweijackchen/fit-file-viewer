'use client'

import { ActionIcon, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

interface Props {
  coverPhoto?: string;
  isEditing: boolean;
  onUpload: (photo: string) => void;
  onRemove: () => void;
}

const MAX_SIZE_BYTES = 3 * 1024 * 1024
const MAX_WIDTH = 800

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width)
          width = MAX_WIDTH
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context unavailable')); return 
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.onerror = reject
      img.src = dataUrl
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function CoverPhotoCard({ coverPhoto, isEditing, onUpload, onRemove }: Props) {
  const t = useTranslations('hiking-trail-planner')
  const changeInputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    const compressed = await compressImage(file)
    onUpload(compressed)
  }

  function handleChangeInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      void handleFile(file)
    }
    e.target.value = ''
  }

  if (coverPhoto) {
    return (
      <div className="flex flex-col gap-3">
        <Text
          size="xs"
          fw={700}
          c="stone.5"
          className="tracking-[0.08em]"
        >
          {t('planDetail.sections.coverPhoto')}
        </Text>
        <div className="relative group rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPhoto}
            alt={t('planDetail.coverPhoto.alt')}
            className="w-full h-[180px] object-cover block"
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end gap-2 p-2">
              <ActionIcon
                size={36}
                radius="xl"
                variant="white"
                c="stone.7"
                title={t('planDetail.coverPhoto.change')}
                onClick={() => changeInputRef.current?.click()}
              >
                <IconPencil size={16} />
              </ActionIcon>
              <ActionIcon
                size={36}
                radius="xl"
                variant="white"
                c="red.6"
                title={t('planDetail.coverPhoto.remove')}
                onClick={onRemove}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          )}
        </div>
        {isEditing && (
          <input
            ref={changeInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeInputChange}
          />
        )}
      </div>
    )
  }

  if (!isEditing) {
    return null
  }

  return (
    <div className="flex flex-col gap-3">
      <Text
        size="xs"
        fw={700}
        c="stone.5"
        className="tracking-[0.08em]"
      >
        {t('planDetail.sections.coverPhoto')}
      </Text>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        maxSize={MAX_SIZE_BYTES}
        maxFiles={1}
        bd="1.5px dashed var(--mantine-color-stone-4)"
        bg="stone.0"
        radius="md"
        className="hover:bg-(--mantine-color-stone-1) transition-colors"
        onDrop={(files) => void handleFile(files[0])}
      >
        <div className="flex flex-col items-center gap-2 py-7 pointer-events-none">
          <Text
            size="sm"
            c="stone.5"
          >
            {t('planDetail.coverPhoto.placeholder')}
          </Text>
        </div>
      </Dropzone>
    </div>
  )
}
