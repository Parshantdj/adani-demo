import React, { useState, useEffect } from 'react';
import {
  AlertCircle, Siren, MapPin, Navigation, Clock,
  Phone, ShieldAlert, CheckCircle2, ArrowRight, Activity,
  Mic, Volume2, Radio, Wifi, ShieldX, Terminal, Shield
} from 'lucide-react';

interface ResponseTeam {
  id: string;
  name: string;
  type: 'Internal QRT' | 'Ext. Brigade';
  location: string;
  distance: string;
  eta: string;
  personnel: number;
  status: 'Available' | 'Dispatched' | 'Busy';
  contact: string;
}

const RESPONSE_TEAMS: ResponseTeam[] = [
  { id: 'QRT-01', name: 'Plant QRT Alpha', type: 'Internal QRT', location: 'Block A (On-Site)', distance: '0.4 km', eta: '2 mins', personnel: 6, status: 'Available', contact: '+91 99887 76655' },
  { id: 'QRT-02', name: 'Plant QRT Bravo', type: 'Internal QRT', location: 'Main Gate', distance: '1.2 km', eta: '5 mins', personnel: 4, status: 'Available', contact: '+91 99887 76656' },
  { id: 'EXT-01', name: 'City Fire Station #4', type: 'Ext. Brigade', location: 'Sector 42', distance: '4.5 km', eta: '12 mins', personnel: 14, status: 'Available', contact: '101 / +91 1122 3344' },
  { id: 'EXT-02', name: 'Industrial Safety Unit', type: 'Ext. Brigade', location: 'Highway Zone', distance: '8.2 km', eta: '18 mins', personnel: 10, status: 'Busy', contact: '+91 99112 23344' },
];

interface EmergencyResponseProps {
  onBack?: () => void;
  event: { type: string, zone: string } | null;
}

