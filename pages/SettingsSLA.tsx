import React, { useState } from 'react';
import {
  Clock, ShieldCheck, Flame, HardHat, AlertTriangle, Save,
  RefreshCcw, Info, ArrowUpRight, X, ChevronDown, Plus,
  Edit2, Users, ShieldAlert, ScanFace
} from 'lucide-react';
import { SITE_HIERARCHY } from '../constants';

const ALL_ZONES = SITE_HIERARCHY.flatMap(b => b.sites.flatMap(s => s.zones));

const INITIAL_PPE_MATRIX = [
  { condition: 'Helmet Missing', zone: ALL_ZONES[0] || 'Zone 1', severity: 'Medium' },
  { condition: 'Helmet Missing', zone: ALL_ZONES[1] || 'Zone 2', severity: 'High' },
  { condition: 'Respirator Missing', zone: ALL_ZONES[2] || 'Zone 3', severity: 'Critical' },
  { condition: 'Welding Mask Missing', zone: ALL_ZONES[3] || 'Zone 4', severity: 'Critical' },
];

const INITIAL_FIRE_MATRIX = [
  { condition: 'Smoke only', zone: 'All Zones', severity: 'High' },
  { condition: 'Visible flame', zone: 'All Zones', severity: 'Critical' },
  { condition: 'Flame + People detected', zone: 'All Zones', severity: 'Critical+' },
  { condition: 'Fire in paint shop', zone: 'Paint Shop', severity: 'Critical+' },
];

const INITIAL_CROWD_MATRIX = [
  { condition: '80% Capacity Reached', zone: 'Common Areas', severity: 'Low' },
  { condition: '100% Capacity Reached', zone: 'Canteen/Lobby', severity: 'Medium' },
  { condition: 'Capacity Breach (>110%)', zone: 'Restricted Zones', severity: 'High' },
  { condition: 'Dwell Time > 30 mins', zone: 'Loading Docks', severity: 'Medium' },
];

const INITIAL_VIOLENCE_MATRIX = [
  { condition: 'Aggressive Stance', zone: 'All Zones', severity: 'High' },
  { condition: 'Physical Conflict', zone: 'All Zones', severity: 'Critical' },
  { condition: 'Running / Panic Flow', zone: 'Floor Areas', severity: 'High' },
  { condition: 'Weapon Detection', zone: 'Security Gates', severity: 'Critical+' },
];

const INITIAL_IDENTITY_MATRIX = [
  { condition: 'Unknown Face Detected', zone: 'Restricted', severity: 'Medium' },
  { condition: 'Blacklisted Personnel', zone: 'Main Gates', severity: 'High' },
  { condition: 'BAC Level > 0.03%', zone: 'Entry Points', severity: 'Critical' },
  { condition: 'Tailgating Detected', zone: 'Turnstiles', severity: 'High' },
];

const INITIAL_SLA_TIMERS = {
  PPE: [
    { stage: 'Detection → Incident Creation', sla: '≤ 2 sec' },
    { stage: 'Incident Creation → Alert', sla: '≤ 5 sec' },
    { stage: 'Alert → Acknowledgement', sla: '≤ 2 min' },
    { stage: 'Acknowledgement → Action', sla: '≤ 5 min' },
    { stage: 'Total Incident Closure', sla: '≤ 15 min' },
  ],
  Fire: [
    { stage: 'Detection → Incident Creation', sla: '≤ 1 sec' },
    { stage: 'Incident Creation → Alert', sla: '≤ 3 sec' },
    { stage: 'Alert → Acknowledgement', sla: '≤ 30 sec' },
    { stage: 'Alarm Trigger', sla: 'Immediate' },
    { stage: 'Evacuation Start', sla: '≤ 1 min' },
    { stage: 'Incident Stabilization', sla: '≤ 10 min' },
  ],
  Overcrowding: [
    { stage: 'Breach Detection → Log', sla: '≤ 5 sec' },
    { stage: 'Warning Announcement', sla: '≤ 30 sec' },
    { stage: 'Security Dispatch', sla: '≤ 2 min' },
    { stage: 'Dispersal Verification', sla: '≤ 8 min' },
  ],
  Violence: [
    { stage: 'Anomaly Detection → Alert', sla: '≤ 1 sec' },
    { stage: 'Visual Verification (SOC)', sla: '≤ 15 sec' },
    { stage: 'Security QRT Dispatch', sla: '≤ 45 sec' },
    { stage: 'On-site Intervention', sla: '≤ 3 min' },
  ],
  Identity: [
    { stage: 'Access Denial Latency', sla: '≤ 500 ms' },
    { stage: 'Unknown Person Logging', sla: '≤ 2 sec' },
    { stage: 'Supervisor Notification', sla: '≤ 1 min' },
    { stage: 'BAC Violation Lockout', sla: 'Immediate' },
  ]
};

type Category = 'PPE' | 'Fire' | 'Overcrowding' | 'Violence' | 'Identity';

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical', 'Critical+'];

