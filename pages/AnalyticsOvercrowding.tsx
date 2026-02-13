
import React from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { Users, AlertTriangle, MapPin, Activity, ArrowUpRight, Maximize } from 'lucide-react';
import { SITE_HIERARCHY } from '../constants';

const ALL_ZONES = SITE_HIERARCHY.flatMap(b => b.sites.flatMap(s => s.zones));

export const AnalyticsOvercrowding: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-lg text-primary">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Overcrowding Compliance</h2>
            <p className="text-slate-500 text-sm">Real-time crowd density monitoring, dwell time analysis, and capacity breach alerts.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
            <Activity size={14} className="animate-pulse" /> Live Density Feed Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Peak Crowd Density</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-semibold text-slate-900">4.2</h3>
            <span className="text-xs font-semibold text-slate-500 mb-1">pax / m²</span>
          </div>
          <p className="text-xs text-orange-600 font-semibold mt-2 flex items-center gap-1"><ArrowUpRight size={14} /> +12% vs Avg</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Capacity Breaches</p>
          <h3 className="text-3xl font-semibold text-red-600">08</h3>
          <p className="text-xs text-red-400 font-semibold mt-2">Commercial Zone (Lunch)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Avg Dwell Time</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-semibold text-slate-900">12m</h3>
            <span className="text-xs font-semibold text-slate-500 mb-1">per zone</span>
          </div>
          <p className="text-xs text-green-600 font-semibold mt-2">Optimal Flow</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Social Distancing</p>
          <h3 className="text-3xl font-semibold text-slate-900">92%</h3>
          <p className="text-xs text-primary font-semibold mt-2">Compliance Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Occupancy Trends (Hourly)</h3>
          <div className="h-72">
            <LineChart
              series={[
                { data: [120, 150, 280, 450, 420, 200, 180], label: 'Commercial Zone', color: '#f97316' },
                { data: [300, 320, 310, 305, 315, 300, 290], label: 'Container Terminal', color: '#3b82f6' }
              ]}
              xAxis={[{ scaleType: 'point', data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'] }]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Congestion Hotspots</h3>
          <div className="h-72">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Main Gate', 'Lobby', 'Canteen', 'Locker Room', 'Loading Dock'] }]}
              series={[
                { data: [85, 45, 98, 75, 30], label: 'Occupancy %', color: '#6366f1' }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Zone Capacity Status</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Zone Name</th>
              <th className="px-6 py-4">Current Count</th>
              <th className="px-6 py-4">Max Capacity</th>
              <th className="px-6 py-4">Load %</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {[
              { name: 'Commercial Zone', current: 145, max: 150, load: 96, status: 'Critical' },
              { name: 'Container Terminal', current: 42, max: 60, load: 70, status: 'Normal' },
              { name: 'Admin Block', current: 28, max: 30, load: 93, status: 'Warning' },
              { name: 'Passenger Terminal', current: 12, max: 50, load: 24, status: 'Normal' },
            ].map((row, i) => (
              <tr key={i} className={`hover:bg-slate-50 ${row.status === 'Critical' ? 'bg-red-50/30' : ''}`}>
                <td className="px-6 py-4 flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {row.name}</td>
                <td className="px-6 py-4 font-mono font-semibold text-slate-700">{row.current}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{row.max}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${row.load > 90 ? 'bg-red-500' : row.load > 75 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${row.load}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold">{row.load}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${row.status === 'Critical' ? 'bg-red-100 text-red-600' :
                      row.status === 'Warning' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                    }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:text-blue-800 text-xs font-semibold flex items-center gap-1">
                    <Maximize size={12} /> View Cam
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
