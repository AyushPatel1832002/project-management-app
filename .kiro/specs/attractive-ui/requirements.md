# Requirements Document

## Introduction

This feature improves the visual design of the React Kanban/project management app to make it more attractive, polished, and delightful to use. The app already has a dark glassmorphism foundation (Inter font, CSS custom properties, framer-motion, lucide icons). The improvements target color system consistency, typography hierarchy, spacing rhythm, component-level polish, micro-interactions, and light/dark theme completeness — without changing any functional behavior.

## Glossary

- **UI**: The application's user interface, comprising all visible components and pages.
- **Design_System**: The shared set of CSS custom properties (tokens), utility classes, and style conventions defined in `index.css`.
- **Theme**: A named visual mode (dark or light) controlled by the `data-theme` attribute on the root element.
- **Token**: A CSS custom property (e.g. `--primary`, `--bg-dark`) that encodes a design decision.
- **Glass_Card**: Any element using the `.glass` utility class with backdrop-filter and translucent background.
- **Micro_Interaction**: A small, purposeful animation or transition that provides feedback on user actions (hover, focus, drag, open/close).
- **Dashboard**: The `Dashboard.js` page showing stats and project cards.
- **Board**: The `ProjectBoard.js` page showing Kanban columns.
- **Task_Card**: The `TaskCard.js` component representing a single task within a board column.
- **Board_Column**: The `BoardColumn.js` component representing a Kanban column.
- **Task_Modal**: The `TaskModal.js` component for creating, editing, and viewing tasks.
- **Notification_Toast**: The `NotificationList.js` component for transient status messages.
- **Login_Page**: The `LoginPage.js` authentication page.
- **Sidebar**: The layout component in `src/components/layout/` used for navigation.

---

## Requirements

### Requirement 1: Unified Design Token System

**User Story:** As a developer, I want all visual values (colors, radii, shadows, spacing, typography) defined as CSS tokens in one place, so that the UI is visually consistent and easy to maintain.

#### Acceptance Criteria

1. THE Design_System SHALL define tokens for at minimum: primary color, secondary color, accent color, background levels (dark, card, sidebar), text levels (main, muted, disabled), border, glass surface, semantic colors (success, warning, danger, info), shadow presets, border-radius presets, and spacing scale.
2. THE Design_System SHALL define a complete set of light-theme token overrides under `[data-theme='light']` such that every token used in dark mode has a corresponding light-mode value.
3. WHEN a Token value is changed in the Design_System, THE UI SHALL reflect the updated value across all components that reference that token without requiring per-component edits.
4. THE Design_System SHALL NOT use hard-coded color hex or HSL values inside component CSS files; component files SHALL reference tokens only.

---

### Requirement 2: Typography Hierarchy

**User Story:** As a user, I want clear visual hierarchy in text so that I can quickly scan and understand page content.

#### Acceptance Criteria

1. THE Design_System SHALL define a typographic scale with at minimum five named size tokens: `--text-xs` (11–12px), `--text-sm` (13–14px), `--text-base` (15–16px), `--text-lg` (18–20px), `--text-xl` (24–28px), and `--text-2xl` (30–36px).
2. THE Design_System SHALL define font-weight tokens for regular (400), medium (500), semibold (600), and bold (700–800).
3. THE Design_System SHALL define a line-height token for body text of 1.5 and for headings of 1.2.
4. WHEN rendered in a browser, THE Dashboard heading ("Hello, [name]") SHALL use `--text-2xl` and bold weight.
5. WHEN rendered in a browser, THE Task_Card title SHALL use `--text-base` and semibold weight.
6. WHEN rendered in a browser, body/description text in Task_Card and Task_Modal SHALL use `--text-sm` and regular weight with `--line-height-body`.

---

### Requirement 3: Consistent Spacing and Layout Rhythm

**User Story:** As a user, I want consistent spacing throughout the app so that the layout feels intentional and easy to read.

#### Acceptance Criteria

