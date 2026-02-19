import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize2, WifiOff, Camera, RefreshCw,
  Grid2X2, Grid3X3, X, Clock,
  AlertTriangle, Search, ChevronDown,
  Layers, Play, Square,
  Flame, ShieldCheck, Users, Activity
} from 'lucide-react';

export const LiveMonitoring: React.FC = () => {
  const [gridSize, setGridSize] = useState(2);
  const [expandedCamId, setExpandedCamId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cameras, setCameras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [instanceTargetTypes, setInstanceTargetTypes] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('surveillance_target_types');
    return saved ? JSON.parse(saved) : {};
  });
  const targetTypesRef = useRef<Record<string, boolean>>(instanceTargetTypes);
  useEffect(() => {
    localStorage.setItem('surveillance_target_types', JSON.stringify(instanceTargetTypes));
    targetTypesRef.current = instanceTargetTypes;
  }, [instanceTargetTypes]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Online' | 'Offline'>('All');
  const [activeDetections, setActiveDetections] = useState<string[]>(['ppe', 'people', 'violence']);
  const [peopleThreshold, setPeopleThreshold] = useState<number>(5);
  const [showConfigWarning, setShowConfigWarning] = useState(false);
  const [startResponse, setStartResponse] = useState<any>(null);
  const [instanceDetail, setInstanceDetail] = useState<any>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [runningInstances, setRunningInstances] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('surveillance_active_instances');
    return saved ? JSON.parse(saved) : {};
  });
  const isRunning = expandedCamId ? !!runningInstances[expandedCamId] : false;
  const isAnyRunning = Object.values(runningInstances).some(v => v === true);
  useEffect(() => {
    localStorage.setItem('surveillance_active_instances', JSON.stringify(runningInstances));
  }, [runningInstances]);
  const detectionOptions = [
    { id: 'ppe', label: 'PPE Detection', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'people', label: 'Over Crowd', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'fire', label: 'Fire & Smoke', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'violence', label: 'Violence', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
  ];
  const toggleDetection = (id: string) => {
    if (isAnyRunning) {
      setShowConfigWarning(true);
      setTimeout(() => setShowConfigWarning(false), 3000);
      return;
    }
    setActiveDetections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  const [socketEvents, setSocketEvents] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const connectWebSocket = () => {
    if (socketRef.current) return;
    const ws = new WebSocket('wss://devvisionapi.binarysemantics.com/ws');
    ws.onopen = () => console.log('WebSocket Connected');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket Incoming Data:', data);
        const detections = data?.detections || [];
        const details = data?.details || [];
        const isCrowd = targetTypesRef.current[data.instance_id];
        const newEvent = !isCrowd ? {
          instance_id: data.instance_id,
          time: data?.time || new Date().toLocaleTimeString(),
          event: data.detections || 'Detection Event',
          conf: details[0]?.confidence ? `${(parseFloat(details[0].confidence) * 100).toFixed(0)}%` : '0%',
          severity: data.severity || (data.alert ? 'CRITICAL' : 'LOW'),
          user: data.user || data.name || 'System'
        } : {
          instance_id: data.instance_id,
          severity: data.severity || (data.alert ? 'CRITICAL' : 'LOW'),
          time: data?.time || new Date().toLocaleTimeString(),
          people_count: data.people_count,
          conf: detections[0]?.confidence ? `${(parseFloat(detections[0].confidence) * 100).toFixed(0)}%` : '0%',
          event: detections[0]?.label || data.type || 'Detection Event',
          is_overcrowded: data.is_overcrowded,
        };
        setSocketEvents(prev => [newEvent, ...prev].slice(0, 100));
      } catch (err) {
        console.error('WS Parse Error:', err);
      }
    };
    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      socketRef.current = null;
    };
    socketRef.current = ws;
  };
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleStart = async (moduleId: string, instanceId: string) => {
    setIsActionLoading(true);
    setSocketEvents(prev => prev.filter(e => e.instance_id !== instanceId));
    try {
      const response = await fetch(`https://devvisionapi.binarysemantics.com/v1/vision/generic/${moduleId}/${instanceId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE1ODYwNjIsInN1YiI6IjEifQ.aCHs_IJMOLsPg_1nMAMAJoh9JmQXGbNi-u0CB9G2y6U'
        },
        body: JSON.stringify({
          conf: 0,
          skip_frames: 0,
          people_threshold: peopleThreshold,
          detections: activeDetections
        })
      });
      const data = await response.json();
      setStartResponse(data);
      console.log('Start API Response:', data);
      if (response.ok) {
        setRunningInstances(prev => ({ ...prev, [instanceId]: true }));
        const detailResponse = await fetch(`https://devvisionapi.binarysemantics.com/v1/vision/generic/${moduleId}/instance/${instanceId}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE1ODYwNjIsInN1YiI6IjEifQ.aCHs_IJMOLsPg_1nMAMAJoh9JmQXGbNi-u0CB9G2y6U'
          }
        });
        const detailData = await detailResponse.json();
        setInstanceDetail(detailData);
        console.log('Instance Detail Response:', detailData);
        const targetCam = cameras.find(c => c.id === instanceId);
        const isCrowdDetection = targetCam?.module_name === "Crowd  Detection";
        setInstanceTargetTypes(prev => ({ ...prev, [instanceId]: isCrowdDetection }));
        const newVideoUrl = isCrowdDetection
          ? detailData?.detail?.[0]?.data?.pp_url
          : detailData?.detail?.[0]?.data?.documents?.[0]?.video_urls?.output_url;
        if (newVideoUrl) {
          setCameras(prev => prev.map(cam =>
            cam.id === instanceId ? { ...cam, videoUrl: newVideoUrl } : cam
          ));
        }
        connectWebSocket();
      }
    } catch (err) {
      console.error('Start API Chain Error:', err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleStop = async (moduleId: string, instanceId: string) => {
    setIsActionLoading(true);
    try {
      const response = await fetch(`https://devvisionapi.binarysemantics.com/v1/vision/generic/${moduleId}/${instanceId}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE1ODYwNjIsInN1YiI6IjEifQ.aCHs_IJMOLsPg_1nMAMAJoh9JmQXGbNi-u0CB9G2y6U'
        }
      });
      const data = await response.json();
      console.log('Stop API Response:', data);

      if (response.ok) {
        setRunningInstances(prev => {
          const updated = { ...prev };
          delete updated[instanceId];
          return updated;
        });

        setInstanceTargetTypes(prev => {
          const updated = { ...prev };
          delete updated[instanceId];
          return updated;
        });
        setActiveDetections(['ppe', 'people', 'violence']);
        setPeopleThreshold(5);
        setInstanceDetail(null);
        setStartResponse(null);
        setSocketEvents(prev => prev.filter(e => e.instance_id !== instanceId));
        setCameras(prev => prev.map(cam =>
          cam.id === instanceId ? { ...cam, videoUrl: null } : cam
        ));
        if (socketRef.current) {
          socketRef.current.close();
          socketRef.current = null;
        }
      }
    } catch (err) {
      console.error('Stop API Error:', err);
    } finally {
      setIsActionLoading(false);
    }
  };

  useEffect(() => {
    const fetchInstances = async () => {
      setLoading(true);
      const userIds = [
        '0d67f8af-351f-4b4c-bc69-6d8b8f71d7f6',
        'c2a2a8ee-c0cd-49f6-9c7a-1133d35e03af'
      ];

      try {
        const fetchPromises = userIds.map(id =>
          fetch(`https://devvisionapi.binarysemantics.com/v1/vision/generic/${id}/list_instance`, {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE1ODYwNjIsInN1YiI6IjEifQ.aCHs_IJMOLsPg_1nMAMAJoh9JmQXGbNi-u0CB9G2y6U'
            }
          }).then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);
        const mappedCameras = results.flatMap((result, index) => {
          const instances = result?.detail?.[0]?.data?.instances || [];
          const sourceUserId = userIds[index];
          return instances.map((inst: any, idx: number) => ({
            id: inst.instance_id,
            name: inst.instance_name,
            camera_name: inst.camera_name,
            module_id: sourceUserId,
            module_name: inst.module_name,
            zone: inst.instance_description || inst.module_name,
            status: 'Online',
            alerts: 0,
            sourceType: inst.source_type,
            videoUrl: null,
            detection: (index === 0 && idx === 0) ? { top: '20%', left: '35%', width: '30%', height: '65%', label: 'PPE COMPLIANT', conf: '99.2%' } : null
          }));
        });

        setCameras(mappedCameras);
      } catch (err) {
        console.error('API Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstances();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activeIds = Object.keys(runningInstances).filter(id => runningInstances[id]);
    if (activeIds.length > 0 && cameras.length > 0) {
      const restoreRunningFeeds = async () => {
        try {
          const restorePromises = activeIds.map(async (instanceId) => {
            const cam = cameras.find(c => c.id === instanceId);
            if (!cam || cam.videoUrl) return null;

            const detailResponse = await fetch(`https://devvisionapi.binarysemantics.com/v1/vision/generic/${cam.module_id}/instance/${cam.id}`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE1ODYwNjIsInN1YiI6IjEifQ.aCHs_IJMOLsPg_1nMAMAJoh9JmQXGbNi-u0CB9G2y6U'
              }
            });
            const detailData = await detailResponse.json();

            const isCrowdDetection = cam.module_name === "Crowd  Detection";
            const restoredUrl = isCrowdDetection
              ? detailData?.detail?.[0]?.data?.pp_url
              : detailData?.detail?.[0]?.data?.documents?.[0]?.video_urls?.output_url;

            setInstanceTargetTypes(prev => ({ ...prev, [instanceId]: isCrowdDetection }));
            return { id: instanceId, videoUrl: restoredUrl };
          });

          const results = await Promise.all(restorePromises);
          const updates = results.filter((r): r is { id: string; videoUrl: string } => r !== null && !!r.videoUrl);

          if (updates.length > 0) {
            setCameras(prev => prev.map(cam => {
              const update = updates.find(u => u.id === cam.id);
              return update ? { ...cam, videoUrl: update.videoUrl } : cam;
            }));
          }
        } catch (err) {
          console.error('Error restoring running feeds:', err);
        }
      };
      restoreRunningFeeds();
    }
  }, [cameras.length > 0]); // Run once after cameras are initially loaded

  const filteredCameras = cameras.filter(cam => {
    const matchesSearch = cam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cam.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCam = cameras.find(c => c.id === expandedCamId);
  const isAccessControl = activeCam?.id === 'C02';

  useEffect(() => {
    if (expandedCamId && runningInstances[expandedCamId]) {
      connectWebSocket();
      if (activeCam && !activeCam.videoUrl) {
        const fetchExistingDetails = async () => {
          try {
            const detailResponse = await fetch(`https://devvisionapi.binarysemantics.com/v1/vision/generic/${activeCam.module_id}/instance/${activeCam.id}`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE1ODYwNjIsInN1YiI6IjEifQ.aCHs_IJMOLsPg_1nMAMAJoh9JmQXGbNi-u0CB9G2y6U'
              }
            });
            const detailData = await detailResponse.json();
            const isCrowdDetection = activeCam.module_name === "Crowd  Detection";
            setInstanceTargetTypes(prev => ({ ...prev, [activeCam.id]: isCrowdDetection }));
            const restoredUrl = isCrowdDetection
              ? detailData?.detail?.[0]?.data?.pp_url
              : detailData?.detail?.[0]?.data?.documents?.[0]?.video_urls?.output_url;
            if (restoredUrl) {
              setCameras(prev => prev.map(cam =>
                cam.id === activeCam.id ? { ...cam, videoUrl: restoredUrl } : cam
              ));
            }
          } catch (err) {
            console.error('Failed to restore video feed:', err);
          }
        };
        fetchExistingDetails();
      }
    }
  }, [expandedCamId, runningInstances, activeCam?.id]);

  const activeSocketEvents = React.useMemo(() => {
    return socketEvents.filter(e => e.instance_id === activeCam?.id);
  }, [socketEvents, activeCam?.id]);

  const formattedTimeOverlay = currentTime.toLocaleString('en-US', {
    month: '2-digit', day: '2-digit', year: 'numeric',
    weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).replace(',', '');

  const resetFilters = () => {
  };

  return (
    <div className="h-full flex flex-col gap-3 pb-20">
      <div className="flex flex-wrap items-center gap-4 p-2 bg-white/60 backdrop-blur-xl rounded-2xl border border-black/5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 relative">
          {detectionOptions.map((opt) => {
            const isActive = activeDetections.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleDetection(opt.id)}
                className={`flex items-center gap-3 px-4 py-1.5 rounded-xl border transition-all active:scale-95 ${isActive
                  ? `${opt.bg} border-${opt.color.split('-')[1]}-200 shadow-md shadow-${opt.color.split('-')[1]}-100/50`
                  : 'bg-white border-slate-100 text-slate-400 grayscale'
                  } ${isAnyRunning ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-slate-700' : 'text-slate-400'}`}>
                  {opt.label}
                </span>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${isActive ? 'bg-primary' : 'bg-slate-200'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${isActive ? 'left-[18px]' : 'left-0.5'}`}></div>
                </div>
              </button>
            );
          })}

          {showConfigWarning && (
            <div className="absolute -top-10 left-0 bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl shadow-red-200 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-2 z-50">
              <AlertTriangle size={12} />
              PLEASE STOP ALL ACTIVE INSTANCES TO CHANGE CONFIGURATION
            </div>
          )}
        </div>

        <div className="w-px h-10 bg-slate-200/60 mx-2 hidden lg:block"></div>
        <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-xl border border-slate-100 shadow-inner ml-auto">
          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={12} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={peopleThreshold}
                disabled={isAnyRunning}
                onChange={(e) => {
                  if (isAnyRunning) {
                    setShowConfigWarning(true);
                    setTimeout(() => setShowConfigWarning(false), 3000);
                    return;
                  }
                  setPeopleThreshold(parseInt(e.target.value) || 0);
                }}
                className={`w-12 bg-transparent border-none p-0 text-sm font-black text-slate-800 focus:ring-0 ${isAnyRunning ? 'cursor-not-allowed text-slate-400' : ''}`}
                min="0"
                max="100"
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-0.5">Persons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 py-2 px-4 bg-white/40 shadow-sm rounded border border-black/5 shadow-sm">
        <div className="relative group">
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded px-5 py-2 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20 w-64">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="SEARCH ID / NAME"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-[10px] font-black text-slate-800 outline-none w-full uppercase tracking-widest placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded px-5 py-2 shadow-sm transition-all hover:shadow-md cursor-pointer">
            <Layers size={16} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-[10px] font-black text-slate-800 outline-none cursor-pointer uppercase tracking-widest appearance-none pr-4"
            >
              <option value="All">ALL STATUS</option>
              <option value="Online">ONLINE ONLY</option>
              <option value="Offline">OFFLINE ONLY</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={resetFilters}
          title="Reset Filters"
          className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-full transition-all shadow-sm border border-slate-50"
        >
          <RefreshCw size={16} />
        </button>

        <div className="w-px h-8 bg-slate-200/60 mx-2"></div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-0.5">STREAMS</span>
              <span className="text-xs font-black text-slate-800 tracking-tight">{filteredCameras.length} Active</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
              <AlertTriangle size={16} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] leading-none mb-0.5">SECURITY</span>
              <span className="text-xs font-black text-red-600 tracking-tight">1 Critical</span>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
            <button
              onClick={() => setGridSize(2)}
              className={`p-2 rounded-xl transition-all ${gridSize === 2 ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => setGridSize(3)}
              className={`p-2 rounded-xl transition-all ${gridSize === 3 ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="text-primary animate-spin" size={40} />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Fetching Live Instances...</p>
          </div>
        </div>
      ) : (
        <div className={`grid gap-6 flex-1 ${gridSize === 2 ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {filteredCameras.map((cam) => (
            <div key={cam.id} className="group relative aspect-video bg-slate-950 rounded-xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-primary/50 transition-all cursor-pointer">
              {cam.status === 'Online' ? (
                <div className="w-full h-full relative">
                  {cam.videoUrl ? (
                    cam.videoUrl.includes('video_feed') ? (
                      <img
                        src={cam.videoUrl}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                        alt={cam.name}
                      />
                    ) : (
                      <video
                        src={cam.videoUrl}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    )
                  ) : cam.image ? (
                    <img
                      src={cam.image}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
                      alt={cam.name}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900/50 flex flex-col items-center justify-center gap-4 border border-white/5">
                      <div className="relative">
                        <Camera size={48} className="text-slate-700 opacity-20" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <WifiOff size={24} className="text-slate-500 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">No Active Feed</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40"></div>
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-600 gap-4">
                  <WifiOff size={48} strokeWidth={1.5} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse text-slate-500">Signal Lost - Link Offline</span>
                </div>
              )}

              <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-start z-20">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-mono font-semibold text-primary-400 border border-white/10 uppercase tracking-widest shadow-2xl max-w-[150px] truncate">
                      {cam.camera_name}
                    </span>
                    {/* <span className="text-white font-black text-xs drop-shadow-xl tracking-tight uppercase bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/5 truncate max-w-[200px]">
                      {cam.name}
                    </span> */}
                    {cam.module_name && (
                      <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black text-primary border border-primary/30 uppercase tracking-[0.2em] shadow-lg">
                        {cam.module_name}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {cam.module_name && cam.module_name === "Crowd  Detection" && <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500 z-30">
                <div className="flex flex-wrap gap-2 max-w-[70%]">
                  {detectionOptions
                    .filter(opt => activeDetections.includes(opt.id))
                    .map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-center gap-1.5 px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 shadow-lg animate-in fade-in slide-in-from-left-2 duration-300"
                      >
                        <opt.icon size={10} className={opt.color} />
                        <span className="text-[8px] font-black text-white uppercase tracking-wider">{opt.label}</span>
                      </div>
                    ))
                  }
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedCamId(cam.id); }}
                    title="Fullscreen"
                    className="p-2.5 bg-white/10 hover:bg-primary rounded-xl backdrop-blur-md text-white transition-all border border-white/10 shadow-2xl"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>}

              <div className="absolute bottom-5 right-5 text-right pointer-events-none group-hover:opacity-0 transition-opacity z-10">
                <p className="text-[10px] font-mono text-primary-400 font-semibold uppercase tracking-[0.2em] drop-shadow-lg">
                  {formattedTimeOverlay}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCam && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 animate-in fade-in duration-300">
          <div className="w-full max-w-[100vw] h-[100vh] bg-white rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
            <div className="flex-1 bg-black relative group flex items-center justify-center">
              {activeCam.videoUrl?.includes('video_feed') ? (
                <img
                  src={activeCam.videoUrl}
                  className="w-full h-full object-contain"
                  alt={activeCam.name}
                />
              ) : (
                <video
                  src={activeCam.videoUrl}
                  autoPlay
                  loop
                  muted
                  controls
                  className="w-full h-full object-contain"
                />
              )}

              <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="flex items-center gap-3 bg-red-600 text-white px-5 py-2 rounded-2xl shadow-2xl shadow-red-900/40">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">REC</span>
                </div>
                <div className="text-white font-mono text-2xl font-semibold tracking-[0.25em] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] opacity-90">
                  {formattedTimeOverlay}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-2xl py-4 px-10 flex justify-between items-center text-[11px] font-mono text-slate-400 border-t border-white/5">
                <div className="flex gap-10">
                  <span>FPS: <span className="text-white font-semibold">30</span></span>
                  <span>BITRATE: <span className="text-white font-semibold">4096 kbps</span></span>
                  <span>CODEC: <span className="text-white font-semibold">H.265</span></span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                  <span className="text-green-500 font-black uppercase tracking-[0.2em]">Signal Stable</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[520px] bg-white border-l border-slate-100 flex flex-col">
              <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="p-2.5 bg-primary-50 rounded-xl text-primary">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-black text-xl tracking-tight">{isAccessControl ? 'Access Matrix' : 'Incident Stream'}</h3>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => isRunning ? handleStop(activeCam.module_id, activeCam.id) : handleStart(activeCam.module_id, activeCam.id)}
                    disabled={isActionLoading}
                    className={`group/start flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/10 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed ${isRunning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-secondary hover:bg-[#0F172A] text-white'}`}
                  >
                    {isActionLoading ? (
                      <RefreshCw size={12} className="animate-spin" />
                    ) : isRunning ? (
                      <Square size={12} fill="currentColor" />
                    ) : (
                      <Play size={12} fill="currentColor" className="transition-transform group-hover/start:translate-x-0.5" />
                    )}
                    {isActionLoading ? (isRunning ? 'STOPPING...' : 'STARTING...') : (isRunning ? 'STOP' : 'START')}
                  </button>
                  <button
                    onClick={() => setExpandedCamId(null)}
                    className="p-2 bg-black/60 text-white/80 rounded-full hover:bg-black hover:text-white transition-all z-50 backdrop-blur-md shadow-xl border border-white/5"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                <div className="grid grid-cols-12 px-8 py-4 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
                  <div className="col-span-3">Time</div>
                  <div className="col-span-6">Live Event</div>
                  <div className="col-span-3 text-right">Grade</div>
                </div>

                <div className="divide-y divide-slate-50">
                  {!isRunning ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-30 gap-4">
                      <p className="text-[13px] font-semibold uppercase text-slate-900">No events found - Start surveillance to monitor</p>
                    </div>
                  ) : activeSocketEvents.length > 0 ? (
                    activeSocketEvents.map((log, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-8 py-5 hover:bg-slate-50/80 transition-colors items-center group animate-in slide-in-from-right duration-300">
                        <div className="col-span-3 text-[14px] font-semibold text-slate-600">{log.time}</div>
                        <div className="col-span-6 pr-4">
                          <p className={`text-sm font-semibold tracking-tight ${log.severity === 'CRITICAL' ? 'text-red-600' : 'text-slate-800'}`}>
                            {log.event}
                          </p>
                          <p className="text-[13px] font-semibold text-gray-600 mt-1 opacity-60">{activeCam?.module_name} | <span className='text-green-600'>{log.conf}</span></p>
                        </div>
                        <div className="col-span-3 text-right">
                          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${log.severity === 'CRITICAL' ? 'bg-red-600 text-white shadow-xl shadow-red-100' :
                            'bg-slate-100 text-slate-600'
                            }`}>
                            {log.severity}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-30 gap-4">
                      <RefreshCw size={32} className="animate-spin text-slate-400" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Waiting for socket events...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};