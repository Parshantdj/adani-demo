
import React from 'react';
import { Map, Plus, Search, ShieldCheck, AlertCircle, Eye, Settings, Users } from 'lucide-react';
import { SITE_HIERARCHY } from '../constants';

const ALL_ZONES = SITE_HIERARCHY.flatMap(b => b.sites.flatMap(s => s.zones));

const MOCK_ZONES = ALL_ZONES.map((zone, idx) => ({
  id: `ZN-${String(idx + 1).padStart(2, '0')}`,
  name: zone,
  type: idx % 3 === 0 ? 'Operations' : idx % 3 === 1 ? 'Hazmat' : 'Restricted',
  rules: idx % 2 === 0 ? ['PPE Helmet', 'PPE Vest'] : ['Face Auth', 'Thermal Spike', 'Fire/Smoke'],
  severity: idx % 4 === 0 ? 'Critical' : idx % 4 === 1 ? 'High' : 'Medium'
}));

export const ZoneConfiguration: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Map size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Zone Configuration</h2>
            <p className="text-slate-500 text-sm">Define safety boundaries and assign AI detection rules per plant area.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
          <Plus size={20} />
          Create Zone
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_ZONES.map((zone) => (
          <div key={zone.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all border-l-8 border-l-transparent hover:border-l-indigo-600">
            <div className="p-6 border-b border-slate-50 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest">{zone.id} • {zone.type}</p>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{zone.name}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${zone.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                {zone.severity} Risk
              </span>
            </div>

            <div className="p-6 bg-slate-50/50">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-3 flex items-center gap-2"><ShieldCheck size={14} /> Active AI Rules</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {zone.rules.map((rule, idx) => (
                  <span key={idx} className="bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-700 shadow-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    {rule}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-semibold text-slate-500">U{i}</div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[8px] font-semibold text-indigo-600">+2</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg border border-slate-200 shadow-sm"><Settings size={18} /></button>
                  <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg border border-slate-200 shadow-sm"><Eye size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
