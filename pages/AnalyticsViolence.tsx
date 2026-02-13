
import React from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import { ShieldAlert, UserX, Siren, Activity, Eye, AlertCircle } from 'lucide-react';

export const AnalyticsViolence: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg text-red-600">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Violence Compliance</h2>
            <p className="text-slate-500 text-sm">Aggression detection, fight alerts, and behavioral anomaly monitoring.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserX size={80} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Fight Alerts (7d)</p>
          <h3 className="text-4xl font-black text-slate-900">03</h3>
          <p className="text-xs text-red-500 font-semibold mt-2">1 Confirmed Incident</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Siren size={80} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Aggressive Behavior</p>
          <h3 className="text-4xl font-black text-slate-900">12</h3>
          <p className="text-xs text-orange-500 font-semibold mt-2">Detections (Pushing/Shoving)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={80} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">AI Confidence</p>
          <h3 className="text-4xl font-black text-slate-900">96.5%</h3>
          <p className="text-xs text-primary font-semibold mt-2">Pose Estimation Accuracy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Incident Frequency by Shift</h3>
          <div className="h-72">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Morning', 'General', 'Evening', 'Night'] }]}
              series={[
                { data: [1, 2, 4, 8], label: 'Aggression Alerts', color: '#ef4444' }
              ]}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Type of Disturbance</h3>
          <div className="h-72 flex justify-center">
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 60, label: 'Pushing/Shoving', color: '#f97316' },
                  { id: 1, value: 20, label: 'Running/Panic', color: '#3b82f6' },
                  { id: 2, value: 10, label: 'Strike/Hit', color: '#ef4444' },
                  { id: 3, value: 10, label: 'Fallen Person', color: '#10b981' },
                ],
                innerRadius: 60,
                paddingAngle: 2,
              }]}
            />
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-red-600" />
          <h3 className="font-semibold text-red-900">Recent Critical Alerts</h3>
        </div>
        <div className="space-y-3">
          {[
            { time: 'Today, 14:15', zone: 'Locker Room B', desc: 'Sustained aggressive stance detected between 2 individuals.', status: 'Investigating' },
            { time: 'Yesterday, 22:30', zone: 'Parking Lot C', desc: 'Rapid movement / Chasing detected.', status: 'Resolved' }
          ].map((alert, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-red-100 flex justify-between items-center shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{alert.time}</span>
                  <span className="text-xs font-semibold text-slate-600">• {alert.zone}</span>
                </div>
                <p className="text-sm font-medium text-slate-800">{alert.desc}</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold uppercase">{alert.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
