"use client"

import {
  BookOpen,
  Calculator,
  Calendar,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  BookMarked,
  UserMinus,
  ChevronRight,
  HelpCircle,
  Bell,
} from "lucide-react"

interface Student {
  name: string
  id: string
  school: string
  grade: string
  balance: string
}

const students: Student[] = [
  { name: "Nguyễn Thành Quân Anh", id: "112233446601", school: "Demo Soha", grade: "Lớp Mầm", balance: "0 điểm" },
  { name: "Mai Ngọc Thanh", id: "112233446603", school: "Demo Soha", grade: "INFANT", balance: "0 điểm" },
]

const features = [
  { icon: BookOpen, label: "Đóng học phí" },
  { icon: Calculator, label: "Lịch sử chi tiêu" },
  { icon: Calendar, label: "Thời khoá biểu" },
  { icon: CheckSquare, label: "Theo dõi điểm danh" },
  { icon: ClipboardList, label: "Báo vắng" },
  { icon: BookMarked, label: "Bài tập" },
  { icon: GraduationCap, label: "Kết quả học tập" },
  { icon: UserMinus, label: "Học bạ số" },
]

interface Props {
  onSurveyClick: () => void
}

export default function ParentsHomepage({ onSurveyClick }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] overflow-y-auto">
      {/* Header */}
      <div className="relative">
        <div className="bg-white px-4 pt-10 pb-3 flex items-center justify-between border-b border-[#e8e8e8]">
          <button className="cursor-pointer">
            <ChevronRight className="rotate-180 w-5 h-5 text-[#333]" />
          </button>
          <span className="text-[15px] font-semibold text-[#111]">ECO School Phụ huynh</span>
          <button className="cursor-pointer">
            <HelpCircle className="w-5 h-5 text-[#333]" />
          </button>
        </div>

        {/* Banner */}
        <div className="bg-[#f0f0f0] border-b border-[#ddd] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#222] rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-[#555] font-medium uppercase tracking-wide">ECO School</p>
            <p className="text-[13px] font-bold text-[#111] leading-tight">
              Miễn phí thanh toán học phí 1 năm
            </p>
            <p className="text-[10px] text-[#777]">Áp dụng đến 31.05.2025</p>
          </div>
          <Bell className="w-4 h-4 text-[#555] flex-shrink-0" />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-3 mt-3 bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-4 gap-y-4">
          {features.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f0f0f0] group-hover:bg-[#e0e0e0] transition-colors flex items-center justify-center border border-[#e0e0e0]">
                <Icon className="w-5 h-5 text-[#333]" />
              </div>
              <span className="text-[10px] text-[#333] text-center leading-tight font-medium px-0.5">{label}</span>
            </button>
          ))}
        </div>
        {/* Pagination dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          <div className="w-4 h-1.5 rounded-full bg-[#222]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#ccc]" />
        </div>
      </div>

      {/* Student List */}
      <div className="mx-3 mt-3">
        <p className="text-[13px] font-bold text-[#111] mb-2">Danh sách học sinh</p>
        <div className="flex flex-col gap-2">
          {students.map((s) => (
            <div
              key={s.id}
              className="bg-[#fafafa] border border-[#e8e8e8] rounded-xl p-3 cursor-pointer hover:border-[#bbb] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-[#555]">
                    {s.name.split(" ").pop()?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#111]">{s.name}</p>
                  <p className="text-[11px] text-[#888]">{s.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                <span className="text-[#888]">Trường</span>
                <span className="font-semibold text-[#111] text-right">{s.school}</span>
                <span className="text-[#888]">Lớp</span>
                <span className="font-semibold text-[#111] text-right">{s.grade}</span>
                <span className="text-[#888]">Số dư thẻ</span>
                <span className="font-semibold text-[#111] text-right">{s.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Survey CTA Banner — fixed at bottom */}
      <div className="mx-3 mt-4 mb-5">
        <button
          onClick={onSurveyClick}
          className="w-full cursor-pointer bg-[#111] hover:bg-[#333] transition-colors rounded-2xl p-4 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
        >
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] text-[#aaa] font-medium uppercase tracking-widest">Khảo sát</span>
            </div>
            <p className="text-[14px] font-bold text-white leading-snug">Chia sẻ ý kiến của bạn</p>
            <p className="text-[11px] text-[#aaa]">Chỉ mất 1 phút — giúp chúng tôi cải thiện ứng dụng</p>
          </div>
          <div className="flex-shrink-0 ml-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-[#111]" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
