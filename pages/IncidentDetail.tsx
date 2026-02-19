
import React from 'react';
import { MOCK_INCIDENTS } from '../constants';
import {
  ArrowLeft, Camera, ShieldAlert, Clock, MapPin,
  User, CheckCircle2, AlertCircle, Zap, Activity,
  Shield, GitBranch, MessageSquare, Download, Share2, Maximize2, X
} from 'lucide-react';
import { IncidentStatus } from '../types';

interface IncidentDetailProps {
  incidentId: string | null;
  onBack: () => void;
}

const BASE_PPE_LIFECYCLE_STEPS = [
  {
    id: 1,
    title: 'AI Detection',
    status: 'completed',
    timestamp: '10:15:32 AM',
    actor: 'System (Vision Engine)',
    description: 'AI-powered safety violation detection. ',
    details: [
      { key: 'Confidence Score', value: '94.2%' },
      { key: 'Analysis Time', value: '180ms' },
      { key: 'Frame Reference', value: 'FRAME-A1-04-1015' }
    ],
    remarks: 'Auto-detected during routine zone scan.'
  },
  {
    id: 2,
    title: 'Alert Dispatch',
    status: 'completed',
    timestamp: '10:15:35 AM',
    actor: 'System (Notification Hub)',
    description: 'Alert broadcasted to SOC operators and floor supervisors.',
    details: [
      { key: 'SOC Recipients', value: 'Rajesh K., Amit S.' },
      { key: 'Push Sent', value: '5 devices' },
      { key: 'Status', value: 'Broadcast Success' }
    ],
    remarks: 'Critical severity trigger applied.'
  },
  {
    id: 3,
    title: 'Acknowledgement',
    status: 'completed',
    timestamp: '10:16:45 AM',
    actor: 'Rajesh Kumar (Plant Safety Head)',
    description: 'Incident acknowledged and investigation started.',
    details: [
      { key: 'Response Latency', value: '73s' },
      { key: 'SLA Status', value: 'Within Limits (120s)' }
    ],
    remarks: 'Initiating immediate on-floor check.'
  },
  {
    id: 4,
    title: 'Corrective Action',
    status: 'active',
    timestamp: 'Ongoing',
    actor: 'Sanjay Gupta (Supervisor)',
    description: 'Supervisor dispatched to Zone Assembly Line 1.',
    details: [
      { key: 'Action Taken', value: 'Verbal warning & Helmet provided' },
      { key: 'Worker ID', value: 'ST-2041' }
    ],
    remarks: 'Waiting for resolution snapshot confirmation.'
  },
  {
    id: 5,
    title: 'Resolution',
    status: 'pending',
    timestamp: '-',
    actor: 'System/Supervisor',
    description: 'Final re-verification of PPE compliance.',
    remarks: 'Awaiting manual trigger.'
  }
];

const CACHE_KEY = 'adani_incidents_cache';

