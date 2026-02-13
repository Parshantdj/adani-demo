
import React from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { Flame, Clock, ShieldAlert, History, MapPin, Wind, CloudFog } from 'lucide-react';
import { SITE_HIERARCHY } from '../constants';

const ALL_ZONES = SITE_HIERARCHY.flatMap(b => b.sites.flatMap(s => s.zones));

export const AnalyticsFire: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg text-red-600">
            <Flame size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Fire & Smoke Emergency Analytics</h2>
            <p className="text-slate-500 text-sm">Critical incidents, thermal monitoring, smoke levels, and emergency response performance.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <ShieldAlert size={20} />
            <span className="text-xs font-semibold uppercase tracking-widest">Total Fire Incidents</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">02</h3>
          <p className="text-xs text-green-600 font-semibold mt-1">-50% vs Last Month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <CloudFog size={20} />
            <span className="text-xs font-semibold uppercase tracking-widest">Smoke Alerts</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">12</h3>
          <p className="text-xs text-orange-600 font-semibold mt-1">3 Active Warnings</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Clock size={20} />
            <span className="text-xs font-semibold uppercase tracking-widest">Avg Response Time</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">42s</h3>
          <p className="text-xs text-primary font-semibold mt-1">Within SLA Threshold (60s)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Wind size={20} />
            <span className="text-xs font-semibold uppercase tracking-widest">False Alarms</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">04</h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">Mainly Welding Fumes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Thermal & Smoke Trends</h3>
          <div className="h-72">
            <LineChart
              series={[
                { data: [32, 34, 33, 45, 38, 32, 31], label: 'Peak Temp (°C)', color: '#ef4444' },
                { data: [10, 12, 11, 65, 25, 12, 10], label: 'Smoke Opacity (%)', color: '#64748b' }
              ]}
              xAxis={[{ scaleType: 'point', data: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'] }]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Incident Type Breakdown</h3>
          <div className="h-72">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }]}
              series={[
                { data: [2, 1, 3, 2, 2], label: 'Fire Drills', color: '#3b82f6' },
                { data: [1, 2, 4, 3, 5], label: 'Smoke Events', color: '#94a3b8' },
                { data: [0, 0, 1, 0, 0], label: 'Fire Incidents', color: '#ef4444' }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Critical Zone Monitoring (Thermal & Smoke)</h3>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-semibold rounded uppercase">Active Sensors: 142</span>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Zone</th>
              <th className="px-6 py-4">Current Temp</th>
              <th className="px-6 py-4">Smoke Level (CO ppm)</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4">Last Event</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr>
              <td className="px-6 py-4 flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> Boiler Zone</td>
              <td className="px-6 py-4 text-orange-600 font-mono font-semibold">48.2°C</td>
              <td className="px-6 py-4 text-slate-600 font-mono">12 ppm</td>
              <td className="px-6 py-4"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-semibold uppercase">Moderate</span></td>
              <td className="px-6 py-4 text-slate-500">12:15 PM today</td>
              <td className="px-6 py-4 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Monitoring</td>
            </tr>
            <tr className="bg-red-50/30">
              <td className="px-6 py-4 flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> Coal Handling Plant</td>
              <td className="px-6 py-4 text-red-600 font-mono font-semibold">112.5°C</td>
              <td className="px-6 py-4 text-red-600 font-mono font-semibold">450 ppm (Heavy)</td>
              <td className="px-6 py-4"><span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-semibold uppercase">Critical</span></td>
              <td className="px-6 py-4 text-slate-500">Just now</td>
              <td className="px-6 py-4 flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> ALARM ACTIVE</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> Fuel Yard</td>
              <td className="px-6 py-4 text-slate-600 font-mono font-semibold">32.0°C</td>
              <td className="px-6 py-4 text-orange-500 font-mono">45 ppm (Haze)</td>
              <td className="px-6 py-4"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] font-semibold uppercase">Warning</span></td>
              <td className="px-6 py-4 text-slate-500">10 mins ago</td>
              <td className="px-6 py-4 flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Check Required</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
