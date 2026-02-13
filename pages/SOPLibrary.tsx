
import React from 'react';
import { ShieldCheck, Search, Plus, FileText, Download, CheckCircle2, Clock, MoreVertical, Edit2 } from 'lucide-react';

const MOCK_SOPS = [
  { id: 'SOP-SAFE-01', title: 'PPE Mandatory Check - Line A', version: 'v2.4', status: 'Approved', category: 'General Safety', lastUpdated: 'May 10, 2024' },
  { id: 'SOP-FIRE-04', title: 'Emergency Evacuation Protocol', version: 'v4.1', status: 'Approved', category: 'Emergency', lastUpdated: 'Apr 22, 2024' },
  { id: 'SOP-CHEM-12', title: 'Hazardous Material Handling', version: 'v1.0', status: 'In Review', category: 'Chemical', lastUpdated: 'May 18, 2024' },
  { id: 'SOP-ELEC-05', title: 'LOTO (Lock Out Tag Out)', version: 'v3.2', status: 'Approved', category: 'Electrical', lastUpdated: 'May 15, 2024' },
  { id: 'SOP-BAT-01', title: 'Battery Thermal Anomaly Response', version: 'v1.2', status: 'Approved', category: 'Critical', lastUpdated: 'May 19, 2024' },
  { id: 'SOP-FORK-09', title: 'Forklift Alleyway Traffic Control', version: 'v1.1', status: 'Approved', category: 'Operational', lastUpdated: 'May 05, 2024' },
  { id: 'SOP-WELD-03', title: 'Welding Bay Ventilation & PPE', version: 'v2.0', status: 'Approved', category: 'General Safety', lastUpdated: 'May 12, 2024' },
  { id: 'SOP-HEIGHT-07', title: 'Work at Heights & Harness Safety', version: 'v3.0', status: 'Approved', category: 'General Safety', lastUpdated: 'May 01, 2024' },
  { id: 'SOP-SCRAP-02', title: 'Scrap Metal Disposal & Compactor Safety', version: 'v1.5', status: 'In Review', category: 'Waste Mgmt', lastUpdated: 'May 14, 2024' },
  { id: 'SOP-CONFINED-04', title: 'Confined Space Entry Permit', version: 'v2.2', status: 'Approved', category: 'High Risk', lastUpdated: 'May 11, 2024' },
];

export const SOPLibrary: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">SOP Library</h2>
            <p className="text-slate-500 text-sm">Official Standard Operating Procedures and compliance documentation.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
          <Plus size={20} />
          Create New SOP
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search SOPs by title, ID or category..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary" />
        </div>
        <div className="flex gap-2">
          {['All', 'Approved', 'In Review', 'Draft'].map(tab => (
            <button key={tab} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === 'All' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SOPS.map((sop) => (
          <div key={sop.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group p-6 border-b-4 border-b-transparent hover:border-b-primary">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${sop.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {sop.status}
                </span>
                <button className="p-1 text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
              </div>
            </div>

            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-1">{sop.id} • {sop.version}</p>
            <h3 className="font-semibold text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">{sop.title}</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">Category: {sop.category}</p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock size={14} />
                <span className="text-[10px] font-medium">{sop.lastUpdated}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                <button className="p-2 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Download size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
