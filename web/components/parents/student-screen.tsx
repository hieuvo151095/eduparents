'use client'

import { useState } from 'react'
import { MOCK_STUDENTS, getStudent, type HealthRecord } from '@/lib/mock-data'
import { StudentPickerSheet } from '@/components/parents/shared/student-picker-sheet'
import { OverlayPortal } from '@/components/parents/shared/overlay-portal'

// Chỉ số sức khoẻ — BMI classification per the standard Asian cut-offs used
// in the brief: <18.5 Thiếu cân, 18.5–22.9 Bình thường, 23.0–24.9 Thừa cân,
// ≥25 Béo phì. Each band has a colour that drives both its bar segment and
// the category badge. `weight` is the relative width of the segment on the
// gauge — chosen to match the "BMI sample" mockup, not the numeric range.
const BMI_BANDS = [
  { key: 'under', label: 'Thiếu cân', color: '#5c7cd1', max: 18.5, weight: 27.8 },
  { key: 'normal', label: 'Bình thường', color: '#5bb87a', max: 23, weight: 19.6 },
  { key: 'over', label: 'Thừa cân', color: '#d6a02c', max: 25, weight: 8.3 },
  { key: 'obese', label: 'Béo phì', color: '#cc9ba1', max: Infinity, weight: 44.3 },
]

function bmiBand(bmi: number) {
  return BMI_BANDS.find((b) => bmi < b.max) ?? BMI_BANDS[BMI_BANDS.length - 1]
}

// Position (in %) of a BMI value along the gauge. Piecewise-linear between the
// band boundaries so the marker lands proportionally inside its own segment,
// matching how the boundary ticks (18.5 / 23 / 25) sit on the bar.
function bmiPercent(bmi: number): number {
  const anchors: [number, number][] = [
    [0, 0],
    [18.5, 27.8],
    [23, 47.4],
    [25, 55.7],
    [40, 100],
  ]
  if (bmi <= 0) return 0
  if (bmi >= 40) return 100
  for (let i = 1; i < anchors.length; i++) {
    const [x0, p0] = anchors[i - 1]
    const [x1, p1] = anchors[i]
    if (bmi <= x1) return p0 + ((bmi - x0) / (x1 - x0)) * (p1 - p0)
  }
  return 100
}

function HealthCard({
  heightCm,
  weightKg,
  onInfoClick,
}: {
  heightCm: number
  weightKg: number
  onInfoClick: () => void
}) {
  const bmi = weightKg / (heightCm / 100) ** 2
  const band = bmiBand(bmi)
  const pos = bmiPercent(bmi)

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
      </div>

      <div className="divider" />

      <div className="bmi">
        <div className="bmi-value-row">
          <span className="bmi-value">{bmi.toFixed(1)}</span>
          <span className="bmi-unit-group">
            <span className="bmi-unit">BMI</span>
            <button className="bmi-info-btn" onClick={onInfoClick} aria-label="Thông tin về chỉ số BMI">
              ⓘ
            </button>
          </span>
        </div>
        <div className="bmi-badge" style={{ background: band.color }}>
          {band.label}
        </div>
        <div className="bmi-track">
          <span className="bmi-tick" style={{ left: '27.8%' }}>18.5</span>
          <span className="bmi-tick" style={{ left: '47.4%' }}>23</span>
          <span className="bmi-tick" style={{ left: '55.7%' }}>25</span>
          <span className="bmi-marker" style={{ left: `${pos}%` }} />
          <div className="bmi-bar">
            {BMI_BANDS.map((b) => (
              <span key={b.key} style={{ flex: b.weight, background: b.color }} />
            ))}
          </div>
        </div>
        <div className="bmi-caps">
          {BMI_BANDS.map((b) => (
            <span key={b.key} style={{ flex: b.weight }}>
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
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
                  <th>Chiều cao</th>
                  <th>Cân nặng</th>
                  <th>BMI</th>
                  <th>Thời gian ghi nhận</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => {
                  const bmi = h.weightKg / (h.heightCm / 100) ** 2
                  const band = bmiBand(bmi)
                  return (
                    <tr key={i}>
                      <td>{h.heightCm} cm</td>
                      <td>{h.weightKg} kg</td>
                      <td>
                        <div className="bmi-history-value">{bmi.toFixed(1)}</div>
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

// "Bộ Y tế Việt Nam" BMI reference bands, mirroring BMI_BANDS' cut-offs above.
function BmiInfoSheet({ onClose }: { onClose: () => void }) {
  return (
    <OverlayPortal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-head">
          <span className="t">Chỉ số BMI là gì?</span>
          <button className="icon-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>
        <div className="sheet-body" style={{ padding: '0 16px 20px' }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px' }}>
            BMI (Body Mass Index — chỉ số khối cơ thể) đánh giá tương quan giữa
            chiều cao và cân nặng, tính theo công thức: cân nặng (kg) chia cho
            bình phương chiều cao (m).
          </p>
          <p style={{ fontSize: 13.5, fontWeight: 700, margin: '0 0 14px', textAlign: 'center' }}>
            BMI = Cân nặng / (Chiều cao x Chiều cao)
          </p>
          <p style={{ fontSize: 13.5, fontWeight: 700, margin: '0 0 6px' }}>
            Ngưỡng khuyến nghị (theo Bộ Y tế Việt Nam):
          </p>
          <ul style={{ fontSize: 13.5, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            <li>Dưới 18.5: Thiếu cân</li>
            <li>18.5 – 22.9: Bình thường</li>
            <li>23.0 – 24.9: Thừa cân</li>
            <li>Từ 25 trở lên: Béo phì</li>
          </ul>
        </div>
      </div>
    </OverlayPortal>
  )
}

// Mirrors SCREENS.student in ../../scripts/app.js — a single (non-swiping)
// page1 icon grid. "Đóng học phí", "Nạp điểm vào thẻ", "Báo vắng", "Bài tập"
// and "Kết quả học tập" are wired; "Lịch sử chi tiêu", "Thời khoá biểu" and
// "Theo dõi điểm danh" stay inert (not rebuilt yet). "Cài đặt" (⚙) has no
// reference screenshot in the vanilla app either — stays inert here too.
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
}: StudentScreenProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [showHealthHistory, setShowHealthHistory] = useState(false)
  const [showBmiInfo, setShowBmiInfo] = useState(false)
  const student = getStudent(studentId)
  if (!student) return null

  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack} aria-label="Quay lại">
          ‹
        </button>
        <div className="topbar-title">Học sinh</div>
        <span className="icon-btn-ghost" />
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
        <span>Số dư thẻ</span>
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
        onInfoClick={() => setShowBmiInfo(true)}
      />

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

      {showBmiInfo && <BmiInfoSheet onClose={() => setShowBmiInfo(false)} />}
    </div>
  )
}
