'use client'

import { useState } from 'react'
import { MOCK_STUDENTS, isMamNonStudent, type Student } from '@/lib/mock-data'
import { StudentPickerSheet } from '@/components/parents/shared/student-picker-sheet'
import { HOME_PRIMARY_SERVICES, TELECOM_SERVICES, type ServiceItem } from '@/components/parents/shared/service-definitions'

interface EcoMeHomeScreenProps {
  onNavigateToStudent: (studentId: string) => void
  onNavigateToServices: () => void
  onNavigateToFee: (studentId: string) => void
  onNavigateToTopup: (studentId: string) => void
  onNavigateToDevelopment: (studentId: string) => void
  onNavigateToAbsence: (studentId: string) => void
  onNavigateToHomework: (studentId: string) => void
  onNavigateToResults: (studentId: string) => void
  onNavigateToPhieuBeNgoan: (studentId: string) => void
  onNavigateToLinkStudent: () => void
  onNavigateToHelp: () => void
}

type PickerIntent = 'fee' | 'topup' | 'development' | 'absence' | 'homework' | 'results' | 'goodbehavior'

export function EcoMeHomeScreen({
  onNavigateToStudent,
  onNavigateToServices,
  onNavigateToFee,
  onNavigateToTopup,
  onNavigateToDevelopment,
  onNavigateToAbsence,
  onNavigateToHomework,
  onNavigateToResults,
  onNavigateToPhieuBeNgoan,
  onNavigateToLinkStudent,
  onNavigateToHelp,
}: EcoMeHomeScreenProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [pickerIntent, setPickerIntent] = useState<PickerIntent | null>(null)
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'pay' | 'orders' | 'wallet'>('home')

  // Filter students based on service eligibility rules
  const pickerStudents =
    pickerIntent === 'topup'
      ? MOCK_STUDENTS.filter((s) => s.supportsTopUp)
      : pickerIntent === 'development' || pickerIntent === 'goodbehavior'
        ? MOCK_STUDENTS.filter(isMamNonStudent)
        : MOCK_STUDENTS

  const handlePickStudent = (student: Student) => {
    const intent = pickerIntent
    setPickerIntent(null)
    if (!intent) return

    switch (intent) {
      case 'fee':
        onNavigateToFee(student.id)
        break
      case 'topup':
        onNavigateToTopup(student.id)
        break
      case 'development':
        onNavigateToDevelopment(student.id)
        break
      case 'absence':
        onNavigateToAbsence(student.id)
        break
      case 'homework':
        onNavigateToHomework(student.id)
        break
      case 'results':
        onNavigateToResults(student.id)
        break
      case 'goodbehavior':
        onNavigateToPhieuBeNgoan(student.id)
        break
    }
  }

  const handleServiceClick = (item: ServiceItem) => {
    if (item.id === 'more') {
      onNavigateToServices()
      return
    }
    setPickerIntent(item.id as PickerIntent)
  }

  return (
    <div className="eco-home-screen">
      {/* Top Header & Greeting Bar - Monochrome */}
      <div className="eco-top-section">
        <div className="eco-header-bar">
          <div className="eco-header-user">
            <div className="eco-user-avatar">
              <span className="eco-avatar-text">H</span>
              <span className="eco-badge-verified">✓</span>
            </div>
            <div className="eco-user-name">
              Xin chào, Hieu Vo <span className="eco-wave">👋</span>
            </div>
          </div>

          <div className="eco-header-actions">
            <button className="eco-circle-btn" aria-label="Tìm kiếm" onClick={onNavigateToHelp}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button className="eco-circle-btn relative" aria-label="Thông báo" onClick={onNavigateToHelp}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="eco-bell-badge">7</span>
            </button>
          </div>
        </div>

        {/* Marketing Banner: Monochrome Brand Hero Style */}
        <div className="eco-marketing-banner">
          <div className="eco-banner-text-col">
            <h2 className="eco-banner-title-1">HỌC PHÍ ĐÚNG HẠN</h2>
            <h2 className="eco-banner-title-2">AN TÂM ĐẾN TRƯỜNG</h2>
            <div className="eco-banner-limit-row">
              <span className="eco-limit-label">Hạn mức trả sau</span>
              <span className="eco-limit-amount">10.000.000đ</span>
            </div>
            <button className="eco-banner-btn" onClick={() => onNavigateToFee(MOCK_STUDENTS[0].id)}>
              Đăng ký ngay
            </button>
          </div>

          <div className="eco-banner-art-col">
            <div className="eco-art-phone">
              <div className="eco-art-phone-header">
                <span className="eco-paylater-badge">ECOPayLater</span>
              </div>
              <div className="eco-art-phone-body">
                <span className="eco-phone-line" />
                <span className="eco-phone-line" />
                <span className="eco-phone-line short" />
              </div>
            </div>
            <div className="eco-art-badge-new">
              <span>MỚI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating White Card: 4 Quick Actions + Balances */}
      <div className="eco-quick-card-container">
        <div className="eco-quick-card">
          {/* Row 1: 4 Quick Actions */}
          <div className="eco-quick-actions-row">
            <button className="eco-quick-action-item" onClick={() => onNavigateToTopup(MOCK_STUDENTS[0].id)}>
              <div className="eco-action-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="3" />
                  <path d="M12 9v6" />
                  <path d="M9 12h6" />
                </svg>
              </div>
              <span className="eco-action-label">Nạp tiền</span>
            </button>

            <button className="eco-quick-action-item" onClick={onNavigateToHelp}>
              <div className="eco-action-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m17 2 4 4-4 4" />
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                  <path d="m7 22-4-4 4-4" />
                  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
              <span className="eco-action-label">Chuyển tiền</span>
            </button>

            <button className="eco-quick-action-item" onClick={onNavigateToHelp}>
              <div className="eco-action-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="3" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span className="eco-action-label">Rút tiền</span>
            </button>

            <button className="eco-quick-action-item" onClick={onNavigateToHelp}>
              <div className="eco-action-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <rect x="7" y="7" width="10" height="10" rx="1" />
                </svg>
              </div>
              <span className="eco-action-label">Mã thanh toán</span>
            </button>
          </div>

          <div className="eco-card-divider" />

          {/* Row 2: Balances & Points */}
          <div className="eco-quick-balances-row">
            <div className="eco-balance-col">
              <div className="eco-balance-head">
                <button
                  className="eco-eye-btn"
                  onClick={() => setShowBalance(!showBalance)}
                  aria-label="Ẩn hiện số dư"
                >
                  {showBalance ? '👁' : '─'}
                </button>
                <span className="eco-balance-lbl">Ví ECO</span>
              </div>
              <div className="eco-balance-val">
                {showBalance ? '135,939đ' : '••••••••'}
              </div>
            </div>

            <div className="eco-balance-col">
              <div className="eco-balance-head">
                <span className="eco-balance-lbl">ECO trả sau</span>
              </div>
              <button
                className="eco-postpaid-link"
                onClick={() => onNavigateToFee(MOCK_STUDENTS[0].id)}
              >
                Đăng ký &gt;
              </button>
            </div>

            <div className="eco-coins-col">
              <span className="eco-coin-symbol">◈</span>
              <span className="eco-coin-number">0 điểm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 8-Service Grid: 7 Educational Features + "Xem thêm" */}
      <div className="eco-services-section">
        <div className="eco-services-grid">
          {HOME_PRIMARY_SERVICES.map((item) => {
            const IconComp = item.icon
            return (
              <button
                key={item.id}
                className="eco-service-btn"
                onClick={() => handleServiceClick(item)}
              >
                <div className="eco-service-icon-bubble">
                  <IconComp size={22} className="eco-service-icon" />
                </div>
                <span className="eco-service-label">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* "Danh sách học sinh" Section */}
      <div className="eco-student-section">
        <div className="eco-section-header">
          <h3 className="eco-section-title">Danh sách học sinh</h3>
          <button className="eco-section-link" onClick={onNavigateToLinkStudent}>
            Thêm học sinh +
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="eco-student-carousel">
          {MOCK_STUDENTS.map((student) => (
            <div
              key={student.id}
              className="eco-student-slide-card"
              onClick={() => onNavigateToStudent(student.id)}
            >
              <div className="eco-student-card-top">
                <div className="eco-student-avatar-circle">
                  {student.avatar || student.name.charAt(0)}
                </div>
                <div className="eco-student-info">
                  <div className="eco-student-name">{student.name}</div>
                  <div className="eco-student-code">{student.code}</div>
                </div>
              </div>

              {/* Inner white panel */}
              <div className="eco-student-card-inner">
                <div className="eco-kv-row">
                  <span className="eco-kv-k">Trường</span>
                  <span className="eco-kv-v">{student.school}</span>
                </div>
                <div className="eco-kv-row">
                  <span className="eco-kv-k">Lớp</span>
                  <span className="eco-kv-v">{student.className}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section below: Preview of "Dịch vụ viễn thông" */}
      <div className="eco-telecom-section">
        <div className="eco-section-header">
          <h3 className="eco-section-title">Dịch vụ viễn thông</h3>
        </div>
        <div className="eco-telecom-row">
          {TELECOM_SERVICES.slice(0, 4).map((item) => {
            const IconComp = item.icon
            return (
              <button
                key={item.id}
                className="eco-telecom-item"
                onClick={() => onNavigateToServices()}
              >
                <div className="eco-telecom-icon-wrap">
                  <IconComp size={20} className="eco-service-icon" />
                </div>
                <span className="eco-telecom-label">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar - Monochrome */}
      <div className="eco-bottom-nav">
        <button
          className={`eco-nav-tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <div className="eco-nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="eco-nav-label">Trang chủ</span>
        </button>

        <button
          className={`eco-nav-tab ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          <div className="eco-nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <span className="eco-nav-label">Mua sắm</span>
        </button>

        {/* Center Floating Payment Button - Solid Black */}
        <div className="eco-nav-center-wrapper">
          <button
            className="eco-nav-floating-btn"
            aria-label="Thanh toán"
            onClick={() => onNavigateToFee(MOCK_STUDENTS[0].id)}
          >
            <div className="eco-floating-btn-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
          </button>
          <span className="eco-nav-label eco-nav-label-center">Thanh toán</span>
        </div>

        <button
          className={`eco-nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <div className="eco-nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          </div>
          <span className="eco-nav-label">Đơn hàng</span>
        </button>

        <button
          className={`eco-nav-tab ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <div className="eco-nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
          </div>
          <span className="eco-nav-label">Ví của tôi</span>
        </button>
      </div>

      {/* Student Picker Sheet when an entry point is tapped */}
      {pickerIntent && (
        <StudentPickerSheet
          students={pickerStudents}
          onSelect={handlePickStudent}
          onClose={() => setPickerIntent(null)}
        />
      )}
    </div>
  )
}
