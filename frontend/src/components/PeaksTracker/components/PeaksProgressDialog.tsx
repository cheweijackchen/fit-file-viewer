'use client'

import { Badge, Button, Divider, Modal, RingProgress, Select, Switch, Text, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconCrownFilled, IconDownload, IconPawFilled, IconShare, IconStarFilled, IconUser, IconUserFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import html2canvas from 'html2canvas-pro'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import contourBgBottomLeft from '@/assets/contour-map-mount-yun-flipped.webp'
import contourBg from '@/assets/contour-nanyu-mountain.png'
import { getHikerTitle, type HikerTitleStyle, HikerTitleStyleOptions } from '@/constants/hikerTitles'
import { type CompanionType, getAvailableCompanions, getCompanionById } from '@/constants/hikingCompanions'
import { Taiwan100MountainPeak, type MountainPeak } from '@/constants/peaks'
import useScreen from '@/hooks/useScreen'
import { usePeaksStore, usePeaksActions } from '@/store/peaks/usePeaksStore'

interface Props {
  opened: boolean;
  checkedIds: Set<string>;
  onClose: () => void;
}

interface CategoryGroup {
  category: string;
  peaks: {
    id: string;
    peak: MountainPeak;
  }[];
}

function groupPeaksByCategory(): CategoryGroup[] {
  const map = new Map<string, {
    id: string;
    peak: MountainPeak;
  }[]>()

  for (const [id, peak] of Object.entries(Taiwan100MountainPeak)) {
    const list = map.get(peak.category) ?? []
    list.push({
      id,
      peak,
    })
    map.set(peak.category, list)
  }

  return Array.from(map.entries()).map(([category, peaks]) => ({
    category,
    peaks,
  }))
}

const categoryGroups = groupPeaksByCategory()

const titleStyleSelectData = HikerTitleStyleOptions.map(opt => ({
  value: opt.value,
  label: opt.label,
}))

const companionTypeIcons: Record<CompanionType, typeof IconPawFilled> = {
  animal: IconPawFilled,
  mythical: IconCrownFilled,
  hiker: IconUserFilled,
  special: IconStarFilled,
}

const MAX_CANVAS_PIXELS = 16_777_216 // iOS Safari conservative limit
const CANVAS_TIMEOUT_MS = 15_000

function getOptimalScale(element: HTMLElement, overrideWidth?: number): number {
  const width = overrideWidth ?? element.offsetWidth
  const height = element.offsetHeight
  const idealScale = Math.max(window.devicePixelRatio, 2)
  const scaledPixels = width * idealScale * height * idealScale

  if (scaledPixels <= MAX_CANVAS_PIXELS) {
    return idealScale
  }

  const maxSafeScale = Math.sqrt(MAX_CANVAS_PIXELS / (width * height))
  return Math.floor(maxSafeScale * 10) / 10
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('圖片產生逾時，請稍後再試')), ms),
    ),
  ])
}

/**
 * Fix: html2canvas doesn't handle CSS transform on SVG properly.
 * Convert CSS rotate to SVG transform attribute so RingProgress renders correctly.
 */
function fixRingProgressSvgTransformForExport(element: HTMLElement) {
  const svgElements = element.querySelectorAll('svg')
  svgElements.forEach((svg) => {
    const style = window.getComputedStyle(svg)
    const transform = style.transform
    if (transform && transform !== 'none') {
      const width = svg.getAttribute('width') || svg.getBoundingClientRect().width
      const height = svg.getAttribute('height') || svg.getBoundingClientRect().height
      const cx = Number(width) / 2
      const cy = Number(height) / 2

      // Wrap all SVG children in a <g> with the rotation
      // html2canvas can't handle CSS/SVG-root transforms, but <g transform> is SVG-native
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('transform', `rotate(-90, ${cx}, ${cy})`)
      while (svg.firstChild) {
        g.appendChild(svg.firstChild)
      }
      svg.appendChild(g)

      // Remove the CSS transform
      svg.style.setProperty('transform', 'none', 'important')
    }
  })
}

