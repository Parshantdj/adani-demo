
import React from 'react';
import { Camera, Plus, Search, RefreshCcw, Wifi, WifiOff, MoreVertical, HardDrive, Cpu, Activity } from 'lucide-react';

const MOCK_CAMS = [
  { id: 'C01', name: 'Main Gate Cam 1', brand: 'Hikvision', status: 'Online', zone: 'Logistics Park', ip: '192.168.1.101', alerts: 0 },
  { id: 'C02', name: 'Boiler Control B', brand: 'Hikvision', status: 'Online', zone: 'Boiler Zone', ip: '192.168.1.102', alerts: 1 },
];

export const CameraManagement: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-2 rounded-lg text-white">
            <Camera size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Camera Management</h2>
            <p className="text-slate-500 text-sm">Configure RTSP streams, AI processing priority, and hardware health.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <RefreshCcw size={18} />
            Rescan Network
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
            <Plus size={20} />
            Add Camera
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Wifi size={24} /></div>
          <div><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Active Streams</p><h4 className="text-2xl font-semibold text-slate-900">2 / 2</h4></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-primary-50 text-primary rounded-2xl"><HardDrive size={24} /></div>
          <div><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Storage Used (24h)</p><h4 className="text-2xl font-semibold text-slate-900">45 GB</h4></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Cpu size={24} /></div>
          <div><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">AI Compute Load</p><h4 className="text-2xl font-semibold text-slate-900">12%</h4></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Filter by Name, IP, or Zone..." className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Showing 2 registered cameras</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">ID / Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Hardware Info</th>
                <th className="px-6 py-4">Zone</th>
                <th className="px-6 py-4">Analytics Activity</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {MOCK_CAMS.map((cam) => (
                <tr key={cam.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-primary font-mono text-[10px] font-semibold">{cam.id}</span>
                      <span className="text-slate-800 font-semibold">{cam.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {cam.status === 'Online' ? <Wifi size={14} className="text-green-500" /> : <WifiOff size={14} className="text-red-500" />}
                      <span className={`text-xs font-semibold ${cam.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>{cam.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-xs font-semibold">{cam.brand}</span>
                      <span className="text-slate-400 text-[10px] font-mono">{cam.ip}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-semibold uppercase tracking-tighter">{cam.zone}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Activity size={14} />
                        <span className="text-xs font-semibold">{cam.alerts} alerts</span>
                      </div>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${Math.min(cam.alerts * 20, 100)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg"><MoreVertical size={18} /></button>
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
