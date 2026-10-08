'use client'

import { formatSurveyDate, type SurveySubmission } from '@/lib/survey-storage'

interface SurveyCardProps {
  isEligible: boolean
  lastSubmission: SurveySubmission | null
  onOpenSurvey: () => void
}

export function SurveyCard({
  isEligible,
  lastSubmission,
  onOpenSurvey,
}: SurveyCardProps) {
  if (!isEligible) return null

  const hasSubmitted = !!lastSubmission

  return (
    <div className="eco-survey-card-wrapper">
      <div className="section-heading">Khảo sát & Đóng góp</div>

      <div
        className={`eco-survey-card ${hasSubmitted ? 'submitted' : ''}`}
        onClick={onOpenSurvey}
        role="button"
        tabIndex={0}
      >
        <div className="eco-survey-card-left">
          <div className="eco-survey-card-icon-wrap">
            {hasSubmitted ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            )}
          </div>

          <div className="eco-survey-card-info">
            <div className="eco-survey-card-title">
              {hasSubmitted ? 'Đã gửi ý kiến đóng góp' : 'Đóng góp ý kiến cho ECO School'}
            </div>
            {hasSubmitted ? (
              <div className="eco-survey-card-meta">
                Lần gửi gần nhất: <span className="font-semibold">{formatSurveyDate(lastSubmission.submittedAt)}</span>
              </div>
            ) : (
              <div className="eco-survey-card-sub">
                Chỉ 1 phút — Chia sẻ cảm nhận để nâng cao chất lượng ứng dụng
              </div>
            )}
          </div>
        </div>

        <div className="eco-survey-card-right">
          <span className="eco-survey-action-text">
            {hasSubmitted ? 'Gửi lại' : 'Bắt đầu'}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eco-survey-chevron">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
