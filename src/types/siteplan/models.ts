export type LayoutType = 'grid' | 'linear' | 'curved';

export type MapMode = 'public' | 'marketing' | 'admin';

export interface GridConfig {
  rows: number;
  cols: number;
  rotation?: number; // degrees
  spacing: {
    x: number;
    y: number;
  };
}

export interface LinearConfig {
  orientation: 'horizontal' | 'vertical';
  spacing: number;
  enableVirtualization: boolean;
}

export interface CurvedRow {
  arcRadius: number;
  startAngle: number;
  endAngle: number;
  units: number;
}

export interface CurvedConfig {
  rows: CurvedRow[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location?: string;
  description?: string;
  totalArea: number;
  layoutType: LayoutType;
  layoutConfig: GridConfig | LinearConfig | CurvedConfig;
  backgroundImageUrl?: string;
  backgroundOpacity?: number; // 0-100
  backgroundVisible?: boolean;
  thumbnailUrl?: string;
  status: 'draft' | 'published' | 'hidden';
  displayOrder: number;
  isFeatured: boolean;
  totalUnits?: number;
  availableUnits?: number;
  createdAt: string;
  updatedAt: string;
}

export type UnitStatus = 'available' | 'booking' | 'sold';

export interface Unit {
  id: string;
  projectId: string;
  blockId?: string;
  unitNumber: string;
  luasLahan: number;
  luasUnit: number;
  commodityType?: string; // for Borneo
  livestockType?: string; // for Jogja/Patuk
  status: UnitStatus;
  position?: Position;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
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

export interface Transaction {
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

export type MarketingAgentStatus = 'active' | 'inactive';

export interface MarketingAgent {
  id: string;
  name: string;
  phoneNumber?: string;
  status: MarketingAgentStatus;
  lastLogin?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackgroundImageConfig {
  url: string;
  opacity: number; // 0-100
  visible: boolean;
}

export type CanvasElementType = 'block' | 'facility' | 'unit' | 'decoration';

export interface CanvasElementBase {
  id: string;
  projectId: string;
  type: CanvasElementType;
  position: Position;
  size: {
    width: number;
    height: number;
  };
  zIndex: number;
}

export interface BlockProperties {
  name: string;
  color: string;
  unitCapacity: number;
}

export type FacilityIconType =
  | 'office'
  | 'warehouse'
  | 'shopping'
  | 'security'
  | 'parking'
  | 'custom';

export type FacilitySize = 'small' | 'medium' | 'large';

export interface FacilityProperties {
  name: string;
  iconType: FacilityIconType;
  size: FacilitySize;
}

export interface UnitProperties {
  unitNumber: string;
  luasLahan: number;
  luasUnit: number;
  commodityType?: string;
  livestockType?: string;
  status: UnitStatus;
}

export type DecorationType = 'green-area' | 'road' | 'water' | 'label';

export interface DecorationProperties {
  decorationType: DecorationType;
  label?: string;
  color?: string;
  fontSize?: number;
  rotation?: number;
}

export type CanvasElementProperties =
  | BlockProperties
  | FacilityProperties
  | UnitProperties
  | DecorationProperties;

export interface CanvasElement extends CanvasElementBase {
  properties: CanvasElementProperties;
}

export type BulkArrangement = 'grid' | 'row' | 'arc';

export interface BulkUnitGeneratorConfig {
  quantity: number;
  startingNumber: number;
  arrangement: BulkArrangement;
  spacing: number;
  rows?: number;
  cols?: number;
  arcRadius?: number;
  startAngle?: number;
  endAngle?: number;
}

export interface BookingData {
  unitId: string;
  namaCalonPembeli: string;
  nomorHP: string;
  kkFile: File | null;
  ktpFile: File | null;
  catatan?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SeniorThemeConfig {
  fontSize: {
    body: string;
    label: string;
    heading: string;
    unitNumber: string;
    button: string;
  };
  spacing: {
    touchTarget: string;
    elementGap: string;
    buttonHeight: string;
  };
  colors: {
    background: string;
    text: string;
    primary: string;
    available: string;
    booking: string;
    sold: string;
    border: string;
  };
  contrast: {
    normalText: number;
    largeText: number;
  };
  animation: {
    duration: string;
    easing: string;
  };
}