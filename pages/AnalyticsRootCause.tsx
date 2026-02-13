
import React from 'react';
import { BarChart, ScatterChart } from '@mui/x-charts';
import { Activity, Zap, Info, Clock, Calendar } from 'lucide-react';

export const AnalyticsRootCause: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Root Cause Analysis (RCA)</h2>
            <p className="text-slate-500 text-sm">Analyzing correlation between shift timing, fatigue, and safety violations.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Violation Frequency vs. Shift Hour</h3>
            <Info size={16} className="text-slate-400" />
          </div>
          <div className="h-80">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'] }]}
              series={[
                { data: [5, 2, 3, 12, 18, 4, 3, 8], label: 'Total Violations', color: '#f97316' }
              ]}
              margin={{ top: 10, bottom: 20, left: 30, right: 10 }}
            />
            <p className="text-[10px] text-center text-slate-400 mt-2 font-semibold uppercase">Note: Spikes detected during H4 & H5 (Shift handover/Fatigue peak)</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Risk Distribution by Zone Type</h3>
            <Info size={16} className="text-slate-400" />
          </div>
          <div className="h-80 flex items-center justify-center">
            {/* Mocking a scatter-like view with labels if real scatter is complex for dummy */}
            <div className="relative w-full h-full flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-100">
              <div className="text-center p-8">
                <Zap size={48} className="mx-auto text-primary-300 mb-4" />
                <p className="text-sm font-semibold text-slate-400">Multi-variant Cluster Map</p>
                <p className="text-xs text-slate-400">High Correlation: Poor Lighting & PPE Violations in Warehousing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-6">AI Derived Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-primary-50 border-l-4 border-primary rounded-r-xl">
            <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2 mb-2"><Clock size={16} /> Handover Peak</h4>
            <p className="text-xs text-primary-700 leading-relaxed">Violations increase by 45% during shift handovers (02:00 PM - 03:00 PM). Suggesting reinforced supervisor presence during this slot.</p>
          </div>
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
            <h4 className="text-sm font-semibold text-green-800 flex items-center gap-2 mb-2"><Zap size={16} /> Training ROI</h4>
            <p className="text-xs text-green-700 leading-relaxed">Zones that underwent Safety Refreshers last month show a 70% decrease in repeat offenders compared to control groups.</p>
          </div>
          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
            <h4 className="text-sm font-semibold text-orange-800 flex items-center gap-2 mb-2"><Calendar size={16} /> Weekend Trend</h4>
            <p className="text-xs text-orange-700 leading-relaxed">Friday late evening shifts show 15% higher unauthorized access alerts. Likely due to contractual labor cleaning schedules.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
