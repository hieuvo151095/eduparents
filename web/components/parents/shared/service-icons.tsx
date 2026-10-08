import React from 'react'

export interface ServiceIconProps {
  className?: string
  size?: number
}

// 1. Đóng Học Phí (Graduation Cap)
export function GraduationCapIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

// 2. Nạp điểm vào thẻ (Wallet / Card)
export function TopupWalletIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )
}

// 3. Lịch sử chi tiêu (Spending History)
export function SpendingIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  )
}

// 4. Thời khoá biểu (Timetable / Calendar)
export function TimetableIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
      <circle cx="8" cy="18" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

// 5. Theo dõi điểm danh (Attendance Tracking)
export function AttendanceIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

// 6. Báo vắng (Absence Report)
export function AbsenceIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

// 7. Bài tập (Homework)
export function HomeworkIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
    </svg>
  )
}

// 8. Kết quả học tập (Academic Results)
export function ResultsIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

// 9. Tiến trình phát triển (Child Development / Radar)
export function DevelopmentRadarIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="12 4 19.6 9.5 16.7 18.5 7.3 18.5 4.4 9.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// 10. Học bạ số (Digital Gradebook)
export function HocBaIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h4" />
      <circle cx="16" cy="15" r="1.5" fill="currentColor" />
    </svg>
  )
}

// 11. Thực đơn (Canteen Menu)
export function MenuFoodIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
      <path d="M15 11v11" />
      <path d="M6 2v10a2 2 0 0 0 2 2h1v8" />
      <path d="M9 2v6" />
    </svg>
  )
}

// 12. Hoạt động (School Activities)
export function ActivityIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

// 13. Hóa đơn (School Invoices)
export function InvoiceIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h4" />
    </svg>
  )
}

// 14. Dặn thuốc (Medicine Instructions)
export function MedicineIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  )
}

// 15. Bảng tin (School Announcements)
export function BulletinBoardIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  )
}

// 16. Phiếu bé ngoan (Good Behavior Star)
export function StarBadgeIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// 17. Xem thêm (View more grid)
export function GridMoreIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  )
}

// ECO School Icon (Image 2 - Recent)
export function EcoSchoolIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="8" cy="10" r="2.5" />
      <path d="M5 16a3 3 0 0 1 6 0" />
      <path d="M14 9h4" />
      <path d="M14 13h4" />
    </svg>
  )
}

// Internet Invoice Icon (Image 2 - Recent)
export function InternetIcon({ size = 26, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  )
}

// Telecom Icons
export function PhoneTopupIcon({ size = 24, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M12 18h.01" />
      <path d="M12 7v4" />
      <path d="M10 9h4" />
    </svg>
  )
}

export function Data4GIcon({ size = 24, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M8 8v4h3" />
      <path d="M11 8v7" />
      <path d="M16 11v-3a2 2 0 0 0-2-2h-1v7h3" />
    </svg>
  )
}

export function ScratchCardIcon({ size = 24, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function TvEntertainmentIcon({ size = 24, className = '' }: ServiceIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="m15 2-3 3-3-3" />
      <path d="M9 21h6" />
    </svg>
  )
}