export const IncidentDetail: React.FC<IncidentDetailProps> = ({ incidentId, onBack }) => {
  const [incident, setIncident] = React.useState<any>(null);
  const [isEnlarged, setIsEnlarged] = React.useState(false);

  React.useEffect(() => {
    const saved = sessionStorage.getItem(CACHE_KEY);
    if (saved) {
      const allIncidents = JSON.parse(saved);
      const found = allIncidents.find((inc: any) => inc.event_id === incidentId);
      if (found) {
        setIncident(found);
      }
    }
  }, [incidentId]);

  console.log("incident", incident);

  if (!incident) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isResolved = incident.metadata.status.toUpperCase() === 'RESOLVED';

  // Transform steps based on incident resolution status
  const displaySteps = BASE_PPE_LIFECYCLE_STEPS.map(step => {
    if (isResolved) {
      // If resolved, ensure all steps (including Corrective Action and Resolution) are completed
      return {
        ...step,
        status: 'completed',
        timestamp: (step.timestamp === 'Ongoing' || step.timestamp === '-') ? '10:25:12 AM' : step.timestamp,
        description: step.id === 4 ? 'Corrective action verified and worker compliance confirmed.' :
          step.id === 5 ? 'System re-verified PPE status. Incident closed.' :
            step.description
      };
    }
    return step;
  });

  const completedCount = displaySteps.filter(s => s.status === 'completed').length;
  const activeCount = displaySteps.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Header / Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Incident Record</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-[10px] font-mono font-semibold text-primary">{incident.event_id.substring(0, 8)}</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">{incident.storage_class}</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Share2 size={16} />
            Share Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-all shadow-lg shadow-slate-200">
            <Download size={16} />
            Export Audit File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Evidence & Metadata */}
        <div className="xl:col-span-4 space-y-6">
          {/* Main Visual Evidence */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Camera size={14} /> Critical Evidence Frame
              </span>
              <span className="text-[10px] font-mono text-slate-400">STREAM: {incident.stream_id.substring(0, 8)}</span>
            </div>
            <div
              className="aspect-[4/3] relative bg-slate-900 overflow-hidden group cursor-zoom-in"
              onClick={() => setIsEnlarged(true)}
            >
              <img
                src={incident.s3_url || 'https://picsum.photos/seed/incident/800/600'}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                alt="Evidence"
              />

              <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} className="text-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white font-semibold tracking-widest font-mono">CLICK TO ENLARGE EVIDENCE</span>
                <button className="text-white hover:text-primary-400 transition-colors"><CheckCircle2 size={16} /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Severity</p>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${incident.metadata.severity.toUpperCase() === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'}`}>
                    {incident.metadata.severity}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">DETECTION TYPE</p>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase`}>
                    {incident.storage_class}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isResolved ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                    <span className="text-[10px] font-semibold text-slate-900 uppercase tracking-widest">{incident.metadata.status}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary rounded-lg"><MapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone Location</p>
                    <p className="text-sm font-semibold text-slate-800">{incident.metadata.zone_camera}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Clock size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detected On</p>
                    <p className="text-sm font-semibold text-slate-800">{new Date(incident.detected_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg"><User size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Owner</p>
                    <p className="text-sm font-semibold text-slate-800">{incident.metadata.owner}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary p-6 rounded-3xl text-white shadow-xl shadow-primary-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-16 -translate-y-16"></div>
            <h4 className="font-semibold flex items-center gap-2 mb-4"><Shield size={20} /> SOP Guidelines</h4>
            <ul className="space-y-3">
              {[
                "Inform worker to halt operation immediately.",
                "Provide a fresh safety helmet from Zone B cabinet.",
                "Log worker ID in disciplinary database.",
                "Re-scan zone after 5 minutes for compliance."
              ].map((s, idx) => (
                <li key={idx} className="flex gap-2 text-xs font-medium text-primary-50 leading-relaxed">
                  <span className="opacity-40">{idx + 1}.</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Workflow Lifecycle */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <GitBranch size={22} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Incident Workflow Lifecycle</h3>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{completedCount} Completed</span>
                </div>
                {activeCount > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{activeCount} Active</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative pl-12 space-y-12 pb-4">
              {/* Progress Line */}
              <div className="absolute left-6 top-2 bottom-6 w-0.5 bg-slate-100">
                <div className={`absolute top-0 left-0 w-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000`} style={{ height: isResolved ? '100%' : '60%' }}></div>
              </div>

              {displaySteps.map((step) => (
                <div key={step.id} className={`relative group ${step.status === 'pending' ? 'opacity-40 grayscale' : ''}`}>
                  {/* Step Marker */}
                  <div className={`absolute -left-12 w-12 h-12 flex items-center justify-center rounded-full border-4 border-white shadow-md z-10 transition-all ${step.status === 'completed' ? 'bg-green-500 text-white' :
                    step.status === 'active' ? 'bg-indigo-600 text-white scale-110 shadow-indigo-100 animate-pulse' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                    {step.status === 'completed' ? <CheckCircle2 size={24} /> :
                      step.id === 1 ? <Zap size={24} /> :
                        step.id === 2 ? <Activity size={24} /> :
                          step.id === 3 ? <User size={24} /> :
                            step.id === 4 ? <AlertCircle size={24} /> :
                              <Shield size={24} />
                    }
                  </div>

                  {/* Step Content Card */}
                  <div className={`p-6 rounded-2xl border transition-all ${step.status === 'active'
                    ? 'bg-indigo-50/30 border-indigo-200 shadow-lg shadow-indigo-50'
                    : 'bg-white border-slate-100'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className={`text-lg font-semibold ${step.status === 'active' ? 'text-indigo-900' : 'text-slate-900'}`}>{step.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={12} /> {step.timestamp}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <User size={12} /> {step.actor}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${step.status === 'completed' ? 'bg-green-100 text-green-700' :
                        step.status === 'active' ? 'bg-indigo-600 text-white' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                        {step.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                      {step.description}
                    </p>

                    {step.details && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{detail.key}</p>
                            <p className="text-xs font-semibold text-slate-700">{detail.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                      <MessageSquare size={16} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Remarks / Log Note</p>
                        <p className="text-xs text-slate-500 italic font-medium">"{step.remarks}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer removed per user request: "Current Task: Corrective Action card is not required." */}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setIsEnlarged(false)}
        >
          <button
            className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-all z-[110]"
            onClick={() => setIsEnlarged(false)}
          >
            <X size={24} />
          </button>

          <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5 animate-in zoom-in-95 duration-300">
            <img
              src={incident.s3_url || 'https://picsum.photos/seed/incident/800/600'}
              className="w-full h-full object-contain"
              alt="Enlarged Evidence"
            />
            {/* Redetect overlay in large view too */}


            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4 text-white">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">STREAM ID</span>
                  <span className="text-sm font-mono">{incident.stream_id}</span>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TIMESTAMP</span>
                  <span className="text-sm font-semibold">{new Date(incident.detected_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