1. THE Design_System SHALL define a spacing scale with tokens at 4px increments from `--space-1` (4px) through `--space-10` (40px).
2. THE Dashboard stats grid SHALL use a gap of `--space-6` (24px) between cards.
3. THE Board_Column SHALL use a gap of `--space-3` (12px) between Task_Cards in the task list.
4. THE Task_Modal body SHALL use a gap of `--space-5` (20px) between form groups.
5. THE Login_Page auth card SHALL use consistent internal padding of `--space-12` (48px) on all sides.

---

### Requirement 4: Enhanced Color Palette and Visual Depth

**User Story:** As a user, I want the app to feel visually rich and modern so that using it is a pleasant experience.

#### Acceptance Criteria

1. THE Design_System SHALL define a primary gradient token `--gradient-primary` as a linear gradient from `--primary` to `--secondary`, used consistently on primary action buttons and stat icon backgrounds.
2. THE Design_System SHALL define a glow token `--primary-glow` used for box-shadow accents on interactive elements.
3. WHEN a Task_Card is in the `priority-high` state, THE Task_Card SHALL display the priority badge with a background derived from `--danger` at reduced opacity and a border derived from `--danger`.
4. WHEN a Task_Card is in the `priority-medium` state, THE Task_Card SHALL display the priority badge with a background derived from `--warning` at reduced opacity and a border derived from `--warning`.
5. WHEN a Task_Card is in the `priority-low` state, THE Task_Card SHALL display the priority badge with a background derived from `--success` at reduced opacity and a border derived from `--success`.
6. THE Board_Column SHALL display a left-border accent using `--primary` at 60% opacity to visually distinguish columns.
7. WHILE the `data-theme` attribute equals `'light'`, THE UI SHALL render all Glass_Card elements with a white-based semi-transparent background and a visible light border, maintaining readability.

---

### Requirement 5: Micro-Interactions and Animations

**User Story:** As a user, I want smooth, purposeful animations so that interactions feel responsive and polished.

#### Acceptance Criteria

1. WHEN a user hovers over a Task_Card, THE Task_Card SHALL translate upward by 4–6px and increase box-shadow depth within 300ms using a cubic-bezier ease-out curve.
2. WHEN a user hovers over a project card on the Dashboard, THE Dashboard project card SHALL translate upward by 6–8px and increase box-shadow depth within 400ms using a cubic-bezier ease-out curve.
3. WHEN a Task_Card enters the dragging state, THE Task_Card SHALL reduce opacity to 0.2 and apply a scale transform of 1.05.
4. WHEN the Task_Modal opens, THE Task_Modal SHALL animate from `opacity: 0, scale: 0.95, y: 20` to `opacity: 1, scale: 1, y: 0` using framer-motion.
5. WHEN the Task_Modal closes, THE Task_Modal SHALL animate from `opacity: 1, scale: 1, y: 0` to `opacity: 0, scale: 0.95, y: 20` using framer-motion.
6. WHEN a Notification_Toast enters the viewport, THE Notification_Toast SHALL animate from `opacity: 0, x: 50, scale: 0.9` to `opacity: 1, x: 0, scale: 1`.
7. WHEN a Notification_Toast exits the viewport, THE Notification_Toast SHALL animate from `opacity: 1` to `opacity: 0, x: 20, scale: 0.9`.
8. WHEN a user focuses an input field, THE input field SHALL transition border-color to `--primary` and apply a box-shadow using `--primary-glow` within 300ms.
9. WHEN a user hovers over a `.btn-primary` element, THE button SHALL translate upward by 2px and increase the glow shadow within 200ms.

---

### Requirement 6: Button and Form Component Polish

**User Story:** As a user, I want buttons and form inputs to look and feel refined so that interactions are clear and satisfying.

#### Acceptance Criteria

