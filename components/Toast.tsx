"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  const [show, setShow] = useState(isVisible)

  useEffect(() => {
    setShow(isVisible)

    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false)
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!show) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#111] text-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
        <Check className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
        <p className="text-[13px] font-medium leading-snug max-w-xs">{message}</p>
      </div>
    </div>
  )
}
