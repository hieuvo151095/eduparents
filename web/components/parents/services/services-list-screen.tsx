'use client'

import { useState } from 'react'
import { MOCK_STUDENTS, isMamNonStudent, type Student } from '@/lib/mock-data'
import { StudentPickerSheet } from '@/components/parents/shared/student-picker-sheet'
import {
  ALL_EDUCATION_SERVICES,
  RECENT_SERVICES,
  TELECOM_SERVICES,
  type ServiceItem,
} from '@/components/parents/shared/service-definitions'
import { OverlayPortal } from '@/components/parents/shared/overlay-portal'

interface ServicesListScreenProps {
  onBack: () => void
  onNavigateToFee: (studentId: string) => void
  onNavigateToTopup: (studentId: string) => void
  onNavigateToDevelopment: (studentId: string) => void
  onNavigateToAbsence: (studentId: string) => void
  onNavigateToHomework: (studentId: string) => void
  onNavigateToResults: (studentId: string) => void
  onNavigateToPhieuBeNgoan: (studentId: string) => void
}

export function ServicesListScreen({
  onBack,
  onNavigateToFee,
  onNavigateToTopup,
  onNavigateToDevelopment,
  onNavigateToAbsence,
  onNavigateToHomework,
  onNavigateToResults,
  onNavigateToPhieuBeNgoan,
}: ServicesListScreenProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null)

  // Determine students list based on service rules
  const eligibleStudents =
    selectedService?.id === 'topup'
      ? MOCK_STUDENTS.filter((s) => s.supportsTopUp)
      : selectedService?.id === 'development' || selectedService?.id === 'goodbehavior'
        ? MOCK_STUDENTS.filter(isMamNonStudent)
        : MOCK_STUDENTS

  const handlePickStudent = (student: Student) => {
    const service = selectedService
    setSelectedService(null)
    if (!service) return

    switch (service.id) {
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
      default:
        // For educational services in progress
        setNoticeMessage(
          `Dịch vụ "${service.label}" cho học sinh ${student.name} đang được hệ thống kết nối với nhà trường. Vui lòng quay lại sau!`
        )
        break
    }
  }

  const handleServiceClick = (item: ServiceItem) => {
    setSelectedService(item)
  }

  return (
    <div className="services-list-screen">
      {/* Top Header Bar - Monochrome */}
      <div className="services-header-bar">
        <button className="services-back-btn" onClick={onBack} aria-label="Quay lại">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="services-header-title">Danh sách dịch vụ</h1>
        <div className="w-8" />
      </div>

      <div className="services-body-scroll">
        {/* Section 1: Xem gần đây */}
        <section className="services-section">
          <h2 className="services-section-title">Xem gần đây</h2>
          <div className="services-grid services-grid-4">
            {RECENT_SERVICES.map((item) => {
              const IconComp = item.icon
              return (
                <button
                  key={item.id}
                  className="services-item-btn"
                  onClick={() => handleServiceClick(item)}
                >
                  <div className="services-icon-bubble">
                    <IconComp size={22} className="eco-service-icon" />
                  </div>
                  <span className="services-item-label">{item.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        <div className="services-section-divider" />

        {/* Section 2: Dịch vụ giáo dục (All 16 entry points) */}
        <section className="services-section">
          <h2 className="services-section-title">Dịch vụ giáo dục</h2>
          <div className="services-grid services-grid-4">
            {ALL_EDUCATION_SERVICES.map((item) => {
              const IconComp = item.icon
              return (
                <button
                  key={item.id}
                  className="services-item-btn"
                  onClick={() => handleServiceClick(item)}
                >
                  <div className="services-icon-bubble">
                    <IconComp size={22} className="eco-service-icon" />
                  </div>
                  <span className="services-item-label">{item.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        <div className="services-section-divider" />

        {/* Section 3: Dịch vụ viễn thông */}
        <section className="services-section">
          <h2 className="services-section-title">Dịch vụ viễn thông</h2>
          <div className="services-grid services-grid-4">
            {TELECOM_SERVICES.map((item) => {
              const IconComp = item.icon
              return (
                <button
                  key={item.id}
                  className="services-item-btn"
                  onClick={() =>
                    setNoticeMessage(`Dịch vụ viễn thông "${item.label}" sẽ ra mắt trong bản phát hành tới.`)
                  }
                >
                  <div className="services-icon-bubble">
                    <IconComp size={20} className="eco-service-icon" />
                  </div>
                  <span className="services-item-label">{item.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        <div className="services-section-divider" />

        {/* Section 4: Dịch vụ thanh toán */}
        <section className="services-section pb-12">
          <h2 className="services-section-title">Dịch vụ thanh toán</h2>
          <div className="services-grid services-grid-4 opacity-75">
            <div className="services-item-btn">
              <div className="services-icon-bubble">
                <span className="text-base font-bold">⚡</span>
              </div>
              <span className="services-item-label">Tiền điện</span>
            </div>
            <div className="services-item-btn">
              <div className="services-icon-bubble">
                <span className="text-base font-bold">💧</span>
              </div>
              <span className="services-item-label">Tiền nước</span>
            </div>
            <div className="services-item-btn">
              <div className="services-icon-bubble">
                <span className="text-base font-bold">🌐</span>
              </div>
              <span className="services-item-label">Internet</span>
            </div>
            <div className="services-item-btn">
              <div className="services-icon-bubble">
                <span className="text-base font-bold">📺</span>
              </div>
              <span className="services-item-label">Truyền hình</span>
            </div>
          </div>
        </section>
      </div>

      {/* Student Picker Sheet when user taps any educational service */}
      {selectedService && (
        <StudentPickerSheet
          students={eligibleStudents}
          onSelect={handlePickStudent}
          onClose={() => setSelectedService(null)}
        />
      )}

      {/* Notice Dialog for services coming soon - Monochrome */}
      {noticeMessage && (
        <OverlayPortal>
          <div className="scrim" onClick={() => setNoticeMessage(null)} />
          <div className="eco-notice-dialog">
            <div className="eco-notice-icon">◈</div>
            <h3 className="eco-notice-title">Thông báo</h3>
            <p className="eco-notice-text">{noticeMessage}</p>
            <button className="eco-notice-btn" onClick={() => setNoticeMessage(null)}>
              Đã hiểu
            </button>
          </div>
        </OverlayPortal>
      )}
    </div>
  )
}
