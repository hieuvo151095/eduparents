---
id: DIAGRAMS-EDU-PARENTS
title: System Architecture & Screen Transition Diagrams — ECO School Phụ huynh
status: active
owner_skill: claude-arch-designer
source_trace:
  - web/app/page.tsx
  - docs/prd.md
verification:
  - web/app/page.tsx
---

# System Architecture & Screen Transition Diagrams: ECO School Phụ huynh

## 1. Application Screen State Architecture

The parent application operates on single-page state transitions without full page refreshes, maintaining continuous mobile frame context inside the 390×844 viewport shell.

```mermaid
flowchart TD
    App[web/app/page.tsx] --> Home[HomeScreen: Trang Chủ]
    Home -->|Click Student Card| Student[StudentScreen: Chi Tiết Học Sinh]
    Home -->|Click Feature Icon| Picker[StudentPickerSheet: Chọn Học Sinh]
    Picker -->|Select Child| FeatureView[Target Feature: Fee, Topup, Absence, etc.]
    Student -->|Tap Đổi| Picker
    Student -->|Tap Tiến trình phát triển| DevScreen[ChildDevelopmentScreen: 5 Lĩnh Vực Mầm Non]
    DevScreen -->|Tap Vertex / Tab| FilteredList[Danh sách mốc theo lĩnh vực]
    DevScreen -->|Tap + Ghi nhận| ConsentGate[Modal Ghi Nhận + Cổng Đồng Thuận NĐ 13/2023]
    DevScreen -->|Tap Gợi ý| AlertSheet[GuidanceSheet: Trò chơi rèn luyện tại nhà]
    DevScreen -->|Tap Báo cáo| ReportSheet[PeriodicReportSheet: Phiếu nhận xét học kỳ]
    FeatureView -->|Tap Back| Home
```

## 2. 5-Axis Pentagon Radar Geometric Projection

Under Thông tư 51/2020/TT-BGDĐT, the development radar projects five statutory axes spaced radially at 72-degree angles ($360^\circ / 5$):
- Axis 1 ($90^\circ$ Top): Thể chất (Physical Development)
- Axis 2 ($18^\circ$ Top-Right): Nhận thức (Cognitive Development)
- Axis 3 ($306^\circ$ Bottom-Right): Ngôn ngữ (Language Development)
- Axis 4 ($234^\circ$ Bottom-Left): Tình cảm & Kỹ năng xã hội (Social-Emotional)
- Axis 5 ($162^\circ$ Top-Left): Thẩm mỹ (Aesthetic: Tạo hình & Âm nhạc)

```mermaid
flowchart TD
    subgraph Radar ["La Bàn Ngũ Giác 5 Lĩnh Vực (Pentagon Radar)"]
        TC["1. Thể chất (90°)"] --- NT["2. Nhận thức (18°)"]
        NT --- NN["3. Ngôn ngữ (306°)"]
        NN --- TCXH["4. Tình cảm - XH (234°)"]
        TCXH --- TM["5. Thẩm mỹ (162°)"]
        TM --- TC
    end
```

## 3. Milestone State Lifecycle & Parental Consent Sequence

This diagram details the sequence of recording a milestone achieved at home, including the privacy consent gate enforced under Decree 13/2023/ND-CP.

```mermaid
sequenceDiagram
    autonumber
    actor Parent as Phụ Huynh
    participant App as Ứng Dụng Phụ Huynh
    participant Consent as Cổng Đồng Thuận (NĐ 13/2023)
    participant Storage as Private Media Storage
    actor Teacher as Giáo Viên Chủ Nhiệm

    Parent->>App: Bấm "+ Ghi nhận mốc mới ở nhà"
    App->>Parent: Mở Form chọn mốc & tải ảnh minh chứng
    Parent->>Consent: Tích chọn "Đồng ý xử lý dữ liệu cá nhân của trẻ"
    Parent->>App: Bấm "Xác nhận & Gửi cô giáo"
    App->>Storage: Mã hóa và lưu ảnh minh chứng (Private Signed URL)
    App->>Teacher: Thông báo đẩy: "Bé có mốc mới cần xác thực"
    Note over App,Teacher: Trạng thái: CHỜ DUYỆT (CHO_XAC_NHAN)
    Teacher->>App: Quan sát thực tế & Phê duyệt đạt mốc
    App-->>Parent: Thông báo: "Cô giáo đã công nhận mốc phát triển!"
    Note over App,Parent: Trạng thái: ĐÃ ĐẠT (DA_DAT) -> Cập nhật Radar
```

## 4. Observability and Data Invariant Flow

All screen components import `MOCK_STUDENTS` and helper methods directly from `web/lib/mock-data.ts`. State transitions pass student identifiers down the tree, maintaining reactive updates across sibling components without asynchronous delays.
