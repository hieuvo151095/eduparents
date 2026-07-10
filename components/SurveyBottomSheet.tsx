"use client"

import { useEffect, useRef, useState } from "react"
import { ClipboardList, X } from "lucide-react"

const SNOOZE_KEY = "eco_survey_snooze_until"
const SNOOZE_DAYS = 14

export function shouldShowSurveySheet(): boolean {
  if (typeof window === "undefined") return false
  const raw = localStorage.getItem(SNOOZE_KEY)
  if (!raw) return true
  return Date.now() > parseInt(raw, 10)
}

export function snoozeSurveySheet() {
  const until = Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000
  localStorage.setItem(SNOOZE_KEY, String(until))
}

interface Props {
  isOpen: boolean
  onConfirm: () => void   // "Làm khảo sát"
  onSnooze: () => void    // "Nhắc tôi sau" / swipe / tap outside
}

export default function SurveyBottomSheet({ isOpen, onConfirm, onSnooze }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const dragStartY = useRef<number | null>(null)
  const isDragging = useRef(false)

  // Reset drag offset when sheet opens
  useEffect(() => {
    if (isOpen) setTranslateY(0)
  }, [isOpen])

  // Touch drag-down to dismiss
  function onTouchStart(e: React.TouchEvent) {
    dragStartY.current = e.touches[0].clientY
    isDragging.current = true
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isDragging.current || dragStartY.current === null) return
    const delta = e.touches[0].clientY - dragStartY.current
    if (delta > 0) setTranslateY(delta)
  }

  function onTouchEnd() {
    isDragging.current = false
    if (translateY > 80) {
      // Swiped far enough — dismiss
      setTranslateY(0)
      onSnooze()
    } else {
      setTranslateY(0)
    }
    dragStartY.current = null
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={onSnooze}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] shadow-[0_-8px_40px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${translateY}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Khảo sát ý kiến"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-[5px] rounded-full bg-[#ddd]" />
        </div>

        {/* Close button */}
        <button
          onClick={onSnooze}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center cursor-pointer hover:bg-[#e0e0e0] transition-colors"
          aria-label="Đóng"
        >
          <X className="w-3.5 h-3.5 text-[#555]" />
        </button>

        {/* Content */}
        <div className="px-6 pt-3 pb-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#f0f0f0] border border-[#e0e0e0] flex items-center justify-center mb-4">
            <ClipboardList className="w-7 h-7 text-[#111]" />
          </div>

          {/* Label */}
          <p className="text-[11px] font-semibold text-[#888] uppercase tracking-widest mb-1">
            Khảo sát CSAT / NPS
          </p>

          {/* Headline */}
          <h2 className="text-[18px] font-bold text-[#111] leading-snug mb-2 text-balance">
            Ý kiến của bạn giúp ECO School tốt hơn mỗi ngày
          </h2>

          {/* Body */}
          <p className="text-[13px] text-[#666] leading-relaxed mb-6">
            Bạn hãy dành 30 giây chia sẻ ý kiến của mình để chúng tôi cải thiện ECO School nhé!
          </p>

          {/* CTA */}
          <button
            onClick={onConfirm}
            className="w-full py-3.5 bg-[#111] text-white rounded-2xl text-[14px] font-bold hover:bg-[#333] active:bg-[#000] transition-colors cursor-pointer mb-3"
          >
            Làm khảo sát
          </button>

          {/* Snooze */}
          <button
            onClick={onSnooze}
            className="w-full py-3 text-[#888] text-[13px] font-medium hover:text-[#444] transition-colors cursor-pointer"
          >
            Nhắc tôi sau
          </button>

          {/* Snooze hint */}
          <p className="text-center text-[11px] text-[#bbb] mt-1">
            Hệ thống sẽ nhắc lại sau 14 ngày
          </p>
        </div>
      </div>
    </>
  )
}
