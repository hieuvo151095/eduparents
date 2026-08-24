// Mirrors the STUDENTS mock data in ../../scripts/app.js (vanilla app) so
// both versions show identical numbers while they coexist. Đợt 3 adds the
// fields needed for Báo vắng, Bài tập, and Kết quả học tập. Fields for
// screens still not rebuilt (spending history, timetable, attendance) are
// still not ported.

export type GbStatus = 'dat' | 'khongdat'

export type AbsenceStatus = 'pending' | 'approved' | 'cancelled'

export interface AbsenceRequest {
  id: string
  range: string
  status: AbsenceStatus
  time: string
  days: number
  note: string
}

export type HomeworkStatus = 'notsubmitted' | 'submitted' | 'graded'

export interface Homework {
  id: string
  subject: string
  title: string
  status: HomeworkStatus
  score: number | null
  teacher: string
  assignedDate: string
  dueDate: string
  content: string
  overdue: boolean
  comment: string
  submissionFiles: string[]
}

export interface ResultsTerm {
  study: string
  behavior: string
  absentDays: string
}

export interface ResultsSubject {
  name: string
  gtx: string
  gk: string
}

export interface Results {
  year: string
  terms: Record<string, ResultsTerm>
  subjects: ResultsSubject[]
}

export interface RecentActivity {
  title: string
  time: string
  amount?: string
}

export interface InvoiceItem {
  name: string
  amount: number
}

export interface InvoiceMonthGroup {
  label: string
  total: number
  items: InvoiceItem[]
}

export interface Invoices {
  linked: boolean
  // Used when a student has no linked provider yet — the single "hoá đơn
  // chưa thanh toán" line shown after entering mã học sinh (fee-lookup flow).
  sample?: InvoiceItem[]
  // Used when a student already has a linked invoice — grouped by month.
  months?: InvoiceMonthGroup[]
}

export interface GoodBehaviorCycle {
  id: string
  type: 'week' | 'month'
  label: string
  status: GbStatus
  comment: string | null
  // ISO date (YYYY-MM-DD) of the Monday that starts this cycle's week —
  // only set for type: 'week', used to place the cycle on the calendar in
  // the "Tổng kết" tab (the week's Sunday cell gets the star).
  weekStart?: string
}

export interface GoodBehaviorRankingEntry {
  name: string
  count: number
  isSelf?: boolean
}

export interface GoodBehaviorRanking {
  achieved: number
  totalCycles: number
  top3: GoodBehaviorRankingEntry[]
  selfInTop3: boolean
  selfRank: number | null
  totalStudents: number
}

export interface GoodBehavior {
  yearLabel: string
  cycles: GoodBehaviorCycle[]
  ranking: GoodBehaviorRanking
}

export interface Student {
  id: string
  code: string
  name: string
  school: string
  className: string
  balance: number
  avatar: string
  supportsTopUp: boolean
  hasLinkedInvoice: boolean
  recentActivity: RecentActivity[]
  invoices: Invoices
  homework: Homework[]
  absence: AbsenceRequest[]
  results: Results | null
  goodBehavior: GoodBehavior
}

export interface Provider {
  id: string
  name: string
  logo: string
}

export const PROVIDERS: Provider[] = [
  { id: 'eco', name: 'ECO School', logo: 'fin' },
  { id: 'ssc', name: 'TheSSC', logo: 'SSC' },
  { id: 'vinaid', name: 'VinaID', logo: 'ID' },
]

