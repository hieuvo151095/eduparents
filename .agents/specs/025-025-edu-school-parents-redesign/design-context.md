# Design Context Snapshot: ECO Design System Binding

> **Active Design System**: `eco` (`ECO Design System 1.0 (Consumer)`)  
> **active_design_system**: `eco`  
> **Source Directory**: `ECO Design System/`  
> **System Contract**: `.agents/design-systems/eco/DESIGN.md`  
> **Binding Scope**: EDU School Parents & ECO Me Application Features  

---

## 1. Active Design System Metadata

* **Active Design System Key**: `eco`
* **active_design_system**: `eco`
* **Version**: `1.0.0`
* **Core Brand Colors**:
  - Yellow Eco: `--color-alias-brand: #FEC020`, `--color-alias-brand-pressed: #FECD4D`, `--color-primary-yellow-eco: #FFC700`
  - Blue Eco: `--color-primary-blue-eco: #0070CE`, `--color-alias-hyperlink: #1A94FF`, `--color-global-blue60: #1A94FF`
  - Green Success: `--color-global-green60: #00AB56`, `--color-alias-positive: #00AB56`
  - Red Danger: `--color-global-red60: #FF424E`, `--color-global-red-alt: #F53743`
  - Orange Warning: `--color-global-orange50: #FF9F41`, `--color-alias-warning: #FF9F41`
  - Ink Grayscale: `--color-global-gray10: #F4F5F6` to `--color-global-gray100: #0E0F10`
* **Core Typography**:
  - Typeface: `Helvetica Neue`, `Inter`, `-apple-system`, `sans-serif`
  - Ratio: Strictly 1.5 line-height ratio
  - Scale: 10px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 48px
* **Spatial Rhythm**:
  - Linear Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px
* **Shape & Outlines**:
  - Radii: 4px (`--radius-xs`), 8px (`--radius-sm`), 16px (`--radius-md`), 20px (`--radius-lg`), 30px (`--radius-round`), 9999px (`--radius-full`)
  - Borders: 1px inset box-shadow (`inset 0 0 0 1px var(--color-alias-outline)`)

---

## 2. Allowed Primitives & Components

All screens and sub-views must compose from or map directly to:
1. **Actions**:
   - `Button` (Primary Yellow, Secondary Outlined, Round Pill, Square 8px)
   - `ButtonBar` (Docked bottom CTA bar with safe area padding)
   - `Chip` (16px radius filters and category tags)
2. **Form Controls**:
   - `TextField` & `Textarea` (8px radius, clear button suffix, Vietnamese helper labels)
   - `PinInput` (6-digit discrete PIN with secure bullets and numeric keypad)
   - `Search` (Instant filter search field with magnifying glass)
   - `DateField` & `Calendar` (Vietnamese days: T2 - CN)
   - `Checkbox`, `Radio`, `Switch` (Yellow Eco checked state)
3. **Navigation**:
   - `NavigationBar` (Standard top bar with back navigation and title)
   - `BottomNavigation` (5-tab bar with elevated center payment action)
   - `Tab` (Underline or pill active state selector)
4. **Overlays & Feedback**:
   - `Sheet` (Bottom sheet drawer with drag handle and 28px top rounded corners)
   - `Modal` (Confirmation dialogs with dual action buttons)
   - `Toast` & `Tooltip` (Informative floaters with 4px radius)
   - `Badge` (Count pill with 99+ max limit)
5. **Media**:
   - `Avatar` (32px, 40px, 48px circular avatars with student photos or initials)
   - `Icon` (Official 190+ SVG icons from `ECO Design System/assets/icons/`)

---

## 3. Allowed Layout Patterns

- **Mobile Viewport Frame**: Standard 375px - 430px responsive viewport centered with clean container canvas (`#F5F5FA` / `#F8FAFC`).
- **Card Hierarchy**: Solid white card containers (`#FFFFFF`) with 16px or 20px border radii and 1px inset outlines (`#DDDDE3`).
- **Docked CTA Flow**: Bottom action buttons fixed above the 64px navigation bar, cushioned with 16px horizontal margins.
- **Drawer Overlays**: Bottom sheets for secondary selections (Student switching, filter picking, bill details) anchored at bottom with drag handle.

---

## 4. Strictly Forbidden Moves (Anti-Patterns)

- ❌ Never introduce ad-hoc hex colors not defined in `ECO Design System/tokens/colors.css`.
- ❌ Never use English text for user-facing UI copy. All strings must be natural Vietnamese in sentence case.
- ❌ Never apply ALL CAPS styling (`text-transform: uppercase`) to normal buttons or headings.
- ❌ Never add heavy, dark, or multi-colored drop shadows to static list items or cards.
- ❌ Never use saturated gradients or full-bleed decorative photos behind textual content.
- ❌ Never use non-standard border-radius values (e.g. 5px, 11px, 27px); stick strictly to 4, 8, 16, 20, 30, or 9999px.
