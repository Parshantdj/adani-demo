import React, { useState, useEffect } from 'react';
import {
  Maximize2, Activity, WifiOff, Camera, RefreshCw,
  Grid2X2, Grid3X3, Thermometer, X, Clock, ScanFace,
  Wind, AlertTriangle, Search, Filter, ChevronDown,
  Layers, ShieldCheck
} from 'lucide-react';

const CAMERAS = [
  {
    id: 'C01',
    name: 'Main Gate (Mundra)',
    zone: 'Logistics Park',
    status: 'Online',
    alerts: 0,
    videoUrl: 'https://vision-module-bsl.s3.ap-south-1.amazonaws.com/temp/ppe_test_new_predicted+2.mp4',
    detection: { top: '20%', left: '35%', width: '30%', height: '65%', label: 'PPE COMPLIANT', conf: '99.2%' }
  },
  {
    id: 'C02',
    name: 'Boiler Zone Control',
    zone: 'Boiler Zone',
    status: 'Online',
    alerts: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://vision-module-bsl.s3.ap-south-1.amazonaws.com/temp/detection_result%20(1).mp4',
    detection: { top: '15%', left: '40%', width: '25%', height: '70%', label: 'NO HELMET', conf: '94.8%', alert: true }
  }
];

const ACCESS_LOGS = [
  { time: '14:42:05', user: 'Rajesh Kumar', conf: '99.2%', bac: '0.00%', meaning: 'Normal Sobriety' },
  { time: '14:42:08', user: 'Amit Sharma', conf: '98.5%', bac: '0.00%', meaning: 'Normal Sobriety' },
  { time: '14:42:12', user: 'Vikram Singh', conf: '94.1%', bac: '0.042%', meaning: 'Alcohol Detected' },
  { time: '14:42:18', user: 'Suresh Patel', conf: '89.5%', bac: '0.015%', meaning: 'Trace Alcohol' },
  { time: '14:42:25', user: 'Rahul Verma', conf: '92.3%', bac: '0.00%', meaning: 'Normal Sobriety' },
  { time: '14:42:30', user: 'Ankit Das', conf: '95.8%', bac: '0.00%', meaning: 'Normal Sobriety' },
];

const PPE_LOGS = [
  { time: '0:01', event: 'No Helmet', conf: '82%', severity: 'LOW' },
  { time: '0:02', event: 'No Helmet', conf: '55%', severity: 'CRITICAL' },
  { time: '0:03', event: 'No Vest', conf: '88%', severity: 'LOW' },
  { time: '0:04', event: 'No Vest', conf: '61%', severity: 'CRITICAL' },
  { time: '0:11', event: 'Fire Detected', conf: '87%', severity: 'CRITICAL' },
];