export const AMOUNT_PRESETS = [10000, 20000, 50000, 100000, 200000, 500000]

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'vy',
    code: '9192930059',
    name: 'Phan Khánh Vy',
    school: 'Trường Mầm non Demo',
    className: 'Lớp Lá',
    balance: 12000,
    avatar: 'V',
    supportsTopUp: true,
    hasLinkedInvoice: false,
    recentActivity: [
      { title: 'Nạp tiền', time: '10/07/2026 - 09:41', amount: '+1,000 điểm' },
      { title: 'Thêm liên kết học sinh Phan Khánh Vy | 9192930059', time: '10/07/2026 - 09:29' },
      { title: 'Đã kích hoạt thẻ học sinh Phan Khánh Vy', time: '10/07/2026 - 09:29' },
      { title: 'Đã hủy liên kết thẻ học sinh Phan Khánh Vy', time: '10/07/2026 - 09:29' },
    ],
    invoices: { linked: false, sample: [{ name: 'Học phí 07/2026', amount: 200000 }] },
    homework: [],
    absence: [],
    results: null,
    goodBehavior: {
      yearLabel: 'Năm học 2025 - 2026',
      cycles: [
        { id: 'vygb1', type: 'week', label: 'Tuần 13/07 - 18/07/2026', status: 'dat', comment: 'Con rất ngoan, biết giúp đỡ bạn bè', weekStart: '2026-07-13' },
        { id: 'vygb2', type: 'week', label: 'Tuần 06/07 - 11/07/2026', status: 'dat', comment: null, weekStart: '2026-07-06' },
        { id: 'vygb3', type: 'week', label: 'Tuần 29/06 - 04/07/2026', status: 'dat', comment: null, weekStart: '2026-06-29' },
        { id: 'vygb4', type: 'week', label: 'Tuần 22/06 - 27/06/2026', status: 'khongdat', comment: null, weekStart: '2026-06-22' },
        { id: 'vygb5', type: 'month', label: 'Tháng 6/2026', status: 'dat', comment: 'Con tích cực tham gia các hoạt động của lớp' },
      ],
      ranking: {
        achieved: 24,
        totalCycles: 30,
        top3: [
          { name: 'Trần Thị Bình', count: 28 },
          { name: 'Nguyễn Văn An', count: 26 },
          { name: 'Phan Khánh Vy', count: 24, isSelf: true },
        ],
        selfInTop3: true,
        selfRank: 3,
        totalStudents: 32,
      },
    },
  },
  {
    id: 'khoa',
    code: '9192930072',
    name: 'Trần Đăng Khoa',
    school: 'Trường FINVIET',
    className: 'Lớp 10A1',
    balance: 0,
    avatar: 'K',
    supportsTopUp: false,
    hasLinkedInvoice: true,
    recentActivity: [
      { title: 'Đã điểm danh', time: 'Thứ tư 08/07/2026 - 08:21' },
      { title: 'Đã điểm danh', time: 'Thứ ba 07/07/2026 - 08:00' },
      { title: 'Đã điểm danh', time: 'Thứ sáu 03/07/2026 - 08:13' },
      { title: 'Thêm liên kết học sinh Trần Đăng Khoa | 9192930072', time: '02/07/2026 - 13:41' },
    ],
    invoices: {
      linked: true,
      months: [
        {
          label: 'Hóa đơn tháng 6/2026',
          total: 1355000,
          items: [
            { name: 'Học phí 06/2026', amount: 200000 },
            { name: 'Tiền ăn tháng 06/2026', amount: 875000 },
            { name: 'Học liệu Lịch sử', amount: 280000 },
          ],
        },
        {
          label: 'Hóa đơn tháng 7/2026',
          total: 1426000,
          items: [
            { name: 'Học phí 07/2026', amount: 200000 },
            { name: 'Tiền ăn tháng 07/2026', amount: 945000 },
            { name: 'Học liệu Lịch sử', amount: 280000 },
          ],
        },
      ],
    },
    homework: [
      {
        id: 'hw1',
        subject: 'GDQP-AN',
        title: 'Tính toán',
        status: 'graded',
        score: 10,
        teacher: 'Phùng Thị Thu',
        assignedDate: '26/05/2026',
        dueDate: '14:40 29/05/2026',
        content: 'Kiểm tra chủ đề',
        overdue: false,
        comment: 'Chưa có nhận xét',
        submissionFiles: ['bai-nop-toan-1.jpg'],
      },
      {
        id: 'hw2',
        subject: 'Toán',
        title: 'Bài tập nhỏ',
        status: 'notsubmitted',
        score: null,
        teacher: 'Phùng Thị Thu',
        assignedDate: '26/05/2026',
        dueDate: '14:40 29/05/2026',
        content: 'Kiểm tra chủ đề',
        overdue: true,
        comment: 'Chưa có nhận xét',
        submissionFiles: [],
      },
    ],
    absence: [
      { id: 'ab1', range: '10/07/2026 - 10/07/2026', status: 'pending', time: 'Cả ngày', days: 1, note: 'con xin nghi' },
      { id: 'ab2', range: '25/06/2026 - 27/06/2026', status: 'cancelled', time: 'Buổi sáng', days: 3, note: 'Con xin nghỉ phép' },
    ],
    results: {
      year: '2025-2026',
      terms: {
        'Học kỳ I': { study: '--', behavior: '--', absentDays: '--' },
        'Học kỳ II': { study: '--', behavior: '--', absentDays: '--' },
        'Tổng kết': { study: '--', behavior: '--', absentDays: '--' },
      },
      subjects: [
        { name: 'Ngữ Văn', gtx: '--', gk: '--' },
        { name: 'Toán', gtx: '--', gk: '--' },
        { name: 'Ngoại ngữ 1', gtx: '--', gk: '--' },
      ],
    },
    goodBehavior: {
      yearLabel: 'Năm học 2025 - 2026',
      cycles: [
        { id: 'khoagb1', type: 'week', label: 'Tuần 13/07 - 18/07/2026', status: 'khongdat', comment: 'Con còn nói chuyện riêng trong giờ học', weekStart: '2026-07-13' },
        { id: 'khoagb2', type: 'week', label: 'Tuần 06/07 - 11/07/2026', status: 'dat', comment: 'Con tích cực phát biểu xây dựng bài', weekStart: '2026-07-06' },
        { id: 'khoagb3', type: 'month', label: 'Tháng 6/2026', status: 'dat', comment: null },
        { id: 'khoagb4', type: 'week', label: 'Tuần 22/06 - 27/06/2026', status: 'dat', comment: null, weekStart: '2026-06-22' },
        { id: 'khoagb5', type: 'week', label: 'Tuần 15/06 - 20/06/2026', status: 'khongdat', comment: null, weekStart: '2026-06-15' },
      ],
      ranking: {
        achieved: 18,
        totalCycles: 28,
        top3: [
          { name: 'Nguyễn Thị Mai', count: 27 },
          { name: 'Đặng Văn Hùng', count: 25 },
          { name: 'Lý Gia Bảo', count: 23 },
        ],
        selfInTop3: false,
        selfRank: 7,
        totalStudents: 25,
      },
    },
  },
]

export function getStudent(id: string): Student | undefined {
  return MOCK_STUDENTS.find((s) => s.id === id)
}

// "Phiếu bé ngoan" only applies to Mầm non (preschool) students.
export function isMamNonStudent(s: Student): boolean {
  return s.school.includes('Mầm non')
}

export function abbreviateName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length <= 1) return name
  return parts[0] + ' ' + parts.slice(1).map((p) => p[0] + '.').join(' ')
}

export function fmtMoney(n: number): string {
  return n.toLocaleString('vi-VN') + 'đ'
}
