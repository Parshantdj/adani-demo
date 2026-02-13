
import React from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { ScanFace, UserCheck, UserX, Wind, Fingerprint, Activity, CheckCircle2, XCircle } from 'lucide-react';

export const AnalyticsIdentity: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <ScanFace size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Identity & Sobriety Compliance</h2>
            <p className="text-slate-500 text-sm">Integrated facial access control analytics with Breath Analyzer (BAC) telemetry.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Telemetry Source:</span>
          <span className="px-3 py-1 bg-slate-800 text-white rounded text-xs font-mono font-semibold">GATE-01-MASTER</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Total Scans</p>
            <ScanFace size={18} className="text-primary" />
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">1,204</h3>
          <p className="text-xs text-primary font-semibold mt-2">Today's Entries</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Face Match Rate</p>
            <Fingerprint size={18} className="text-emerald-500" />
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">99.1%</h3>
          <p className="text-xs text-emerald-500 font-semibold mt-2">High Confidence</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">BAC Violations</p>
            <Wind size={18} className="text-red-500" />
          </div>
          <h3 className="text-3xl font-semibold text-red-600">03</h3>
          <p className="text-xs text-red-400 font-semibold mt-2">Alcohol Detected</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Access Denied</p>
            <UserX size={18} className="text-orange-500" />
          </div>
          <h3 className="text-3xl font-semibold text-slate-900">14</h3>
          <p className="text-xs text-orange-500 font-semibold mt-2">Blacklisted / Unknown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Entry Volume vs. Rejections</h3>
          <div className="h-72">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'] }]}
              series={[
                { data: [120, 450, 150, 200, 400, 180], label: 'Allowed', color: '#10b981', stack: 'total' },
                { data: [2, 12, 4, 3, 8, 2], label: 'Denied', color: '#ef4444', stack: 'total' }
              ]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Breath Analyzer (BAC) Levels</h3>
          <div className="h-72">
            <LineChart
              series={[
                { data: [0, 0, 0.01, 0, 0.04, 0.08, 0], label: 'BAC Level %', color: '#6366f1', area: true }
              ]}
              xAxis={[{ scaleType: 'point', data: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7'] }]}
            />
            <div className="mt-2 text-center">
              <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">Threshold Limit: 0.03%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Recent Access & Sobriety Logs</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">User Identity</th>
              <th className="px-6 py-4">Face Match</th>
              <th className="px-6 py-4">Breath Analyzer (BAC)</th>
              <th className="px-6 py-4">Gate Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {[
              { time: '14:22:10', user: 'Arjun Singh', id: 'ST-2041', face: 99.8, bac: 0.00, status: 'Allowed' },
              { time: '14:21:45', user: 'Vikram Mehta', id: 'ST-1092', face: 98.4, bac: 0.00, status: 'Allowed' },
              { time: '14:18:30', user: 'Unknown', id: '---', face: 42.1, bac: 0.00, status: 'Denied' },
              { time: '14:15:12', user: 'Rajiv Kumar', id: 'ST-5521', face: 99.2, bac: 0.06, status: 'Blocked (Alcohol)' },
              { time: '14:10:05', user: 'Sneha Rao', id: 'ST-2152', face: 99.5, bac: 0.00, status: 'Allowed' },
            ].map((row, i) => (
              <tr key={i} className={`hover:bg-slate-50 ${row.status.includes('Blocked') ? 'bg-red-50/50' : row.status === 'Denied' ? 'bg-orange-50/50' : ''}`}>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{row.time}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-800">{row.user}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{row.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-mono font-semibold ${row.face > 90 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {row.face}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Wind size={14} className={row.bac > 0.03 ? 'text-red-500' : 'text-slate-400'} />
                    <span className={`font-mono font-semibold ${row.bac > 0.03 ? 'text-red-600' : 'text-slate-600'}`}>
                      {row.bac.toFixed(2)}%
                    </span>
                    {row.bac > 0.03 && <span className="text-[10px] font-semibold text-red-500 uppercase ml-2">FAIL</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {row.status === 'Allowed' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-red-500" />}
                    <span className={`text-xs font-semibold uppercase ${row.status === 'Allowed' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {row.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
