'use client'

import { useState } from 'react'
import { ParentsHomeScreen } from '@/components/parents/home-screen'
import { StudentScreen } from '@/components/parents/student-screen'
import { PhieuBeNgoanApp } from '@/components/parents/phieu-be-ngoan'
import { FeeApp } from '@/components/parents/fee'
import { TopupApp } from '@/components/parents/topup'
import { AbsenceApp } from '@/components/parents/absence'
import { HomeworkApp } from '@/components/parents/homework'
import { ResultsApp } from '@/components/parents/results'
import { LinkStudentApp } from '@/components/parents/link-student'
import { HelpApp } from '@/components/parents/help'

// Mirrors the single-page phone-frame shell in eduteachers' app/page.tsx —
// one real Next.js route, top-level screen state via useState (no router
// library), each feature is a self-contained component under
// components/parents/<feature>/. The frame chrome itself (notch, side
// buttons, status bar icons) is ported from ../index.html + ../styles/main.css
// (the vanilla app's own iPhone mockup) rather than eduteachers' Dynamic
// Island frame, to keep eduparents' existing visual identity.
//
// `returnScreen` stands in for the vanilla app's navigation stack: features
// entered from a student context (Fee, Topup, Báo vắng, Bài tập, Kết quả
// học tập) can come from Home (via the student picker) or from Học sinh
// Homescreen directly, and their topbar "back" button must return to
// whichever one it came from — same as App.back() popping exactly one level
// in scripts/app.js. "Phiếu bé ngoan", "Hướng dẫn sử dụng", and "Liên kết
// học sinh" are only ever entered from Home, so they always return there.
type Screen =
  | 'home'
  | 'student'
  | 'phieu-be-ngoan'
  | 'fee'
  | 'topup'
  | 'absence'
  | 'homework'
  | 'results'
  | 'link-student'
  | 'help'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')
  const [returnScreen, setReturnScreen] = useState<Screen>('home')
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null)

  return (
    <div className="desktop-backdrop">
      <div className="device-frame">
        <div className="device-notch" />
        <span className="device-side-button power" />
        <span className="device-side-button vol-up" />
        <span className="device-side-button vol-down" />
        <div className="device-screen">
          <div className="app-shell">
            <div className="status-bar">
              <span className="status-time">09:41</span>
              <span className="status-icons">
                <span className="status-wifi">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span className="status-battery">
                  <span className="status-battery-fill" />
                </span>
              </span>
            </div>

            <main className="screen-root">
              {screen === 'home' && (
                <ParentsHomeScreen
                  onNavigateToStudent={(studentId) => {
                    setActiveStudentId(studentId)
                    setScreen('student')
                  }}
                  onNavigateToPhieuBeNgoan={(studentId) => {
                    setActiveStudentId(studentId)
                    setScreen('phieu-be-ngoan')
                  }}
                  onNavigateToFee={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('fee')
                  }}
                  onNavigateToTopup={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('topup')
                  }}
                  onNavigateToAbsence={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('absence')
                  }}
                  onNavigateToHomework={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('homework')
                  }}
                  onNavigateToResults={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('results')
                  }}
                  onNavigateToHelp={() => setScreen('help')}
                  onNavigateToLinkStudent={() => setScreen('link-student')}
                />
              )}

              {screen === 'student' && activeStudentId && (
                <StudentScreen
                  studentId={activeStudentId}
                  onBack={() => setScreen('home')}
                  onSelectStudent={setActiveStudentId}
                  onOpenFee={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('student')
                    setScreen('fee')
                  }}
                  onOpenTopup={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('student')
                    setScreen('topup')
                  }}
                  onOpenAbsence={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('student')
                    setScreen('absence')
                  }}
                  onOpenHomework={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('student')
                    setScreen('homework')
                  }}
                  onOpenResults={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('student')
                    setScreen('results')
                  }}
                />
              )}

              {screen === 'phieu-be-ngoan' && activeStudentId && (
                <PhieuBeNgoanApp studentId={activeStudentId} onBack={() => setScreen('home')} />
              )}

              {screen === 'fee' && activeStudentId && (
                <FeeApp studentId={activeStudentId} onBack={() => setScreen(returnScreen)} />
              )}

              {screen === 'topup' && activeStudentId && (
                <TopupApp
                  studentId={activeStudentId}
                  onBack={() => setScreen(returnScreen)}
                  onGoHome={() => setScreen('home')}
                />
              )}

              {screen === 'absence' && activeStudentId && (
                <AbsenceApp studentId={activeStudentId} onBack={() => setScreen(returnScreen)} />
              )}

              {screen === 'homework' && activeStudentId && (
                <HomeworkApp studentId={activeStudentId} onBack={() => setScreen(returnScreen)} />
              )}

              {screen === 'results' && activeStudentId && (
                <ResultsApp studentId={activeStudentId} onBack={() => setScreen(returnScreen)} />
              )}

              {screen === 'link-student' && <LinkStudentApp onBack={() => setScreen('home')} />}

              {screen === 'help' && <HelpApp onBack={() => setScreen('home')} />}
            </main>
          </div>
        </div>
        <div className="device-home-indicator" />
      </div>
    </div>
  )
}
