import React from 'react';
import { Search, Filter, Download, MoreHorizontal, User, RefreshCcw, Archive, AlertCircle, Trash2 } from 'lucide-react';
import { IncidentSeverity } from '../types';

const MOCK_FALSE_POSITIVES = [
  { id: 'FP-2024-001', type: 'Smoke Detected', severity: IncidentSeverity.MEDIUM, zone: 'Warehouse A', camera: 'CAM-WH-02', timestamp: '2024-05-19 14:20:11', flaggedBy: 'Amit Sharma', reason: 'Shadow misinterpreted as smoke' },
  { id: 'FP-2024-002', type: 'No Mask', severity: IncidentSeverity.LOW, zone: 'Line C', camera: 'CAM-LC-05', timestamp: '2024-05-19 11:05:45', flaggedBy: 'Sanjay Gupta', reason: 'Obstruction detected as missing mask' },
  { id: 'FP-2024-003', type: 'Fire Detected', severity: IncidentSeverity.HIGH, zone: 'Paint Shop', camera: 'CAM-PS-04', timestamp: '2024-05-18 22:15:30', flaggedBy: 'Priya Verma', reason: 'Lens flare misinterpreted as fire' },
];

export const IncidentsFalse: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">False Positives</h2>
          <p className="text-slate-500 text-sm">Review incidents flagged by operators as incorrect AI detections.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Archive size={18} />
            Bulk Archive
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search false positives..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary w-64" />
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-500">Total Flagged: {MOCK_FALSE_POSITIVES.length}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">FP ID</th>
                <th className="px-6 py-4">Detection Type</th>
                <th className="px-6 py-4">Zone / Camera</th>
                <th className="px-6 py-4">Flagged By</th>
                <th className="px-6 py-4">Feedback / Reason</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_FALSE_POSITIVES.map((fp) => (
                <tr key={fp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-semibold text-slate-400">{fp.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{fp.type}</span>
                      <span className="text-[10px] text-red-400 font-semibold uppercase">Severity: {fp.severity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-medium">{fp.zone}</span>
                      <span className="text-xs text-slate-400">{fp.camera}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-500 border border-slate-200">
                        <User size={12} />
                      </div>
                      <span className="text-slate-700 font-medium">{fp.flaggedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 italic text-xs">"{fp.reason}"</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 text-xs">{fp.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button title="Restore Incident" className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all">
                        <RefreshCcw size={16} />
                      </button>
                      <button title="Delete Feedback" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};