/**
 * Contracts: Child Development Milestones & 5 Statutory Domains
 * Feature: 027-child-development-milestones-kindergarten
 * Standards: Thong tu 51/2020/TT-BGDDT, Thong tu 23/2010/TT-BGDDT, Nghi dinh 13/2023/ND-CP
 */

export type StatutoryDomain =
  | 'physical'       // Phat trien The chat
  | 'cognitive'      // Phat trien Nhan thuc
  | 'language'       // Phat trien Ngon ngu
  | 'social_emotion' // Tinh cam & Ky nang xa hoi
  | 'aesthetic';     // Phat trien Tham my (Am nhac & Tao hinh)

export interface DomainMetadata {
  key: StatutoryDomain;
  labelVi: string;
  labelEn: string;
  icon: string;
  color: string;
  descriptionVi: string;
}

export type MilestoneStatus =
  | 'achieved'     // Da dat
  | 'awaiting_ack' // Cho xac nhan (Waiting for teacher ack)
  | 'in_progress'  // Dang ren luyen
  | 'delayed';     // Cham tien do (> 60 ngay)

export interface DevelopmentMilestone {
  id: string;
  domain: StatutoryDomain;
  title: string;
  description: string;
  targetAgeMonths: number;
  ageBand: 'nursery_0_36' | 'mam_36_48' | 'choi_48_60' | 'la_60_72';
  circular23Indicator?: string; // Standard reference for 5-year-olds (TT 23/2010)
  status: MilestoneStatus;
  achievedDate?: string;
  evidenceCount: number;
  homeActivities: string[];
}

export interface RadarDataPoint {
  domain: StatutoryDomain;
  label: string;
  achievedCount: number;
  totalCount: number;
  percentage: number;
  x: number;
  y: number;
}

export interface HomeObservationSubmission {
  childId: string;
  milestoneId: string;
  achievedDate: string; // YYYY-MM-DD, must be <= today
  parentNote: string;
  mediaUrls: string[]; // Max 3 items
  consentConfirmed: boolean; // Mandated by Decree 13/2023/ND-CP
  consentTimestamp: string;
}

export interface TeacherPeriodicReport {
  reportId: string;
  childId: string;
  term: 'HK1' | 'HK2' | 'HE';
  academicYear: string;
  evaluatorTeacher: string;
  approvedByPrincipal: boolean;
  domainEvaluations: Record<StatutoryDomain, {
    summary: string;
    strengths: string;
    recommendations: string;
    status: 'at_age' | 'developing' | 'needs_practice';
  }>;
  readReceipt?: {
    viewedAt: string;
    parentConfirmed: boolean;
    parentFeedback?: string;
  };
}
