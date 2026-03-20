'use client'

import { IconRotate } from '@tabler/icons-react'

interface Props {
  onClear: () => void;
}

export function PeaksHeader({ onClear }: Props) {
  function handleClear() {
    if (window.confirm('確定要清除所有勾選紀錄嗎？')) {
      onClear()
    }
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <h1
          className="text-[28px] font-semibold"
          style={{
            letterSpacing: -1,
            color: '#1A1A1A'
          }}
        >
          台灣百岳
        </h1>
        <span
          className="text-[13px]"
          style={{ color: '#8C8C8C' }}
        >
          Taiwan 100 Peaks Tracker
        </span>
      </div>
      <button
        className="flex items-center gap-1.5 rounded px-3.5 py-1.5 text-xs font-medium cursor-pointer"
        style={{
          backgroundColor: '#F5F5F3',
          color: '#8C8C8C'
        }}
        onClick={handleClear}
      >
        <IconRotate size={14} />
        清除紀錄
      </button>
    </div>
  )
}
