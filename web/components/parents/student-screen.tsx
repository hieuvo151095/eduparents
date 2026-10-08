'use client'

import { useState, useEffect } from 'react'
import { MOCK_STUDENTS, getStudent, isMamNonStudent, type HealthRecord } from '@/lib/mock-data'
import { StudentPickerSheet } from '@/components/parents/shared/student-picker-sheet'
import { OverlayPortal } from '@/components/parents/shared/overlay-portal'
import { SurveyCard } from '@/components/parents/survey/survey-card'
import { getSurveyState, isParentEligibleForSurvey, type SurveyState } from '@/lib/survey-storage'

// Chỉ số Z (BMI-for-age z-score) classification per Quyết định số 3777/QĐ-BYT
// ngày 16/12/2024 của Bộ Y tế: z < -2 Thiếu cân, -2 ≤ z ≤ 2 Bình thường,
// z > 2 Thừa cân, z > 3 Béo phì (obese is a stricter sub-range of overweight,
// so its band must be checked before the wider "over" one below).
const Z_SCORE_BANDS = [
  { key: 'under', label: 'Thiếu cân', color: '#5c7cd1', max: -2, weight: 25 },
  { key: 'normal', label: 'Bình thường', color: '#5bb87a', max: 2, weight: 50 },
  { key: 'over', label: 'Thừa cân', color: '#d6a02c', max: 3, weight: 12.5 },
  { key: 'obese', label: 'Béo phì', color: '#cc9ba1', max: Infinity, weight: 12.5 },
]

function zScoreBand(z: number) {
  return Z_SCORE_BANDS.find((b) => z < b.max) ?? Z_SCORE_BANDS[Z_SCORE_BANDS.length - 1]
}

// High-level, non-diagnostic pointers per band — intentionally generic
// ("ăn đa dạng", "vận động phù hợp") rather than prescriptive dosing/menus,
// since anything more specific belongs with a doctor, not this app.
const Z_SCORE_ADVICE: Record<string, string[]> = {
  under: [
    'Cho bé ăn đủ bữa với thực phẩm đa dạng, giàu năng lượng và đạm (thịt, cá, trứng, sữa).',
    'Đảm bảo bé ngủ đủ giấc và vận động phù hợp lứa tuổi để ăn ngon, hấp thu tốt hơn.',
    'Theo dõi cân nặng, chiều cao định kỳ để sớm thấy sự thay đổi.',
  ],
  normal: [
    'Duy trì chế độ ăn cân đối, đủ các nhóm chất (đạm, tinh bột, chất béo, vitamin).',
    'Khuyến khích bé vận động, vui chơi ngoài trời mỗi ngày.',
    'Tiếp tục theo dõi định kỳ để sớm phát hiện thay đổi bất thường.',
  ],
  over: [
    'Điều chỉnh khẩu phần ăn, hạn chế đồ ngọt, nước có gas và đồ chiên rán.',
    'Tăng thời gian vận động, giảm thời gian xem màn hình của bé.',
    'Theo dõi sát cân nặng, chiều cao trong các lần đo tiếp theo.',
  ],
  obese: [
    'Xây dựng lại chế độ ăn khoa học: giảm tinh bột/đường, tăng rau xanh.',
    'Tăng cường vận động thể chất hằng ngày, hạn chế lối sống tĩnh tại.',
    'Nên đưa bé đi khám chuyên khoa dinh dưỡng để được theo dõi sát sao.',
  ],
}

// Position (in %) of a z-score along the gauge, clamped to [-4, 4] and
// piecewise-linear between the band boundaries (-2 / 2 / 3) so the marker
// lands proportionally inside its own segment, matching the boundary ticks.
function zScorePercent(z: number): number {
  const anchors: [number, number][] = [
    [-4, 0],
    [-2, 25],
    [2, 75],
    [3, 87.5],
    [4, 100],
  ]
  if (z <= -4) return 0
  if (z >= 4) return 100
  for (let i = 1; i < anchors.length; i++) {
    const [x0, p0] = anchors[i - 1]
    const [x1, p1] = anchors[i]
    if (z <= x1) return p0 + ((z - x0) / (x1 - x0)) * (p1 - p0)
  }
  return 100
}

