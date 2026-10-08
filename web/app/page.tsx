'use client'

import { useState, useRef, useEffect } from 'react'
import { EcoMeHomeScreen } from '@/components/parents/home/eco-me-home-screen'
import { ServicesListScreen } from '@/components/parents/services/services-list-screen'
import { StudentScreen } from '@/components/parents/student-screen'
import { ProfileApp } from '@/components/parents/profile'
import { PhieuBeNgoanApp } from '@/components/parents/phieu-be-ngoan'
import { ChildDevelopmentScreen } from '@/components/parents/development'
import { FeeApp } from '@/components/parents/fee'
import { TopupApp } from '@/components/parents/topup'
import { AbsenceApp } from '@/components/parents/absence'
import { HomeworkApp } from '@/components/parents/homework'
import { ResultsApp } from '@/components/parents/results'
import { LinkStudentApp } from '@/components/parents/link-student'
import { HelpApp } from '@/components/parents/help'
import { SurveyScreen, SurveyPromptSheet } from '@/components/parents/survey'
import { shouldShowSurveyPrompt, dismissSurveyPrompt } from '@/lib/survey-storage'

type Screen =
  | 'home'
  | 'services'
  | 'student'
  | 'profile'
  | 'phieu-be-ngoan'
  | 'development'
  | 'fee'
  | 'topup'
  | 'absence'
  | 'homework'
  | 'results'
  | 'link-student'
  | 'help'
  | 'survey'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')
  const [returnScreen, setReturnScreen] = useState<Screen>('home')
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null)
  const [showSurveyPrompt, setShowSurveyPrompt] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  // Evaluate survey prompt eligibility on mount (>=14d active, not submitted within 60d, not dismissed within 7 calendar days)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const s = params.get('screen') as Screen
      if (s) {
        setScreen(s)
        if (s === 'student') setActiveStudentId('vy')
        if (params.get('prompt') === '1') setShowSurveyPrompt(true)
        if (params.get('prompt') === '0') setShowSurveyPrompt(false)
        return
      }
    }
    if (shouldShowSurveyPrompt()) {
      setShowSurveyPrompt(true)
    }
  }, [])

  // Scroll to top immediately when switching screens or students
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0
    }
    window.scrollTo(0, 0)
  }, [screen, activeStudentId])


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

            <main className="screen-root" ref={mainRef}>
              {screen === 'home' && (
                <EcoMeHomeScreen
                  onNavigateToStudent={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('student')
                  }}
                  onNavigateToServices={() => {
                    setScreen('services')
                  }}
                  onNavigateToPhieuBeNgoan={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('phieu-be-ngoan')
                  }}
                  onNavigateToDevelopment={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('home')
                    setScreen('development')
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

              {screen === 'services' && (
                <ServicesListScreen
                  onBack={() => setScreen('home')}
                  onNavigateToFee={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('fee')
                  }}
                  onNavigateToTopup={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('topup')
                  }}
                  onNavigateToDevelopment={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('development')
                  }}
                  onNavigateToAbsence={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('absence')
                  }}
                  onNavigateToHomework={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('homework')
                  }}
                  onNavigateToResults={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('results')
                  }}
                  onNavigateToPhieuBeNgoan={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('services')
                    setScreen('phieu-be-ngoan')
                  }}
                />
              )}

              {screen === 'student' && activeStudentId && (
                <StudentScreen
                  studentId={activeStudentId}
                  onBack={() => setScreen('home')}
                  onSelectStudent={setActiveStudentId}
                  onOpenProfile={(studentId) => {
                    setActiveStudentId(studentId)
                    setScreen('profile')
                  }}
                  onOpenDevelopment={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('student')
                    setScreen('development')
                  }}
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
                  onOpenSurvey={() => {
                    setReturnScreen('student')
                    setScreen('survey')
                  }}
                />
              )}

              {screen === 'profile' && activeStudentId && (
                <ProfileApp studentId={activeStudentId} onBack={() => setScreen('student')} />
              )}

              {screen === 'phieu-be-ngoan' && activeStudentId && (
                <PhieuBeNgoanApp studentId={activeStudentId} onBack={() => setScreen('home')} />
              )}

              {screen === 'development' && activeStudentId && (
                <ChildDevelopmentScreen
                  studentId={activeStudentId}
                  onBack={() => setScreen(returnScreen)}
                  onSelectStudent={setActiveStudentId}
                  onNavigateToResults={(studentId) => {
                    setActiveStudentId(studentId)
                    setReturnScreen('development')
                    setScreen('results')
                  }}
                />
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

              {screen === 'survey' && (
                <SurveyScreen
                  onBack={() => setScreen(returnScreen)}
                  onSuccess={() => {
                    setScreen(returnScreen)
                    setShowSurveyPrompt(false)
                  }}
                />
              )}
            </main>

            {/* Entry Point 1: 30-second in-app survey prompt bottom sheet */}
            {showSurveyPrompt && (
              <SurveyPromptSheet
                onTakeSurvey={() => {
                  setShowSurveyPrompt(false)
                  setReturnScreen(screen)
                  setScreen('survey')
                }}
                onDismiss={() => {
                  dismissSurveyPrompt()
                  setShowSurveyPrompt(false)
                }}
              />
            )}

            <div className="overlay-root" id="overlay-root" />
          </div>
        </div>
        <div className="device-home-indicator" />
      </div>
    </div>
  )
}