export const SettingsSLA: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('PPE');
  const [matrices, setMatrices] = useState({
    PPE: INITIAL_PPE_MATRIX,
    Fire: INITIAL_FIRE_MATRIX,
    Overcrowding: INITIAL_CROWD_MATRIX,
    Violence: INITIAL_VIOLENCE_MATRIX,
    Identity: INITIAL_IDENTITY_MATRIX,
  });

  const [slaTimers, setSlaTimers] = useState(INITIAL_SLA_TIMERS);

  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false);
  const [isEditSlaModalOpen, setIsEditSlaModalOpen] = useState(false);
  const [editingSlaIndex, setEditingSlaIndex] = useState<number | null>(null);
  const [tempSlaValue, setTempSlaValue] = useState('');

  const [newRule, setNewRule] = useState({
    condition: '',
    zone: ALL_ZONES[0],
    severity: SEVERITIES[1]
  });

  const handleAddRule = () => {
    setMatrices(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { ...newRule }]
    }));
    setIsAddRuleModalOpen(false);
  };

  const handleUpdateSla = () => {
    if (editingSlaIndex === null) return;
    const updated = [...slaTimers[activeTab]];
    updated[editingSlaIndex].sla = tempSlaValue;
    setSlaTimers(prev => ({ ...prev, [activeTab]: updated }));
    setIsEditSlaModalOpen(false);
  };

  const currentMatrix = matrices[activeTab];
  const currentSlaTimers = slaTimers[activeTab];

  const getTabColor = (tab: Category) => {
    switch (tab) {
      case 'PPE': return 'text-primary';
      case 'Fire': return 'text-red-600';
      case 'Overcrowding': return 'text-orange-600';
      case 'Violence': return 'text-purple-600';
      case 'Identity': return 'text-emerald-600';
    }
  };

  const getTabIconColor = (tab: Category) => {
    if (activeTab === tab) return getTabColor(tab);
    return 'text-slate-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg text-white">
            <Clock size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">SLA Management</h2>
            <p className="text-slate-500 text-sm">Configure system-enforced response times and severity assignments across all AI modules.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setMatrices({
                PPE: INITIAL_PPE_MATRIX,
                Fire: INITIAL_FIRE_MATRIX,
                Overcrowding: INITIAL_CROWD_MATRIX,
                Violence: INITIAL_VIOLENCE_MATRIX,
                Identity: INITIAL_IDENTITY_MATRIX,
              });
              setSlaTimers(INITIAL_SLA_TIMERS);
            }}
            className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
          >
            <RefreshCcw size={18} />
            Reset to Default
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-100">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('PPE')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'PPE' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <HardHat size={16} />
          PPE Compliance
        </button>
        <button
          onClick={() => setActiveTab('Fire')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Fire' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Flame size={16} />
          Fire & Emergency
        </button>
        <button
          onClick={() => setActiveTab('Overcrowding')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Overcrowding' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Users size={16} />
          Overcrowding
        </button>
        <button
          onClick={() => setActiveTab('Violence')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Violence' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ShieldAlert size={16} />
          Violence
        </button>
        <button
          onClick={() => setActiveTab('Identity')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Identity' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ScanFace size={16} />
          Identity & Access
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className={getTabColor(activeTab)} />
              <h3 className="font-semibold text-slate-800">{activeTab} Severity Matrix</h3>
            </div>
            <button className="p-1.5 hover:bg-slate-50 rounded text-slate-400"><Info size={16} /></button>
          </div>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Trigger Condition</th>
                  <th className="px-6 py-4">Scope / Zone</th>
                  <th className="px-6 py-4">Assigned Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {currentMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold">{row.condition}</td>
                    <td className="px-6 py-4 text-slate-400 font-semibold uppercase tracking-widest text-[10px]">{row.zone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-widest ${row.severity.includes('Critical') ? 'bg-red-600 text-white' :
                          row.severity === 'High' ? 'bg-orange-600 text-white' :
                            row.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-primary-100 text-primary-700'
                        }`}>
                        {row.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
            <button
              onClick={() => setIsAddRuleModalOpen(true)}
              className="w-full py-3 bg-white border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-500 hover:border-primary-400 hover:text-primary hover:bg-primary-50/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              Add Custom Trigger Rule
            </button>
          </div>
        </div>

        {/* SLA Timers */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock size={20} className={getTabColor(activeTab)} />
              <h3 className="font-semibold text-slate-800">{activeTab} Response SLA</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {currentSlaTimers.map((timer, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary-200 transition-all">
                <div>
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{timer.stage}</h4>
                  <p className="text-sm font-black text-slate-900">{timer.sla}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setEditingSlaIndex(i);
                      setTempSlaValue(timer.sla);
                      setIsEditSlaModalOpen(true);
                    }}
                    className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button className="text-slate-300 hover:text-primary group-hover:translate-x-1 transition-all hidden sm:block">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50 rounded-b-2xl border-t border-slate-100 flex items-start gap-4">
            <div className={`p-2 rounded-lg text-white shadow-md ${activeTab === 'Fire' ? 'bg-red-600 shadow-red-100' : 'bg-slate-800 shadow-slate-200'}`}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Compliance Policy</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Automatic escalation to Safety Head if acknowledgement SLA is exceeded by 50%. These thresholds are audited during quarterly EHS reviews.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {isAddRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Add New {activeTab} Trigger</h3>
              <button onClick={() => setIsAddRuleModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Trigger Condition</label>
                <input
                  type="text"
                  placeholder="e.g. Unusual Motion Detected"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Severity</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary"
                  value={newRule.severity}
                  onChange={(e) => setNewRule({ ...newRule, severity: e.target.value })}
                >
                  {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t flex gap-3">
              <button onClick={() => setIsAddRuleModalOpen(false)} className="flex-1 py-3 bg-white border rounded-xl font-semibold text-slate-600">Cancel</button>
              <button onClick={handleAddRule} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary-100">Add Rule</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit SLA Modal */}
      {isEditSlaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Edit SLA Threshold</h3>
            </div>
            <div className="p-8 space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Response Time Limit</label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary transition-all"
                value={tempSlaValue}
                onChange={(e) => setTempSlaValue(e.target.value)}
              />
            </div>
            <div className="p-6 bg-slate-50 border-t flex gap-3">
              <button onClick={() => setIsEditSlaModalOpen(false)} className="flex-1 py-3 bg-white border rounded-xl font-semibold text-slate-600">Cancel</button>
              <button onClick={handleUpdateSla} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary-100">Update SLA</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};