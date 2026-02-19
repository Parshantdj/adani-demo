import React from 'react';
import {
  LayoutDashboard, Video, AlertCircle, BarChart3,
  FileText, ShieldCheck, Settings, Users, Camera,
  Map, Activity, History, UserCheck, Flame,
  HardHat, Thermometer, UserMinus, Sparkles, Clock, GitBranch,
  ShieldAlert, ScanFace, LogOut, MonitorPlay, FileSpreadsheet, Fingerprint, Layers
} from 'lucide-react';
import { PageType, IncidentSeverity, IncidentStatus, Incident } from './types';

export const NAVIGATION_GROUPS = [
  {
    title: 'Dashboard',
    items: [
      { id: PageType.DASHBOARD_EXECUTIVE, label: 'Executive Overview', icon: <LayoutDashboard size={20} /> },
      { id: PageType.DASHBOARD_LIVE, label: 'Live Monitoring', icon: <Video size={20} />, badge: 'LIVE' },
      { id: PageType.PRODUCT_OVERVIEW, label: 'Product Overview', icon: <MonitorPlay size={20} /> },
      { id: PageType.DASHBOARD_TELEMATICS, label: 'Video Telematics', icon: <Activity size={20} /> },
    ]
  },
  {
    title: 'Incidents',
    items: [
      { id: PageType.ALL_INCIDENTS, label: 'All Incidents', icon: <Layers size={20} /> },
      { id: PageType.INCIDENTS_FALSE, label: 'False Positives', icon: <UserMinus size={20} /> },
    ]
  },
  {
    title: 'Analytics',
    items: [
      { id: PageType.ANALYTICS_OVERVIEW, label: 'Detailed Analytics', icon: <BarChart3 size={20} /> },
    ]
  },
  {
    title: 'Tools & Reports',
    items: [
      { id: PageType.REPORTS_STANDARD, label: 'Standard Reports', icon: <FileText size={20} /> },
      { id: PageType.REPORTS_AUDIT, label: 'Audit Reports', icon: <FileSpreadsheet size={20} /> },
    ]
  },
  {
    title: 'SOP & Compliance',
    items: [
      { id: PageType.SOP_LIBRARY, label: 'SOP Library', icon: <ShieldCheck size={20} /> },
    ]
  },
  {
    title: 'Cameras & Zones',
    items: [
      { id: PageType.CAMERAS_MGMT, label: 'Camera Management', icon: <Camera size={20} /> },
      { id: PageType.ZONES_CONFIG, label: 'Zone Configuration', icon: <Map size={20} /> },
    ]
  },
  {
    title: 'People',
    items: [
      { id: PageType.PEOPLE_DIR, label: 'Person Directory', icon: <UserCheck size={20} /> },
      { id: PageType.FACE_ENROLLMENT, label: 'Face Enrollment', icon: <Fingerprint size={20} /> },
    ]
  },
  {
    title: 'Settings',
    items: [
      { id: PageType.SETTINGS_SLA, label: 'SLA Management', icon: <Clock size={20} /> },
      { id: PageType.SETTINGS_WORKFLOW, label: 'Workflow Definition', icon: <GitBranch size={20} /> },
      { id: PageType.SETTINGS_USERS, label: 'User Management', icon: <Settings size={20} /> },
      { id: PageType.SETTINGS_AUDIT, label: 'Audit Logs', icon: <History size={20} /> },
    ]
  }
];

export const SITE_HIERARCHY = [
  {
    business: 'Ports & Logistics',
    sites: [
      {
        name: 'Mundra Port',
        zones: ['Container Terminal', 'Bulk Cargo Zone', 'Liquid Terminal', 'Warehousing Hub', 'Logistics Park', 'SEZ Zone', 'Rail Yard / ICD']
      },
      {
        name: 'Krishnapatnam Port',
        zones: ['Container Yard', 'Multi-Purpose Terminal', 'Bulk Handling Area', 'Industrial Zone']
      }
    ]
  },
  {
    business: 'Airports',
    sites: [
      {
        name: 'Chhatrapati Shivaji Maharaj Int. Airport',
        zones: ['Passenger Terminal', 'Cargo Terminal', 'ATC Tower', 'Apron Area']
      }
    ]
  },
  {
    business: 'Power',
    sites: [
      {
        name: 'Mundra Power Plant (Gujarat)',
        zones: ['Boiler Zone', 'Turbine Hall', 'Coal Handling Plant', 'Switchyard']
      }
    ]
  }
];

