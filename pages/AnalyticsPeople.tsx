
import React from 'react';
import { LineChart, PieChart } from '@mui/x-charts';
import { Users, UserCheck, Timer, Map, UserMinus } from 'lucide-react';

export const AnalyticsPeople: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">People & Evacuation Analytics</h2>
            <p className="text-slate-500 text-sm">Real-time headcount, evacuation mapping, and unauthorized access trends.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Current Headcount</p>
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-semibold text-slate-900">1,248</h3>
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-lg">LIVE</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Safe Evacuation %</p>
          <h3 className="text-3xl font-semibold text-slate-900">99.8%</h3>
          <p className="text-[10px] text-slate-400">Based on last drill (May 12)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Avg Drill Time</p>
          <div className="flex items-center gap-2">
            <Timer size={20} className="text-primary" />
            <h3 className="text-3xl font-semibold text-slate-900">3m 12s</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Unauthorized Entries</p>
          <h3 className="text-3xl font-semibold text-red-600">02</h3>
          <p className="text-[10px] text-red-400">Restricted Zone A4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Headcount Over Shift Cycle</h3>
          <div className="h-72">
            <LineChart
              series={[
                { data: [400, 1100, 1250, 1200, 900, 400, 200], label: 'Actual Count', color: '#8b5cf6', area: true },
                { data: [420, 1150, 1248, 1210, 850, 410, 210], label: 'Shift Roster', color: '#cbd5e1' }
              ]}
              xAxis={[{ scaleType: 'point', data: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'] }]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Staff Distribution by Role</h3>
          <div className="h-72 flex items-center justify-center">
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 850, label: 'Operators', color: '#3b82f6' },
                  { id: 1, value: 120, label: 'Supervisors', color: '#10b981' },
                  { id: 2, value: 80, label: 'EHS Staff', color: '#ef4444' },
                  { id: 3, value: 198, label: 'Logistics', color: '#f59e0b' },
                ],
                innerRadius: 70,
                paddingAngle: 5,
              }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
