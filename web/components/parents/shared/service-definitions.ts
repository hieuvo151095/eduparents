import React from 'react'
import {
  GraduationCapIcon,
  TopupWalletIcon,
  SpendingIcon,
  TimetableIcon,
  AttendanceIcon,
  AbsenceIcon,
  HomeworkIcon,
  ResultsIcon,
  DevelopmentRadarIcon,
  HocBaIcon,
  MenuFoodIcon,
  ActivityIcon,
  InvoiceIcon,
  MedicineIcon,
  BulletinBoardIcon,
  StarBadgeIcon,
  GridMoreIcon,
  EcoSchoolIcon,
  InternetIcon,
  PhoneTopupIcon,
  Data4GIcon,
  ScratchCardIcon,
  TvEntertainmentIcon,
  ServiceIconProps,
} from './service-icons'

export interface ServiceItem {
  id: string
  label: string
  subLabel?: string
  icon: (props: ServiceIconProps) => React.JSX.Element
  isWired?: boolean
}

// 7 active features + 1 "Xem thêm" for the ECO Me Home Screen (Image 1) - Monochrome
export const HOME_PRIMARY_SERVICES: ServiceItem[] = [
  {
    id: 'fee',
    label: 'Đóng Học Phí',
    icon: GraduationCapIcon,
    isWired: true,
  },
  {
    id: 'topup',
    label: 'Nạp điểm',
    icon: TopupWalletIcon,
    isWired: true,
  },
  {
    id: 'development',
    label: 'Tiến trình phát triển',
    icon: DevelopmentRadarIcon,
    isWired: true,
  },
  {
    id: 'absence',
    label: 'Báo vắng',
    icon: AbsenceIcon,
    isWired: true,
  },
  {
    id: 'homework',
    label: 'Bài tập',
    icon: HomeworkIcon,
    isWired: true,
  },
  {
    id: 'results',
    label: 'Kết quả học tập',
    icon: ResultsIcon,
    isWired: true,
  },
  {
    id: 'goodbehavior',
    label: 'Phiếu bé ngoan',
    icon: StarBadgeIcon,
    isWired: true,
  },
  {
    id: 'more',
    label: 'Xem thêm',
    icon: GridMoreIcon,
    isWired: true,
  },
]

// All 16 Education Entry Points for Image 2 ("Dịch vụ giáo dục") - Monochrome
export const ALL_EDUCATION_SERVICES: ServiceItem[] = [
  {
    id: 'fee',
    label: 'Đóng Học Phí',
    icon: GraduationCapIcon,
    isWired: true,
  },
  {
    id: 'topup',
    label: 'Nạp điểm vào thẻ',
    icon: TopupWalletIcon,
    isWired: true,
  },
  {
    id: 'spending',
    label: 'Lịch sử chi tiêu',
    icon: SpendingIcon,
    isWired: false,
  },
  {
    id: 'timetable',
    label: 'Thời khoá biểu',
    icon: TimetableIcon,
    isWired: false,
  },
  {
    id: 'attendance',
    label: 'Theo dõi điểm danh',
    icon: AttendanceIcon,
    isWired: false,
  },
  {
    id: 'absence',
    label: 'Báo vắng',
    icon: AbsenceIcon,
    isWired: true,
  },
  {
    id: 'homework',
    label: 'Bài tập',
    icon: HomeworkIcon,
    isWired: true,
  },
  {
    id: 'results',
    label: 'Kết quả học tập',
    icon: ResultsIcon,
    isWired: true,
  },
  {
    id: 'development',
    label: 'Tiến trình phát triển',
    icon: DevelopmentRadarIcon,
    isWired: true,
  },
  {
    id: 'hocba',
    label: 'Học bạ số',
    icon: HocBaIcon,
    isWired: false,
  },
  {
    id: 'thucdon',
    label: 'Thực đơn',
    icon: MenuFoodIcon,
    isWired: false,
  },
  {
    id: 'hoatdong',
    label: 'Hoạt động',
    icon: ActivityIcon,
    isWired: false,
  },
  {
    id: 'hoadon',
    label: 'Hóa đơn',
    icon: InvoiceIcon,
    isWired: false,
  },
  {
    id: 'danthuoc',
    label: 'Dặn thuốc',
    icon: MedicineIcon,
    isWired: false,
  },
  {
    id: 'bangtin',
    label: 'Bảng tin',
    icon: BulletinBoardIcon,
    isWired: false,
  },
  {
    id: 'goodbehavior',
    label: 'Phiếu bé ngoan',
    icon: StarBadgeIcon,
    isWired: true,
  },
]

// "Xem gần đây" items (Image 2) - Monochrome
export const RECENT_SERVICES: ServiceItem[] = [
  {
    id: 'recent-school',
    label: 'ECO School',
    icon: EcoSchoolIcon,
    isWired: true,
  },
  {
    id: 'recent-internet',
    label: 'Hóa đơn Internet',
    icon: InternetIcon,
    isWired: false,
  },
]

// "Dịch vụ viễn thông" items (Image 2) - Monochrome
export const TELECOM_SERVICES: ServiceItem[] = [
  {
    id: 'tel-topup',
    label: 'Nạp tiền điện thoại',
    icon: PhoneTopupIcon,
    isWired: false,
  },
  {
    id: 'tel-data',
    label: 'Nạp data 4G/5G',
    icon: Data4GIcon,
    isWired: false,
  },
  {
    id: 'tel-card',
    label: 'Mã thẻ cào điện thoại',
    icon: ScratchCardIcon,
    isWired: false,
  },
  {
    id: 'tel-buydata',
    label: 'Mua mã thẻ 4G/5G',
    icon: Data4GIcon,
    isWired: false,
  },
  {
    id: 'tel-postpaid',
    label: 'Thanh toán trả sau',
    icon: PhoneTopupIcon,
    isWired: false,
  },
  {
    id: 'tel-tv',
    label: 'Truyền hình & Gi...',
    icon: TvEntertainmentIcon,
    isWired: false,
  },
]