export function PeaksProgressDialog({ opened, checkedIds, onClose }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { onMobile } = useScreen()
  const [exportLoading, setExportLoading] = useState(false)
  const [shareLoading, setShareLoading] = useState(false)
  const [canShare, setCanShare] = useState(false)
  const [titleStyle, setTitleStyle] = useState<HikerTitleStyle | null>(null)
  const [companionId, setCompanionId] = useState<string | null>(null)
  const [useDesktopWidth, setUseDesktopWidth] = useState(false)
  const [useMobileWidth, setUseMobileWidth] = useState(false)

  useEffect(() => {
    if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function') {
      const testFile = new File([], 'test.png', { type: 'image/png' })
      setCanShare(navigator.canShare({ files: [testFile] }))
    }
  }, [])

  const userName = usePeaksStore.use.userName()
  const { setUserName } = usePeaksActions()

  const completedCount = useMemo(() => {
    return Object.keys(Taiwan100MountainPeak).filter(id => checkedIds.has(id)).length
  }, [checkedIds])

  const total = Object.keys(Taiwan100MountainPeak).length
  const percentage = Math.round((completedCount / total) * 100)

  const companionSelectData = useMemo(() => {
    return getAvailableCompanions(completedCount).map(c => ({
      value: c.id,
      label: c.label,
      companionType: c.companionType,
    }))
  }, [completedCount])

  const selectedCompanion = useMemo(() => {
    if (!companionId) {
      return undefined
    }
    return getCompanionById(companionId)
  }, [companionId])

  const currentTitle = useMemo(() => {
    if (!titleStyle) {
      return undefined
    }
    return getHikerTitle(completedCount, titleStyle)
  }, [completedCount, titleStyle])

  const generateCanvas = useCallback(async () => {
    if (!contentRef.current) {
      return null
    }
    const overrideWidth = useMobileWidth ? 375 : (useDesktopWidth ? 768 : undefined)
    const scale = getOptimalScale(contentRef.current, overrideWidth)
    return withTimeout(html2canvas(contentRef.current, {
      scale,
      width: overrideWidth,
      windowWidth: overrideWidth,
      onclone: (_doc, element) => {
        if (overrideWidth) {
          element.style.width = `${overrideWidth}px`
        }
        const footer = element.querySelector('[data-export-footer]')
        footer?.classList.remove('hidden')
        fixRingProgressSvgTransformForExport(element)
      },
    }), CANVAS_TIMEOUT_MS)
  }, [useDesktopWidth, useMobileWidth])

  const getFileName = useCallback(() => {
    return userName ? `${userName}的台灣百岳進度.png` : '台灣百岳進度.png'
  }, [userName])

  const handleExport = useCallback(async () => {
    setExportLoading(true)
    try {
      const canvas = await generateCanvas()
      if (!canvas) {
        return
      }
      const link = document.createElement('a')
      link.download = getFileName()
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      notifications.show({
        title: '下載失敗',
        message: error instanceof Error ? error.message : '圖片下載時發生未知錯誤',
        color: 'red',
      })
    } finally {
      setExportLoading(false)
    }
  }, [generateCanvas, getFileName])

  const handleShare = useCallback(async () => {
    setShareLoading(true)
    try {
      const canvas = await generateCanvas()
      if (!canvas) {
        return
      }
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          b => b ? resolve(b) : reject(new Error('Failed to create blob')),
          'image/png',
        )
      })
      const file = new File([blob], getFileName(), { type: 'image/png' })
      await navigator.share({ files: [file] })
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        notifications.show({
          title: '分享失敗',
          message: error.message,
          color: 'red',
        })
      }
    } finally {
      setShareLoading(false)
    }
  }, [generateCanvas, getFileName])

  return (
    <Modal
      centered
      withCloseButton
      classNames={{
        content: '!overflow-visible !relative',
        header: '!absolute !p-0 !min-h-0 right-0 top-0 z-10 !overflow-visible',
        close: '!absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10 rounded-full !bg-[var(--mantine-color-body)] shadow transition-transform duration-200 hover:translate-x-[calc(50%-2px)] hover:-translate-y-[calc(50%-2px)]',
        body: '!overflow-y-auto !p-0 rounded-lg',
      }}
      styles={{
        body: {
          'max-height': 'calc(100dvh - var(--modal-y-offset) * 2)'
        }
      }}
      opened={opened}
      size="xl"
      padding="lg"
      onClose={onClose}
    >
      <div
        ref={contentRef}
        className="relative overflow-hidden bg-(--mantine-color-body) p-6"
      >
        {/* Contour background decoration */}
        <Image
          alt=""
          className="pointer-events-none absolute -top-4 -right-50 sm:-right-40 md:-right-4 w-95 opacity-8"
          src={contourBg}
        />

        {/* Header */}
        <div className="relative z-10 flex justify-between mb-6 gap-2">
          <div>
            <Text
              fw={700}
              size="xl"
            >
              台灣百岳登頂紀錄
            </Text>
            <Text
              c="dimmed"
              size="sm"
            >
              Taiwan 100 Peaks Progress
            </Text>
          </div>
          {userName && (
            <Badge
              className="flex-none"
              size="xl"
              variant="gradient"
              gradient={{
                from: 'yellow',
                to: 'orange',
              }}
            >
              {userName}
            </Badge>
          )}
        </div>

        {/* Progress */}
        <div className="flex justify-center items-center gap-1 sm:gap-4 mb-8">
          <div
            className={clsx('relative flex-none ml-6', companionId && 'sm:ml-15')}
          >
            {selectedCompanion && (
              <Image
                alt={selectedCompanion.label}
                className="pointer-events-none absolute z-10 max-w-none!"
                src={selectedCompanion.image}
                style={{
                  width: selectedCompanion.width,
                  top: selectedCompanion.positionLeft.top,
                  left: selectedCompanion.positionLeft.left,
                }}
              />
            )}
            <RingProgress
              roundCaps
              label={
                <div className="flex flex-col items-center">
                  <Text
                    c="dimmed"
                    size="xs"
                  >
                    目前進度
                  </Text>
                  <Text
                    fw={700}
                    size="xl"
                  >
                    {completedCount}/{total}
                  </Text>
                </div>
              }
              sections={[{
                value: percentage,
                color: 'yellow',
              }]}
              size={160}
              thickness={14}
            />
          </div>
          {currentTitle && (
            <div className="flex flex-col flex-1 min-w-0">
              <Text
                fw={700}
                size="xl"
              >
                {currentTitle.title}
              </Text>
              <Text
                c="dimmed"
                size="sm"
              >
                {currentTitle.titleEn}
              </Text>
              <Text
                size="xs"
                mt="sm"
              >
                {currentTitle.description}
              </Text>
            </div>
          )}
        </div>

        {/* Form Section - hidden during export */}
        <div
          data-html2canvas-ignore
          className="mb-10 flex flex-col gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4"
        >
          <TextInput
            placeholder="你的名字"
            value={userName}
            leftSection={
              <IconUser
                size={16}
                color="#B0B0B0"
              />
            }
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <Select
            clearable
            placeholder="選擇頭銜風格"
            comboboxProps={{ withinPortal: false }}
            data={titleStyleSelectData}
            value={titleStyle}
            onChange={value => setTitleStyle(value as HikerTitleStyle | null)}
          />
          <Select
            clearable
            placeholder="選擇你的山林夥伴"
            comboboxProps={{ withinPortal: false }}
            data={companionSelectData}
            renderOption={({ option }) => {
              const companion = companionSelectData.find(c => c.value === option.value)
              const Icon = companion ? companionTypeIcons[companion.companionType] : null
              return (
                <div className="flex items-center gap-2">
                  {Icon && <Icon size={14} />}
                  <span>{option.label}</span>
                </div>
              )
            }}
            value={companionId}
            onChange={setCompanionId}
          />
          {onMobile && (
            <Switch
              className="mr-auto"
              classNames={{
                track: '!cursor-pointer',
                input: 'cursor-pointer',
              }}
              label="寬版圖片（適合桌面瀏覽）"
              checked={useDesktopWidth}
              onChange={e => setUseDesktopWidth(e.currentTarget.checked)}
            />
          )}
          <div className="flex justify-end items-center gap-2">
            {!onMobile && (
              <Switch
                className="mr-auto"
                classNames={{
                  track: '!cursor-pointer',
                  input: 'cursor-pointer',
                }}
                label="窄版圖片(適合手機瀏覽)"
                checked={useMobileWidth}
                onChange={e => setUseMobileWidth(e.currentTarget.checked)}
              />
            )}
            <Button
              className="max-md:flex-1"
              disabled={exportLoading || shareLoading}
              leftSection={<IconDownload size={16} />}
              loading={exportLoading}
              variant="filled"
              onClick={handleExport}
            >
              下載圖片
            </Button>
            {canShare && (
              <Button
                className="max-md:flex-1"
                disabled={exportLoading || shareLoading}
                leftSection={<IconShare size={16} />}
                loading={shareLoading}
                variant="outline"
                onClick={handleShare}
              >
                分享圖片
              </Button>
            )}
          </div>
        </div>

        {/* Peaks Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
          {categoryGroups.map(group => (
            <div
              key={group.category}
              className="break-inside-avoid mb-4"
            >
              <Text
                c="dark"
                fw={700}
                size="sm"
              >
                {group.category}
              </Text>
              <Divider className="my-1" />
              <div className="flex flex-col gap-1">
                {group.peaks.map(({ id, peak }) => {
                  const checked = checkedIds.has(id)
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-1.5"
                    >
                      {checked
                        ? (
                          <IconCheck
                            className="text-yellow-500 shrink-0"
                            size={14}
                          />
                        )
                        : <div className="w-3.5 shrink-0" />}
                      <div className="flex flex-1 gap-1 justify-between">
                        <Text
                          c={checked ? undefined : 'dimmed'}
                          fw={checked ? 600 : 400}
                          size="xs"
                        >
                          {peak.name}
                        </Text>
                        <Text
                          c={checked ? undefined : 'dimmed'}
                          fw={checked ? 600 : 400}
                          ff="mono"
                          size="xs"
                        >
                          {peak.elevation}m
                        </Text>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contour background decoration - bottom left */}
        <Image
          alt=""
          className="pointer-events-none absolute -bottom-4 -left-40 sm:-left-20 md:-left-4 w-95 opacity-8"
          src={contourBgBottomLeft}
        />

        {/* Footer - shown only in exported image */}
        <div
          data-export-footer
          className="hidden mt-6 border-t border-gray-200 pt-3 text-center"
        >
          <Text
            c="dimmed"
            size="xs"
          >
            @whitefurjack ・ 哥爬的不是山，是活著的感覺。
          </Text>
        </div>
      </div>
    </Modal>
  )
}
