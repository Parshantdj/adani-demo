
import React from 'react';
import { ShieldCheck, Download, FileText, CheckCircle2, AlertCircle, Calendar, Filter, Search, MoreHorizontal, FileSpreadsheet, Lock } from 'lucide-react';

const MOCK_AUDIT_REPORTS = [
  { id: 'REP-AUD-2024-05', name: 'Q1 Safety Compliance Audit', standard: 'ISO 45001:2018', period: 'Jan - Mar 2024', generatedBy: 'Arjun Singh', date: 'Apr 02, 2024', status: 'Verified', type: 'PDF' },
  { id: 'REP-AUD-2024-04', name: 'Annual Environmental Audit', standard: 'ISO 14001:2015', period: 'FY 2023-24', generatedBy: 'System AI', date: 'Mar 15, 2024', status: 'Verified', type: 'XLSX' },
  { id: 'REP-AUD-2024-03', name: 'Fire Safety & Fire-Fighting Equipment Audit', standard: 'NBC Part 4', period: 'Q4 2023', generatedBy: 'Priya Verma', date: 'Feb 10, 2024', status: 'Verified', type: 'PDF' },
  { id: 'REP-AUD-2024-02', name: 'Hazardous Chemicals Inventory Audit', standard: 'MSIHC Rules', period: 'Jan 2024', generatedBy: 'Amit Sharma', date: 'Jan 25, 2024', status: 'Expired', type: 'PDF' },
  { id: 'REP-AUD-2024-01', name: 'LOTO Compliance Monthly Review', standard: 'OHSAS 18001', period: 'Dec 2023', generatedBy: 'Sanjay Gupta', date: 'Jan 05, 2024', status: 'Verified', type: 'PDF' },
  { id: 'REP-AUD-2023-12', name: 'Forklift Operator Certification Audit', standard: 'Internal Safety', period: 'Q3 2023', generatedBy: 'Vikram Mehta', date: 'Dec 12, 2023', status: 'Verified', type: 'XLSX' },
  { id: 'REP-AUD-2023-11', name: 'Battery Hub Thermal Anomaly Audit', standard: 'Critical Infrastructure', period: 'Nov 2023', generatedBy: 'System AI', date: 'Dec 02, 2023', status: 'Verified', type: 'PDF' },
  { id: 'REP-AUD-2023-10', name: 'PPE Supply Chain & Quality Audit', standard: 'BIS Standards', period: 'H2 2023', generatedBy: 'Rajesh Kumar', date: 'Nov 14, 2023', status: 'Verified', type: 'PDF' },
];

export const ReportsAudit: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Audit Exports & Compliance</h2>
            <p className="text-slate-500 text-sm">Download structured, regulatory-ready reports for internal and external audits.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black transition-all shadow-lg shadow-slate-200">
          <ShieldCheck size={20} />
          Generate New Audit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Audit Readiness</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">98.2%</h3>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: '98.2%' }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Compliance Score for May 2024</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Pending Sign-offs</span>
            <AlertCircle size={16} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">03</h3>
          <p className="text-[10px] text-orange-600 mt-2 font-semibold flex items-center gap-1 uppercase tracking-tighter">Action Required • High Priority</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Archive Integrity</span>
            <Lock size={16} className="text-primary" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">SHA-256</h3>
          <p className="text-[10px] text-slate-500 mt-2">Immutable Blockchain Verified Logging</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search audit history..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-80 transition-all shadow-sm" />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
              <Filter size={18} />
            </button>
          </div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Calendar size={14} /> Last Synced: Today, 14:42
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">REPORT ID / NAME</th>
                <th className="px-6 py-4">STANDARD</th>
                <th className="px-6 py-4">AUDIT PERIOD</th>
                <th className="px-6 py-4">GENERATED BY</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_AUDIT_REPORTS.map((rep) => (
                <tr key={rep.id} className="hover:bg-emerald-50/20 transition-colors group cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${rep.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'} border border-transparent group-hover:border-emerald-200 transition-all`}>
                        {rep.type === 'PDF' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">{rep.id}</span>
                        <span className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">{rep.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold uppercase tracking-widest">{rep.standard}</span>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-500">{rep.period}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                        {rep.generatedBy === 'System AI' ? 'AI' : rep.generatedBy.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-slate-700 font-medium">{rep.generatedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${rep.status === 'Verified' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      <span className={`text-[10px] font-semibold uppercase tracking-widest ${rep.status === 'Verified' ? 'text-emerald-600' : 'text-red-600'}`}>{rep.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button title="Download File" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all border border-transparent hover:border-emerald-200">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">ARCHIVE DEPTH: 1,422 REPORTS</span>
          <div className="flex gap-2 text-xs font-semibold text-slate-600">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">PREV</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};