1. THE Design_System SHALL define a `.btn-primary` style with a gradient background using `--gradient-primary`, white text, `--space-3` vertical padding, `--space-5` horizontal padding, border-radius of 8px, font-weight semibold, and a glow box-shadow using `--primary-glow`.
2. THE Design_System SHALL define a `.btn-secondary` style with a glass background, `--text-main` color, matching padding to `.btn-primary`, and a border using `--glass-border`.
3. THE Design_System SHALL define a `.btn-danger` style with a background derived from `--danger` at 10% opacity, `--danger` text color, and a border derived from `--danger` at 20% opacity; WHEN hovered, THE button SHALL transition to a solid `--danger` background with white text.
4. THE Design_System SHALL define an `.input-field` style with a semi-transparent background, `--border` border, 8px border-radius, 12px vertical and 16px horizontal padding, and `--text-main` color.
5. WHEN an `.input-field` receives focus, THE input SHALL transition border-color to `--primary` and apply a glow box-shadow within 300ms.
6. THE Design_System SHALL define a `select.input-field` style that matches the `.input-field` appearance and includes a custom dropdown indicator consistent with the color scheme.

---

### Requirement 7: Sidebar and Navigation Polish

**User Story:** As a user, I want the sidebar navigation to be visually clear and attractive so that I can orient myself quickly.

#### Acceptance Criteria

1. THE Sidebar SHALL display the active navigation item with a background using `--gradient-primary` and white text.
2. WHEN a user hovers over an inactive navigation item, THE Sidebar navigation item SHALL transition background to `--glass-bg` within 200ms.
3. THE Sidebar SHALL display a visible brand/logo area at the top with the app name rendered in `--text-xl` bold weight.
4. THE Sidebar SHALL use a background of `--bg-sidebar` and a right border of 1px solid `--border`.
5. WHEN the `data-theme` is `'light'`, THE Sidebar SHALL maintain readable contrast for all navigation text using `--text-main` and `--text-muted` tokens.

---

### Requirement 8: Notification Toast Polish

**User Story:** As a user, I want notification toasts to be visually distinct and easy to read so that I notice and understand status messages.

#### Acceptance Criteria

1. THE Notification_Toast SHALL display a colored icon container whose background and icon color are derived from the semantic color token matching the notification type (`--success`, `--danger`, `--info`).
2. THE Notification_Toast SHALL use the `.glass` utility class for its background, providing backdrop-blur and a translucent surface.
3. THE Notification_Toast SHALL display a close button that transitions color from `--text-muted` to `--text-main` on hover within 200ms.
4. WHEN multiple Notification_Toasts are visible simultaneously, THE Notification_Toast container SHALL stack them vertically with a gap of `--space-3` (12px).

---

### Requirement 9: Responsive Layout Integrity

**User Story:** As a user on different screen sizes, I want the layout to remain usable and attractive so that I can work on any device.

#### Acceptance Criteria

1. WHILE the viewport width is 1024px or greater, THE Dashboard stats grid SHALL display three stat cards in a single row.
2. WHILE the viewport width is between 640px and 1023px, THE Dashboard stats grid SHALL display two stat cards per row.
3. WHILE the viewport width is less than 640px, THE Dashboard stats grid SHALL display one stat card per row.
4. THE Board horizontal scroll area SHALL remain scrollable on all viewport widths without breaking the page layout.
5. THE Login_Page auth card SHALL maintain a maximum width of 440px and SHALL be horizontally centered on all viewport widths.

---

### Requirement 10: Accessibility — Color Contrast

**User Story:** As a user with visual impairments, I want sufficient color contrast so that I can read all text and identify interactive elements.

#### Acceptance Criteria

1. THE Design_System SHALL define `--text-main` and `--text-muted` token values such that `--text-main` on `--bg-dark` achieves a contrast ratio of at least 4.5:1.
2. THE Design_System SHALL define `--text-muted` token values such that `--text-muted` on `--bg-dark` achieves a contrast ratio of at least 3:1.
3. WHEN the `data-theme` is `'light'`, THE Design_System light-theme tokens SHALL maintain the same minimum contrast ratios as the dark theme.
4. THE `.btn-primary` white text on gradient background SHALL achieve a contrast ratio of at least 4.5:1.
