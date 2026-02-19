import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, Download, MoreHorizontal, User, CheckCircle2, Clock, Activity, Info, Camera, ChevronLeft, ChevronRight, X, Loader2, Power, PowerOff } from 'lucide-react';
import { IncidentStatus } from '../types';

interface ApiIncident {
  id: number;
  event_id: string;
  stream_id: string;
  storage_class: string;
  detected_at: string;
  s3_url: string;
  metadata: {
    label: string;
    model: string;
    owner: string;
    status: string;
    severity: string;
    confidence: number;
    zone_camera: string;
  };
}

interface ApiResponse {
  page: number;
  limit: number;
  count: number;
  incidents: ApiIncident[];
}

interface AllIncidentsProps {
  onViewDetail?: (id: string) => void;
}

const ITEMS_PER_PAGE = 10000;
const CACHE_KEY = 'adani_incidents_cache';

export const AllIncidents: React.FC<AllIncidentsProps> = ({ onViewDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState<ApiIncident[]>(() => {
    const saved = sessionStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [totalCount, setTotalCount] = useState<number>(() => {
    const saved = sessionStorage.getItem(CACHE_KEY + '_count');
    return saved ? parseInt(saved) : 0;
  });
  const [loading, setLoading] = useState(apiData.length === 0 && totalCount === 0);
  const [isPolling, setIsPolling] = useState(true);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  const fetchIncidents = useCallback(async () => {
    try {
      const response = await fetch(`https://isafetyrobo.binarysemantics.org/api/violations?page=1&limit=${ITEMS_PER_PAGE}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data: ApiResponse = await response.json();

      setApiData(prevData => {
        const existingIds = new Set(prevData.map(inc => inc.id));
        const newIncidents = data.incidents.filter(inc => !existingIds.has(inc.id));

        if (newIncidents.length === 0 && prevData.length > 0) return prevData;

        const updatedData = [...newIncidents, ...prevData];
        const slicedData = updatedData.slice(0, ITEMS_PER_PAGE);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(slicedData));
        return slicedData;
      });

      setTotalCount(data.count);
      sessionStorage.setItem(CACHE_KEY + '_count', data.count.toString());

      if (data.count === 0 && apiData.length === 0) {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  }, [apiData.length]);

  // Initial fetch
  useEffect(() => {
    fetchIncidents();
  }, []); // Run once on mount

  // Polling logic: Refresh every 5 seconds for socket-like feel
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      fetchIncidents();
    }, 10000); // 5s is better for "socket" feel while being polite to the API

    return () => clearInterval(interval);
  }, [isPolling, fetchIncidents]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Optimized Auto-scroll: Smooth, frame-independent and interaction-aware
  useEffect(() => {
    const container = scrollRef.current;
    if (!isPolling || !container || apiData.length === 0) return;

    let requestId: number;
    let lastTime = performance.now();
    let isUserInteracting = false;
    let wheelTimeout: any;

    const scroll = (currentTime: number) => {
      if (!isUserInteracting) {
        const deltaTime = currentTime - lastTime;
        const speed = 0.03; // Precise pixels per millisecond

        container.scrollTop += speed * deltaTime;

        // Loop back to top smoothly
        if (container.scrollTop >= container.scrollHeight - container.clientHeight - 1) {
          container.scrollTop = 0;
        }
      }
      lastTime = currentTime;
      requestId = requestAnimationFrame(scroll);
    };

    const handleInteractionStart = () => {
      isUserInteracting = true;
      clearTimeout(wheelTimeout);
    };

    const handleInteractionEnd = () => {
      wheelTimeout = setTimeout(() => {
        isUserInteracting = false;
        lastTime = performance.now();
      }, 1500); // Resume 1.5s after last interaction
    };

    container.addEventListener('mouseenter', handleInteractionStart);
    container.addEventListener('touchstart', handleInteractionStart);
    container.addEventListener('mouseleave', handleInteractionEnd);
    container.addEventListener('touchend', handleInteractionEnd);
    container.addEventListener('wheel', handleInteractionStart, { passive: true });
    container.addEventListener('wheel', handleInteractionEnd, { passive: true });

    requestId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(requestId);
      container.removeEventListener('mouseenter', handleInteractionStart);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('wheel', handleInteractionStart);
      container.removeEventListener('wheel', handleInteractionEnd);
      clearTimeout(wheelTimeout);
    };
  }, [isPolling, apiData.length]);

  const filteredData = useMemo(() => {
    return apiData.filter(inc => {
      const status = inc.metadata.status.toUpperCase();
      const matchesStatus = activeTab === 'ALL' || status === activeTab.toUpperCase();
      const matchesSearch = inc.event_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.metadata.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.metadata.zone_camera.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [apiData, activeTab, searchQuery]);

  // Generate pages in reverse order: 4, 3, 2, 1
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).reverse();

  const handleTabChange = (status: string) => {
    setActiveTab(status);
    setCurrentPage(1);
  };

  const getSeverityStyles = (severity: string) => {
    const s = severity.toUpperCase();
    if (s === 'CRITICAL') return 'bg-red-600 text-white shadow-sm';
    if (s === 'HIGH') return 'bg-orange-500 text-white';
    if (s === 'MEDIUM') return 'bg-yellow-100 text-yellow-800';
    return 'bg-primary-100 text-blue-800';
  };

  const getStatusIcon = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACTIVE') return <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>;
    if (s === 'PENDING') return <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>;
    return <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">All Incidents History</h2>
          <p className="text-slate-500 text-sm">Real-time log of AI-detected safety events from the vision API.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPolling(!isPolling)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-all ${isPolling ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
          >
            {isPolling ? <Power size={18} className="text-emerald-500" /> : <PowerOff size={18} />}
            {isPolling ? 'Polling On' : 'Polling Off'}
          </button>
          <button
            onClick={() => handleTabChange('ALL')}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-all ${activeTab === 'ALL' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Show All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => handleTabChange('ACTIVE')}
          className={`cursor-pointer p-4 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] border ${activeTab === 'ACTIVE' ? 'bg-red-100 border-red-300 ring-2 ring-red-500/20' : 'bg-red-50 border-red-100'}`}
        >
          <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-100">
            <Activity size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest">Active</p>
            <h4 className="text-2xl font-black text-red-900 leading-none">
              {apiData.filter(i => i.metadata.status.toUpperCase() === 'ACTIVE').length}
            </h4>
          </div>
        </div>

        <div
          onClick={() => handleTabChange('PENDING')}
          className={`cursor-pointer p-4 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] border ${activeTab === 'PENDING' ? 'bg-orange-100 border-orange-300 ring-2 ring-orange-500/20' : 'bg-orange-50 border-orange-100'}`}
        >
          <div className="bg-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-100">
            <Clock size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest">Pending</p>
            <h4 className="text-2xl font-black text-orange-900 leading-none">
              {apiData.filter(i => i.metadata.status.toUpperCase() === 'PENDING').length}
            </h4>
          </div>
        </div>

        <div
          onClick={() => handleTabChange('RESOLVED')}
          className={`cursor-pointer p-4 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] border ${activeTab === 'RESOLVED' ? 'bg-green-100 border-green-300 ring-2 ring-green-500/20' : 'bg-green-50 border-green-100'}`}
        >
          <div className="bg-green-500 p-2 rounded-xl text-white shadow-lg shadow-green-100">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest">Resolved</p>
            <h4 className="text-2xl font-black text-green-900 leading-none">
              {apiData.filter(i => i.metadata.status.toUpperCase() === 'RESOLVED').length}
            </h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
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
          </div>
          <div className="flex items-center gap-3">
            {loading && <Loader2 size={16} className="text-primary animate-spin" />}
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Records: {totalCount}</div>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-y-auto flex-1 max-h-[600px] no-scrollbar scroll-smooth">
          <table className="w-full text-left text-sm relative border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 shadow-sm">
              <tr className="bg-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200">SNAPSHOT</th>
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200">INCIDENT ID</th>
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200">DETECTION TYPE</th>
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200">SEVERITY</th>
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200">STATUS</th>
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200">ZONE / CAMERA</th>
                <th className="px-6 py-4 bg-slate-100 border-b border-slate-200 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && apiData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 size={40} className="text-primary animate-spin" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Incidents...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? filteredData.map((inc, index) => (
                <tr
                  key={inc.id}
                  className="hover:bg-slate-50 transition-all group cursor-pointer animate-in fade-in slide-in-from-bottom-1"
                  style={{
                    animationDelay: `${Math.min(index * 30, 600)}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => onViewDetail?.(inc.event_id)}
                >
                  <td className="px-6 py-4">
                    <div className="relative w-20 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {inc.s3_url ? (
                        <img src={inc.s3_url} alt="Snapshot" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Camera size={14} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-primary text-xs">{inc.event_id.substring(0, 8)}...</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] text-slate-700 font-semibold">{inc.storage_class}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${getSeverityStyles(inc.metadata.severity)}`}>
                      {inc.metadata.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(inc.metadata.status)}
                      <span className={`text-[10px] font-semibold uppercase tracking-widest`}>
                        {inc.metadata.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-medium text-xs max-w-[150px] truncate">{inc.metadata.zone_camera}</span>
                      <span className="text-[10px] text-slate-400">{inc.stream_id.substring(0, 8)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); onViewDetail?.(inc.event_id); }}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"
                      >
                        <Info size={16} />
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[200px] md:max-w-none">
              {pages.map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`min-w-[32px] h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === p ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:block">
            PAGE {currentPage} OF {Math.max(1, totalPages)}
          </span>
        </div>
      </div>
    </div>
  );
};