
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_INCIDENTS } from '../constants';
import {
  Search, Filter, Download, MoreHorizontal, User, ShieldAlert,
  Info, AlertCircle, Camera, CheckCircle2, Clock,
  UserMinus, Trash2, ExternalLink, Flag
} from 'lucide-react';
import { IncidentStatus } from '../types';

interface ActiveIncidentsProps {
  onViewDetail?: (id: string) => void;
}

export const ActiveIncidents: React.FC<ActiveIncidentsProps> = ({ onViewDetail }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAction = (e: React.MouseEvent, action: string, id: string) => {
    e.stopPropagation();
    console.log(`Action: ${action} for Incident: ${id}`);
    setOpenMenuId(null);
    // In a real app, this would trigger an API call or state update
    alert(`${action} triggered for ${id}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Incident Management</h2>
          <p className="text-slate-500 text-sm">Review and respond to real-time AI detections across the plant.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4">
          <div className="bg-red-500 p-3 rounded-lg text-white shadow-sm">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest">Critical</p>
            <h4 className="text-xl font-semibold text-red-900 leading-none">05</h4>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center gap-4">
          <div className="bg-orange-500 p-3 rounded-lg text-white shadow-sm">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest">High / Medium</p>
            <h4 className="text-xl font-semibold text-orange-900 leading-none">07</h4>
          </div>
        </div>
        <div className="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-center gap-4">
          <div className="bg-primary p-3 rounded-lg text-white shadow-sm">
            <Info size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">Low Severity</p>
            <h4 className="text-xl font-semibold text-blue-900 leading-none">12</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search by ID or Type..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all" />
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-500">Showing 24 Incident Detections</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">SNAPSHOT</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">INCIDENT ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">TYPE</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">SEVERITY</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">ZONE / CAMERA</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">DETECTED TIME</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider">ASSIGNED TO</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_INCIDENTS.map((inc) => (
                <tr key={inc.id} className="hover:bg-primary-50/30 transition-colors group cursor-pointer relative" onClick={() => onViewDetail?.(inc.id)}>
                  <td className="px-6 py-4">
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {inc.thumbnailUrl ? (
                        <img src={inc.thumbnailUrl} alt="Incident Snapshot" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Camera size={16} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-primary">{inc.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{inc.type}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-tighter">AI Confidence: 94%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${inc.severity === 'Critical' ? 'bg-red-600 text-white shadow-sm' :
                        inc.severity === 'High' ? 'bg-orange-600 text-white' :
                          inc.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-primary-100 text-blue-800'
                      }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {inc.status === IncidentStatus.ACTIVE && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>}
                      {inc.status === IncidentStatus.PENDING && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>}
                      {inc.status === IncidentStatus.RESOLVED && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                      <span className={`text-[10px] font-semibold uppercase tracking-widest ${inc.status === IncidentStatus.ACTIVE ? 'text-red-600' :
                          inc.status === IncidentStatus.PENDING ? 'text-orange-600' :
                            'text-green-600'
                        }`}>
                        {inc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-medium">{inc.zone}</span>
                      <span className="text-xs text-slate-400">{inc.camera}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700">{inc.timestamp.split(' ')[1]}</span>
                      <span className="text-xs text-slate-400">{inc.timestamp.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600 border border-white">
                        <User size={12} />
                      </div>
                      <span className="text-slate-700 font-medium">{inc.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); onViewDetail?.(inc.id); }}
                        title="View Detail"
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"
                      >
                        <Info size={18} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => handleMenuToggle(e, inc.id)}
                          title="More Actions"
                          className={`p-2 rounded-lg transition-all ${openMenuId === inc.id ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'}`}
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenuId === inc.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-[100] py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                          >
                            <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Incident Actions</p>
                            <button
                              onClick={(e) => handleAction(e, 'Marked as False Positive', inc.id)}
                              className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <UserMinus size={16} />
                              Mark as False Positive
                            </button>
                            <button
                              onClick={(e) => handleAction(e, 'Reassigned', inc.id)}
                              className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <User size={16} />
                              Reassign Incident
                            </button>
                            <button
                              onClick={(e) => handleAction(e, 'Escalated', inc.id)}
                              className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Flag size={16} />
                              Escalate to EHS
                            </button>
                            <div className="border-t border-slate-50 my-1"></div>
                            <button
                              onClick={(e) => handleAction(e, 'Archived', inc.id)}
                              className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                            >
                              <Trash2 size={16} />
                              Delete / Archive
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Page 1 of 5</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors">Prev</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
