# ECO Design System 1.0 (Consumer) (`DESIGN.md`)

> **Design System Key**: `eco`  
> **Version**: 1.0.0  
> **Status**: Active (Primary Design System for ECO Consumer & EDU School Parents)  
> **Source**: `ECO design system.fig` (`2qyslm7pi9Cg6pdGLen5As`), Node `803:0`  
> **Local Reference Path**: `ECO Design System/`  
> **Theme Rule**: **LIGHT MODE FIRST & FLAT SURFACES MANDATE**. All interfaces must strictly follow the official ECO Consumer styling with clean surfaces, authentic Yellow & Blue ECO brand palettes, Ink neutral typography, and 1px inset outlines.

---

## 1. Identity & Brand Intent

* **Brand Intent**: Clean, functional, friendly yet authoritative Vietnamese educational & consumer finance ecosystem.
* **Product Tone**: Direct, imperative, respectful, and crystal-clear. Copy uses concise Vietnamese ("Xác nhận", "Huỷ", "Tiếp tục", "Lưu thay đổi", "Xem chi tiết").
* **Visual Philosophy**: Flat color surfaces, high-contrast readable typography, subtle micro-elevation exclusively for floating modals/sheets/toasts, and zero unnecessary visual clutter or random gradients.

---

## 2. Core Foundations & Tokens

### 2.1 Color Palettes (Verbatim from `ECO Design System/tokens/colors.css`)

#### Primary Brand Colors
* **Brand Yellow**:
  - `--color-alias-brand`: `#FEC020` (Primary Action / Hero Accent)
  - `--color-alias-brand-pressed`: `#FECD4D` (Pressed State)
  - `--color-alias-brand-cover`: `#F8BF15` (Cover & Welcome Banner)
  - `--color-primary-yellow-eco`: `#FFC700` (Figma Base Eco Yellow)
  - Yellow Tonal Ramp:
    * `--color-primary-yellow10`: `#FFFAE6`
    * `--color-primary-yellow20`: `#FFF4CC`
    * `--color-primary-yellow30`: `#FFE999`
    * `--color-primary-yellow40`: `#FFDD66`
    * `--color-primary-yellow50`: `#FFD233`
    * `--color-primary-yellow70`: `#BF9500`
    * `--color-primary-yellow80`: `#7F6300`
    * `--color-primary-yellow90`: `#4C3B00`
    * `--color-primary-yellow100`: `#191300`

* **Primary Blue**:
  - `--color-primary-blue-eco`: `#0070CE` (Official Figma Blue Eco)
  - `--color-global-blue60`: `#1A94FF` (Links, Steppers, Focus Rings)
  - `--color-alias-hyperlink`: `#1A94FF`
  - Blue Tonal Ramp:
    * `--color-primary-blue10`: `#E6F1FB`
    * `--color-primary-blue20`: `#CCE2F5`
    * `--color-primary-blue30`: `#99C6EB`
    * `--color-primary-blue40`: `#66A9E2`
    * `--color-primary-blue50`: `#338DD8`
    * `--color-primary-blue70`: `#00549B`
    * `--color-primary-blue80`: `#003867`
    * `--color-primary-blue90`: `#001C34`
    * `--color-primary-blue100`: `#000B15`

#### Semantic Status Tokens
* **Positive (Success)**: `--color-global-green60`: `#00AB56`, `--color-alias-positive`: `#00AB56` (Light bg: `#ECFDF5`)
* **Negative (Error/Danger)**: `--color-global-red60`: `#FF424E`, `--color-global-red-alt`: `#F53743` (Light bg: `#FEE2E2`)
* **Warning**: `--color-global-orange50`: `#FF9F41`, `--color-alias-warning`: `#FF9F41` (Light bg: `--color-global-orange-light`: `#FFF5EB`)
* **Hyperlink / Focus**: `--color-alias-hyperlink`: `#1A94FF`