function HealthCard({
  heightCm,
  weightKg,
  zScore,
  onInfoClick,
  onAdviceClick,
}: {
  heightCm: number
  weightKg: number
  zScore: number
  onInfoClick: () => void
  onAdviceClick: () => void
}) {
  const bmi = weightKg / (heightCm / 100) ** 2
  const band = zScoreBand(zScore)
  const pos = zScorePercent(zScore)

  return (
    <div className="health-frame">
      <div className="health-stats">
        <div className="health-stat">
          <div className="val">{heightCm}</div>
          <div className="lbl">Chiều cao (cm)</div>
        </div>
        <div className="health-stat">
          <div className="val">{weightKg}</div>
          <div className="lbl">Cân nặng (kg)</div>
        </div>
        <div className="health-stat">
          <div className="val">{bmi.toFixed(1)}</div>
          <div className="lbl">BMI</div>
        </div>
      </div>

      <div className="divider" />

      <div className="bmi">
        <div className="bmi-value-row">
          <span className="bmi-value">{zScore.toFixed(1)}</span>
          <span className="bmi-unit-group">
            <span className="bmi-unit">Z-score</span>
            <button className="bmi-info-btn" onClick={onInfoClick} aria-label="Thông tin về chỉ số Z-score">
              ⓘ
            </button>
          </span>
        </div>
        <div className="bmi-badge" style={{ background: band.color }}>
          {band.label}
        </div>
        <div className="bmi-track">
          <span className="bmi-tick" style={{ left: '25%' }}>-2</span>
          <span className="bmi-tick" style={{ left: '75%' }}>2</span>
          <span className="bmi-tick" style={{ left: '87.5%' }}>3</span>
          <span className="bmi-marker" style={{ left: `${pos}%` }} />
          <div className="bmi-bar">
            {Z_SCORE_BANDS.map((b) => (
              <span key={b.key} style={{ flex: b.weight, background: b.color }} />
            ))}
          </div>
        </div>
        <div className="bmi-caps">
          {Z_SCORE_BANDS.map((b) => (
            <span key={b.key} style={{ flex: b.weight }}>
              {b.label}
            </span>
          ))}
        </div>

        <button className="zscore-advice-row" onClick={onAdviceClick}>
          <span className="zscore-advice-row-icon">💡</span>
          <span className="zscore-advice-row-label">Gợi ý cho ba mẹ</span>
          <span className="zscore-advice-row-chevron">›</span>
        </button>
      </div>
    </div>
  )
}

// Simple, coarse trend read on the two most recent history entries — not a
// regression/slope, just "did it move enough to mention" so the advice sheet
// can lead with something specific to this child instead of static text.
function zScoreTrendLine(history: HealthRecord[]): string | null {
  if (history.length < 2) return null
  const [latest, previous] = history
  const delta = latest.zScore - previous.zScore
  if (Math.abs(delta) < 0.15) {
    return `Z-score ổn định so với lần đo trước (${previous.recordedAt}).`
  }
  const dir = delta > 0 ? 'tăng' : 'giảm'
  return `Z-score đã ${dir} ${Math.abs(delta).toFixed(1)} so với lần đo trước (${previous.recordedAt}).`
}

