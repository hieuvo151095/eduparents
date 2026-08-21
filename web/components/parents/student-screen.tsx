'use client'

import { useState } from 'react'
import { MOCK_STUDENTS, getStudent } from '@/lib/mock-data'
import { StudentPickerSheet } from '@/components/parents/shared/student-picker-sheet'

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
  onOpenFee,
  onOpenTopup,
  onOpenAbsence,
  onOpenHomework,
  onOpenResults,
}: StudentScreenProps) {
  const [showPicker, setShowPicker] = useState(false)
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
        <div className="avatar">{student.avatar}</div>
        <div className="info">
          <div className="student-name">{student.name}</div>
          <div className="meta">{student.code}</div>
          <div className="meta">{student.className}</div>
          <div className="meta">{student.school}</div>
        </div>
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

      <div className="section-heading">Hoạt động gần đây</div>
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
    </div>
  )
}