#### Neutrals & Ink Typography Ramp
* `--color-global-white`: `#FFFFFF`
* `--color-global-gray10`: `#F4F5F6` (Lightest background fill)
* `--color-global-gray20`: `#E8EAEC` (Dividers, borders)
* `--color-global-gray30`: `#D1D5D9` (Muted borders)
* `--color-global-gray40`: `#B9C1C7` (Disabled elements)
* `--color-global-gray50`: `#A2ACB4` (Subtle placeholders)
* `--color-global-gray60`: `#8B97A1` (Secondary body labels)
* `--color-global-gray70`: `#687179` (Secondary headings)
* `--color-global-gray80`: `#464C51` (High-contrast text)
* `--color-global-gray90`: `#232628` (Primary text & title)
* `--color-global-gray100`: `#0E0F10` (Darkest text)
* `--color-global-black`: `#000000`

#### Legacy Neutrals (Consumer 1.0 compatibility)
* `--color-legacy-gray10`: `#F5F5FA` (Canvas card container)
* `--color-legacy-gray20`: `#EBEBF0`
* `--color-legacy-gray30`: `#DDDDE3` (Outline border)
* `--color-legacy-gray50`: `#A6A6B0`
* `--color-legacy-gray60`: `#808089` (Muted text)
* `--color-legacy-gray100`: `#27272A` (Charcoal surface / text)

---

### 2.2 Typography Scale & Rules

* **Primary Typeface**: `Helvetica Neue`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `"Inter"`, `sans-serif`.
* **Line Height Formula**: Strictly `1.5` times the font size (`line-height = font-size * 1.5`).
* **Scale**:
  - `font-size-x-small`: `10px` (Line height: `15px`) - Captions, tags, status pills.
  - `font-size-small`: `12px` (Line height: `18px`) - Footnotes, timestamps, secondary badges.
  - `font-size-base`: `14px` (Line height: `21px`) - Standard body copy, inputs, table cells.
  - `font-size-medium`: `16px` (Line height: `24px`) - Subheaders, primary button labels, card headers.
  - `font-size-large`: `18px` (Line height: `27px`) - Section headings.
  - `font-size-x-large`: `20px` (Line height: `30px`) - Modal and sheet titles.
  - `font-size-2x-large`: `24px` (Line height: `36px`) - Page hero titles, balance display.
  - `font-size-3x-large`: `28px` (Line height: `42px`) - Feature hero banners.
  - `font-size-4x-large`: `32px` (Line height: `48px`) - Display values.
* **Weights**: 400 (Regular), 500 (Medium), 700 (Bold).

---

### 2.3 Spatial Scale

* Single unified linear scale across vertical stack, inline horizontal gap, and 4-side inset padding:
  - `4px`: Micro spacing, tag padding, icon-to-label gap.
  - `8px`: Standard component gap, input inner padding, button icon spacing.
  - `12px`: Card inner padding, list row gap.
  - `16px`: Standard screen horizontal padding, sheet header gap.
  - `20px`: Container gutter, section vertical separation.
  - `24px`: Primary block separation.
  - `32px`: Major section vertical margins.
  - `48px`: Hero block margins.
  - `64px`: Page bottom clearance for bottom navigation bars.

---

### 2.4 Shape, Outlines & Elevation

* **Corner Radii**:
  - `4px` (`--radius-xs`): Checkboxes, toast notices, micro-tags.
  - `8px` (`--radius-sm`): Text fields, primary square buttons, badges.
  - `16px` (`--radius-md`): Feature chips, bottom sheet card headers.
  - `20px` (`--radius-lg`): Content cards, documentation tables, schedule items.
  - `30px` (`--radius-round`): Pill-shaped action buttons (`Shape=Round`).
  - `9999px` (`--radius-full`): Avatars, notification badges.
* **Border Philosophy**:
  - Uses `1px inset box-shadow`: `inset 0 0 0 1px var(--color-alias-outline, #DDDDE3)` rather than clunky CSS borders to guarantee sub-pixel anti-aliasing on retina screens.
