import React, { useState } from 'react';
import {
    Activity, Video, AlertTriangle, ShieldCheck, Map,
    ChevronRight, ArrowUpRight, Camera, Bell, Filter,
    MapPin, Maximize2, Mic, Settings, User, Clock,
    Car, Gauge, Navigation
} from 'lucide-react';
import mapImage from '../image.png';

export const VideoTelematics: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ALARMS' | 'LIVE'>('ALARMS');
    const [selectedAlarmId, setSelectedAlarmId] = useState<number>(0);

    const alarms = [

        {
            id: 0,
            type: 'Phone',
            timestamp: '18/02/2026 13:35:38',
            system: 'DMS',
            vehicle: 'A-02',
            speed: '21.0 km/h',
            color: 'red',
            video: "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/ATT-26_19022026092710_Phone_usages_03.mp4"
        },
        {
            id: 1,
            type: 'Smoking',
            timestamp: '18/02/2026 10:56:14',
            system: 'DMS',
            vehicle: 'A-03',
            speed: '24.0 km/h',
            color: 'red',
            video: "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/ATT-18_17022026134558_DriverSmoking_03.mp4"
        },
        {
            id: 2,
            type: 'Seat Belt',
            timestamp: '18/02/2026 10:50:45',
            system: 'DMS',
            vehicle: 'A-03',
            speed: '24.0 km/h',
            color: 'red',
            video: "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/T-044_19022026115904_DriverDistraction_03.mp4"
        },
        {
            id: 3,
            type: 'Forward Collision',
            timestamp: '18/02/2026 10:45:22',
            system: 'ADAS',
            vehicle: 'A-01',
            speed: '45.0 km/h',
            color: 'red',
            video: "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/KK-35_19022026114824_forwardCollisionWarning_04.mp4"
        },
        {
            id: 4,
            type: 'Pedestrian Collision ',
            timestamp: '18/02/2026 10:40:10',
            system: 'ADAS',
            vehicle: 'A-04',
            speed: '32.0 km/h',
            color: 'red',
            video: "https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/KK-45_19022026083539_pedestrianBang_04.mp4"
        },


    ];

    const renderAlarmsTab = () => (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 h-full min-h-[450px]">
            {/* Left List */}
            <div className="xl:col-span-4 flex flex-col gap-3 max-h-[640px] pr-2">
                <div className="flex items-center justify-between mb-1 px-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Active Alarms</h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{alarms.length} Total</span>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 p-1">
                    {alarms.map((alarm) => (
                        <div
                            key={alarm.id}
                            onClick={() => setSelectedAlarmId(alarm.id)}
                            className={`p-3 rounded-xl border-2  transition-all cursor-pointer group relative overflow-hidden ${selectedAlarmId === alarm.id
                                ? 'border-primary bg-white shadow-xl shadow-primary/5 scale-[1.01] z-10'
                                : 'border-slate-50 border-gray-200 bg-white/40 hover:border-slate-200 hover:bg-white hover:shadow-md'
                                }`}
                        >
                            {selectedAlarmId === alarm.id && (
                                <div className="absolute top-0 right-0 p-1.5 transition-all">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-6">
                                <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${alarm.system === 'DMS'
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-blue-50 text-blue-600'
                                    }`}>
                                    {alarm.type}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">{alarm.timestamp}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                                        <Camera size={12} className="opacity-70" />
                                        <span className="text-[8px] font-black uppercase tracking-widest leading-none">System</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-800 tracking-tight">{alarm.system}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                                        <Car size={12} className="opacity-70" />
                                        <span className="text-[8px] font-black uppercase tracking-widest leading-none">Vehicle</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-800 tracking-tight">{alarm.vehicle}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                                        <Gauge size={12} className="opacity-70" />
                                        <span className="text-[8px] font-black uppercase tracking-widest leading-none">Speed</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-800 tracking-tight">{alarm.speed}</p>
                                </div>
                            </div>

                            <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-2 group/btn transition-colors">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Show Details</span>
                                <ChevronRight size={12} className="text-primary rotate-90" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Video View */}
            <div className="xl:col-span-8 flex flex-col ">
                <div className="relative flex-1 bg-slate-950 rounded-xl overflow-hidden shadow-2xl group border-4 border-white p-1">
                    {/* Main Feed Container */}
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
                        {alarms[selectedAlarmId].video.includes('.mp4') ? (
                            <video
                                key={alarms[selectedAlarmId].video}
                                src={alarms[selectedAlarmId].video}
                                className="w-full h-full object-contain animate-in fade-in duration-500"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                key={alarms[selectedAlarmId].video}
                                src={alarms[selectedAlarmId].video}
                                className="w-full h-full object-cover animate-in fade-in duration-500"
                                alt="Live Telematics Stream"
                            />
                        )}

                        {/* Real-time HUD */}
                        <div className="absolute top-8 left-8 flex flex-col gap-3">
                            <div className="bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                                <p className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                                    {alarms[selectedAlarmId].type} // {alarms[selectedAlarmId].vehicle}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 shadow-lg">
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Lat: 22.78</p>
                                </div>
                                <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 shadow-lg">
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Lng: 69.45</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
                            <div className="bg-black/60 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/10 shadow-2xl flex items-center gap-4 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                    <Gauge size={20} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Live Velocity</p>
                                    <p className="text-lg font-mono font-black text-emerald-400 tracking-wider">
                                        {alarms[selectedAlarmId].speed}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

    const renderLiveTab = () => (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 h-full">
            {/* Left Feeds Column */}
            <div className="xl:col-span-5 flex flex-col gap-4">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800/50 group hover:ring-2 ring-primary/40 transition-all">
                    <video
                        src="https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/ATT-10_19022026091739_seat_Belt_03.mp4"
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[13px] font-black text-white uppercase tracking-[0.2em]">DMS Live Feed</span>
                        </div>
                        <span className="text-[8px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">LIVE</span>
                    </div>
                </div>

                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800/50 group hover:ring-2 ring-primary/40 transition-all">

                    <video
                        src="https://vision-module-bsl.s3.ap-south-1.amazonaws.com/adanni_ppe_kit_detection/annotated/eec932d0-13ef-46d4-964f-0aa82e78d05f/recorded_screen_2026-02-19_13-02-54+(1).webm"
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[13px] font-black text-white uppercase tracking-[0.2em]">ADAS Live Feed</span>
                        </div>
                        <span className="text-[8px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">LIVE</span>
                    </div>
                </div>
            </div>

            {/* Right Map/Asset Hub */}
            <div className="xl:col-span-7 rounded-xl overflow-hidden border border-slate-200 shadow-2xl relative group bg-cover bg-center" style={{ backgroundImage: `url(${mapImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                <div className="h-full min-h-[450px] relative overflow-hidden">
                    {/* Map Layer (Thematic) */}
                    <div className="absolute inset-0 bg-[#0f172a]/40 flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                    </div>

                    <div className="absolute top-6 left-6 z-20 flex bg-slate-900/80 backdrop-blur-xl p-1 rounded-lg border border-white/10 shadow-2xl">
                        <button className="px-4 py-1.5 bg-primary text-white rounded-md text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">Satellite View</button>
                        <button className="px-4 py-1.5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-all">Standard Map</button>
                    </div>

                    {/* Central Pulsing Marker */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="relative mb-8">
                            <div className="absolute -inset-10 bg-red-500/20 rounded-full animate-ping"></div>
                            <div className="absolute -inset-6 bg-red-500/40 rounded-full animate-pulse"></div>
                            <div className="relative w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-45 border-4 border-white/20">
                                <Car size={32} className="text-white -rotate-45" />
                            </div>
                        </div>
                        <div className="bg-[#0f172a]/95 backdrop-blur-2xl p-5 rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-56 text-center animate-in slide-in-from-bottom-6 duration-700">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Live Asset Hub</h4>
                            </div>
                            <p className="text-red-500 text-[11px] font-black uppercase tracking-[0.2em] mb-4">MUNDRA // TERMINAL A-02</p>
                            <div className="flex justify-between items-center text-slate-500 pt-4 border-t border-white/5 mx-2">
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] font-bold uppercase mb-1">RSSI</span>
                                    <span className="text-[10px] font-mono text-white">-74 dBm</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] font-bold uppercase mb-1">BAT</span>
                                    <span className="text-[10px] font-mono text-white">94%</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] font-bold uppercase mb-1">SIG</span>
                                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">5G</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Interaction Menu */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20">
                        <button className="w-12 h-12 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white rounded-lg shadow-2xl transition-all border border-white/10 flex items-center justify-center">
                            <Maximize2 size={20} />
                        </button>
                        <button className="w-20 h-20 bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_50px_rgba(239,68,68,0.4)] transition-all flex flex-col items-center justify-center gap-1 border-4 border-white animate-bounce-slow">
                            <Mic size={24} />
                            <span className="text-[8px] font-black uppercase">PTT</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header Area */}
            {/* <div className="flex flex-col gap-1.5">
                <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase">Video Telematics Dashboard</h1>
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-12 bg-primary rounded-full"></div>
                    <p className="text-[11px] font-black text-slate-500  tracking-[0.4em]">Integrated Fleet & DMS Monitoring</p>
                </div>
            </div> */}

            {/* Controller Section */}
            <div className="flex items-center justify-between">
                <div className="flex bg-slate-200/60 p-2 pb-0.5 rounded-xl gap-1 shadow-inner">
                    <button
                        onClick={() => setActiveTab('ALARMS')}
                        className={`flex items-center gap-3 px-10 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === 'ALARMS'
                            ? 'bg-primary text-white shadow-[0_10px_30px_rgba(239,68,68,0.4)] translate-y-[-4px]'
                            : 'text-slate-500 hover:bg-slate-300/40 pb-4'
                            }`}
                    >
                        <Bell size={18} />
                        Alarms
                    </button>
                    <button
                        onClick={() => setActiveTab('LIVE')}
                        className={`flex items-center gap-3 px-10 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === 'LIVE'
                            ? 'bg-primary text-white shadow-[0_10px_30px_rgba(239,68,68,0.4)] translate-y-[-4px]'
                            : 'text-slate-500 hover:bg-slate-300/40 pb-4'
                            }`}
                    >
                        <Video size={18} />
                        Live Hub
                    </button>
                </div>

                <div className="flex gap-2">
                    <select className="bg-white px-5 py-2 rounded-xl border border-slate-200 shadow-sm text-[10px] font-black text-slate-900 uppercase tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:border-primary/30 outline-none">
                        <option>CAM 1</option>
                        <option>CAM 2</option>
                    </select>
                    <select className="bg-white px-5 py-2 rounded-xl border border-slate-200 shadow-sm text-[10px] font-black text-slate-900 uppercase tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:border-primary/30 outline-none">
                        <option>DMS</option>
                        <option>ADAS</option>
                    </select>
                    <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl shadow-lg text-white group cursor-pointer hover:bg-primary/90 transition-all">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Events</span>
                    </div>
                </div>
            </div>

            {/* Dynamic Viewport */}
            <div className="flex-1">
                {activeTab === 'ALARMS' ? renderAlarmsTab() : renderLiveTab()}
            </div>
        </div>
    );
};