export const EmergencyResponse: React.FC<EmergencyResponseProps> = ({ onBack, event }) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'dispatching' | 'success'>('idle');
  const [isTalkActive, setIsTalkActive] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(20).fill(10));

  const selectedTeam = RESPONSE_TEAMS.find(t => t.id === selectedTeamId);

  // Determine relevant video based on event type
  const isFireEvent = event?.type.includes('Fire') || event?.type.includes('Smoke');
  const videoUrl = isFireEvent
    ? "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/temp/detection_result%20(1).mp4"
    : "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/temp/ppe_test_new_predicted+2.mp4";

  // Simulate audio visualizer
  useEffect(() => {
    const interval = setInterval(() => {
      setVisualizerBars(prev => prev.map(() => Math.random() * 80 + 10));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleDispatch = () => {
    if (!selectedTeam) return;
    setDispatchStatus('dispatching');
    setTimeout(() => {
      setDispatchStatus('success');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Slick Command Center Banner */}
      <div className="bg-[#0f172a] rounded-xl p-6 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute left-0 top-0 w-64 h-full bg-red-600/5 blur-[80px] pointer-events-none"></div>

        <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
          <div className="relative">
            <div className="w-14 h-14 bg-red-600 rounded-xl shadow-lg flex items-center justify-center animate-[pulse_2s_infinite]">
              <Shield size={28} className="text-white" fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-[#0f172a] animate-ping"></div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-red-600/20 text-red-500 text-[9px] font-black uppercase tracking-[0.2em] rounded border border-red-500/20">
                CRITICAL INCIDENT
              </span>
              <span className="text-slate-500 text-[10px] font-mono font-semibold tracking-widest uppercase">EMR-{Date.now().toString().slice(-6)}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight leading-none text-white">
              {event?.type || 'Violation Detected'} at <span className="text-red-500 uppercase">{event?.zone || 'All Zones'}</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest opacity-60">Real-time alert triggered. Protocol response required immediately.</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-10 relative z-10">
          <div className="flex flex-col items-end">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Response Clock</p>
            <p className="text-3xl font-mono font-black text-white tracking-tighter tabular-nums">00:02:14</p>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="flex flex-col items-end">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Risk Grade</p>
            <p className="text-3xl font-black text-white tracking-tight uppercase">Tier 1</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Left Column: Tactical View */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl relative aspect-video group ring-1 ring-white/5">
            {videoUrl.includes('video_feed') || "https://isafetyrobo.binarysemantics.org/video_feed/584f592a-b6a4-4423-9313-f5334978aed2".includes('video_feed') ? (
              <img
                src={"https://isafetyrobo.binarysemantics.org/video_feed/584f592a-b6a4-4423-9313-f5334978aed2"}
                className="w-full h-full object-cover"
                alt="Emergency Feed"
              />
            ) : (
              <video
                key={videoUrl}
                src={videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
            {/* HUD widgets removed as requested */}
          </div>

          {/* Comms Bridge - Small Radius */}
          <div className="bg-slate-900 rounded-xl p-1 shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
              <div className="flex-1 p-5 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-slate-800 bg-white/[0.01]">
                <div className="flex items-center gap-3 mb-2">
                  <Wifi size={18} className="text-emerald-500" />
                  <div>
                    <h4 className="text-white text-[11px] font-black tracking-wide uppercase">Site Audio Bridge</h4>
                    <p className="text-[9px] text-slate-500 font-mono font-semibold uppercase tracking-widest">Active Link • Channel Alpha</p>
                  </div>
                </div>
                <div className="flex items-end gap-0.5 h-8 w-full mt-1 opacity-40">
                  {visualizerBars.map((height, i) => (
                    <div key={i} className="flex-1 bg-emerald-500 rounded-t-[1px]" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
              </div>

              <div className="p-4 flex-shrink-0 bg-black/20">
                <button
                  onMouseDown={() => setIsTalkActive(true)}
                  onMouseUp={() => setIsTalkActive(false)}
                  onMouseLeave={() => setIsTalkActive(false)}
                  className={`w-full sm:w-auto min-w-[240px] px-6 py-4 rounded-lg flex items-center justify-center gap-4 transition-all duration-150 select-none ${isTalkActive ? 'bg-red-600 shadow-lg scale-[0.98]' : 'bg-white hover:bg-slate-50'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTalkActive ? 'bg-red-700 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                    <Mic size={20} />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className={`text-sm font-black tracking-widest ${isTalkActive ? 'text-white' : 'text-slate-900'}`}>
                      {isTalkActive ? 'TRANSMITTING' : 'HOLD TO TALK'}
                    </span>
                    <span className={`text-[8px] font-semibold uppercase tracking-widest ${isTalkActive ? 'text-red-200' : 'text-slate-400'}`}>
                      BROADCAST PAGING SYSTEM
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Clean Coordinate View - Removed Grid */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden h-52 w-full group">
            <div className="absolute inset-0 bg-slate-50/50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/[0.03] rounded-full animate-[ping_4s_infinite]"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 -mt-4">
              <MapPin size={48} className="text-red-600 drop-shadow-xl" fill="currentColor" strokeWidth={0} />
              <div className="bg-slate-900 px-6 py-3 rounded-xl shadow-xl mt-3 text-center border border-slate-800 min-w-[220px]">
                <h3 className="font-black text-white text-sm tracking-tight uppercase">Target Zone Origin</h3>
                <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.2em] mt-0.5">{event?.zone || 'GRID_REF_UNKNOWN'}</p>
              </div>
            </div>
            <div className="absolute top-5 left-6 text-[9px] font-mono text-slate-400 font-semibold uppercase tracking-widest">POS: 142.11 / 88.02</div>
            <div className="absolute bottom-5 right-6 text-[9px] font-mono text-slate-400 font-semibold uppercase tracking-widest">BEARING: 14° NE</div>
          </div>
        </div>

        {/* Right Column: Dispatch - Small Radius */}
        <div className="xl:col-span-5 flex flex-col">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg tracking-tight text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="text-primary" size={20} />
                  Field Deployments
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Select response unit for dispatch</p>
              </div>
              <span className="text-[9px] font-black text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">{RESPONSE_TEAMS.length} UNITS READY</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {RESPONSE_TEAMS.map((team) => (
                <div
                  key={team.id}
                  onClick={() => team.status === 'Available' && setSelectedTeamId(team.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer group ${selectedTeamId === team.id
                    ? 'border-primary bg-primary-50/40 shadow-lg ring-4 ring-primary-50'
                    : team.status === 'Available'
                      ? 'border-slate-100 bg-white hover:border-primary-300 hover:shadow-md'
                      : 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed grayscale'
                    }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md ${team.type.includes('Internal') ? 'bg-primary' : 'bg-orange-500'}`}>
                        {team.type.includes('Internal') ? <ShieldAlert size={18} /> : <Siren size={18} />}
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-900 tracking-tight leading-none mb-1">{team.name}</h4>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{team.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${team.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                      }`}>
                      {team.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50 flex flex-col items-center">
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">ETA</p>
                      <p className={`text-xs font-black ${Number(team.eta.split(' ')[0]) < 10 ? 'text-emerald-600' : 'text-orange-600'}`}>{team.eta}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50 flex flex-col items-center">
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">DIST</p>
                      <p className="text-xs font-black text-slate-800">{team.distance}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50 flex flex-col items-center">
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">UNIT</p>
                      <p className="text-xs font-black text-slate-800">{team.personnel}p</p>
                    </div>
                  </div>

                  {selectedTeamId === team.id && (
                    <div className="absolute top-3 right-3 text-primary animate-in zoom-in duration-300">
                      <CheckCircle2 size={20} fill="white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              {dispatchStatus === 'success' ? (
                <div className="w-full py-5 bg-emerald-500 text-white rounded-xl font-semibold flex flex-col items-center justify-center animate-in zoom-in shadow-xl shadow-emerald-200">
                  <div className="flex items-center gap-2 mb-0.5">
                    <CheckCircle2 size={24} />
                    <span className="text-lg font-black uppercase tracking-tight">Units Deployed</span>
                  </div>
                  <p className="text-[10px] font-medium opacity-90 tracking-wide uppercase">Tactical feed synced to unit devices</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-slate-400 font-black uppercase text-[8px] tracking-widest">Selected Unit</span>
                    <span className="font-black text-slate-900 text-xs tracking-tight">{selectedTeam ? selectedTeam.name : 'Awaiting...'}</span>
                  </div>
                  <button
                    disabled={!selectedTeam || dispatchStatus === 'dispatching'}
                    onClick={handleDispatch}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xs"
                  >
                    {dispatchStatus === 'dispatching' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Navigation size={18} fill="currentColor" />
                    )}
                    {dispatchStatus === 'dispatching' ? 'DEPLOYING...' : 'CONFIRM & DEPLOY UNIT'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};