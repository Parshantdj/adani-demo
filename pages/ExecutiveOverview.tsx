import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LineChart, BarChart, PieChart } from '@mui/x-charts';
import { TrendingUp, AlertTriangle, ShieldCheck, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, Camera, X, CheckCircle2, Circle, Loader2, Activity, HardHat, Flame, Users, ScanFace, Minus, ShieldAlert } from 'lucide-react';
import { MOCK_INCIDENTS, SITE_HIERARCHY } from '../constants';
import { IncidentStatus, IncidentSeverity } from '../types';

interface ExecutiveOverviewProps {
  onRespond?: (eventData: { type: string, zone: string }) => void;
  onEventComplete?: (event: any) => void;
  currentSite: string;
  startDate: Date;
  endDate: Date | null;
  currentShift: string;
}

const LIFECYCLE_STAGES = ['Detection', 'Alert', 'Ack', 'Action', 'Resolution'];

const CRITICAL_EVENT_TYPES = [
  "No Helmet",
  "No Vest",
  "No Safety Shoes",
  "No Gloves",
  "No Mask",
  "Fire Detected",
  "Smoke Detected",
  "Overcrowding Detected",
  "Violence Detected"
];

// Utility to generate a pseudo-random number based on a string seed
const getSeededRandom = (seed: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return ((h >>> 0) / 4294967296);
};

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  onRespond,
  onEventComplete,
  currentSite,
  startDate,
  endDate,
  currentShift
}) => {
  const [showActiveIncidentsModal, setShowActiveIncidentsModal] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [apiData, setApiData] = useState<any[]>(() => {
    const saved = sessionStorage.getItem('adani_incidents_cache');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(apiData.length === 0);

  const fetchIncidents = useCallback(async () => {
    try {
      const response = await fetch(`https://isafetyrobo.binarysemantics.org/api/violations?page=1&limit=10000`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setApiData(data.incidents);
      sessionStorage.setItem('adani_incidents_cache', JSON.stringify(data.incidents));
      if (data.count) sessionStorage.setItem('adani_incidents_cache_count', data.count.toString());
    } catch (error) {
      console.error('Error fetching Executive incidents:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  // 1. Resolve Target Zones based on currentSite selection
  const targetZones = useMemo(() => {
    if (currentSite.includes(' - ')) {
      return [currentSite.split(' - ')[1]];
    }
    const siteObj = SITE_HIERARCHY.flatMap(b => b.sites).find(s => s.name === currentSite);
    if (siteObj) return siteObj.zones;
    return ['Main Deck'];
  }, [currentSite]);

  // 2. Cycle Logic for Live Banner - Pick latest 5 incidents from API
  useEffect(() => {
    if (apiData.length === 0) return;

    let timeoutId: any;
    let counter = 0;

    const triggerBannerCycle = () => {
      const latestItems = apiData.slice(0, 5);
      const inc = latestItems[counter % latestItems.length];

      const newEvent = {
        id: inc.id,
        event_id: inc.event_id,
        stream_id: inc.stream_id,
        s3_url: inc.s3_url,
        type: inc.metadata.label,
        zone: inc.metadata.zone_camera,
        time: new Date(inc.detected_at).toLocaleTimeString()
      };

      setActiveEvent(newEvent);
      setIsBannerVisible(true);
      counter++;

      timeoutId = setTimeout(() => {
        setIsBannerVisible(false);
        onEventComplete?.(newEvent);
        timeoutId = setTimeout(() => {
          triggerBannerCycle();
        }, 2000);
      }, 3000);
    };

    triggerBannerCycle();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [apiData, onEventComplete]);

  // 3. Filter Live Incidents for Charts/Tables
  const filteredIncidents = useMemo(() => {
    return apiData.filter(inc => {
      return targetZones.length === 0 || targetZones.some(tz => inc.metadata.zone_camera.toLowerCase().includes(tz.toLowerCase()));
    });
  }, [apiData, targetZones]);

  // Helper to determine mock stage based on incident ID
  const getMockStageIndex = (id: number | string) => {
    const num = id.toString().split('-').pop() || '0';
    return (parseInt(num) % 3) + 1;
  };

  // 4. Generate Dynamic KPI Data based on Site/Shift seed
  const seed = `${currentSite}-${currentShift}-${startDate.toISOString()}`;

  const generateScore = (base: number, variance: number) => {
    const val = base + (getSeededRandom(seed + base) * variance * 2 - variance);
    return Math.min(100, Math.max(0, val)).toFixed(1);
  };

  const kpiData = [
    { label: 'PPE Compliance Score', value: `${generateScore(96, 4)}%`, change: getSeededRandom(seed + 'ppe') > 0.5 ? '+0.5%' : '-0.2%', trend: getSeededRandom(seed + 'ppe') > 0.5 ? 'up' : 'down', icon: <HardHat className="text-primary" />, color: 'bg-primary-50' },
    { label: 'Fire & Smoke Safety Score', value: '100%', change: 'Stable', trend: 'neutral', icon: <Flame className="text-red-600" />, color: 'bg-red-50' },
    { label: 'Overcrowding Score', value: `${generateScore(92, 5)}%`, change: '-1.2%', trend: 'down', icon: <Users className="text-orange-600" />, color: 'bg-orange-50' },
    { label: 'Violence-Free Score', value: '99.9%', change: '+0.1%', trend: 'up', icon: <ShieldAlert className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Identity Match Rate', value: `${generateScore(98, 2)}%`, change: '+0.8%', trend: 'up', icon: <ScanFace className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Active Incidents', value: filteredIncidents.filter(i => i.metadata.status.toUpperCase() === 'ACTIVE').length.toString(), change: 'Live', trend: 'neutral', icon: <Activity className="text-slate-600" />, color: 'bg-slate-100' },
  ];

  // 5. Generate Heatmap Data
  const heatmapData = targetZones.slice(0, 5).map((zone, idx) => ({
    zone,
    risk: Math.floor(getSeededRandom(seed + zone) * 100),
    color: ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-primary', 'bg-green-500'][idx % 5],
    alerts: Math.floor(getSeededRandom(seed + zone + 'alerts') * 20)
  }));

  const handleRespondClick = () => {
    if (activeEvent) {
      onRespond?.({ type: activeEvent.type, zone: activeEvent.zone });
    }
  };

  // Handle respond for a specific event
  const handleRespondToEvent = (event: any) => {
    onRespond?.({ type: event.type, zone: event.zone });
  };

  // Derived data for Active Incidents Modal
  const activeIncidentsData = useMemo(() => {
    return filteredIncidents.filter(inc => inc.status === IncidentStatus.ACTIVE).map(inc => {
      const stageIndex = getMockStageIndex(inc.id);
      return {
        ...inc,
        currentStage: LIFECYCLE_STAGES[stageIndex],
        progress: ((stageIndex + 1) / LIFECYCLE_STAGES.length) * 100,
        severityColor: inc.severity === IncidentSeverity.CRITICAL ? 'text-red-600' : 'text-orange-600',
        severityBg: inc.severity === IncidentSeverity.CRITICAL ? 'bg-red-50' : 'bg-orange-50',
        severityBorder: inc.severity === IncidentSeverity.CRITICAL ? 'border-red-100' : 'border-orange-100',
      };
    });
  }, [filteredIncidents]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* Dynamic Pop-up Banner - Widgets move up when this is null */}
      {activeEvent && (
        <div key={activeEvent.id} className="group relative overflow-hidden rounded-2xl border border-red-200 bg-white/80 backdrop-blur-md shadow-xl shadow-red-500/5 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          {/* Striped Red Animated Background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,red_0,red_1px,transparent_0,transparent_10px)] animate-[shimmer_50s_linear_infinite]"></div>

          <div className="relative flex items-center justify-between p-4 px-6">
            <div className="flex items-center gap-5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100 shadow-sm transition-transform group-hover:scale-105">
                <AlertTriangle size={22} className="animate-[pulse_1s_infinite]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 border border-red-100 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  CRITICAL EVENT
                </span>
                <h2 className="text-md font-semibold text-slate-800 tracking-tight">
                  <span className="text-slate-900">{activeEvent.type}</span> at <span className="text-red-600 underline decoration-red-200 decoration-2 underline-offset-4 font-black">{activeEvent.zone.slice(0, 30)}</span>
                </h2>
              </div>
            </div>

            <button
              onClick={handleRespondClick}
              className="group/btn flex items-center gap-3 rounded-xl bg-red-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/20 transition-all hover:bg-red-700 hover:scale-[1.02] active:scale-95"
            >
              <span>RESPOND NOW</span>
              <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Section - Moves up when banner is hidden */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, idx) => {
          const isActiveIncidents = kpi.label === 'Active Incidents';
          return (
            <div
              key={idx}
              onClick={() => isActiveIncidents && setShowActiveIncidentsModal(true)}
              className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all ${isActiveIncidents
                ? 'cursor-pointer hover:shadow-lg hover:border-red-200 group relative overflow-hidden'
                : 'hover:shadow-md'
                }`}
            >
              {isActiveIncidents && (
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-full uppercase tracking-widest">View Stages</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi.color} ${isActiveIncidents ? 'group-hover:scale-110 transition-transform' : ''}`}>{kpi.icon}</div>
                <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
              <div className="flex items-end gap-2">
                <h2 className={`text-2xl font-semibold leading-none ${isActiveIncidents ? 'text-slate-900 group-hover:text-red-600 transition-colors' : 'text-slate-900'}`}>{kpi.value}</h2>
                <span className={`text-xs font-semibold flex items-center mb-0.5 ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-slate-400'}`}>
                  {kpi.trend === 'up' && <ArrowUpRight size={14} />}
                  {kpi.trend === 'down' && <ArrowDownRight size={14} />}
                  {kpi.trend === 'neutral' && <Minus size={14} />}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Module Compliance Trends (7 Days)</h3>
            <div className="flex gap-2">
              <button className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Weekly</button>
              <button className="text-xs font-semibold px-3 py-1 text-slate-400 hover:bg-slate-50 rounded-full">Monthly</button>
            </div>
          </div>
          <div className="h-72">
            <LineChart
              series={[
                {
                  data: [96, 95.5, 97, 98, 98.2, 98.5, 98.5].map(v => v - (getSeededRandom(seed + 'c1') * 5)),
                  label: 'PPE %', color: '#2563eb', showMark: false
                },
                {
                  data: [98, 98.2, 99, 98.8, 99, 99.1, 99.1].map(v => v - (getSeededRandom(seed + 'c2') * 2)),
                  label: 'Identity %', color: '#10b981', showMark: false
                },
                {
                  data: [90, 88, 92, 91, 93, 94, 94.2].map(v => v - (getSeededRandom(seed + 'c3') * 10)),
                  label: 'Overcrowding %', color: '#f97316', showMark: false
                },
                {
                  data: [100, 100, 99.5, 100, 100, 100, 99.9],
                  label: 'Violence-Free %', color: '#8b5cf6', showMark: false
                },
                {
                  data: [90, 90, 92.5, 93.5, 94.5, 95.5, 96.5],
                  label: 'Fire & Smoke Safety %', color: 'red', showMark: false
                }
              ]}
              xAxis={[{ scaleType: 'point', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]}
              margin={{ top: 10, bottom: 20, left: 30, right: 10 }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Incident Distribution by Module</h3>
          <div className="h-72 flex justify-center">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 45 + getSeededRandom(seed) * 20, label: 'PPE', color: '#2563eb' },
                    { id: 1, value: 5 + getSeededRandom(seed + 'f') * 5, label: 'Fire/Smoke', color: '#ef4444' },
                    { id: 2, value: 25 + getSeededRandom(seed + 'c') * 10, label: 'Crowd', color: '#f97316' },
                    { id: 3, value: 10 + getSeededRandom(seed + 'v') * 5, label: 'Violence', color: '#8b5cf6' },
                    { id: 4, value: 15 + getSeededRandom(seed + 'i') * 5, label: 'Identity', color: '#10b981' },
                  ],
                  innerRadius: 80,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                },
              ]}
              height={280}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Active Incidents ({currentSite})</h3>
            <button className="text-primary text-xs font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            {filteredIncidents.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Snapshot</th>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Zone</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredIncidents.slice(0, 5).map((inc) => (
                    <tr key={inc.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="relative w-12 h-8 rounded border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                          {inc.s3_url ? (
                            <img src={inc.s3_url} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera size={12} className="text-slate-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-primary">{inc.event_id.substring(0, 8)}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{inc.metadata.label}</td>
                      <td className="px-6 py-4 text-slate-500">{inc.metadata.zone_camera}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${inc.metadata.severity.toLowerCase() === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                          {inc.metadata.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full animate-pulse ${inc.metadata.status.toUpperCase() === 'ACTIVE' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                          <span className={`text-xs font-semibold ${inc.metadata.status.toUpperCase() === 'ACTIVE' ? 'text-red-600' : 'text-blue-600'}`}>{inc.metadata.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p className="text-sm font-medium">No active incidents found for this location.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-6">Zone Risk Heatmap ({currentSite})</h3>
          <div className="space-y-4">
            {heatmapData.length > 0 ? heatmapData.map((z, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 uppercase">{z.zone}</span>
                  <span className="text-slate-500">{z.alerts} alerts / day</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className={`h-full ${z.color}`} style={{ width: `${z.risk}%` }}></div>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-400 py-8">
                <p>No zone data available for this selection.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Incidents Stages Modal */}
      {showActiveIncidentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Active Incident Lifecycle Tracker</h3>
                  <p className="text-sm text-slate-500">Real-time stage progression for currently active violations in {currentSite}.</p>
                </div>
              </div>
              <button
                onClick={() => setShowActiveIncidentsModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4 bg-slate-50/30">
              {filteredIncidents.filter(i => i.metadata.status.toUpperCase() === 'ACTIVE').length > 0 ?
                filteredIncidents.filter(i => i.metadata.status.toUpperCase() === 'ACTIVE').map((incident, idx) => {
                  const currentStageIndex = getMockStageIndex(incident.id);
                  const progressPercentage = (currentStageIndex / (LIFECYCLE_STAGES.length - 1)) * 100;

                  return (
                    <div key={incident.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-primary-300 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            {incident.s3_url ? (
                              <img src={incident.s3_url} className="w-full h-full object-cover" alt="Thumb" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300"><Camera size={16} /></div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-black text-primary uppercase tracking-widest">{incident.event_id.substring(0, 8)}</span>
                              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded text-white uppercase ${incident.metadata.severity.toLowerCase() === 'critical' ? 'bg-red-600' : incident.metadata.severity.toLowerCase() === 'high' ? 'bg-orange-500' : 'bg-primary'}`}>{incident.metadata.severity}</span>
                            </div>
                            <h4 className="font-semibold text-slate-900 text-sm mb-0.5">{incident.metadata.label}</h4>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded">{incident.metadata.zone_camera}</span>
                              <span className="text-slate-300">•</span>
                              {new Date(incident.detected_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Elapsed Time</p>
                          <div className="flex items-center justify-end gap-1.5 text-red-600 font-mono font-semibold text-base">
                            <Clock size={14} className="animate-pulse" />
                            <span>00:{14 + idx}:22</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative px-2">
                        <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
                        <div
                          className="absolute top-4 left-0 h-1 bg-primary rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>

                        <div className="relative flex justify-between z-10">
                          {LIFECYCLE_STAGES.map((stage, stageIdx) => {
                            const isCompleted = stageIdx < currentStageIndex;
                            const isCurrent = stageIdx === currentStageIndex;

                            return (
                              <div key={stage} className="flex flex-col items-center gap-3 w-20">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 ${isCompleted ? 'bg-primary border-primary text-white' :
                                  isCurrent ? 'bg-white border-primary text-primary shadow-lg shadow-primary-100 scale-110' :
                                    'bg-white border-slate-200 text-slate-300'
                                  }`}>
                                  {isCompleted ? <CheckCircle2 size={16} strokeWidth={3} /> :
                                    isCurrent ? <Loader2 size={18} className="animate-spin" /> :
                                      <Circle size={12} />}
                                </div>
                                <div className="text-center">
                                  <span className={`text-[10px] font-semibold uppercase tracking-wider block mb-0.5 ${isCurrent ? 'text-primary-700' : isCompleted ? 'text-slate-600' : 'text-slate-300'
                                    }`}>{stage}</span>
                                  {isCurrent && (
                                    <span className="text-[9px] font-medium text-primary bg-primary-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">In Progress</span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-10 text-slate-400">
                    <p>No active incidents to track.</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};