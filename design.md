# Design Document

## Overview

Pring Land Digital Platform adalah sistem web interaktif berbasis React.js + TypeScript yang memungkinkan investor melihat ketersediaan unit lahan secara real-time, marketing agent melakukan booking langsung, dan superadmin mengelola inventori serta membuat project baru menggunakan canvas editor visual. Platform ini menggunakan Supabase sebagai backend (database + auth + storage) dan di-deploy di Vercel untuk performa optimal.

### Integration Strategy

**IMPORTANT:** This feature will be integrated into the **existing Pring Land React application** (NOT the Angular app in `digital-siteplan/` folder). The implementation will:

1. **Replace** `components/SitePlanPage.tsx` with new interactive siteplan components
2. **Reuse** existing components: `Header.tsx`, `Footer.tsx`, `BookingModal.tsx`
3. **Follow** existing design system:
   - Primary color: Emerald #10b981 (brand-primary)
   - Regional colors: Jogja Gold (#f59e0b), Bogor Teal (#06b6d4), Borneo Orange (#f97316)
   - Serif fonts (Georgia/Garamond) for headings, Sans-serif for body
   - Tailwind CSS v4 utilities with existing classes
   - Existing shadow-lg, rounded-xl, border styles
4. **Maintain** current routing structure in `App.tsx` (no React Router changes needed for public pages)
5. **Integrate** with existing navigation (Header component with onNavigate prop)
6. **Add** Supabase for backend (currently using mock data in `src/services/dataService.ts`)
7. **Keep** `/siteplan/*` routes for marketing/admin (already implemented in `SiteplanLayout.tsx`)

### Key Design Principles

1. **Mobile-First Responsive**: Dioptimalkan untuk layar HP dengan target market usia 45+
2. **Senior-Friendly**: Font besar, touch target luas, high contrast
3. **Real-time Sync**: Status unit update instant menggunakan Supabase Realtime
4. **Adaptive Rendering**: Satu komponen MapRenderer yang polymorphic untuk 3 layout types
5. **Visual Accuracy**: Canvas editor dengan background image upload untuk tracing presisi
6. **Performance**: SVG rendering untuk curved layout, virtualization untuk linear layout

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Public Web (Investor)    │  Marketing Dashboard  │  Admin  │
│  - Project Selection      │  - Login              │  - Login│
│  - Masterplan View        │  - Dashboard          │  - User │
│  - Detail Unit View       │  - Booking Management │    Mgmt │
│  - WhatsApp Booking       │  - Mark as Sold       │  - Canvas│
│                           │                       │    Editor│
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  React.js + TypeScript + Tailwind CSS                       │
│  - MapRenderer Component (Polymorphic)                      │
│  - Canvas Editor Component                                   │
│  - Auth Context (Supabase Auth)                             │
│  - Real-time Subscription Hooks                             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  Supabase                                                    │
│  - PostgreSQL Database                                       │
│  - Supabase Auth (JWT)                                      │
│  - Supabase Storage (Files)                                 │
│  - Supabase Realtime (WebSocket)                            │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Vercel (Hosting + CDN + Auto Deploy from Git)              │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React.js 18+ with TypeScript
- Tailwind CSS for styling with custom senior-friendly design tokens
- React Router for navigation
- Zustand for state management
- React Query for data fetching and caching
- Framer Motion for smooth animations (300ms+ duration for senior users)
- React DnD (Drag and Drop) for project reordering and canvas editor

**Backend:**
- Supabase PostgreSQL for database
- Supabase Auth for authentication (JWT-based)
- Supabase Storage for file uploads (KTP, KK, background images)
- Supabase Realtime for WebSocket-based live updates

**Rendering:**
- SVG for curved layouts (Patuk)
- React Virtuoso for virtualized scrolling (Jogja linear layout)
- HTML Canvas for Canvas Editor drag operations

**Design System:**
- Custom Pring Land brand colors (green palette: #22C55E, #16A34A, #15803D)
- Inter font family for clean, readable typography
- WCAG AA compliant color contrast ratios

**Deployment:**
- Vercel for hosting and automatic deployments
- GitHub for version control

## Components and Interfaces

### Brand Identity and Visual Design

**Design Rationale:** The platform uses Pring Land's agricultural brand identity to create trust and professionalism. The green color palette represents growth and nature, while the clean typography ensures readability for senior users.

**Brand Colors:**
```typescript
const pringLandColors = {
  primary: {
    light: '#22C55E',  // Bright green for highlights
    main: '#16A34A',   // Primary green for buttons and accents
    dark: '#15803D',   // Dark green for hover states
  },
  status: {
    available: '#FFFFFF',  // White with dark border
    booking: '#EAB308',    // Yellow
    sold: '#DC2626',       // Red
  },
  neutral: {
    background: '#F9FAFB', // Off-white to reduce eye strain
    text: '#111827',       // Near-black for high contrast
    border: '#374151',     // Dark gray for borders
  },
};
```

**Typography:**
```typescript
const pringLandTypography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

**Visual Elements:**
- Rounded corners (8px for cards, 6px for buttons)
- Soft shadows for depth (shadow-md for cards, shadow-sm for buttons)
- Organic textures for siteplan backgrounds (subtle green gradients)
- Agricultural-themed icons (house/building with farm aesthetic)
- Simple line icons for facilities with green accents
- Bottom navigation bar on mobile for thumb-friendly access
- Light background with subtle grid pattern for canvas editor

### Core Components

#### 1. MapRenderer (Polymorphic Component)

Komponen utama yang dapat merender 3 tipe layout berbeda berdasarkan konfigurasi.

```typescript
interface MapRendererProps {
  projectId: string;
  layoutType: 'grid' | 'linear' | 'curved';
  layoutConfig: GridConfig | LinearConfig | CurvedConfig;
  units: Unit[];
  mode: 'public' | 'marketing' | 'admin';
  onUnitClick?: (unit: Unit) => void;
  onUnitSelect?: (units: Unit[]) => void; // For admin drag selection
}

interface GridConfig {
  rows: number;
  cols: number;
  rotation?: number; // degrees
  spacing: { x: number; y: number };
}

interface LinearConfig {
  orientation: 'horizontal' | 'vertical';
  spacing: number;
  enableVirtualization: boolean;
}

interface CurvedConfig {
  rows: CurvedRow[];
}

interface CurvedRow {
  arcRadius: number;
  startAngle: number;
  endAngle: number;
  units: number;
}
```

**Rendering Strategy:**
- Grid: CSS Grid dengan transform rotation
- Linear: Flexbox dengan React Virtuoso untuk performance
- Curved: SVG path calculations dengan `<path>` elements

#### 2. UnitElement Component

Komponen individual untuk setiap unit lahan.

```typescript
interface UnitElementProps {
  unit: Unit;
  size: { width: number; height: number };
  position: { x: number; y: number };
  onClick?: () => void;
  isSelected?: boolean;
  isHovered?: boolean;
  mode: 'public' | 'marketing' | 'admin';
  seniorMode?: boolean; // Enables larger touch targets and fonts
}
```

**Senior-Friendly Features:**
- Minimum touch target: 56x56px
- Unit number font: 20px bold
- High contrast borders (3px solid)
- Hover state with 300ms transition
- Active state with scale(1.05) for visual feedback

#### 3. CanvasEditor Component

Visual editor untuk superadmin membuat dan mengedit project dengan background image tracing.

```typescript
interface CanvasEditorProps {
  projectId: string;
  initialElements: CanvasElement[];
  backgroundImage?: BackgroundImageConfig;
  onSave: (elements: CanvasElement[], background?: BackgroundImageConfig) => Promise<void>;
}

interface BackgroundImageConfig {
  url: string;
  opacity: number; // 0-100
  visible: boolean;
}

interface CanvasElement {
  id: string;
  type: 'block' | 'facility' | 'unit' | 'decoration';
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  properties: BlockProperties | FacilityProperties | UnitProperties | DecorationProperties;
}

interface BlockProperties {
  name: string;
  color: string;
  unitCapacity: number;
}

interface FacilityProperties {
  name: string;
  iconType: 'office' | 'warehouse' | 'shopping' | 'security' | 'parking' | 'custom';
  size: 'small' | 'medium' | 'large';
}

interface UnitProperties {
  unitNumber: string;
  luasLahan: number;
  luasUnit: number;
  commodityType?: string;
  livestockType?: string;
  status: 'available' | 'booking' | 'sold';
}

interface DecorationProperties {
  decorationType: 'green-area' | 'road' | 'water' | 'label';
  label?: string;
  color?: string;
  fontSize?: number;
  rotation?: number;
}

interface BulkUnitGeneratorConfig {
  quantity: number;
  startingNumber: number;
  arrangement: 'grid' | 'row' | 'arc';
  spacing: number;
  // For grid arrangement
  rows?: number;
  cols?: number;
  // For arc arrangement
  arcRadius?: number;
  startAngle?: number;
  endAngle?: number;
}
```

**Canvas Editor Features:**
- **Background Image Management:**
  - Upload button accepting JPG, PNG, SVG (max 10MB)
  - Real-time opacity slider (0-100%)
  - Toggle visibility button
  - Delete with confirmation dialog
  - Background always renders at z-index 0 (bottom layer)
  - Background only visible in editor, never in public view
- **Element Placement:**
  - Drag-and-drop from toolbar to canvas
  - Multi-select with drag rectangle
  - Click to select individual elements
  - Properties panel for element editing
- **Bulk Unit Generator:**
  - Grid arrangement with rows/cols configuration
  - Row arrangement with spacing
  - Arc arrangement with radius and angle controls
  - Sequential unit numbering
- **Advanced Features:**
  - Undo/redo functionality (Ctrl+Z / Ctrl+Y)
  - Auto-save every 30 seconds
  - Keyboard shortcuts for common actions
  - Snap-to-grid option for precise alignment
  - Zoom controls for detailed editing

#### 4. ProjectSelector Component

Homepage untuk memilih project dengan visibility controls dan custom ordering.

```typescript
interface ProjectSelectorProps {
  projects: Project[];
  onProjectSelect: (projectId: string) => void;
  userRole?: 'public' | 'marketing' | 'admin';
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  seniorMode?: boolean;
  showAdminControls?: boolean;
}

interface ProjectCardData {
  id: string;
  name: string;
  location: string;
  thumbnailUrl?: string;
  totalArea: number;
  totalUnits: number;
  availableUnits: number;
  isFeatured: boolean;
  displayOrder: number;
  status: 'draft' | 'published' | 'hidden';
}
```

**Senior-Friendly Features:**
- Large project cards (minimum 280px height)
- Font size 24px for project name
- Font size 18px for location and stats
- High contrast thumbnail borders (3px solid)
- Touch target 100% of card area
- Clear "Sold Out" badge with 18px font and high contrast
- Featured projects with highlighted border (4px solid green)
- Generous spacing between cards (24px gap)

**Admin Features:**
- Drag-and-drop reordering interface
- Status toggle (Draft/Published/Hidden)
- Featured project toggle
- Quick edit button for project settings

#### 5. BookingModal Component

Modal untuk marketing agent melakukan booking.

```typescript
interface BookingModalProps {
  unit: Unit;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingData) => Promise<void>;
  marketingAgentId: string;
}

interface BookingData {
  unitId: string;
  namaCalonPembeli: string;
  nomorHP: string;
  kkFile: File;
  ktpFile: File;
  catatan?: string;
}
```

**Senior-Friendly Features:**
- Large input fields (56px height)
- Clear labels above fields (16px font)
- Large file upload buttons (64px height)
- Error messages with icons and 18px font
- Action buttons 56px height with 18px font

#### 6. SeniorFriendlyTheme Provider

Context provider untuk mengatur senior-friendly design tokens.

```typescript
interface SeniorThemeConfig {
  fontSize: {
    body: string; // 18px
    label: string; // 16px
    heading: string; // 24px
    unitNumber: string; // 20px
    button: string; // 18px
  };
  spacing: {
    touchTarget: string; // 56px
    elementGap: string; // 16px
    buttonHeight: string; // 56px
  };
  colors: {
    background: string; // #F9FAFB (off-white)
    text: string; // #111827 (near-black)
    primary: string; // #16A34A (green)
    available: string; // #FFFFFF with #374151 border
    booking: string; // #EAB308 (yellow)
    sold: string; // #DC2626 (red)
  };
  contrast: {
    normalText: number; // 4.5:1
    largeText: number; // 3:1
  };
  animation: {
    duration: string; // 300ms
    easing: string; // ease-in-out
  };
}
```

### Component Hierarchy

```
App
├── AuthProvider (Supabase Auth Context)
├── SeniorThemeProvider
├── ConnectionMonitor (Network status)
└── Router
    ├── PublicRoutes
    │   ├── Homepage
    │   │   └── ProjectSelector
    │   │       ├── ProjectCard (with sold out badge)
    │   │       └── FeaturedProjectCard (highlighted)
    │   └── ProjectView
    │       ├── MasterplanView
    │       │   └── MapRenderer (mode: public, no background)
    │       └── DetailUnitView
    │           ├── MapRenderer (mode: public)
    │           └── UnitDetailModal
    │               └── WhatsAppBookingButton
    ├── MarketingRoutes (Protected)
    │   ├── MarketingLogin
    │   ├── MarketingDashboard
    │   │   ├── SummaryCards
    │   │   └── BookingTable
    │   │       ├── StatusFilter
    │   │       ├── SearchBar
    │   │       └── BookingRow
    │   └── MarketingMapView
    │       ├── MapRenderer (mode: marketing)
    │       ├── BookingModal
    │       │   ├── FileUploadField (KK)
    │       │   └── FileUploadField (KTP)
    │       └── SoldModal
    │           └── CRMForm
    └── AdminRoutes (Protected)
        ├── AdminLogin
        ├── DashboardInventori
        │   ├── ProjectSelector
        │   └── CanvasEditor
        │       ├── Toolbar
        │       │   ├── BackgroundImageUpload
        │       │   ├── OpacitySlider
        │       │   ├── ToggleBackgroundButton
        │       │   ├── ElementCategories
        │       │   └── BulkUnitGenerator
        │       ├── Canvas (with background image layer)
        │       │   ├── BackgroundImageLayer (z-index: 0)
        │       │   └── ElementsLayer (z-index: 1+)
        │       ├── MapRenderer (mode: admin)
        │       └── PropertiesPanel
        ├── MarketingAccountManagement
        │   ├── AccountList
        │   └── CreateAccountForm
        └── ProjectManagement
            ├── ProjectList (with drag-and-drop reordering)
            │   ├── ProjectRow
            │   │   ├── StatusToggle (draft/published/hidden)
            │   │   ├── FeaturedToggle
            │   │   └── DeleteButton
            │   └── DragHandle
            ├── CreateProjectForm
            └── ProjectSettings
```

## Data Models

### Database Schema (Supabase PostgreSQL)

#### Table: projects

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255), -- e.g., "Kalimantan", "Yogyakarta"
  description TEXT,
  total_area DECIMAL(10,2), -- in hectares
  layout_type VARCHAR(20) CHECK (layout_type IN ('grid', 'linear', 'curved')),
  layout_config JSONB NOT NULL, -- GridConfig | LinearConfig | CurvedConfig
  background_image_url TEXT,
  background_opacity INTEGER DEFAULT 50 CHECK (background_opacity BETWEEN 0 AND 100),
  background_visible BOOLEAN DEFAULT true, -- Only for canvas editor
  thumbnail_url TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_featured ON projects(is_featured);

-- Function to calculate available units count
CREATE OR REPLACE FUNCTION get_available_units_count(project_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM units
  WHERE units.project_id = $1 AND units.status = 'available';
$$ LANGUAGE SQL STABLE;

-- Function to get total units count
CREATE OR REPLACE FUNCTION get_total_units_count(project_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM units
  WHERE units.project_id = $1;
$$ LANGUAGE SQL STABLE;
```

#### Table: canvas_elements

```sql
CREATE TABLE canvas_elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  element_type VARCHAR(20) CHECK (element_type IN ('block', 'facility', 'unit', 'decoration')),
  position JSONB NOT NULL, -- {x, y}
  size JSONB NOT NULL, -- {width, height}
  properties JSONB NOT NULL, -- BlockProperties | FacilityProperties | etc
  z_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_canvas_elements_project ON canvas_elements(project_id);
CREATE INDEX idx_canvas_elements_type ON canvas_elements(element_type);
```

#### Table: units

```sql
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  block_id UUID REFERENCES canvas_elements(id) ON DELETE SET NULL,
  unit_number VARCHAR(50) NOT NULL,
  luas_lahan DECIMAL(10,2), -- in m²
  luas_unit DECIMAL(10,2), -- in m²
  commodity_type VARCHAR(100), -- for Borneo
  livestock_type VARCHAR(100), -- for Jogja/Patuk
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'booking', 'sold')),
  position JSONB, -- {x, y} for rendering
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, unit_number)
);

CREATE INDEX idx_units_project ON units(project_id);
CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_block ON units(block_id);
```

#### Table: bookings

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  marketing_agent_id UUID REFERENCES auth.users(id),
  nama_calon_pembeli VARCHAR(255) NOT NULL,
  nomor_hp VARCHAR(50) NOT NULL,
  kk_file_url TEXT,
  ktp_file_url TEXT,
  catatan TEXT,
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bookings_unit ON bookings(unit_id);
CREATE INDEX idx_bookings_marketing ON bookings(marketing_agent_id);
```

#### Table: transactions

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  marketing_agent_id UUID REFERENCES auth.users(id),
  nama_pembeli VARCHAR(255) NOT NULL,
  nomor_hp VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  alamat TEXT,
  tanggal_transaksi DATE NOT NULL,
  nominal_transaksi DECIMAL(15,2) NOT NULL,
  nomor_spjk VARCHAR(100),
  metode_pembayaran VARCHAR(50),
  bukti_pembayaran_url TEXT,
  commission_amount DECIMAL(15,2), -- calculated from nominal_transaksi
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_transactions_unit ON transactions(unit_id);
CREATE INDEX idx_transactions_marketing ON transactions(marketing_agent_id);
CREATE INDEX idx_transactions_date ON transactions(tanggal_transaksi);
```

#### Table: marketing_agents (extends auth.users)

```sql
CREATE TABLE marketing_agents (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  last_login TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id), -- superadmin who created this account
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_marketing_agents_status ON marketing_agents(status);
```

### TypeScript Interfaces

```typescript
interface Project {
  id: string;
  name: string;
  slug: string;
  location?: string;
  description?: string;
  totalArea: number;
  layoutType: 'grid' | 'linear' | 'curved';
  layoutConfig: GridConfig | LinearConfig | CurvedConfig;
  backgroundImageUrl?: string;
  backgroundOpacity?: number; // 0-100
  backgroundVisible?: boolean;
  thumbnailUrl?: string;
  status: 'draft' | 'published' | 'hidden';
  displayOrder: number;
  isFeatured: boolean;
  totalUnits?: number; // Calculated field
  availableUnits?: number; // Calculated field
  createdAt: string;
  updatedAt: string;
}

interface Unit {
  id: string;
  projectId: string;
  blockId?: string;
  unitNumber: string;
  luasLahan: number;
  luasUnit: number;
  commodityType?: string;
  livestockType?: string;
  status: 'available' | 'booking' | 'sold';
  position?: { x: number; y: number };
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  id: string;
  unitId: string;
  marketingAgentId: string;
  namaCalonPembeli: string;
  nomorHP: string;
  kkFileUrl?: string;
  ktpFileUrl?: string;
  catatan?: string;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  unitId: string;
  bookingId?: string;
  marketingAgentId: string;
  namaPembeli: string;
  nomorHP: string;
  email?: string;
  alamat?: string;
  tanggalTransaksi: string;
  nominalTransaksi: number;
  nomorSPJK?: string;
  metodePembayaran?: string;
  buktiPembayaranUrl?: string;
  commissionAmount?: number;
  createdAt: string;
  updatedAt: string;
}

interface MarketingAgent {
  id: string;
  name: string;
  phoneNumber?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
```

### Real-time Subscriptions

```typescript
// Subscribe to unit status changes
const subscribeToUnits = (projectId: string, callback: (unit: Unit) => void) => {
  return supabase
    .channel(`units:project_id=eq.${projectId}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'units', filter: `project_id=eq.${projectId}` },
      (payload) => callback(payload.new as Unit)
    )
    .subscribe();
};

