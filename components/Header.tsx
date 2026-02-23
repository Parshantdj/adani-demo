import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Calendar, ChevronDown, Monitor, Check, ChevronLeft, ChevronRight, Clock, LogOut, Settings, User, MapPin, Building2, ChevronRight as ChevronRightIcon, AlertTriangle, Eye, History, X, Info, Camera } from 'lucide-react';

const SITE_HIERARCHY = [
  {
    business: 'Ports & Logistics',
    sites: [
      {
        name: 'Mundra Port',
        zones: [
          { name: 'Container Terminal', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Main Gate & Security Check', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Bulk Cargo Terminal', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Liquid Terminal', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Rail Yard', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Hazira Port',
        zones: [
          { name: 'Gate Complex', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Container Terminal', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Storage Yard', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Jetty Area', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Liquid Handling Zone', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Dhamra Port',
        zones: [
          { name: 'Entry Gate', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Coal Handling Plant', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Conveyor Corridor', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Railway Siding', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Berth Area', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Thermal Power',
    sites: [
      {
        name: 'Mundra Power Plant',
        zones: [
          { name: 'Boiler Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Turbine Hall', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Coal Handling Plant', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Ash Handling Area', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Switchyard', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Tiroda Power Plant',
        zones: [
          { name: 'Boiler Section', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Turbine Hall', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Coal Yard', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Control Room', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Electrical Substation', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Renewable Energy',
    sites: [
      {
        name: 'Rajasthan Solar Park',
        zones: [
          { name: 'Solar Panel Field', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Inverter Room', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Control Room', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Grid Substation', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Maintenance Bay', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Khavda Renewable Park',
        zones: [
          { name: 'Wind Turbine Field', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Solar Hybrid Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Power Evacuation Yard', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Control Building', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Security Gate', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Airports',
    sites: [
      {
        name: 'Chhatrapati Shivaji Maharaj International Airport',
        zones: [
          { name: 'Terminal Building', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Baggage Handling Area', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Airside / Runway', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Cargo Terminal', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Security Check Zone', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Sardar Vallabhbhai Patel International Airport',
        zones: [
          { name: 'Terminal Hall', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Cargo Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Apron Area', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'ATC Control Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Entry Gate', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Mining',
    sites: [
      {
        name: 'Talabira Coal Mine',
        zones: [
          { name: 'Excavation Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Drilling & Blasting Area', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Coal Stockyard', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Loading Yard', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Workshop Area', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Gare Palma Mine',
        zones: [
          { name: 'Excavation Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Haul Road', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Crusher Area', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Conveyor Belt', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Dispatch Yard', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'LNG Infrastructure',
    sites: [
      {
        name: 'Dhamra LNG Terminal',
        zones: [
          { name: 'LNG Storage Tanks', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Regasification Unit', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Jetty', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Control Room', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Safety Monitoring Zone', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Gas Distribution',
    sites: [
      {
        name: 'Ahmedabad CGD',
        zones: [
          { name: 'Pipeline Corridor', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'CNG Station', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Metering Station', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Maintenance Depot', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Control Center', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Data Centers',
    sites: [
      {
        name: 'Chennai Data Center',
        zones: [
          { name: 'Server Hall', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Network Operations Center', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Power Backup Room', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Cooling Plant', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Access Control Lobby', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Hyderabad Data Center',
        zones: [
          { name: 'Server Hall', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'NOC', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Electrical Room', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Cooling Zone', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Security Gate', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  },
  {
    business: 'Defense & Aerospace',
    sites: [
      {
        name: 'Hyderabad Facility',
        zones: [
          { name: 'Assembly Line', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Testing Lab', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Secure Storage', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Quality Inspection', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Control Room', cameras: ['CAM 1', 'CAM 2'] }
        ]
      },
      {
        name: 'Ahmedabad Defense Facility',
        zones: [
          { name: 'Manufacturing Bay', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Calibration Lab', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Secure Entry', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'Component Storage', cameras: ['CAM 1', 'CAM 2'] },
          { name: 'R&D Lab', cameras: ['CAM 1', 'CAM 2'] }
        ]
      }
    ]
  }
];

interface HeaderProps {
  onLogout?: () => void;
  eventHistory: any[];
  onViewEvent: (event: any) => void;
  onViewIncident: (id: string) => void;
  currentSite: string;
  setCurrentSite: (site: string) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  currentShift: string;
  setCurrentShift: (shift: string) => void;
  apiData?: any[];
}

const EMPTY_ARRAY: any[] = [];

export const Header: React.FC<HeaderProps> = ({
  onLogout,
  eventHistory,
  onViewEvent,
  onViewIncident,
  currentSite,
  setCurrentSite,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  currentShift,
  setCurrentShift,
  apiData = EMPTY_ARRAY
}) => {
  const [liveNotifications, setLiveNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`https://isafetyrobo.binarysemantics.org/api/violations?page=1&limit=10000`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      const incidents = data.incidents || [];
      setLiveNotifications(incidents.slice(0, 15));
      sessionStorage.setItem('adani_incidents_cache', JSON.stringify(incidents));
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback to cache if API fails
      const saved = sessionStorage.getItem('adani_incidents_cache');
      if (saved) {
        setLiveNotifications(JSON.parse(saved).slice(0, 15));
      }
    }
  };

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setLiveNotifications(apiData.slice(0, 15));
    } else {
      fetchNotifications();
    }
  }, [apiData]);
  const [isPlantDropdownOpen, setIsPlantDropdownOpen] = useState(false);
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null);
  const [hoveredSite, setHoveredSite] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isShiftDropdownOpen, setIsShiftDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const plantDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const shiftDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (plantDropdownRef.current && !plantDropdownRef.current.contains(event.target as Node)) {
        setIsPlantDropdownOpen(false);
        setHoveredBusiness(null);
        setHoveredSite(null);
        setHoveredZone(null);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (shiftDropdownRef.current && !shiftDropdownRef.current.contains(event.target as Node)) {
        setIsShiftDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const isSameDay = (d1: Date, d2: Date | null) =>
    d2 ? (d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()) : false;

  const isBetween = (date: Date, start: Date, end: Date | null) => {
    if (!end) return false;
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    const min = Math.min(s, e);
    const max = Math.max(s, e);
    return d > min && d < max;
  };

  const handleDateClick = (clickedDate: Date) => {
    if (!endDate) {
      if (isSameDay(clickedDate, startDate)) return;
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
    for (let d = 1; d <= totalDays; d++) {
      const current = new Date(year, month, d);
      const isStart = isSameDay(current, startDate);
      const isEnd = isSameDay(current, endDate);
      const isInRange = isBetween(current, startDate, endDate);
      const isToday = isSameDay(current, new Date());
      days.push(
        <button
          key={d}
          onClick={() => handleDateClick(current)}
          className={`h-9 w-9 flex items-center justify-center rounded-lg text-xs font-semibold transition-all relative ${isStart || isEnd ? 'bg-primary text-white shadow-md z-10' : isInRange ? 'bg-primary-50 text-primary-700 rounded-none' : isToday ? 'text-primary border border-primary-200' : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
          {d}
          {isInRange && <div className="absolute inset-0 bg-primary-50/50 -z-10"></div>}
        </button>
      );
    }
    return days;
  };

  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const displayDateText = () => {
    if (!endDate) return isSameDay(startDate, new Date()) ? 'Today' : formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <header className="h-16 bg-slate-50/70 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="relative" ref={plantDropdownRef}>
          <button
            onClick={() => setIsPlantDropdownOpen(!isPlantDropdownOpen)}
            className={`flex items-center gap-2.5 rounded-full px-4 py-1.5 transition-all group ${isPlantDropdownOpen ? 'bg-white shadow-md ring-1 ring-slate-200' : 'hover:bg-slate-200/50'}`}
          >
            <Monitor size={14} className={isPlantDropdownOpen ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'} />
            <span className={`text-xs font-semibold tracking-tight ${isPlantDropdownOpen ? 'text-slate-900' : 'text-slate-600'}`}>{currentSite}</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${isPlantDropdownOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
          </button>
          {isPlantDropdownOpen && (
            <div className="absolute top-full left-0 mt-3 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl z-[100] min-w-[260px] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-2 mb-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Environments</p>
              </div>
              {SITE_HIERARCHY.map((group) => (
                <div key={group.business} className={`relative px-5 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${hoveredBusiness === group.business ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50 text-slate-700'}`} onMouseEnter={() => setHoveredBusiness(group.business)}>
                  <div className="flex items-center gap-3">
                    <Building2 size={14} className={hoveredBusiness === group.business ? 'text-primary' : 'text-slate-400'} />
                    <span className="text-sm font-semibold">{group.business}</span>
                  </div>
                  <ChevronRightIcon size={14} className="text-slate-300" />
                  {hoveredBusiness === group.business && (
                    <div className="absolute left-[calc(100%-4px)] top-0 ml-1 bg-white border border-slate-200 rounded-2xl shadow-2xl min-w-[280px] py-2 z-[101]">
                      {group.sites.map((site) => (
                        <div key={site.name} className={`relative px-5 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${hoveredSite === site.name ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50 text-slate-700'}`} onMouseEnter={() => setHoveredSite(site.name)} onClick={(e) => { e.stopPropagation(); setCurrentSite(site.name); setIsPlantDropdownOpen(false); }}>
                          <span className={`text-sm ${currentSite === site.name ? 'font-semibold' : 'font-medium'}`}>{site.name}</span>
                          <ChevronRightIcon size={14} className="text-slate-300" />
                          {hoveredSite === site.name && (
                            <div className="absolute left-[calc(100%-4px)] top-0 ml-1 bg-white border border-slate-200 rounded-2xl shadow-2xl min-w-[240px] py-2 z-[102]">
                              {site.zones.map((zoneData) => {
                                const hasCameras = zoneData.cameras && zoneData.cameras.length > 0;
                                const cameras = zoneData.cameras || [];

                                return (
                                  <div
                                    key={zoneData.name}
                                    className={`relative px-5 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${hoveredZone === zoneData.name ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50 text-slate-700'}`}
                                    onMouseEnter={() => setHoveredZone(zoneData.name)}
                                    onClick={(e) => {
                                      if (!hasCameras) {
                                        e.stopPropagation();
                                        setCurrentSite(`${site.name} - ${zoneData.name}`);
                                        setIsPlantDropdownOpen(false);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <MapPin size={12} className={currentSite.includes(zoneData.name) ? 'text-primary' : 'text-slate-300'} />
                                      <span className={`text-sm ${currentSite.includes(zoneData.name) ? 'font-semibold' : 'font-medium'}`}>{zoneData.name}</span>
                                    </div>
                                    {hasCameras && <ChevronRightIcon size={14} className="text-slate-300" />}

                                    {hasCameras && hoveredZone === zoneData.name && (
                                      <div className="absolute left-[calc(100%-2px)] top-0 ml-2 bg-white border border-slate-200 rounded-2xl shadow-2xl min-w-[180px] py-2 z-[110] animate-in fade-in slide-in-from-left-2 duration-200">
                                        {cameras.map((cam) => (
                                          <div
                                            key={cam}
                                            className={`px-5 py-2.5 hover:bg-primary-50 cursor-pointer flex items-center gap-3 text-sm transition-colors ${currentSite.includes(cam) ? 'text-primary-700 font-semibold bg-primary-50/50' : 'text-slate-600'}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setCurrentSite(`${site.name} - ${zoneData.name} - ${cam}`);
                                              setIsPlantDropdownOpen(false);
                                            }}
                                          >
                                            <Camera size={12} className={currentSite.includes(cam) ? 'text-primary' : 'text-slate-300'} />
                                            {cam}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-4 w-px bg-slate-200 mx-1"></div>
        <div className="relative" ref={datePickerRef}>
          <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className={`flex items-center gap-2.5 rounded-full px-4 py-1.5 transition-all group ${isDatePickerOpen ? 'bg-white shadow-md ring-1 ring-slate-200' : 'hover:bg-slate-200/50'}`}>
            <Calendar size={14} className={isDatePickerOpen ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'} />
            <span className={`text-xs font-semibold tracking-tight ${isDatePickerOpen ? 'text-slate-900' : 'text-slate-600'}`}>{displayDateText()}</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${isDatePickerOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
          </button>
          {isDatePickerOpen && (
            <div className="absolute top-full left-0 mt-3 w-[320px] bg-white border border-slate-200 rounded-3xl shadow-2xl z-[100] p-6 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-6">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500"><ChevronLeft size={16} /></button>
                <span className="text-sm font-black text-slate-900">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
                <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500"><ChevronRight size={16} /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => <div key={day} className="text-[10px] font-black text-slate-400 text-center uppercase">{day}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] font-semibold text-slate-400 uppercase">Select Start & End</p>
                <button onClick={() => { setStartDate(new Date()); setEndDate(null); }} className="text-[10px] font-black text-primary uppercase hover:underline">Reset</button>
              </div>
            </div>
          )}
        </div>
        <div className="h-4 w-px bg-slate-200 mx-1"></div>
        <div className="relative" ref={shiftDropdownRef}>
          <button onClick={() => setIsShiftDropdownOpen(!isShiftDropdownOpen)} className={`flex items-center gap-2.5 rounded-full px-4 py-1.5 transition-all group ${isShiftDropdownOpen ? 'bg-white shadow-md ring-1 ring-slate-200' : 'hover:bg-slate-200/50'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${currentShift.includes('Shift A') ? 'bg-primary' : 'bg-orange-500'}`}></div>
            <span className={`text-xs font-semibold tracking-tight ${isShiftDropdownOpen ? 'text-slate-900' : 'text-slate-600'}`}>{currentShift}</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${isShiftDropdownOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
          </button>
          {isShiftDropdownOpen && (
            <div className="absolute top-full left-0 mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {['Shift A', 'Shift B', 'Shift C', 'General Shift'].map((shift) => (
                <button key={shift} onClick={() => { setCurrentShift(shift); setIsShiftDropdownOpen(false); }} className={`w-full text-left px-5 py-2.5 text-xs flex items-center justify-between font-semibold transition-colors ${currentShift === shift ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                  {shift}
                  {currentShift === shift && <Check size={14} className="text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" size={16} />
          <input type="text" placeholder="Universal search..." className="pl-9 pr-4 py-2 bg-slate-200/40 border-transparent border rounded-xl text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/30 transition-all placeholder:text-slate-400 font-medium" />
        </div> */}

        {/* Notifications Popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              if (!isNotificationsOpen) {
                fetchNotifications();
              }
              setIsNotificationsOpen(!isNotificationsOpen);
            }}
            className={`relative p-2 rounded-xl transition-all ${isNotificationsOpen ? 'bg-white shadow-md text-primary ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/50'}`}
          >
            <Bell size={20} strokeWidth={2} />
            {liveNotifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50"></span>}
          </button>

          {isNotificationsOpen && (
            <div className="absolute top-full right-0 mt-3 w-[26rem] bg-white border border-slate-200 rounded-3xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History size={16} className="text-slate-400" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Past Events Log</h3>
                </div>
                <button onClick={() => setIsNotificationsOpen(false)} className="p-1 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><X size={16} /></button>
              </div>
              <div className="max-h-[420px] overflow-y-auto no-scrollbar py-2">
                {liveNotifications.length > 0 ? (
                  liveNotifications.map((event) => (
                    <div key={event.id} className="px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shadow-sm">
                            <AlertTriangle size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 leading-tight">{event.storage_class}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{event.metadata.zone_camera}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 font-mono">{new Date(event.detected_at).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-end mt-3 gap-2">
                        <button
                          onClick={() => {
                            onViewIncident(event.event_id);
                            setIsNotificationsOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                          <Info size={12} />
                          View Incident
                        </button>
                        <button
                          onClick={() => {
                            onViewEvent({
                              type: event.metadata.label,
                              zone: event.metadata.zone_camera,
                              stream_id: event.stream_id,
                              s3_url: event.s3_url
                            });
                            setIsNotificationsOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-200 hover:bg-primary-700 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          <Eye size={12} />
                          Respond Event
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 px-8 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <Bell size={24} />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">No past events found</h4>
                    <p className="text-xs text-slate-500">Alerts will appear here as they are detected by the AI engine.</p>
                  </div>
                )}
              </div>
              {eventHistory.length > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                  <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline">Clear Notification History</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={userDropdownRef}>
          <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-200/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-slate-200 ring-2 ring-white">RK</div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-black text-slate-900 leading-none">Rajesh Kumar</p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter mt-0.5">Admin</p>
            </div>
            <ChevronDown size={12} className={`text-slate-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 mt-3 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="px-5 py-4 border-b border-slate-50 mb-1">
                <p className="text-sm font-black text-slate-900">Admin Console</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Binary Semantics Enterprise</p>
              </div>
              <button className="w-full text-left px-5 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-3 font-semibold transition-colors"><User size={14} /> My Profile</button>
              <button className="w-full text-left px-5 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-3 font-semibold transition-colors"><Settings size={14} /> System Config</button>
              <div className="border-t border-slate-50 my-1"></div>
              <button onClick={() => { setIsUserDropdownOpen(false); onLogout?.(); }} className="w-full text-left px-5 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-3 font-black uppercase tracking-widest transition-colors"><LogOut size={14} /> Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};