export const LiveMonitoring: React.FC = () => {
  const [gridSize, setGridSize] = useState(2);
  const [expandedCamId, setExpandedCamId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Online' | 'Offline'>('All');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCameras = CAMERAS.filter(cam => {
    const matchesSearch = cam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cam.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCam = CAMERAS.find(c => c.id === expandedCamId);
  const isAccessControl = activeCam?.id === 'C02';

  const formattedTimeOverlay = currentTime.toLocaleString('en-US', {
    month: '2-digit', day: '2-digit', year: 'numeric',
    weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).replace(',', '');

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  return (
    <div className="h-full flex flex-col gap-6 pb-20">

      {/* HUD Header with Filters */}
      <div className="flex items-center gap-4 py-2 px-4 bg-white/40 shadow-sm rounded border border-black/5 shadow-sm">

        {/* ID/Name Search Pill */}
        <div className="relative group">
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded px-5 py-2 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20 w-64">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="SEARCH ID / NAME"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-[10px] font-black text-slate-800 outline-none w-full uppercase tracking-widest placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Status Filter Pill */}
        <div className="relative group">
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded px-5 py-2 shadow-sm transition-all hover:shadow-md cursor-pointer">
            <Layers size={16} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-[10px] font-black text-slate-800 outline-none cursor-pointer uppercase tracking-widest appearance-none pr-4"
            >
              <option value="All">ALL STATUS</option>
              <option value="Online">ONLINE ONLY</option>
              <option value="Offline">OFFLINE ONLY</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
          </div>
        </div>

        {/* Refresh Icon */}
        <button
          onClick={resetFilters}
          title="Reset Filters"
          className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-full transition-all shadow-sm border border-slate-50"
        >
          <RefreshCw size={16} />
        </button>

        <div className="w-px h-8 bg-slate-200/60 mx-2"></div>

        {/* Telemetry Stats */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-0.5">STREAMS</span>
              <span className="text-xs font-black text-slate-800 tracking-tight">{filteredCameras.length} Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
              <AlertTriangle size={16} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] leading-none mb-0.5">SECURITY</span>
              <span className="text-xs font-black text-red-600 tracking-tight">1 Critical</span>
            </div>
          </div>
        </div>

        {/* Layout Controls */}
        <div className="ml-auto flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
            <button
              onClick={() => setGridSize(2)}
              className={`p-2 rounded-xl transition-all ${gridSize === 2 ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => setGridSize(3)}
              className={`p-2 rounded-xl transition-all ${gridSize === 3 ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cameras */}
      <div className={`grid gap-6 flex-1 ${gridSize === 2 ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredCameras.map((cam) => (
          <div key={cam.id} className="group relative aspect-video bg-slate-950 rounded-xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-primary/50 transition-all cursor-pointer">
            {cam.status === 'Online' ? (
              <div className="w-full h-full relative">
                {cam.videoUrl ? (
                  <video
                    src={cam.videoUrl}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={cam.image}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                    alt={cam.name}
                  />
                )}

                {/* Surveillance Overlays */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40"></div>
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-600 gap-4">
                <WifiOff size={48} strokeWidth={1.5} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse text-slate-500">Signal Lost - Link Offline</span>
              </div>
            )}

            {/* Camera Header Overlay */}
            <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-start z-20">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-mono font-semibold text-primary-400 border border-white/10 uppercase tracking-widest shadow-2xl">
                    {cam.id}
                  </span>
                  <span className="text-white font-black text-xs drop-shadow-xl tracking-tight uppercase bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/5">
                    {cam.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-1">
                  <div className={`w-2 h-2 rounded-full ${cam.status === 'Online' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-500'}`}></div>
                  <span className="text-white/70 text-[9px] uppercase font-black tracking-[0.2em] drop-shadow-md">{cam.status} • {cam.zone}</span>
                </div>
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500 z-30">
              <div className="flex gap-2.5">
                {/* Functional buttons like Analytics and Snapshot removed as requested */}
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedCamId(cam.id); }}
                  title="Fullscreen"
                  className="p-2.5 bg-white/10 hover:bg-primary rounded-xl backdrop-blur-md text-white transition-all border border-white/10 shadow-2xl"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>

            {/* Telemetry Overlay */}
            <div className="absolute bottom-5 right-5 text-right pointer-events-none group-hover:opacity-0 transition-opacity z-10">
              <p className="text-[8px] font-mono text-white/40 mb-1 tracking-tighter uppercase">LATENCY: 14ms • BUFFER: 0%</p>
              <p className="text-[10px] font-mono text-primary-400 font-semibold uppercase tracking-[0.2em] drop-shadow-lg">
                {formattedTimeOverlay}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Camera Modal */}
      {activeCam && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          {/* Refined Close Button matching attached reference Image 2 */}
          <button
            onClick={() => setExpandedCamId(null)}
            className="absolute top-8 right-8 p-2 bg-black/60 text-white/80 rounded-full hover:bg-black hover:text-white transition-all z-50 backdrop-blur-md shadow-xl border border-white/5"
          >
            <X size={24} />
          </button>

          <div className="w-full max-w-[1440px] h-[88vh] bg-white rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border border-white/10">
            {/* Left Side - Video Feed */}
            <div className="flex-1 bg-black relative group flex items-center justify-center">
              <video
                src={activeCam.videoUrl}
                autoPlay
                loop
                muted
                controls
                className="w-full h-full object-contain"
              />

              {/* Top Overlay */}
              <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="flex items-center gap-3 bg-red-600 text-white px-5 py-2 rounded-2xl shadow-2xl shadow-red-900/40">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">REC</span>
                </div>
                <div className="text-white font-mono text-2xl font-semibold tracking-[0.25em] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] opacity-90">
                  {formattedTimeOverlay}
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-2xl py-4 px-10 flex justify-between items-center text-[11px] font-mono text-slate-400 border-t border-white/5">
                <div className="flex gap-10">
                  <span>FPS: <span className="text-white font-semibold">30</span></span>
                  <span>BITRATE: <span className="text-white font-semibold">4096 kbps</span></span>
                  <span>CODEC: <span className="text-white font-semibold">H.265</span></span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                  <span className="text-green-500 font-black uppercase tracking-[0.2em]">Signal Stable</span>
                </div>
              </div>
            </div>

            {/* Right Side - Incident Log */}
            <div className="w-full md:w-[500px] bg-white border-l border-slate-100 flex flex-col">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="p-2.5 bg-primary-50 rounded-xl text-primary">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-black text-xl tracking-tight">{isAccessControl ? 'Access Matrix' : 'Incident Stream'}</h3>
                </div>
                <span className="px-3 py-1.5 bg-primary-50/50 text-primary rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border border-primary-100/50 animate-pulse">Live Feed</span>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                {/* Table Header */}
                {isAccessControl ? (
                  <div className="grid grid-cols-12 px-8 py-4 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
                    <div className="col-span-3">Time</div>
                    <div className="col-span-5">Identity</div>
                    <div className="col-span-4 text-right">Result</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 px-8 py-4 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
                    <div className="col-span-3">Time</div>
                    <div className="col-span-6">Violation Event</div>
                    <div className="col-span-3 text-right">Grade</div>
                  </div>
                )}

                {/* Log Items */}
                <div className="divide-y divide-slate-50">
                  {isAccessControl ? (
                    ACCESS_LOGS.map((log, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-8 py-5 hover:bg-slate-50/80 transition-colors items-center group">
                        <div className="col-span-3 text-[11px] font-mono font-semibold text-slate-400">{log.time}</div>
                        <div className="col-span-5 pr-4">
                          <p className="text-sm font-black text-slate-800 tracking-tight">{log.user}</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-2">
                            <ScanFace size={10} className="text-primary" /> Match: <span className={parseFloat(log.conf) > 90 ? "text-emerald-600" : "text-orange-500"}>{log.conf}</span>
                          </p>
                        </div>
                        <div className="col-span-4 text-right">
                          <div className="flex items-center justify-end gap-2 mb-1">
                            <Wind size={10} className={parseFloat(log.bac) > 0.03 ? 'text-red-500' : 'text-slate-400'} />
                            <p className={`text-sm font-mono font-black ${parseFloat(log.bac) > 0.03 ? 'text-red-600' : parseFloat(log.bac) > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                              {log.bac}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${parseFloat(log.bac) > 0.03 ? 'bg-red-50 text-red-600 border border-red-100' :
                            parseFloat(log.bac) > 0 ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                              'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            }`}>
                            {log.meaning}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    PPE_LOGS.map((log, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-8 py-5 hover:bg-slate-50/80 transition-colors items-center group">
                        <div className="col-span-3 text-[11px] font-mono font-semibold text-slate-400">{log.time}</div>
                        <div className="col-span-6 pr-4">
                          <p className={`text-sm font-black tracking-tight ${log.event.includes('VIOLATION') || log.severity === 'CRITICAL' ? 'text-red-600' : 'text-slate-800'}`}>
                            {log.event.replace('VIOLATION: ', '')}
                          </p>
                          {log.event.includes('VIOLATION') && (
                            <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.25em] mt-1 flex items-center gap-1.5">
                              <AlertTriangle size={10} /> CRITICAL
                            </p>
                          )}
                          <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-widest opacity-60">AI Confidence: {log.conf}</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${log.severity === 'CRITICAL' ? 'bg-red-600 text-white shadow-xl shadow-red-100' :
                            log.severity === 'MEDIUM' ? 'bg-orange-500 text-white shadow-xl shadow-orange-100' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                            {log.severity}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Disclaimer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/20">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.1em] text-center leading-relaxed italic opacity-70">
                  Layer 3 Encryption Active • Secure Link 142.11 • Industrial Compliance v3.1
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};