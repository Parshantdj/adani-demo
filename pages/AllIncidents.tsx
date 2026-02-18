import { useState, useMemo } from 'react';
import { MOCK_INCIDENTS } from '../constants';
import { Search, Filter, Download, MoreHorizontal, User, CheckCircle2, Clock, Activity, Info, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { IncidentStatus } from '../types';

interface AllIncidentsProps {
  onViewDetail?: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

export const AllIncidents: React.FC<AllIncidentsProps> = ({ onViewDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<IncidentStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filtering Logic
  const filteredData = useMemo(() => {
    return MOCK_INCIDENTS.filter(inc => {
      const matchesStatus = activeTab === 'ALL' || inc.status === activeTab;
      const matchesSearch = inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset page when filtering
  const handleTabChange = (status: IncidentStatus | 'ALL') => {
    setActiveTab(status);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">All Incidents History</h2>
          <p className="text-slate-500 text-sm">Comprehensive log of all AI-detected safety events and their lifecycle status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTabChange('ALL')}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-all ${activeTab === 'ALL' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Show All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Export Audit Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => handleTabChange(IncidentStatus.ACTIVE)}
          className={`cursor-pointer p-5 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] border ${activeTab === IncidentStatus.ACTIVE ? 'bg-red-100 border-red-300 ring-2 ring-red-500/20' : 'bg-red-50 border-red-100'}`}
        >
          <div className="bg-red-500 p-3 rounded-xl text-white shadow-lg shadow-red-100">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest">Active</p>
            <h4 className="text-2xl font-black text-red-900 leading-none">
              {MOCK_INCIDENTS.filter(i => i.status === IncidentStatus.ACTIVE).length.toString().padStart(2, '0')}
            </h4>
          </div>
        </div>

        <div
          onClick={() => handleTabChange(IncidentStatus.PENDING)}
          className={`cursor-pointer p-5 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] border ${activeTab === IncidentStatus.PENDING ? 'bg-orange-100 border-orange-300 ring-2 ring-orange-500/20' : 'bg-orange-50 border-orange-100'}`}
        >
          <div className="bg-orange-500 p-3 rounded-xl text-white shadow-lg shadow-orange-100">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest">Pending</p>
            <h4 className="text-2xl font-black text-orange-900 leading-none">
              {MOCK_INCIDENTS.filter(i => i.status === IncidentStatus.PENDING).length.toString().padStart(2, '0')}
            </h4>
          </div>
        </div>

        <div
          onClick={() => handleTabChange(IncidentStatus.RESOLVED)}
          className={`cursor-pointer p-5 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] border ${activeTab === IncidentStatus.RESOLVED ? 'bg-green-100 border-green-300 ring-2 ring-green-500/20' : 'bg-green-50 border-green-100'}`}
        >
          <div className="bg-green-500 p-3 rounded-xl text-white shadow-lg shadow-green-100">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest">Resolved</p>
            <h4 className="text-2xl font-black text-green-900 leading-none">
              {MOCK_INCIDENTS.filter(i => i.status === IncidentStatus.RESOLVED).length.toString().padStart(2, '0')}
            </h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by ID or Type..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary w-72 transition-all"
              />
            </div>
            {activeTab !== 'ALL' && (
              <button
                onClick={() => handleTabChange('ALL')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-black uppercase tracking-widest"
              >
                Filtered: {activeTab} <X size={12} className="ml-1 cursor-pointer" />
              </button>
            )}
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Showing {currentData.length} of {filteredData.length} Incidents</div>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">SNAPSHOT</th>
                <th className="px-6 py-4">INCIDENT ID</th>
                <th className="px-6 py-4">DETECTION TYPE</th>
                <th className="px-6 py-4">SEVERITY</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">ZONE / CAMERA</th>
                <th className="px-6 py-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length > 0 ? currentData.map((inc) => (
                <tr
                  key={inc.id}
                  className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => onViewDetail?.(inc.id)}
                >
                  <td className="px-6 py-4">
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {inc.thumbnailUrl ? (
                        <img src={inc.thumbnailUrl} alt="Snapshot" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Camera size={16} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-primary">{inc.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{inc.type}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{inc.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${inc.severity === 'Critical' ? 'bg-red-600 text-white shadow-sm' :
                      inc.severity === 'High' ? 'bg-orange-500 text-white' :
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); onViewDetail?.(inc.id); }}
                        title="Detailed Analysis"
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"
                      >
                        <Info size={18} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        title="More Options"
                        className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Activity size={48} />
                      <p className="text-sm font-black uppercase tracking-widest">No matching incidents found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            PAGE {currentPage} OF {Math.max(1, totalPages)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
              PREVIOUS
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              NEXT
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};