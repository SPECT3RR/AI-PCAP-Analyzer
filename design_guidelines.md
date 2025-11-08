# Design Guidelines: AI-Powered PCAP Analysis Platform

## Design Approach
**Selected Approach**: Reference-Based (Cybersecurity Dashboard Category)
- **Primary Inspiration**: Kibana, Grafana, DataDog - enterprise security dashboards
- **Visual Treatment**: Dark glassmorphic aesthetic with cybersecurity/futuristic theme
- **Key Principles**: Data clarity, interactive exploration, professional credibility

## Visual Theme: Dark Glassmorphic Cybersecurity

### Color Strategy
- **Base**: Dark backgrounds (#0b0f19, #0d1117)
- **Accents**: Neon cyan (#22d3ee, #06b6d4) and purple (#a855f7, #9333ea) for highlights
- **Threat Coding**: Red (#ef4444) for malicious, Yellow/Orange (#f59e0b) for suspicious, Green/Cyan (#10b981) for benign
- **Glass Effect**: Translucent panels with `rgba(255, 255, 255, 0.05)` backgrounds

### Glass Morphism Treatment
```
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(15px)
border: 1px solid rgba(255, 255, 255, 0.2)
box-shadow: 0 4px 30px rgba(0,0,0,0.5)
border-radius: 20px
```

## Typography
- **Primary Font**: Inter or Poppins via Google Fonts
- **Headings**: 
  - H1 (Landing hero): text-4xl md:text-6xl, font-bold, gradient text (cyan to purple)
  - H2 (Section titles): text-2xl md:text-3xl, font-semibold
  - H3 (Card titles): text-xl, font-medium
- **Body**: text-base (16px), text-gray-300
- **Metrics/Numbers**: text-3xl md:text-5xl, font-bold, neon accent colors

## Layout System
**Tailwind Spacing Units**: Consistently use 4, 8, 12, 16, 20, 24, 32 (e.g., p-4, gap-8, py-20)

### Landing Page Structure
1. **Hero Section** (80-100vh):
   - Centered content with animated gradient text
   - 3-step workflow explanation cards (Upload → Analyze → Visualize)
   - Prominent "Start Analysis" CTA button
   - Subtle animated background particles or gradient mesh

2. **How It Works Section** (py-20):
   - 3-column grid (lg:grid-cols-3) with icon, title, description
   - Glass card treatment for each step

3. **Features Section** (py-20):
   - 2-column grid (md:grid-cols-2) showcasing key capabilities
   - Each feature in glass card with icon and description

4. **CTA Section** (py-24):
   - Centered with final push to start analyzing
   - Secondary text about security/privacy

### Dashboard Layout (Multi-Panel Kibana-Style)
**Top Section**: 
- Metric cards row: grid-cols-2 md:grid-cols-4, gap-4
- Each card: glass treatment, icon, large number, label, trend indicator

**Main Canvas** (2-column split on desktop, stack on mobile):
- **Left Column (60% width)**:
  - Large time-series chart panel
  - Below: 2x2 grid of smaller charts (protocol donut, volume metrics)
  
- **Right Column (40% width)**:
  - Interactive world map (full height sticky)
  - IOC table below map

**Bottom Section**:
- Expandable raw events table with pagination

## Component Library

### Navigation
- Top nav bar: glass background, sticky position
- Left: App logo + filename badge
- Right: Upload button (neon cyan), time range selector, settings icon
- All nav elements use glass button style with hover glow

### Upload Panel
- Centered modal or full-screen overlay
- Dashed border dropzone with hover state
- File icon animation on drag-over
- Progress bar with neon gradient during upload
- Smooth fade-in/out transitions

### Metric Cards
- Glass background with subtle glow
- Icon in top-left (neon colored)
- Large number display with counting animation
- Small label below
- Optional trend indicator (↑↓ with color)

### Charts
- **Time Series**: Plotly area chart with gradient fill, neon stroke
- **Donuts**: Plotly pie with dark background, neon segment colors
- **Bars**: Horizontal bars with rounded ends, gradient fills
- All charts: transparent backgrounds, white/cyan gridlines

### Interactive Map
- React-Leaflet with dark map tiles (CartoDB Dark Matter or similar)
- Per-IP markers: circle markers sized by traffic volume, colored by threat score
- Marker clustering for dense areas
- Hover tooltip: glass card with IP details
- Country choropleth overlay option with opacity

### IOC Table
- Glass panel container
- Header with search bar and filter dropdowns
- Sortable columns with arrow indicators
- Color-coded threat badges (pill-shaped with glow)
- Hover row highlight with subtle glow
- Pagination at bottom

### Buttons
- **Primary CTA**: Solid neon cyan background, white text, rounded-lg, hover glow effect
- **Secondary**: Glass background with neon border, neon text, hover fill
- **Floating Action (PDF)**: Fixed bottom-right, rounded-full, shadow-xl, neon gradient

## Animations (Framer Motion - Minimal & Purposeful)

### Landing Page
- Hero text: Fade-in from bottom with stagger
- Feature cards: Staggered fade-in on scroll
- CTA button: Subtle pulse glow animation

### Dashboard Transitions
- Upload → Dashboard: Smooth fade + slide transition
- Metric cards: Count-up animation on load
- Chart reveals: Fade-in with 200ms delay

### Interactions
- Card hover: Subtle lift (translateY -2px) + glow increase
- Button hover: Brightness increase + scale 1.02
- Map marker click: Bounce animation, open side drawer with slide-in

**Animation Principle**: Use sparingly for delight, never distract from data exploration

## Responsive Breakpoints
- Mobile (< 768px): Single column, stacked panels
- Tablet (768px - 1024px): 2-column layouts where appropriate
- Desktop (> 1024px): Full multi-panel layout with sidebars

## Images
**Landing Hero**: Abstract cybersecurity network visualization (neural network nodes, data flows, shield iconography) with dark blue/purple gradient overlay - 1920x1080px, positioned as background with overlay content
**Placement**: Use as hero background with glassmorphic content overlay, not as separate section