export const MOCK_INCIDENTS: Incident[] = [
  { id: 'INC-2024-001', type: 'No Helmet', severity: IncidentSeverity.CRITICAL, zone: 'Container Terminal', camera: 'CAM-CT-04', timestamp: '2024-05-20 10:15:32', status: IncidentStatus.ACTIVE, assignedTo: 'Rajesh Kumar', thumbnailUrl: 'https://picsum.photos/seed/helmet/160/90' },
  { id: 'INC-2024-002', type: 'Violence Detected', severity: IncidentSeverity.HIGH, zone: 'Boiler Zone', camera: 'CAM-BZ-01', timestamp: '2024-05-20 10:12:45', status: IncidentStatus.ACTIVE, assignedTo: 'Amit Sharma', thumbnailUrl: 'https://picsum.photos/seed/violence/160/90' },
  { id: 'INC-2024-003', type: 'Overcrowding Detected', severity: IncidentSeverity.MEDIUM, zone: 'Switchyard', camera: 'CAM-SW-02', timestamp: '2024-05-20 09:45:10', status: IncidentStatus.PENDING, assignedTo: 'Priya Verma', thumbnailUrl: 'https://picsum.photos/seed/crowd/160/90' },
  { id: 'INC-2024-004', type: 'No Gloves', severity: IncidentSeverity.LOW, zone: 'Workshop Zone', camera: 'CAM-WZ-08', timestamp: '2024-05-20 09:30:15', status: IncidentStatus.RESOLVED, assignedTo: 'Sanjay Gupta', thumbnailUrl: 'https://picsum.photos/seed/gloves/160/90' },
  { id: 'INC-2024-005', type: 'Fire Detected', severity: IncidentSeverity.CRITICAL, zone: 'Coal Handling Plant', camera: 'CAM-CHP-01', timestamp: '2024-05-20 10:18:00', status: IncidentStatus.ACTIVE, assignedTo: 'EHS Team', thumbnailUrl: 'https://picsum.photos/seed/fire/160/90' },
  { id: 'INC-2024-006', type: 'Smoke Detected', severity: IncidentSeverity.HIGH, zone: 'Liquid Terminal', camera: 'CAM-LT-02', timestamp: '2024-05-20 11:20:45', status: IncidentStatus.ACTIVE, assignedTo: 'Manoj Singh', thumbnailUrl: 'https://picsum.photos/seed/smoke/160/90' },
  { id: 'INC-2024-007', type: 'No Safety Shoes', severity: IncidentSeverity.HIGH, zone: 'Turbine Hall', camera: 'CAM-TH-03', timestamp: '2024-05-20 13:10:00', status: IncidentStatus.ACTIVE, assignedTo: 'Tech Support', thumbnailUrl: 'https://picsum.photos/seed/shoes/160/90' },
  { id: 'INC-2024-008', type: 'No Mask', severity: IncidentSeverity.LOW, zone: 'Commercial Zone', camera: 'CAM-CZ-01', timestamp: '2024-05-20 14:15:00', status: IncidentStatus.PENDING, assignedTo: 'Admin Dept', thumbnailUrl: 'https://picsum.photos/seed/mask/160/90' },
  { id: 'INC-2024-009', type: 'No Vest', severity: IncidentSeverity.MEDIUM, zone: 'Solar Panel Field', camera: 'CAM-SPF-02', timestamp: '2024-05-20 13:42:15', status: IncidentStatus.RESOLVED, assignedTo: 'Supervisor B', thumbnailUrl: 'https://picsum.photos/seed/vest/160/90' },
];

export const SHIFTS = ['Morning Shift (06:00 - 14:00)', 'General Shift (09:00 - 18:00)', 'Evening Shift (14:00 - 22:00)', 'Night Shift (22:00 - 06:00)'];