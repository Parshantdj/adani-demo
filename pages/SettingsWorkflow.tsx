
import React, { useState } from 'react';
import { GitBranch, HardHat, Flame, Shield, Info, Activity, User, Eye, CheckCircle2, AlertCircle, Save, ChevronRight, Zap } from 'lucide-react';

const PPE_WORKFLOW = [
  { step: 1, title: 'AI Detection', type: 'System', desc: 'AI identifies missing helmet, vest, or gloves (Confidence ≥ 90%).', icon: <Zap size={16} />, auto: true },
  { step: 2, title: 'Alert Dispatch', type: 'System', desc: 'Incident created with ID. Alerts sent to SOC, Mobile App, and Control Room.', icon: <Activity size={16} />, auto: true },
  { step: 3, title: 'Acknowledgement', type: 'Manual', desc: 'Safety Officer must acknowledge within 2 minutes. Alert turns red after 1 min.', icon: <User size={16} />, auto: false },
  { step: 4, title: 'Corrective Action', type: 'Manual', desc: 'Officer provides PPE or removes worker. Selection of action is mandatory.', icon: <CheckCircle2 size={16} />, auto: false },
  { step: 5, title: 'Resolution', type: 'System/Manual', desc: 'PPE wear re-verified via live snapshot. Incident marked as resolved.', icon: <Shield size={16} />, auto: true },
];

const FIRE_WORKFLOW = [
  { step: 1, title: 'AI Fire Detection', type: 'System', desc: 'Smoke/Flame analysis with multi-frame verification (≥ 95% confidence).', icon: <Zap size={16} />, auto: true },
  { step: 2, title: 'Immediate Alarm', type: 'System', desc: 'Auto-trigger siren, electrical isolation, and open Fire SOP on all screens.', icon: <Flame size={16} />, auto: true },
  { step: 3, title: 'Acknowledgement', type: 'Manual', desc: 'SOC must acknowledge within 30 seconds. System continues even if delayed.', icon: <User size={16} />, auto: false },
  { step: 4, title: 'Evacuation Tracking', type: 'System', desc: 'AI counts people in zone, marks registered vs unknown, tracks exit flow.', icon: <Eye size={16} />, auto: true },
  { step: 5, title: 'Fire Response', type: 'Manual', desc: 'Cordon area, dispatch fire team, verify stabilization. Action checklist enforced.', icon: <Shield size={16} />, auto: false },
  { step: 6, title: 'Multi-Level Approval', type: 'Manual', desc: 'Safety Officer and EHS Head must approve closure with evidence attached.', icon: <GitBranch size={16} />, auto: false },
];

export const SettingsWorkflow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PPE' | 'Fire'>('PPE');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <GitBranch size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Workflow Definition</h2>
            <p className="text-slate-500 text-sm">Define step-by-step lifecycles and standard operating procedures for incidents.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-100">
            <Save size={18} />
            Publish Workflow
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('PPE')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'PPE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <HardHat size={18} />
          PPE Incident Lifecycle
        </button>
        <button
          onClick={() => setActiveTab('Fire')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'Fire' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Flame size={18} />
          Fire Incident Lifecycle
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-slate-50/50 -skew-x-12 translate-x-32 pointer-events-none"></div>

        <div className="flex flex-col gap-4 relative z-10 max-w-4xl">
          {(activeTab === 'PPE' ? PPE_WORKFLOW : FIRE_WORKFLOW).map((step, idx) => (
            <div key={idx} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all ${step.auto ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-100' : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-600'
                  }`}>
                  {step.step}
                </div>
                {idx !== (activeTab === 'PPE' ? PPE_WORKFLOW.length - 1 : FIRE_WORKFLOW.length - 1) && (
                  <div className="w-0.5 h-16 bg-slate-100 group-hover:bg-indigo-100 transition-colors"></div>
                )}
              </div>

              <div className="flex-1 bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg ${step.auto ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}`}>
                      {step.icon}
                    </span>
                    <h4 className="font-semibold text-slate-900">{step.title}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-widest ${step.auto ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                    {step.auto ? 'System Enforced' : 'Human Task'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="bg-primary-50 p-3 rounded-xl text-primary"><AlertCircle size={24} /></div>
          <div>
            <h5 className="font-semibold text-slate-800 mb-1">Escalation Thresholds</h5>
            <p className="text-xs text-slate-500 leading-relaxed">System automatically upgrades incidents to next management level if workflow stays stagnant beyond 200% of SLA timers.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><Shield size={24} /></div>
          <div>
            <h5 className="font-semibold text-slate-800 mb-1">Audit Trail Integrity</h5>
            <p className="text-xs text-slate-500 leading-relaxed">Every workflow transition is time-stamped and signed with the operator ID, creating a legally-defensible safety ledger.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
