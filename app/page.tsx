"use client"

import { useState } from "react"
import ParentsHomepage from "@/components/ParentsHomepage"
import SurveyForm from "@/components/SurveyForm"

type Screen = "home" | "survey"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home")

  return (
    <main className="min-h-screen bg-[#d6d6d6] flex items-center justify-center p-6">
      {/* Phone frame */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.30),0_0_0_1px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">

        {/* Status bar */}
        <div className="relative flex-shrink-0 bg-white px-7 pt-3 pb-1 flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#111]">16:22</span>
          {/* Dynamic island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[120px] h-[34px] bg-black rounded-full z-10" />
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px]">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className="w-[3px] bg-[#111] rounded-sm" style={{ height: `${h}px` }} />
              ))}
            </div>
            {/* Wifi */}
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
              <path d="M1.5 8.5a13 13 0 0121 0M5 12a10 10 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01" />
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-[1px]">
              <div className="w-[22px] h-[11px] rounded-[3px] border border-[#111] p-[1.5px]">
                <div className="w-3/4 h-full bg-[#111] rounded-[1px]" />
              </div>
              <div className="w-[2px] h-[5px] bg-[#111] rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative">
          {screen === "home" && (
            <ParentsHomepage onSurveyClick={() => setScreen("survey")} />
          )}
          {screen === "survey" && (
            <SurveyForm onBack={() => setScreen("home")} onSuccess={() => setScreen("home")} />
          )}
        </div>

        {/* Home indicator */}
        <div className="flex-shrink-0 bg-white flex justify-center pb-2 pt-1.5">
          <div className="w-32 h-[5px] bg-[#111] rounded-full" />
        </div>
      </div>

      {/* Prototype label */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm border border-[#ddd] rounded-full px-4 py-2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#111]" />
        <span className="text-[11px] text-[#555] font-medium whitespace-nowrap">
          Prototype · ECO School Phụ huynh — Tính năng Khảo sát
        </span>
      </div>
    </main>
  )
}
