
export enum IncidentSeverity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum IncidentStatus {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
  FALSE_POSITIVE = 'False Positive'
}

export interface Incident {
  id: string;
  type: string;
  severity: IncidentSeverity;
  zone: string;
  camera: string;
  timestamp: string;
  status: IncidentStatus;
  assignedTo?: string;
  description?: string;
  thumbnailUrl?: string;
}

export interface Camera {
  id: string;
  name: string;
  brand: string;
  rtspUrl: string;
  zone: string;
  status: 'Online' | 'Offline';
  alerts: number;
}

export enum PageType {
  DASHBOARD_EXECUTIVE = 'dashboard-executive',
  DASHBOARD_LIVE = 'dashboard-live',
  PRODUCT_OVERVIEW = 'product-overview',
  DASHBOARD_TELEMATICS = 'dashboard-telematics',
  INCIDENTS_ACTIVE = 'incidents-active',
  INCIDENTS_PAST = 'incidents-past',
  INCIDENTS_FALSE = 'incidents-false',
  INCIDENTS_DETAIL = 'incidents-detail',
  EMERGENCY_RESPONSE = 'emergency-response',
  ANALYTICS_OVERVIEW = 'analytics-overview',
  ANALYTICS_PPE = 'analytics-ppe',
  ANALYTICS_FIRE = 'analytics-fire',
  ANALYTICS_OVERCROWDING = 'analytics-overcrowding',
  ANALYTICS_VIOLENCE = 'analytics-violence',
  ANALYTICS_IDENTITY = 'analytics-identity',
  ANALYTICS_PEOPLE = 'analytics-people',
  ANALYTICS_ROOT_CAUSE = 'analytics-root-cause',
  SOP_LIBRARY = 'sop-library',
  SOP_EDITOR = 'sop-editor',
  SOP_VERSIONS = 'sop-versions',
  SOP_COMPLIANCE = 'sop-compliance',
  CAMERAS_MGMT = 'cameras-mgmt',
  ZONES_CONFIG = 'zones-config',
  ZONES_RULES = 'zones-rules',
  ESCALATION_MATRIX = 'escalation-matrix',
  PEOPLE_DIR = 'people-dir',
  PEOPLE_FACE = 'people-face',
  PEOPLE_HEADCOUNT = 'people-headcount',
  SETTINGS_USERS = 'settings-users',
  SETTINGS_ROLES = 'settings-roles',
  SETTINGS_NOTIFICATIONS = 'settings-notifications',
  SETTINGS_SYSTEM = 'settings-system',
  SETTINGS_AUDIT = 'settings-audit',
  SETTINGS_SLA = 'settings-sla',
  SETTINGS_WORKFLOW = 'settings-workflow',
  AI_SIMULATION = 'ai-simulation',
  REPORTS_STANDARD = 'reports-standard',
  REPORTS_AUDIT = 'reports-audit',
  FACE_ENROLLMENT = 'face-enrollment',
  ALL_INCIDENTS = 'all-incidents'
}
