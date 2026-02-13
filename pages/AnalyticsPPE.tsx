import React from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { HardHat, Info, Download, Filter, Eye, AlertTriangle } from 'lucide-react';
import { SITE_HIERARCHY } from '../constants';

const ALL_ZONES = SITE_HIERARCHY.flatMap(b => b.sites.flatMap(s => s.zones));

export const AnalyticsPPE: React.FC = () => {
  // Mock data generation for each zone
  const zoneData = ALL_ZONES.slice(0, 6).map((zone, idx) => ({
    zone,
    count: [937, 1964, 1300, 960, 2465, 1120][idx % 6],
    violations: Math.floor(Math.random() * 60) + 2,
    accuracy: (95 + Math.random() * 4).toFixed(2),
    trend: idx % 3 === 0 ? 'up' : idx % 3 === 1 ? 'down' : 'stable'
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-lg text-primary">
            <HardHat size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">PPE Compliance Analytics</h2>
            <p className="text-slate-500 text-sm">Deep dive into protective equipment adherence across all shifts.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50"><Filter size={18} /> Filters</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-700"><Download size={18} /> Export Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {/* Helmet */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full border-[6px] border-green-500 flex items-center justify-center mb-4">
            <span className="text-lg font-semibold text-slate-900">98.5%</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">Helmet Adherence</p>
        </div>

        {/* Vest */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full border-[6px] border-primary flex items-center justify-center mb-4">
            <span className="text-lg font-semibold text-slate-900">96.2%</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">Vest Compliance</p>
        </div>

        {/* Glove */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full border-[6px] border-orange-400 flex items-center justify-center mb-4">
            <span className="text-lg font-semibold text-slate-900">92.8%</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">Glove Adherence</p>
        </div>

        {/* Mask */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full border-[6px] border-purple-500 flex items-center justify-center mb-4">
            <span className="text-lg font-semibold text-slate-900">95.4%</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">Mask Adherence</p>
        </div>

        {/* Shoe */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full border-[6px] border-cyan-500 flex items-center justify-center mb-4">
            <span className="text-lg font-semibold text-slate-900">99.1%</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">Shoe Adherence</p>
        </div>

        {/* Critical Violations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow bg-red-50/50 border-red-100">
          <div className="w-20 h-20 rounded-full border-[6px] border-red-500 flex items-center justify-center mb-4 text-red-600 bg-white">
            <AlertTriangle size={28} />
          </div>
          <p className="text-xs font-semibold text-red-700 uppercase tracking-widest text-center">Critical Violations</p>
          <span className="text-xl font-semibold text-red-600 mt-1">14</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Compliance Trend (Daily)</h3>
          <div className="h-80">
            <LineChart
              series={[
                { data: [98, 97.5, 99, 98.2, 98.5, 98.8, 98.5], label: 'Helmets', color: '#10b981' },
                { data: [94, 93, 95, 96, 96.2, 95.8, 96.2], label: 'Vests', color: '#3b82f6' },
                { data: [90, 89, 91, 92, 92.5, 92.8, 92.8], label: 'Gloves', color: '#f59e0b' }
              ]}
              xAxis={[{ scaleType: 'point', data: ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'] }]}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Violations by Shift</h3>
          <div className="h-80">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Shift A', 'Shift B', 'Shift C'] }]}
              series={[
                { data: [12, 18, 24], label: 'No Helmet', color: '#ef4444' },
                { data: [8, 14, 12], label: 'No Vest', color: '#f59e0b' },
                { data: [15, 22, 19], label: 'No Gloves', color: '#3b82f6' }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Zone-wise PPE Violation Breakdown</h3>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400"><Info size={18} /></button>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-wider">ZONE</th>
              <th className="px-6 py-4">
                <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-primary-100/50">
                  TOTAL DETECTIONS
                </span>
              </th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-wider">VIOLATIONS</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-wider">ACCURACY %</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-wider">TREND</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-wider">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {zoneData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800 uppercase tracking-tighter">{row.zone}</td>
                <td className="px-6 py-4">
                  <div className="bg-primary-50 text-blue-900 px-3 py-1.5 rounded-lg font-mono font-semibold text-sm inline-block border border-primary-100/50 shadow-sm">
                    {row.count}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-semibold text-red-600">{row.violations}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${Number(row.accuracy) > 98 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${row.accuracy}%` }}></div>
                    </div>
                    <span className="font-semibold text-slate-700">{row.accuracy}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 font-semibold ${row.trend === 'up' ? 'text-green-600' : row.trend === 'down' ? 'text-red-600' : 'text-slate-400'}`}>
                    {row.trend === 'up' && <Eye size={14} />}
                    {row.trend === 'down' && <AlertTriangle size={14} />}
                    {row.trend}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary font-semibold hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};