function ZScoreAdviceSheet({
  zScore,
  history,
  onClose,
}: {
  zScore: number
  history: HealthRecord[]
  onClose: () => void
}) {
  const band = zScoreBand(zScore)
  const trendLine = zScoreTrendLine(history)

  return (
    <OverlayPortal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-head">
          <span className="t">Gợi ý cho ba mẹ</span>
          <button className="icon-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>
        <div className="sheet-body" style={{ padding: '0 16px 20px' }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px' }}>
            Bé đang ở nhóm <span style={{ fontWeight: 700, color: band.color }}>{band.label}</span>
            {trendLine ? <>. {trendLine}</> : '.'}
          </p>
          <ul className="zscore-advice-list">
            {Z_SCORE_ADVICE[band.key].map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <div className="zscore-advice-note">
            Đây là gợi ý tham khảo ở mức cơ bản. Để có tư vấn cụ thể, ba mẹ nên
            đưa bé đi khám bác sĩ.
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

// "Lịch sử chỉ số sức khoẻ" — newest entry first, capped to the last 6
// months by mock-data.ts itself (healthHistory only ever holds that window).
function HealthHistorySheet({ history, onClose }: { history: HealthRecord[]; onClose: () => void }) {
  return (
    <OverlayPortal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-head">
          <span className="t">Lịch sử chỉ số sức khoẻ</span>
          <button className="icon-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>
        <div className="sheet-body">
          <div className="text-muted" style={{ fontSize: 11.5, margin: '0 16px 10px' }}>
            Hiển thị các thay đổi trong 6 tháng gần nhất
          </div>
          <div className="table-scroll">
            <table className="kv-table" style={{ margin: '0 16px', width: 'calc(100% - 32px)' }}>
              <thead>
                <tr>
                  <th>Chỉ số</th>
                  <th>Z-score</th>
                  <th>Thời gian ghi nhận</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => {
                  const bmi = h.weightKg / (h.heightCm / 100) ** 2
                  const band = zScoreBand(h.zScore)
                  return (
                    <tr key={i}>
                      <td>
                        <div className="health-history-metrics">{h.heightCm} cm · {h.weightKg} kg</div>
                        <div className="health-history-sub">BMI {bmi.toFixed(1)}</div>
                      </td>
                      <td>
                        <div className="bmi-history-value">{h.zScore.toFixed(1)}</div>
                        <div className="bmi-history-band" style={{ color: band.color }}>
                          {band.label}
                        </div>
                      </td>
                      <td>{h.recordedAt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

// "Bộ Y tế Việt Nam" z-score reference bands, mirroring Z_SCORE_BANDS' cut-offs above.
function ZScoreInfoSheet({ onClose }: { onClose: () => void }) {
  return (
    <OverlayPortal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-head">
          <span className="t">Chỉ số Z-score là gì?</span>
          <button className="icon-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>
        <div className="sheet-body" style={{ padding: '0 16px 20px' }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px' }}>
            Z-score (chỉ số Z) đánh giá tình trạng dinh dưỡng của trẻ bằng cách
            so sánh chỉ số BMI theo tuổi và giới tính của trẻ với quần thể
            tham chiếu chuẩn tăng trưởng, thay vì chỉ dùng một ngưỡng BMI cố
            định như người lớn.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px' }}>
            Ngưỡng phân loại áp dụng theo Quyết định số 3777/QĐ-BYT ngày 16
            tháng 12 năm 2024 của Bộ Y tế:
          </p>
          <ul style={{ fontSize: 13.5, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            <li>Dưới -2: Thiếu cân</li>
            <li>-2 đến 2: Bình thường</li>
            <li>Trên 2: Thừa cân</li>
            <li>Trên 3: Béo phì</li>
          </ul>
        </div>
      </div>
    </OverlayPortal>
  )
}

// "Cài đặt" bottom sheet per Image 4
function StudentSettingsSheet({
  isLocked,
  onToggleLock,
  onClose,
  onActionClick,
}: {
  isLocked: boolean
  onToggleLock: () => void
  onClose: () => void
  onActionClick: (action: string) => void
}) {
  return (
    <OverlayPortal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet eco-settings-sheet">
        <div className="eco-settings-header">
          <div className="eco-settings-title">Cài đặt</div>
          <button className="eco-settings-close-btn" onClick={onClose} aria-label="Đóng">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="eco-settings-list">
          {/* 1. Khóa thẻ khẩn cấp */}
          <div className="eco-settings-row" onClick={onToggleLock}>
            <div className="eco-settings-left">
              <div className="eco-settings-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="eco-settings-label">Khóa thẻ khẩn cấp</span>
            </div>
            <div className="eco-settings-right" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                role="switch"
                aria-checked={isLocked}
                className={`eco-switch ${isLocked ? 'active' : ''}`}
                onClick={onToggleLock}
                aria-label="Khóa thẻ khẩn cấp"
              >
                <span className="eco-switch-thumb" />
              </button>
            </div>
          </div>

          {/* 2. Nạp tiền tự động */}
          <div className="eco-settings-row" onClick={() => onActionClick('auto_topup')}>
            <div className="eco-settings-left">
              <div className="eco-settings-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <circle cx="16" cy="15" r="2.5" />
                  <line x1="16" y1="13.5" x2="16" y2="16.5" />
                  <line x1="14.5" y1="15" x2="17.5" y2="15" />
                </svg>
              </div>
              <span className="eco-settings-label">Nạp tiền tự động</span>
            </div>
            <div className="eco-settings-right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eco-settings-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* 3. Cấu hình hạn mức */}
          <div className="eco-settings-row" onClick={() => onActionClick('limit')}>
            <div className="eco-settings-left">
              <div className="eco-settings-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 0-7.07 17.07l1.41-1.41A8 8 0 1 1 12 20a7.96 7.96 0 0 1-4.24-1.22" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 12l3.5-3.5" />
                </svg>
              </div>
              <span className="eco-settings-label">Cấu hình hạn mức</span>
            </div>
            <div className="eco-settings-right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eco-settings-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* 4. Cấp lại thẻ */}
          <div className="eco-settings-row" onClick={() => onActionClick('reissue')}>
            <div className="eco-settings-left">
              <div className="eco-settings-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6" />
                  <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l.67-1.19" />
                </svg>
              </div>
              <span className="eco-settings-label">Cấp lại thẻ</span>
            </div>
            <div className="eco-settings-right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eco-settings-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* 5. Hủy liên kết */}
          <div className="eco-settings-row" onClick={() => onActionClick('unlink')}>
            <div className="eco-settings-left">
              <div className="eco-settings-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <span className="eco-settings-label">Hủy liên kết</span>
            </div>
            <div className="eco-settings-right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eco-settings-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

// Mirrors SCREENS.student in ../../scripts/app.js — a single (non-swiping)
// page1 icon grid. "Đóng học phí", "Nạp điểm vào thẻ", "Báo vắng", "Bài tập"
// and "Kết quả học tập" are wired; "Lịch sử chi tiêu", "Thời khoá biểu" and
// "Theo dõi điểm danh" stay inert (not rebuilt yet).
const PAGE1 = [
  { id: 'fee', icon: '▣', label: 'Đóng học phí' },
  { id: 'topup', icon: '◈', label: 'Nạp điểm vào thẻ' },
  { id: 'spending', icon: '▥', label: 'Lịch sử chi tiêu' },
  { id: 'timetable', icon: '▦', label: 'Thời khoá biểu' },
  { id: 'attendance', icon: '◷', label: 'Theo dõi điểm danh' },
  { id: 'absence', icon: '✎', label: 'Báo vắng' },
  { id: 'homework', icon: '▧', label: 'Bài tập' },
  { id: 'results', icon: '▨', label: 'Kết quả học tập' },
]

interface StudentScreenProps {
  studentId: string
  onBack: () => void
  onSelectStudent: (studentId: string) => void
  onOpenProfile: (studentId: string) => void
  onOpenFee: (studentId: string) => void
  onOpenTopup: (studentId: string) => void
  onOpenAbsence: (studentId: string) => void
  onOpenHomework: (studentId: string) => void
  onOpenResults: (studentId: string) => void
  onOpenDevelopment?: (studentId: string) => void
  onOpenSurvey?: () => void
}

export function StudentScreen({
  studentId,
  onBack,
  onSelectStudent,
  onOpenProfile,
  onOpenFee,
  onOpenTopup,
  onOpenAbsence,
  onOpenHomework,
  onOpenResults,
  onOpenDevelopment,
  onOpenSurvey,
}: StudentScreenProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [showHealthHistory, setShowHealthHistory] = useState(false)
  const [showZScoreInfo, setShowZScoreInfo] = useState(false)
  const [showZScoreAdvice, setShowZScoreAdvice] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isCardLocked, setIsCardLocked] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [surveyState, setSurveyState] = useState<SurveyState>(getSurveyState)

  useEffect(() => {
    setSurveyState(getSurveyState())
  }, [showSettings])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('scroll') === 'survey') {
        setTimeout(() => {
          const el = document.querySelector('.eco-survey-card-wrapper')
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' })
        }, 150)
      }
    }
  }, [])

  const student = getStudent(studentId)
  if (!student) return null

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur))
    }, 2800)
  }

  const handleSettingsAction = (action: string) => {
    if (action === 'auto_topup') {
      setShowSettings(false)
      onOpenTopup(student.id)
    } else if (action === 'limit') {
      setShowSettings(false)
      triggerToast('Cấu hình hạn mức chi tiêu: tối đa 200.000đ/ngày')
    } else if (action === 'reissue') {
      setShowSettings(false)
      triggerToast('Yêu cầu cấp lại thẻ đã được gửi tới nhà trường')
    } else if (action === 'unlink') {
      setShowSettings(false)
      triggerToast('Vui lòng liên hệ nhà trường để hủy liên kết học sinh')
    }
  }

  const handleToggleLock = () => {
    const nextLocked = !isCardLocked
    setIsCardLocked(nextLocked)
    triggerToast(nextLocked ? 'Đã kích hoạt khóa thẻ khẩn cấp' : 'Đã mở khóa thẻ học sinh')
  }

  return (
    <div className="screen" style={{ position: 'relative' }}>
      {toastMessage && (
        <div className="eco-toast-notice">
          {toastMessage}
        </div>
      )}

      <div className="topbar">
        <button className="icon-btn" onClick={onBack} aria-label="Quay lại">
          ‹
        </button>
        <div className="topbar-title">Học sinh</div>
        <button
          className="icon-btn"
          onClick={() => setShowSettings(true)}
          aria-label="Cài đặt thẻ học sinh"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      <div className="student-header">
        <button
          className="student-header-main"
          onClick={() => onOpenProfile(student.id)}
          aria-label="Hồ sơ học sinh"
        >
          <div className="avatar">{student.avatar}</div>
          <div className="info">
            <div className="student-name">{student.name}</div>
            <div className="meta">{student.code}</div>
            <div className="meta">{student.className}</div>
            <div className="meta">{student.school}</div>
          </div>
          <span className="student-header-chevron">›</span>
        </button>
        <button className="btn-change" onClick={() => setShowPicker(true)}>
          ⇄ Đổi
        </button>
      </div>

      <div className="balance-row">
        <span>
          Số dư thẻ
          {isCardLocked && (
            <span style={{ marginLeft: 8, fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: 'var(--c-ink)', color: 'var(--c-white)' }}>
              ĐÃ KHÓA
            </span>
          )}
        </span>
        <span className="value">{student.balance.toLocaleString('vi-VN')} điểm</span>
      </div>

      <div className="icon-grid-wrap">
        <div className="icon-grid-page" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          {PAGE1.map(({ id, icon, label }) => {
            const isTopup = id === 'topup'
            const disabled = isTopup && !student.supportsTopUp
            let onClick: (() => void) | undefined
            if (!disabled) {
              if (id === 'fee') onClick = () => onOpenFee(student.id)
              else if (id === 'topup') onClick = () => onOpenTopup(student.id)
              else if (id === 'absence') onClick = () => onOpenAbsence(student.id)
              else if (id === 'homework') onClick = () => onOpenHomework(student.id)
              else if (id === 'results') onClick = () => onOpenResults(student.id)
            }
            return (
              <button key={id} className="icon-item" disabled={disabled} onClick={onClick}>
                <span className="icon-glyph">{icon}</span>
                <span className="icon-label">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="section-heading section-heading-row">
        <span>Chỉ số sức khoẻ</span>
        <button
          className="icon-btn"
          onClick={() => setShowHealthHistory(true)}
          aria-label="Lịch sử chỉ số sức khoẻ"
        >
          🕐
        </button>
      </div>
      <HealthCard
        heightCm={student.heightCm}
        weightKg={student.weightKg}
        zScore={student.zScore}
        onInfoClick={() => setShowZScoreInfo(true)}
        onAdviceClick={() => setShowZScoreAdvice(true)}
      />

      {isMamNonStudent(student) && onOpenDevelopment && (
        <>
          <div className="section-heading section-heading-row" style={{ marginTop: '16px' }}>
            <span>Tiến trình phát triển</span>
            <button
              onClick={() => onOpenDevelopment(student.id)}
              style={{
                fontSize: '12px',
                color: '#2563EB',
                fontWeight: '600',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Xem chi tiết ›
            </button>
          </div>
          <div
            onClick={() => onOpenDevelopment(student.id)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '14px',
              padding: '14px 16px',
              margin: '0 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                🎯
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#1F2937' }}>
                  La bàn phát triển 5 lĩnh vực
                </div>
                <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                  Theo Thông tư 51/2020/TT-BGDĐT
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '12px',
                }}
              >
                Chi tiết
              </span>
              <span style={{ fontSize: '16px', color: '#9CA3AF' }}>›</span>
            </div>
          </div>
        </>
      )}

      {onOpenSurvey && (
        <SurveyCard
          isEligible={isParentEligibleForSurvey(surveyState)}
          lastSubmission={surveyState.lastSubmission}
          onOpenSurvey={onOpenSurvey}
        />
      )}

      <div className="section-heading">Hoạt động gần đây</div>
      <div className="recent-frame">
        {student.recentActivity.length ? (
          student.recentActivity.map((a, i) => (
            <div className="list-item" key={i}>
              <span className="glyph">•</span>
              <div className="body">
                <div className="title">{a.title}</div>
                <div className="time">{a.time}</div>
              </div>
              {a.amount && <div className="amount">{a.amount}</div>}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="glyph">▢</div>
            <div className="text">Chưa có thông tin</div>
          </div>
        )}
      </div>

      <div className="cta-bar sticky">
        <button
          className="btn btn-primary"
          disabled={!student.supportsTopUp}
          onClick={() => onOpenTopup(student.id)}
        >
          Nạp điểm vào thẻ
        </button>
      </div>

      {showPicker && (
        <StudentPickerSheet
          students={MOCK_STUDENTS}
          selectedStudentId={studentId}
          onSelect={(s) => {
            setShowPicker(false)
            onSelectStudent(s.id)
          }}
          onClose={() => setShowPicker(false)}
        />
      )}

      {showHealthHistory && (
        <HealthHistorySheet
          history={student.healthHistory}
          onClose={() => setShowHealthHistory(false)}
        />
      )}

      {showZScoreInfo && <ZScoreInfoSheet onClose={() => setShowZScoreInfo(false)} />}

      {showZScoreAdvice && (
        <ZScoreAdviceSheet
          zScore={student.zScore}
          history={student.healthHistory}
          onClose={() => setShowZScoreAdvice(false)}
        />
      )}

      {showSettings && (
        <StudentSettingsSheet
          isLocked={isCardLocked}
          onToggleLock={handleToggleLock}
          onClose={() => setShowSettings(false)}
          onActionClick={handleSettingsAction}
        />
      )}
    </div>
  )
}
