"use client"

import { useState } from "react"
import { ChevronLeft, X, CheckCircle } from "lucide-react"

interface Props {
  onBack: () => void
  onSuccess: () => void
}

export default function SurveyForm({ onBack, onSuccess }: Props) {
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(null)
  const [satisfactionNote, setSatisfactionNote] = useState("")
  const [referralScore, setReferralScore] = useState<number | null>(null)
  const [referralNote, setReferralNote] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const isValid = satisfactionScore !== null && referralScore !== null

  const handleSubmit = () => {
    if (!isValid) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setShowSuccess(true)
    }, 800)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onSuccess()
  }

  const ScoreRow = ({
    value,
    onChange,
  }: {
    value: number | null
    onChange: (v: number) => void
  }) => (
    <div className="flex gap-1.5 justify-between">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`
            flex-1 h-9 rounded-lg text-[13px] font-semibold border transition-all cursor-pointer
            ${
              value === n
                ? "bg-[#111] text-white border-[#111]"
                : "bg-white text-[#444] border-[#ddd] hover:border-[#999] hover:bg-[#f5f5f5]"
            }
          `}
        >
          {n}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e8e8] px-4 pt-10 pb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="cursor-pointer">
          <ChevronLeft className="w-5 h-5 text-[#333]" />
        </button>
        <span className="text-[15px] font-semibold text-[#111] flex-1 text-center">Khảo sát ý kiến</span>
        <div className="w-5" />
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5 pb-28">
        {/* Intro */}
        <div className="bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)] border border-[#eee]">
          <p className="text-[13px] text-[#666] leading-relaxed">
            Ý kiến của bạn giúp chúng tôi cải thiện ECO School mỗi ngày. Vui lòng dành ít phút trả lời các câu hỏi sau.
          </p>
        </div>

        {/* Q1 — Satisfaction */}
        <div className="bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)] border border-[#eee]">
          <div className="flex items-start gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#111] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </span>
            <p className="text-[13px] font-semibold text-[#111] leading-snug">
              Bạn hài lòng như thế nào khi sử dụng ECO School?
            </p>
          </div>
          <div className="flex justify-between text-[10px] text-[#aaa] mb-1.5 px-0.5">
            <span>Rất không hài lòng</span>
            <span>Rất hài lòng</span>
          </div>
          <ScoreRow value={satisfactionScore} onChange={setSatisfactionScore} />
          {satisfactionScore !== null && (
            <p className="text-[11px] text-[#888] mt-2 text-center">
              Bạn đã chọn:{" "}
              <span className="font-bold text-[#111]">{satisfactionScore}/10</span>
            </p>
          )}

          {/* Optional note */}
          <div className="mt-3">
            <label className="text-[12px] font-medium text-[#555] block mb-1.5">
              Chia sẻ thêm ý kiến <span className="text-[#aaa] font-normal">(không bắt buộc)</span>
            </label>
            <div className="relative">
              <textarea
                value={satisfactionNote}
                onChange={(e) => setSatisfactionNote(e.target.value.slice(0, 256))}
                placeholder="Nhập ý kiến của bạn..."
                rows={3}
                className="w-full bg-[#fafafa] border border-[#ddd] rounded-lg px-3 py-2 text-[13px] text-[#333] placeholder:text-[#bbb] resize-none focus:outline-none focus:border-[#999] transition-colors"
              />
              <span className="absolute bottom-2 right-2.5 text-[10px] text-[#bbb]">
                {satisfactionNote.length}/256
              </span>
            </div>
          </div>
        </div>

        {/* Q2 — Referral */}
        <div className="bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)] border border-[#eee]">
          <div className="flex items-start gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#111] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </span>
            <p className="text-[13px] font-semibold text-[#111] leading-snug">
              Bạn có khả năng giới thiệu ECO School cho phụ huynh hoặc trường khác không?
            </p>
          </div>
          <div className="flex justify-between text-[10px] text-[#aaa] mb-1.5 px-0.5">
            <span>Rất không có khả năng</span>
            <span>Chắc chắn sẽ giới thiệu</span>
          </div>
          <ScoreRow value={referralScore} onChange={setReferralScore} />
          {referralScore !== null && (
            <p className="text-[11px] text-[#888] mt-2 text-center">
              Bạn đã chọn:{" "}
              <span className="font-bold text-[#111]">{referralScore}/10</span>
            </p>
          )}

          {/* Optional note */}
          <div className="mt-3">
            <label className="text-[12px] font-medium text-[#555] block mb-1.5">
              Chia sẻ thêm ý kiến <span className="text-[#aaa] font-normal">(không bắt buộc)</span>
            </label>
            <div className="relative">
              <textarea
                value={referralNote}
                onChange={(e) => setReferralNote(e.target.value.slice(0, 256))}
                placeholder="Nhập ý kiến của bạn..."
                rows={3}
                className="w-full bg-[#fafafa] border border-[#ddd] rounded-lg px-3 py-2 text-[13px] text-[#333] placeholder:text-[#bbb] resize-none focus:outline-none focus:border-[#999] transition-colors"
              />
              <span className="absolute bottom-2 right-2.5 text-[10px] text-[#bbb]">
                {referralNote.length}/256
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button — fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#eee] px-4 py-3">
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className={`
            w-full py-3.5 rounded-2xl text-[15px] font-bold transition-all cursor-pointer
            ${
              isValid && !submitting
                ? "bg-[#111] text-white hover:bg-[#333] active:scale-[0.98] cursor-pointer"
                : "bg-[#e8e8e8] text-[#bbb] cursor-not-allowed"
            }
          `}
        >
          {submitting ? "Đang gửi..." : "Gửi khảo sát"}
        </button>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-[320px] shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#f0f0f0] flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-[#111]" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-[17px] font-bold text-[#111] mb-1">Gửi thành công!</p>
              <p className="text-[13px] text-[#777] leading-relaxed">
                Cảm ơn bạn đã dành thời gian chia sẻ ý kiến. Chúng tôi sẽ nỗ lực cải thiện ECO School mỗi ngày.
              </p>
            </div>
            <button
              onClick={handleSuccessClose}
              className="w-full py-3 bg-[#111] text-white rounded-xl text-[14px] font-semibold hover:bg-[#333] transition-colors cursor-pointer"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