* **Elevation Philosophy**:
  - Static cards sit flat with 1px inset outlines.
  - Soft drop shadow is reserved exclusively for overlays:
    * Modal / Sheet / Toast / Tooltip: `0 2px 10px rgba(0, 0, 0, 0.2)`
    * Scrim overlay: `rgba(0, 0, 0, 0.4)` (standard) or `rgba(0, 0, 0, 0.7)` (media viewer).

---

## 3. Standard UI Components Contract

All new and refactored UI features must use or strictly emulate the standardized components in `ECO Design System/components/`:

1. **Actions**:
   - `Button`: Primary Yellow (`#FEC020`), Secondary Outlined (`inset 0 0 0 1px #DDDDE3`), Disabled (`opacity: 0.6`, flat 5% wash). Supported shapes: Default 8px and Round 30px pill.
   - `ButtonBar`: Fixed bottom or docked container with 16px padding and safe area inset.
   - `Chip`: Rounded 16px filter and selection chips with active yellow or subtle gray states.
2. **Forms & Inputs**:
   - `TextField`: 8px radius, 14px font, floating or fixed label in Vietnamese, clear button suffix.
   - `PinInput`: 6-digit discrete PIN entry cells with masked bullet indicators and secure numeric keypad.
   - `Search`: Integrated magnifying glass icon, clear button, and instant debounce filter.
   - `DateField` & `Calendar`: Gregorian calendar with Vietnamese weekdays (T2, T3, T4, T5, T6, T7, CN).
   - `Checkbox`, `Radio`, `Switch`: Native accessibility attributes with ECO brand yellow checked fill.
3. **Navigation**:
   - `NavigationBar`: Top bar with back arrow, centered title, and optional right action icon.
   - `BottomNavigation`: 5-tab mobile navigation bar (Trang chủ, Tin tức, Đóng học phí / Nạp điểm, Thông báo, Cá nhân) with elevated center action.
   - `Tab`: Underline or pill tab selector with smooth indicator transition.
4. **Feedback & Overlays**:
   - `Sheet` (Bottom Sheet Drawer): Rounded top corners (16-28px), drag handle bar, title header, backdrop blur or 40% black scrim.
   - `Modal`: Centered confirmation dialog with action button group.
   - `Toast` & `Tooltip`: Floating informational banner with 4px radius and soft shadow.
   - `Badge`: Notification counts truncated at `99+`.
5. **Media & Icons**:
   - `Avatar`: Circular 32px, 40px, or 48px avatars with initials rotation or student photos.
   - `Icon`: 190+ official ECO glyphs from `ECO Design System/assets/icons/icon-data.js` rendered in `currentColor`.

---

## 4. Forbidden Anti-Patterns (Strictly Prohibited)

1. ❌ **No Random Gradients**: Never use saturated multi-color gradients on cards or buttons. ECO styling relies on crisp, solid, flat fills.
2. ❌ **No Heavy Drop Shadows on Static Cards**: Static list items, balance cards, and forms must NOT have heavy 10px+ blurry drop shadows; use clean 1px inset outlines.
3. ❌ **No ALL CAPS Labels**: Never use `text-transform: uppercase` for normal Vietnamese UI copy (e.g. use "Xác nhận", NOT "XÁC NHẬN").
4. ❌ **No Ad-Hoc Colors**: Never hardcode hex values like `#ff0000`, `#00ff00`, `#0000ff`. Always use defined `--color-*` tokens.
5. ❌ **No Hardcoded English UI Strings**: All end-user text must be authentic Vietnamese. English is reserved exclusively for code, tokens, and technical documentation.
6. ❌ **No Arbitrary Radii**: Always stick to 4px, 8px, 16px, 20px, 30px, or 9999px.

---

## 5. Compliance & Verification Gate

Every UI feature developed in this workspace must verify adherence:
- Colors derive 100% from `ECO Design System/tokens/colors.css`.
- Typography adheres to the 1.5 line-height scale and Vietnamese sentence case.
- Interactive states (hover, pressed, disabled) match `--color-alias-brand-pressed` or flat 5% wash.
- Visual artifacts pass `validate_design_system_selection.py` and `validate_token_compliance.py`.
