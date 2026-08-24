'use client'

import { useRef, useState } from 'react'
import { MOCK_STUDENTS, isMamNonStudent } from '@/lib/mock-data'
import { StudentPickerSheet } from '@/components/parents/shared/student-picker-sheet'

// Mirrors PAGE1_LABELS/PAGE2_LABELS + ICONS in ../../scripts/app.js (vanilla
// app) — same glyph-character icon system (not eduteachers' line-art SVGs),
// to keep pixel parity with the already-verified vanilla screens. Wired by
// Đợt 3: "Đóng học phí", "Nạp điểm vào thẻ", "Báo vắng", "Bài tập", "Kết quả
// học tập" (page 1), "Phiếu bé ngoan" (page 2), "?" help, "Thêm học sinh mới
// +". Every other icon stays an inert placeholder, same convention
// eduteachers uses for its own unbuilt entry points (see its CLAUDE.md).
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

const PAGE2 = [
  { id: 'hocba', icon: '▩', label: 'Học bạ số' },
  { id: 'thucdon', icon: '▥', label: 'Thực đơn' },
  { id: 'hoatdong', icon: '◐', label: 'Hoạt động' },
  { id: 'hoadon', icon: '▤', label: 'Hóa đơn' },
  { id: 'danthuoc', icon: '✛', label: 'Dặn thuốc' },
  { id: 'bangtin', icon: '▬', label: 'Bảng tin' },
  { id: 'nhatky', icon: '▭', label: 'Nhật ký chăm sóc' },
  { id: 'goodbehavior', icon: '★', label: 'Phiếu bé ngoan' },
]

type PickerIntent = 'fee' | 'topup' | 'goodbehavior' | 'absence' | 'homework' | 'results'

const WIRED_PAGE1_IDS = new Set(['fee', 'topup', 'absence', 'homework', 'results'])

interface ParentsHomeScreenProps {
  onNavigateToStudent: (studentId: string) => void
  onNavigateToPhieuBeNgoan: (studentId: string) => void
  onNavigateToFee: (studentId: string) => void
  onNavigateToTopup: (studentId: string) => void
  onNavigateToAbsence: (studentId: string) => void
  onNavigateToHomework: (studentId: string) => void
  onNavigateToResults: (studentId: string) => void
  onNavigateToHelp: () => void
  onNavigateToLinkStudent: () => void
}

export function ParentsHomeScreen({
  onNavigateToStudent,
  onNavigateToPhieuBeNgoan,
  onNavigateToFee,
  onNavigateToTopup,
  onNavigateToAbsence,
  onNavigateToHomework,
  onNavigateToResults,
  onNavigateToHelp,
  onNavigateToLinkStudent,
}: ParentsHomeScreenProps) {
  const [page, setPage] = useState(0)
  const [pickerIntent, setPickerIntent] = useState<PickerIntent | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    setPage(Math.round(el.scrollLeft / el.clientWidth))
  }

  // Mirrors App.pickStudent's eligibility check: "Nạp điểm vào thẻ" only
  // lists students whose school supports top-up, and "Phiếu bé ngoan" only
  // applies to Mầm non students.
  const pickerStudents =
    pickerIntent === 'topup'
      ? MOCK_STUDENTS.filter((s) => s.supportsTopUp)
      : pickerIntent === 'goodbehavior'
        ? MOCK_STUDENTS.filter(isMamNonStudent)
        : MOCK_STUDENTS

  const handlePick = (studentId: string) => {
    setPickerIntent(null)
    if (pickerIntent === 'fee') onNavigateToFee(studentId)
    else if (pickerIntent === 'topup') onNavigateToTopup(studentId)
    else if (pickerIntent === 'goodbehavior') onNavigateToPhieuBeNgoan(studentId)
    else if (pickerIntent === 'absence') onNavigateToAbsence(studentId)
    else if (pickerIntent === 'homework') onNavigateToHomework(studentId)
    else if (pickerIntent === 'results') onNavigateToResults(studentId)
  }

  return (
    <div className="screen">
      <div className="brand-hero brand-hero--home">
        <button className="icon-btn brand-hero-help" aria-label="Trợ giúp" onClick={onNavigateToHelp}>
          ?
        </button>
        <h1>THẺ HỌC SINH THÔNG MINH</h1>
        <p>Bước tiến mới trong chuyển đổi số giáo dục</p>
      </div>

      <div className="icon-grid-wrap">
        <div className="icon-grid-scroller" ref={scrollerRef} onScroll={handleScroll}>
          <div className="icon-grid-page">
            {PAGE1.map(({ id, icon, label }) => {
              const wired = WIRED_PAGE1_IDS.has(id)
              return (
                <button
                  key={id}
                  className="icon-item"
                  disabled={!wired}
                  onClick={wired ? () => setPickerIntent(id as PickerIntent) : undefined}
                >
                  <span className="icon-glyph">{icon}</span>
                  <span className="icon-label">{label}</span>
                </button>
              )
            })}
          </div>
          <div className="icon-grid-page">
            {PAGE2.map(({ id, icon, label }) => {
              const isGoodBehavior = id === 'goodbehavior'
              return (
                <button
                  key={id}
                  className="icon-item"
                  disabled={!isGoodBehavior}
                  onClick={isGoodBehavior ? () => setPickerIntent('goodbehavior') : undefined}
                >
                  <span className="icon-glyph">{icon}</span>
                  <span className="icon-label">{label}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="icon-dots">
          <span className={`icon-dot ${page === 0 ? 'active' : ''}`} />
          <span className={`icon-dot ${page === 1 ? 'active' : ''}`} />
        </div>
      </div>

      <div className="section-heading">Danh sách học sinh</div>
      {MOCK_STUDENTS.map((s) => (
        <div className="student-card" key={s.id} onClick={() => onNavigateToStudent(s.id)}>
          <div className="student-card-head">
            <div className="avatar">{s.avatar}</div>
            <div>
              <div className="student-name">{s.name}</div>
              <div className="student-code">{s.code}</div>
            </div>
          </div>
          <div className="student-card-body">
            <div className="kv-label">Trường</div>
            <div className="kv-value">{s.school}</div>
            <div className="kv-label">Lớp</div>
            <div className="kv-value">{s.className}</div>
            <div className="kv-label">Số dư thẻ</div>
            <div className="kv-value balance">{s.balance.toLocaleString('vi-VN')} điểm</div>
          </div>
        </div>
      ))}

      <button className="btn-add-student" onClick={onNavigateToLinkStudent}>
        Thêm học sinh mới +
      </button>

      {pickerIntent && (
        <StudentPickerSheet
          students={pickerStudents}
          onSelect={(s) => handlePick(s.id)}
          onClose={() => setPickerIntent(null)}
        />
      )}
    </div>
  )
}
