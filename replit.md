# AI-PCAP Analyzer

## Overview

AI-PCAP Analyzer is a full-stack web application that provides AI-powered analysis of network packet capture (PCAP) files. The platform enables security analysts to upload PCAP files and receive automated threat detection, visualization of geographic distribution, and comprehensive Indicator of Compromise (IOC) exploration through an interactive, cybersecurity-themed dashboard.

The application features a dark glassmorphic UI inspired by enterprise security platforms like Kibana and Grafana, with animated transitions and real-time data visualization capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React + TypeScript + Vite
- **UI Framework**: Radix UI primitives with shadcn/ui component system
- **Styling**: TailwindCSS with custom dark glassmorphic theme
- **Animation**: Framer Motion for page transitions and UI interactions
- **State Management**: React Query (@tanstack/react-query) for server state
- **Form Handling**: React Hook Form with Zod validation

**Design System**:
- Dark mode-first approach with neon cyan/purple accent colors
- Glassmorphic card components with backdrop blur effects
- Threat-level color coding (red for malicious, yellow/orange for suspicious, green/cyan for benign)
- Custom font stack including Inter/Poppins for UI, DM Sans, and Geist Mono for code
- Responsive layout with mobile-first breakpoints

**Application Flow**:
1. Landing page with animated hero section explaining the platform
2. Upload panel with drag-and-drop PCAP file support
3. Dashboard view displaying analysis results with interactive components:
   - Metric cards for key statistics
   - Time-series charts (placeholder for Plotly.js integration)
   - Geographic map visualization (placeholder for React-Leaflet)
   - IOC table with search, filter, and sort capabilities

**Component Architecture**:
- Atomic design pattern with reusable UI components in `/client/src/components/ui`
- Feature components in `/client/src/components` (MetricCard, ChartsPanel, MapView, IOCTable)
- Page-level components in `/client/src/pages`
- Example components for development/testing in `/client/src/components/examples`

### Backend Architecture

**Technology Stack**: Node.js + Express + TypeScript
- **Runtime**: tsx for development, esbuild for production builds
- **File Upload**: Multer middleware for PCAP file handling (100MB limit, .pcap/.pcapng validation)
- **ORM**: Drizzle ORM for type-safe database operations
- **Development**: Vite middleware integration for HMR in development

**API Design**:
- RESTful endpoint: `POST /api/analyze` accepts PCAP file uploads
- File validation enforces PCAP/PCAPNG formats only
- Response includes analysis ID and summary data (packets, IPs, prediction, confidence)

**PCAP Analysis Module** (`server/pcap-analyzer.ts`):
- Currently implements mock analysis for demonstration
- Designed to integrate real PCAP parsing (PyShark/Scapy planned)
- Generates randomized threat data including:
  - Attack type predictions (DDoS, Port Scan, Brute Force, Malware C2, Data Exfiltration)
  - Geographic IP distribution across multiple countries
  - IOC generation (IPs, domains, hashes) with threat scoring

**Data Storage Strategy**:
- Dual storage implementation: DbStorage (PostgreSQL) and MemStorage (in-memory)
- Storage abstraction through IStorage interface enables flexible deployment
- Analysis results persist with metadata: filename, filesize, packets, IPs, predictions, geo data, IOCs

### Data Storage

**Database**: PostgreSQL via Neon serverless
- **Schema** (`shared/schema.ts`):
  - `pcap_analyses` table stores analysis results
  - UUID primary keys
  - JSONB columns for flexible geo_data and IOCs storage
  - Timestamp tracking for upload history

**Schema Design Rationale**:
- JSONB chosen for geo_data and IOCs to accommodate variable-length arrays without complex joins
- Real/Float types for malicious_percent and confidence scores
- Integer types for countable metrics (packets, IPs, filesize)

### External Dependencies

**Development Infrastructure**:
- **Replit Platform**: Monorepo hosting with integrated development environment
- **Vite Plugins**: 
  - @replit/vite-plugin-runtime-error-modal for error overlays
  - @replit/vite-plugin-cartographer and dev-banner for Replit integration

**Database Services**:
- **Neon PostgreSQL**: Serverless PostgreSQL via @neondatabase/serverless
- **Drizzle Kit**: Database migrations and schema management

**File Upload**:
- **Multer**: Multipart form data handling for PCAP file uploads
- Memory storage strategy (files not persisted to disk)

**UI Component Libraries**:
- **Radix UI**: Unstyled, accessible component primitives (20+ components)
- **shadcn/ui**: Pre-styled component system built on Radix
- **Lucide React**: Icon library for consistent iconography

**Planned Integrations** (referenced in design docs but not yet implemented):
- **Plotly.js**: Interactive chart rendering for time-series and distribution visualizations
- **React-Leaflet + OpenStreetMap**: Geographic map visualization with threat markers
- **MaxMind GeoLite2**: IP geolocation database for real IP-to-location mapping
- **PyShark/Scapy**: Actual PCAP file parsing (currently mocked)
- **ML Model**: Trained model (joblib/pickle) for threat classification

**Session Management**:
- connect-pg-simple for PostgreSQL-backed session storage (dependency present but not actively used)

**Build Tools**:
- esbuild for server-side bundling
- PostCSS with Tailwind and Autoprefixer for CSS processing