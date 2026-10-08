'use client'

import { OverlayPortal } from '@/components/parents/shared/overlay-portal'

interface SurveyPromptSheetProps {
  onTakeSurvey: () => void
  onDismiss: () => void
}

export function SurveyPromptSheet({ onTakeSurvey, onDismiss }: SurveyPromptSheetProps) {
  return (
    <OverlayPortal>
      <div className="scrim" onClick={onDismiss} />
      <div className="sheet eco-survey-prompt-sheet">
        <button className="eco-survey-close-btn" onClick={onDismiss} aria-label="Đóng">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="eco-survey-prompt-body">
          <div className="eco-survey-prompt-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01" />
              <path d="M12 10h.01" />
              <path d="M16 10h.01" />
            </svg>
          </div>

          <h3 className="eco-survey-prompt-title">
            Trải nghiệm ECO School của bạn thế nào?
          </h3>
          <p className="eco-survey-prompt-desc">
            Hãy dành 1 phút chia sẻ cảm nhận để chúng tôi cải thiện ứng dụng và phục vụ con bạn tốt hơn.
          </p>

          <div className="eco-survey-prompt-actions">
            <button className="eco-survey-btn-primary" onClick={onTakeSurvey}>
              Làm khảo sát
            </button>
            <button className="eco-survey-btn-secondary" onClick={onDismiss}>
              Để sau
            </button>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}