// Subscribe to booking changes for marketing dashboard
const subscribeToBookings = (marketingAgentId: string, callback: (booking: Booking) => void) => {
  return supabase
    .channel(`bookings:marketing_agent_id=eq.${marketingAgentId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'bookings', filter: `marketing_agent_id=eq.${marketingAgentId}` },
      (payload) => callback(payload.new as Booking)
    )
    .subscribe();
};
```


## Error Handling

### Error Handling Strategy

#### 1. Network Errors

**Design Rationale:** Network failures are common on mobile devices. The system implements automatic retry with exponential backoff and queues operations for later execution to ensure data integrity.

```typescript
interface NetworkErrorHandler {
  onConnectionLost: () => void;
  onConnectionRestored: () => void;
  retryStrategy: {
    maxRetries: number;
    backoffMs: number;
  };
}

// Implementation
const handleSupabaseError = async (error: PostgrestError, operation: () => Promise<any>) => {
  if (error.code === 'PGRST301') { // Connection error
    showToast('Tidak dapat terhubung ke server, silakan coba lagi', 'error');
    // Queue operation for retry
    await queueOperation(operation);
  } else {
    showToast('Terjadi kesalahan, silakan coba lagi', 'error');
    logError(error);
  }
};

// Connection monitoring
const useConnectionMonitor = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast('Koneksi pulih, melanjutkan operasi...', 'success');
      processQueuedOperations();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      showToast('Koneksi terputus, operasi akan diulang otomatis', 'warning');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
};
```

#### 2. File Upload Errors

```typescript
const handleFileUpload = async (file: File, maxSizeMB: number = 5) => {
  // Validate file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`Ukuran file maksimal ${maxSizeMB}MB`);
  }
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Format file harus JPG, PNG, atau PDF');
  }
  
  try {
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${Date.now()}_${file.name}`, file);
    
    if (error) throw error;
    return data.path;
  } catch (error) {
    showToast('Gagal mengupload file, silakan coba lagi', 'error');
    throw error;
  }
};
```

#### 3. Authentication Errors

```typescript
const handleAuthError = (error: AuthError) => {
  switch (error.message) {
    case 'Invalid login credentials':
      showToast('Email atau password salah', 'error');
      break;
    case 'Email not confirmed':
      showToast('Silakan konfirmasi email Anda terlebih dahulu', 'error');
      break;
    case 'User already registered':
      showToast('Email sudah terdaftar', 'error');
      break;
    default:
      showToast('Terjadi kesalahan saat login', 'error');
      logError(error);
  }
};
```

#### 4. Data Validation Errors

```typescript
const validateBookingData = (data: BookingData): ValidationResult => {
  const errors: string[] = [];
  
  if (!data.namaCalonPembeli.trim()) {
    errors.push('Nama calon pembeli harus diisi');
  }
  
  if (!/^(\+62|62|0)[0-9]{9,12}$/.test(data.nomorHP)) {
    errors.push('Nomor HP tidak valid');
  }
  
  if (!data.kkFile) {
    errors.push('File KK harus diupload');
  }
  
  if (!data.ktpFile) {
    errors.push('File KTP harus diupload');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

#### 5. Rendering Errors

**Design Rationale:** Invalid unit data should not crash the entire map. The system logs errors and skips problematic units while rendering the rest successfully.

```typescript
// Error boundary for graceful degradation
class MapRendererErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, errorInfo);
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <p className="text-lg text-gray-700">
            Gagal memuat peta. Silakan refresh halaman.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg text-lg"
          >
            Refresh Halaman
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Graceful handling of invalid unit data
const renderUnitsWithErrorHandling = (units: Unit[]) => {
  return units.map(unit => {
    try {
      // Validate unit data
      if (!unit.id || !unit.unitNumber || !unit.status) {
        console.error('Invalid unit data:', unit);
        return null; // Skip this unit
      }
      
      return <UnitElement key={unit.id} unit={unit} />;
    } catch (error) {
      console.error('Error rendering unit:', unit.id, error);
      return null; // Skip this unit
    }
  }).filter(Boolean); // Remove null entries
};

// Project data loading with error handling
const useProjectData = (projectId: string) => {
  const [data, setData] = useState<Project | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data: project, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
        
        if (error) throw error;
        setData(project);
      } catch (err) {
        setError(err as Error);
        showToast('Gagal memuat data project, silakan coba lagi', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [projectId]);
  
  return { data, error, isLoading };
};
```

#### 6. WhatsApp Fallback

**Design Rationale:** Not all users have WhatsApp app installed. The system attempts to open the native app first, then gracefully falls back to web.whatsapp.com to ensure booking flow is never blocked.

```typescript
const openWhatsAppBooking = (unit: Unit, project: Project) => {
  const message = generateWhatsAppMessage(unit, project);
  const phoneNumber = '6281234567890'; // Pring Land official number
  
  // Try to open WhatsApp app first
  const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
  // Fallback to web.whatsapp.com if app not installed
  const webWhatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
  const link = document.createElement('a');
  link.href = whatsappUrl;
  link.click();
  
  // Fallback after 2 seconds if app didn't open
  setTimeout(() => {
    window.open(webWhatsappUrl, '_blank');
  }, 2000);
};

// Generate WhatsApp message based on project type
const generateWhatsAppMessage = (unit: Unit, project: Project): string => {
  const projectName = project.name;
  const unitNumber = unit.unitNumber;
  
  if (project.slug === 'borneo') {
    const commodity = unit.commodityType || 'Unit';
    return `Halo, saya mau booking kavling ${commodity} ${unitNumber} di Pring Land Borneo`;
  } else if (project.slug === 'jogja') {
    const livestock = unit.livestockType || 'Unit';
    return `Halo, saya mau booking unit ${livestock} ${unitNumber} di Pring Land Jogja`;
  } else if (project.slug === 'patuk') {
    const livestock = unit.livestockType || 'Unit';
    return `Halo, saya mau booking unit ${livestock} ${unitNumber} di Pring Land Patuk`;
  } else {
    return `Halo, saya mau booking unit ${unitNumber} di ${projectName}`;
  }
};
```

### Senior-Friendly Error Messages

All error messages must follow these guidelines:
- Use large font (18px minimum)
- Include icon indicators (not just color)
- Use simple, clear Indonesian language
- Provide actionable next steps
- Display for minimum 5 seconds (longer than standard 3 seconds)
- Use high contrast colors (red #DC2626 on white background)

```typescript
interface SeniorFriendlyToast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number; // minimum 5000ms for seniors
  icon: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}
```

## Testing Strategy

### Unit Testing

**Framework:** Vitest + React Testing Library

**Coverage Areas:**
1. Component rendering with different props
2. User interactions (clicks, form submissions)
3. Data validation functions
4. Error handling logic
5. Utility functions (SVG path calculations, coordinate transformations)

**Example Unit Tests:**

```typescript
describe('UnitElement Component', () => {
  it('should render unit with correct status color', () => {
    const unit = { ...mockUnit, status: 'available' };
    render(<UnitElement unit={unit} />);
    expect(screen.getByTestId('unit-element')).toHaveClass('bg-white');
  });
  
  it('should have minimum 56px touch target for senior users', () => {
    render(<UnitElement unit={mockUnit} seniorMode={true} />);
    const element = screen.getByTestId('unit-element');
    expect(element).toHaveStyle({ minWidth: '56px', minHeight: '56px' });
  });
  
  it('should display unit number with 20px font in senior mode', () => {
    render(<UnitElement unit={mockUnit} seniorMode={true} />);
    const unitNumber = screen.getByText(mockUnit.unitNumber);
    expect(unitNumber).toHaveClass('text-xl'); // 20px in Tailwind
  });
});

describe('BookingData Validation', () => {
  it('should reject empty nama pembeli', () => {
    const data = { ...mockBookingData, namaCalonPembeli: '' };
    const result = validateBookingData(data);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Nama calon pembeli harus diisi');
  });
  
  it('should accept valid Indonesian phone numbers', () => {
    const validNumbers = ['081234567890', '6281234567890', '+6281234567890'];
    validNumbers.forEach(number => {
      const data = { ...mockBookingData, nomorHP: number };
      const result = validateBookingData(data);
      expect(result.isValid).toBe(true);
    });
  });
});

describe('SVG Path Calculations for Curved Layout', () => {
  it('should calculate correct arc positions for units', () => {
    const config: CurvedRow = {
      arcRadius: 200,
      startAngle: 0,
      endAngle: 180,
      units: 10
    };
    const positions = calculateArcPositions(config);
    expect(positions).toHaveLength(10);
    expect(positions[0].x).toBeCloseTo(200); // Start at radius
    expect(positions[9].x).toBeCloseTo(-200); // End at -radius
  });
});
```

### Property-Based Testing

**Framework:** fast-check (JavaScript property-based testing library)

**Why Property-Based Testing:**
Property-based testing generates hundreds of random inputs to verify that universal properties hold across all valid inputs. This is especially valuable for:
- Layout calculations that must work for any configuration
- Data validation that must handle all edge cases
- Real-time sync that must maintain consistency
- File uploads with various sizes and formats

**Configuration:**
- Minimum 100 iterations per property test
- Each property test must reference its corresponding correctness property from design document
- Tag format: `// Feature: pring-land-interactive-siteplan, Property X: [property text]`

### Integration Testing

**Framework:** Playwright for E2E testing

**Test Scenarios:**
1. Complete investor journey: select project → view masterplan → zoom to detail → click unit → WhatsApp redirect
2. Marketing agent workflow: login → view dashboard → book unit → mark as sold
3. Superadmin workflow: login → create project → add units via canvas editor → publish
4. Real-time sync: open two browser windows, update unit status in admin, verify public web updates
5. Senior-friendly interactions: test with large touch targets, verify font sizes, check contrast ratios

**Senior-Friendly Testing:**
- Test on actual mobile devices with screen readers
- Verify minimum touch target sizes (56x56px)
- Validate color contrast ratios using axe-core
- Test with browser zoom at 150% and 200%
- Verify animations are smooth at 300ms+ duration

### Performance Testing

**Metrics:**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Smooth 60fps scrolling on mobile devices
- Real-time update latency < 500ms

**Tools:**
- Lighthouse for performance audits
- Chrome DevTools for frame rate monitoring
- Supabase Dashboard for database query performance


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Real-time status synchronization

*For any* unit status update performed by a Superadmin or Marketing Agent, all connected clients viewing that unit should receive the updated status within 500ms.

**Validates: Requirements 4.6, 10.7**

### Property 2: WhatsApp message format consistency for Borneo

*For any* unit in Borneo project with commodity type, the generated WhatsApp message should match the format "Halo, saya mau booking kavling [Commodity] [Unit Number] di Pring Land Borneo" where [Commodity] and [Unit Number] are correctly substituted.

**Validates: Requirements 5.3**

### Property 3: WhatsApp message format consistency for Jogja

*For any* unit in Jogja project with livestock type, the generated WhatsApp message should match the format "Halo, saya mau booking unit [Livestock Type] [Unit Number] di Pring Land Jogja" where [Livestock Type] and [Unit Number] are correctly substituted.

**Validates: Requirements 5.4**

### Property 4: WhatsApp message format consistency for Patuk

*For any* unit in Patuk project with livestock type, the generated WhatsApp message should match the format "Halo, saya mau booking unit [Livestock Type] [Unit Number] di Pring Land Patuk" where [Livestock Type] and [Unit Number] are correctly substituted.

**Validates: Requirements 5.5**

### Property 5: File upload validation for KK

*For any* file upload attempt for KK document, the system should accept only JPG, PNG, or PDF formats with size ≤ 5MB, and reject all other files with appropriate error message.

**Validates: Requirements 6A.3**

### Property 6: File upload validation for KTP

*For any* file upload attempt for KTP document, the system should accept only JPG, PNG, or PDF formats with size ≤ 5MB, and reject all other files with appropriate error message.

**Validates: Requirements 6A.4**

### Property 7: Booking cancellation state consistency

*For any* booking that is cancelled by its creator, the unit status should change to Available, booking data should be removed from active bookings, but files should remain in storage with audit trail intact.

**Validates: Requirements 6A.12**

### Property 8: Cross-agent booking protection

*For any* booking created by Marketing Agent A, when Marketing Agent B (where B ≠ A) attempts to cancel it, the system should prevent the cancellation and display the message "Anda tidak dapat membatalkan booking yang dibuat oleh marketing lain".

**Validates: Requirements 6A.13**

### Property 9: Booking status filter correctness

*For any* status filter selection (Available, Booking, or Sold), the displayed bookings should contain only bookings matching that exact status.

**Validates: Requirements 6B.6**

### Property 10: Booking search functionality

*For any* search query string, the filtered booking table should contain only bookings where either the unit number or client name contains the search query (case-insensitive).

**Validates: Requirements 6B.7**

### Property 11: Sold transaction data completeness

*For any* unit marked as sold with valid CRM data, the stored transaction should include all required fields: nama pembeli, nomor HP, tanggal transaksi, nominal transaksi, and the unit status should be Sold.

**Validates: Requirements 6C.3**

### Property 12: Commission calculation accuracy

*For any* sold transaction with nominal transaksi N, the calculated commission amount should be consistent with the commission rate formula (e.g., if rate is 5%, commission = N * 0.05).

**Validates: Requirements 6C.8**

### Property 13: Grid layout positioning correctness

*For any* grid configuration with R rows, C columns, and rotation angle θ, each unit at position (r, c) should be rendered at the calculated grid coordinates with correct spacing and rotation applied.

**Validates: Requirements 11.2**

### Property 14: Linear layout rendering

*For any* linear layout configuration with N units and spacing S, units should be positioned sequentially with spacing S between each unit, and virtualization should be enabled when N > 50.

**Validates: Requirements 11.3**

### Property 15: Curved layout arc positioning

*For any* curved layout configuration with arc radius R, start angle α, end angle β, and N units, each unit should be positioned along the arc path at angle α + (β - α) * i / (N - 1) for unit i, using SVG path calculations.

**Validates: Requirements 11.4**

### Property 16: Minimum touch target size compliance

*For any* interactive element (unit, button, link) rendered on mobile view, the touch target size should be at least 44x44px (or 56x56px for senior mode).

**Validates: Requirements 15.4**

### Property 17: Project deletion validation with sold units

*For any* project that contains at least one unit with Sold status, deletion attempts should be prevented and error message "Project tidak dapat dihapus karena memiliki unit yang sudah terjual" should be displayed.

**Validates: Requirements 22.3**

### Property 18: Project deletion allowance without sold units

*For any* project where all units have status Available or Booking (no Sold units), deletion should be allowed after confirmation.

**Validates: Requirements 22.4**

### Property 19: Background image z-index layering

*For any* canvas editor with background image uploaded, the background should always render at z-index 0 (bottom layer) and all other elements (blocks, facilities, units) should render above it.

**Validates: Requirements 23A.3**

### Property 20: Background image visibility restriction

*For any* project with background image configured in canvas editor, the background image should be visible only in canvas editor mode and should never be displayed in public web masterplan view.

**Validates: Requirements 23A.12**

### Property 21: SVG arc path calculation correctness

*For any* curved row configuration with arc radius R, start angle α, end angle β, and N units, the SVG path calculation should produce N points along the arc where each point (x, y) = (R * cos(θ), R * sin(θ)) for the appropriate angle θ.

**Validates: Requirements 24.3**

### Property 22: Reactive curved layout updates

*For any* curved row with initial arc radius R1, when the radius is changed to R2, all units in that row should update their positions to follow the new arc with radius R2 in real-time.

**Validates: Requirements 24.6**

### Property 23: Senior-friendly body text size

*For any* body text element rendered in the system, the font size should be at least 18px to ensure readability for users 45+ years old.

**Validates: Requirements 28.1**

### Property 24: Senior-friendly unit number size

*For any* unit number displayed on the siteplan, the font should be bold with minimum size 20px for clear visibility.

**Validates: Requirements 28.3**

### Property 25: Senior-friendly touch target size

*For any* button or interactive element rendered in senior mode, the minimum touch target size should be 56x56px to accommodate less precise touch.

**Validates: Requirements 28.5**

### Property 26: Senior-friendly element spacing

*For any* two adjacent interactive elements, the minimum spacing between them should be 16px to prevent accidental taps.

**Validates: Requirements 28.6**

### Property 27: WCAG AA color contrast compliance

*For any* text element, the color contrast ratio between text and background should be at least 4.5:1 for normal text (< 18px) and at least 3:1 for large text (≥ 18px) to meet WCAG AA standards.

**Validates: Requirements 28.7**

### Property 28: Senior-friendly form input size

*For any* form input field, the minimum height should be 56px with clear labels positioned above the field.

**Validates: Requirements 28.14**

### Property 29: Senior-friendly animation duration

*For any* animation or transition effect, the duration should be at least 300ms with smooth easing to avoid disorientation for senior users.

**Validates: Requirements 28.24**

### Property 30: Graceful error handling for invalid unit data

*For any* unit data that fails validation (missing required fields, invalid status, etc.), the system should log the error and skip rendering that specific unit without crashing the entire map view.

**Validates: Requirements 19.5**

### Property 31: Homepage project visibility filtering

*For any* project with status 'published', it should appear in the public homepage project list, and for any project with status 'draft' or 'hidden', it should not appear in the public homepage.

**Validates: Requirements 26.1, 27.2, 27.3**

### Property 32: Project card data completeness

*For any* project displayed on homepage, the project card should include all required fields: thumbnail image, project name, location, total area, total units, and available units count.

**Validates: Requirements 26.2**

### Property 33: Project display order consistency

*For any* set of projects with display_order values [o1, o2, ..., on], the projects should be rendered on homepage in ascending order of display_order values.

**Validates: Requirements 26.5, 27.5**

### Property 34: Sold out badge display condition

*For any* project where available units count equals 0, the project card should display a "Sold Out" badge but still allow navigation to the project view.

**Validates: Requirements 26.7**

### Property 35: Featured project highlighting

*For any* project with isFeatured flag set to true, the project card should display with highlighted visual treatment (4px solid green border).

**Validates: Requirements 27.6**

### Property 36: Background image z-index layering

*For any* canvas editor with background image, the background should render at z-index 0 and all canvas elements (blocks, facilities, units, decorations) should have z-index > 0.

**Validates: Requirements 23A.3, 23A.6**

### Property 37: Background image public visibility restriction

*For any* project with background image configured, the background should be visible in canvas editor mode but should never render in public masterplan view.

**Validates: Requirements 23A.12**

### Property 38: Background opacity range validation

*For any* background image opacity value, it should be constrained to the range [0, 100] where 0 is fully transparent and 100 is fully opaque.

**Validates: Requirements 23A.4, 23A.5**

### Property 39: Bulk unit generator sequential numbering

*For any* bulk unit generation with starting number N and quantity Q, the generated units should have sequential unit numbers [N, N+1, N+2, ..., N+Q-1].

**Validates: Requirements 23.6, 21.4**

### Property 40: Arc arrangement unit distribution

*For any* bulk unit generator with arc arrangement, arc radius R, start angle α, end angle β, and quantity Q, the Q units should be evenly distributed along the arc with angular spacing (β - α) / (Q - 1).

**Validates: Requirements 24.2, 24.3**

### Property 41: Multiple curved rows independence

*For any* project with multiple curved rows, each row should maintain its own arc parameters (radius, start angle, end angle) independently without affecting other rows.

**Validates: Requirements 24.4, 24.7**

### Property 42: Brand color consistency

*For any* UI element using primary colors, the colors should match the Pring Land brand palette: #22C55E (light green), #16A34A (main green), or #15803D (dark green).

**Validates: Requirements 25.2**

### Property 43: Status color high contrast validation

*For any* status indicator, the color combination should meet WCAG AA contrast requirements: Available (white with dark border ≥ 3:1), Booking (yellow #EAB308 with dark text ≥ 4.5:1), Sold (red #DC2626 with white text ≥ 4.5:1).

**Validates: Requirements 25.8, 28.7, 28.8**

### Property 44: Network error retry queue consistency

*For any* operation that fails due to network error, the operation should be added to retry queue and executed when connection is restored, maintaining the original operation parameters.

**Validates: Requirements 19.3**

### Property 45: WhatsApp message format by project type

*For any* unit booking, the WhatsApp message format should match the project type: Borneo uses "kavling [Commodity] [Unit Number]", Jogja uses "unit [Livestock Type] [Unit Number]", Patuk uses "unit [Livestock Type] [Unit Number]".

**Validates: Requirements 5.3, 5.4, 5.5**


## Implementation Notes

### Senior-Friendly Design System

The platform prioritizes accessibility for users aged 45 and above through a comprehensive senior-friendly design system:

**Typography Scale:**
```typescript
const seniorFriendlyTypography = {
  body: '18px',      // Minimum for body text
  label: '16px',     // Minimum for labels
  unitNumber: '20px', // Bold, for siteplan units
  heading: '24px',   // Bold, for section headings
  button: '18px',    // For button text
};
```

**Touch Targets:**
```typescript
const seniorFriendlyTouchTargets = {
  standard: '56px',  // Buttons, form inputs
  large: '64px',     // Zoom controls, primary actions
  minimum: '44px',   // Fallback for constrained spaces
  spacing: '16px',   // Minimum gap between elements
};
```

**Color Contrast:**
- All text must meet WCAG AA standards (4.5:1 for normal, 3:1 for large)
- Status colors use high contrast: Available (white with #374151 border), Booking (#EAB308 with dark text), Sold (#DC2626 with white text)
- Background uses off-white (#F9FAFB) instead of pure white to reduce eye strain

**Animations:**
- Minimum duration: 300ms
- Easing: ease-in-out for smooth transitions
- No sudden movements or rapid changes

### Polymorphic Rendering Strategy

The MapRenderer component uses a strategy pattern to handle three different layout types:

```typescript
class GridLayoutStrategy implements LayoutStrategy {
  calculatePositions(config: GridConfig, units: Unit[]): Position[] {
    // Calculate grid positions with rotation
  }
}

class LinearLayoutStrategy implements LayoutStrategy {
  calculatePositions(config: LinearConfig, units: Unit[]): Position[] {
    // Calculate linear positions with virtualization
  }
}

class CurvedLayoutStrategy implements LayoutStrategy {
  calculatePositions(config: CurvedConfig, units: Unit[]): Position[] {
    // Calculate SVG arc positions
  }
}
```

### Real-time Synchronization Architecture

```typescript
// Supabase Realtime subscription pattern
const useUnitRealtime = (projectId: string) => {
  const [units, setUnits] = useState<Unit[]>([]);
  
  useEffect(() => {
    // Initial fetch
    const fetchUnits = async () => {
      const { data } = await supabase
        .from('units')
        .select('*')
        .eq('project_id', projectId);
      setUnits(data || []);
    };
    
    fetchUnits();
    
    // Subscribe to changes
    const subscription = supabase
      .channel(`units:${projectId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'units', filter: `project_id=eq.${projectId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setUnits(prev => [...prev, payload.new as Unit]);
          } else if (payload.eventType === 'UPDATE') {
            setUnits(prev => prev.map(u => u.id === payload.new.id ? payload.new as Unit : u));
          } else if (payload.eventType === 'DELETE') {
            setUnits(prev => prev.filter(u => u.id !== payload.old.id));
          }
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [projectId]);
  
  return units;
};
```

### Canvas Editor State Management

```typescript
interface CanvasEditorState {
  elements: CanvasElement[];
  selectedElements: string[];
  backgroundImage?: {
    url: string;
    opacity: number;
  };
  history: CanvasElement[][];
  historyIndex: number;
}

// Undo/Redo implementation
const useCanvasHistory = () => {
  const [state, setState] = useState<CanvasEditorState>({
    elements: [],
    selectedElements: [],
    history: [[]],
    historyIndex: 0,
  });
  
  const addToHistory = (elements: CanvasElement[]) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(elements);
    setState({
      ...state,
      elements,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  };
  
  const undo = () => {
    if (state.historyIndex > 0) {
      setState({
        ...state,
        elements: state.history[state.historyIndex - 1],
        historyIndex: state.historyIndex - 1,
      });
    }
  };
  
  const redo = () => {
    if (state.historyIndex < state.history.length - 1) {
      setState({
        ...state,
        elements: state.history[state.historyIndex + 1],
        historyIndex: state.historyIndex + 1,
      });
    }
  };
  
  return { state, addToHistory, undo, redo };
};
```

### SVG Arc Calculation for Curved Layouts

```typescript
const calculateArcPositions = (config: CurvedRow): Position[] => {
  const { arcRadius, startAngle, endAngle, units } = config;
  const positions: Position[] = [];
  
  for (let i = 0; i < units; i++) {
    const angle = startAngle + (endAngle - startAngle) * i / (units - 1);
    const radians = (angle * Math.PI) / 180;
    
    positions.push({
      x: arcRadius * Math.cos(radians),
      y: arcRadius * Math.sin(radians),
    });
  }
  
  return positions;
};

const generateSVGPath = (positions: Position[]): string => {
  if (positions.length === 0) return '';
  
  const [first, ...rest] = positions;
  let path = `M ${first.x} ${first.y}`;
  
  rest.forEach(pos => {
    path += ` L ${pos.x} ${pos.y}`;
  });
  
  return path;
};
```

### Project Ordering and Visibility Management

**Design Rationale:** Superadmin needs control over which projects appear on homepage and in what order. Drag-and-drop provides intuitive reordering, while status toggles control visibility.

```typescript
// Project reordering with drag-and-drop
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

const ProjectManagementList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex(p => p.id === active.id);
      const newIndex = projects.findIndex(p => p.id === over?.id);
      
      const reordered = arrayMove(projects, oldIndex, newIndex);
      
      // Update display_order for all affected projects
      const updates = reordered.map((project, index) => ({
        id: project.id,
        display_order: index,
      }));
      
      setProjects(reordered);
      
      // Batch update to Supabase
      await Promise.all(
        updates.map(update =>
          supabase
            .from('projects')
            .update({ display_order: update.display_order })
            .eq('id', update.id)
        )
      );
    }
  };
  
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={projects} strategy={verticalListSortingStrategy}>
        {projects.map(project => (
          <SortableProjectRow key={project.id} project={project} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

// Status toggle component
const ProjectStatusToggle = ({ project }: { project: Project }) => {
  const [status, setStatus] = useState(project.status);
  
  const handleStatusChange = async (newStatus: 'draft' | 'published' | 'hidden') => {
    setStatus(newStatus);
    
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', project.id);
    
    if (error) {
      showToast('Gagal mengubah status project', 'error');
      setStatus(project.status); // Revert on error
    } else {
      showToast(`Project ${newStatus === 'published' ? 'dipublikasikan' : 'disembunyikan'}`, 'success');
    }
  };
  
  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value as any)}
      className="px-4 py-2 border rounded-lg"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
      <option value="hidden">Hidden</option>
    </select>
  );
};
```

### Background Image Management in Canvas Editor

**Design Rationale:** Background images enable precise tracing of existing siteplan designs. The image must always stay at the bottom layer and never appear in public view to maintain clean presentation.

```typescript
// Background image upload and management
const BackgroundImageManager = ({ projectId }: { projectId: string }) => {
  const [background, setBackground] = useState<BackgroundImageConfig | null>(null);
  
  const handleUpload = async (file: File) => {
    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Format harus JPG, PNG, atau SVG', 'error');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      showToast('Ukuran maksimal 10MB', 'error');
      return;
    }
    
    // Upload to Supabase Storage
    const fileName = `${projectId}/background_${Date.now()}.${file.name.split('.').pop()}`;
    const { data, error } = await supabase.storage
      .from('project-backgrounds')
      .upload(fileName, file);
    
    if (error) {
      showToast('Gagal upload background', 'error');
      return;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-backgrounds')
      .getPublicUrl(fileName);
    
    // Update project
    await supabase
      .from('projects')
      .update({ 
        background_image_url: publicUrl,
        background_opacity: 50,
        background_visible: true,
      })
      .eq('id', projectId);
    
    setBackground({
      url: publicUrl,
      opacity: 50,
      visible: true,
    });
    
    showToast('Background berhasil diupload', 'success');
  };
  
  const handleOpacityChange = async (opacity: number) => {
    setBackground(prev => prev ? { ...prev, opacity } : null);
    
    // Debounced update to database
    await supabase
      .from('projects')
      .update({ background_opacity: opacity })
      .eq('id', projectId);
  };
  
  const handleToggleVisibility = () => {
    setBackground(prev => prev ? { ...prev, visible: !prev.visible } : null);
  };
  
  const handleDelete = async () => {
    if (!confirm('Hapus background image? Aksi ini tidak dapat dibatalkan')) {
      return;
    }
    
    // Delete from storage
    if (background?.url) {
      const fileName = background.url.split('/').pop();
      await supabase.storage
        .from('project-backgrounds')
        .remove([`${projectId}/${fileName}`]);
    }
    
    // Update project
    await supabase
      .from('projects')
      .update({ 
        background_image_url: null,
        background_opacity: 50,
        background_visible: false,
      })
      .eq('id', projectId);
    
    setBackground(null);
    showToast('Background dihapus', 'success');
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Background Image</h3>
      
      {!background ? (
        <input
          type="file"
          accept="image/jpeg,image/png,image/svg+xml"
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          className="block w-full"
        />
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Opacity: {background.opacity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={background.opacity}
              onChange={(e) => handleOpacityChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleToggleVisibility}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {background.visible ? 'Hide' : 'Show'} Background
            </button>
            
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete Background
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Canvas rendering with background layer
const CanvasWithBackground = ({ background, elements }: CanvasProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Background layer - always at z-index 0 */}
      {background?.visible && background.url && (
        <img
          src={background.url}
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: background.opacity / 100,
            zIndex: 0,
            pointerEvents: 'none', // Don't interfere with element interactions
          }}
        />
      )}
      
      {/* Elements layer - z-index 1+ */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {elements.map(element => (
          <CanvasElement
            key={element.id}
            element={element}
            style={{ zIndex: element.zIndex || 1 }}
          />
        ))}
      </div>
    </div>
  );
};
```

### Performance Optimization

**Virtualization for Linear Layouts:**
```typescript
import { Virtuoso } from 'react-virtuoso';

const LinearLayoutRenderer = ({ units }: { units: Unit[] }) => {
  return (
    <Virtuoso
      data={units}
      itemContent={(index, unit) => (
        <UnitElement key={unit.id} unit={unit} />
      )}
      style={{ height: '100vh' }}
    />
  );
};
```

**Lazy Loading for Images:**
```typescript
const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};
```

**Memoization for Expensive Calculations:**
```typescript
const MemoizedMapRenderer = React.memo(MapRenderer, (prevProps, nextProps) => {
  return (
    prevProps.projectId === nextProps.projectId &&
    prevProps.units.length === nextProps.units.length &&
    prevProps.layoutType === nextProps.layoutType
  );
});
```

### Security Considerations

**Row Level Security (RLS) in Supabase:**
```sql
-- Marketing agents can only view/edit their own bookings
CREATE POLICY "Marketing agents can view own bookings"
ON bookings FOR SELECT
USING (auth.uid() = marketing_agent_id);

CREATE POLICY "Marketing agents can create bookings"
ON bookings FOR INSERT
WITH CHECK (auth.uid() = marketing_agent_id);

CREATE POLICY "Marketing agents can update own bookings"
ON bookings FOR UPDATE
USING (auth.uid() = marketing_agent_id);

-- Superadmin can view/edit everything
CREATE POLICY "Superadmin full access"
ON bookings FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'superadmin'
  )
);

-- Public can only view published projects and available units
CREATE POLICY "Public can view published projects"
ON projects FOR SELECT
USING (status = 'published');

CREATE POLICY "Public can view units"
ON units FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = units.project_id
    AND projects.status = 'published'
  )
);
```

**File Upload Security:**
```typescript
const secureFileUpload = async (file: File, bucket: string) => {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large');
  }
  
  // Generate secure filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  
  // Upload with RLS policies
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
  
  if (error) throw error;
  return data.path;
};
```

### Deployment Configuration

**Vercel Configuration (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Environment Variables:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_WHATSAPP_NUMBER=6281234567890
```

## Conclusion

This design document provides a comprehensive blueprint for implementing the Pring Land Digital Platform with a strong focus on:

1. **Senior-Friendly Design**: Large fonts, high contrast, generous touch targets, and slow animations for users 45+
2. **Polymorphic Rendering**: Single MapRenderer component handling grid, linear, and curved layouts
3. **Real-time Synchronization**: Supabase Realtime for instant status updates across all clients
4. **Visual Accuracy**: Canvas editor with background image tracing for precise siteplan creation
5. **Performance**: SVG rendering, virtualization, and lazy loading for smooth mobile experience
6. **Security**: Row-level security policies and secure file upload handling

The correctness properties defined in this document will be validated through property-based testing using fast-check, ensuring the system behaves correctly across all valid inputs and edge cases.

