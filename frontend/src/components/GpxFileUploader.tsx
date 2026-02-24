import { useCallback, useState } from 'react'

interface GpxFileUploaderProps {
  onFile: (file: File) => void;
  isParsing: boolean;
}

export function GpxFileUploader({ onFile, isParsing }: GpxFileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith('.gpx')) {
        return
      }
      onFile(file)
    },
    [onFile],
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const onDragLeave = useCallback(() => setIsDragOver(false), [])

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
      // Reset so the same file can be re-uploaded
      e.target.value = ''
    },
    [handleFile],
  )

  return (
    <label
      className={`
        flex flex-col items-center justify-center gap-3
        border-2 border-dashed rounded-lg p-8 cursor-pointer
        transition-all duration-200 text-center select-none
        ${isDragOver
          ? 'border-[var(--color-accent)] bg-blue-500/10'
          : 'border-[var(--color-border)] hover:border-[var(--color-accent-hover)] bg-[var(--color-surface)]'
        }
        ${isParsing ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input
        type="file"
        accept=".gpx"
        className="sr-only"
        disabled={isParsing}
        onChange={onInputChange}
      />

      <div className="text-3xl">
        {isParsing ? '⏳' : isDragOver ? '📂' : '🗺️'}
      </div>

      <div className="text-sm text-[var(--color-text-primary)] font-semibold">
        {isParsing ? '解析中...' : '上傳 GPX 檔案'}
      </div>

      <div className="text-xs text-[var(--color-text-secondary)]">
        {isParsing
          ? '請稍候'
          : '拖曳檔案至此處，或點擊選擇'}
      </div>

      {!isParsing && (
        <div className="text-xs text-[var(--color-text-secondary)] opacity-60">
          支援 .gpx 格式
        </div>
      )}
    </label>
  )
}
