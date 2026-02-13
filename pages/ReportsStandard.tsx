
import React from 'react';
import { FileText, Download, Calendar, Filter, Star, Info, ChevronRight, BarChart3 } from 'lucide-react';

const MOCK_REPORTS = [
  { title: 'Daily Safety Summary', desc: 'Summary of all incidents, resolution times and active alerts for the past 24 hours.', category: 'Safety', cycle: 'Daily' },
  { title: 'Weekly PPE Compliance', desc: 'Detailed breakdown of helmet, vest, and glove adherence across all plant lines.', category: 'Compliance', cycle: 'Weekly' },
  { title: 'Monthly Incident Heatmap', desc: 'Spatial analysis of where safety violations occur most frequently by zone.', category: 'Analytics', cycle: 'Monthly' },
  { title: 'Emergency Response SLA', desc: 'Audit of response times vs defined SOP targets during emergency triggers.', category: 'Operational', cycle: 'Quarterly' },
  { title: 'Shift Handover Analytics', desc: 'Comparison of safety performance between Shift A, B, and C cycles.', category: 'Analytics', cycle: 'Weekly' },
  { title: 'Annual Safety Audit', desc: 'Comprehensive regulatory compliance report for the fiscal year 2023-24.', category: 'Compliance', cycle: 'Annual' },
  { title: 'Near-Miss Statistical Analysis', desc: 'Predictive analysis based on flagged potential hazards and near-miss detections.', category: 'Analytics', cycle: 'Monthly' },
  { title: 'Equipment Maintenance Compliance', desc: 'Tracking sensor health, camera uptime, and AI processing node efficiency.', category: 'System Health', cycle: 'Monthly' },
];

export const ReportsStandard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
            <BarChart3 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Standard Reports</h2>
            <p className="text-slate-500 text-sm">Access pre-defined enterprise reports for EHS and Plant Management.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_REPORTS.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col group border-t-4 border-t-slate-100 hover:border-t-primary">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{report.cycle}</span>
              <button className="text-slate-200 hover:text-yellow-400 transition-colors"><Star size={18} fill={idx < 2 ? 'currentColor' : 'none'} /></button>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">{report.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{report.desc}</p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
              <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg text-xs font-semibold hover:bg-primary-700 transition-all shadow-md shadow-primary-100">
                <Download size={14} /> DOWNLOAD
              </button>
              <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-800 rounded-lg transition-colors">
                <Info size={18} />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-white hover:border-primary-300 transition-all">
          <div className="p-4 bg-white rounded-full shadow-sm text-slate-300 group-hover:text-primary group-hover:shadow-md transition-all">
            <Calendar size={32} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Schedule Report</h4>
            <p className="text-xs text-slate-500">Automate recurring PDF deliveries to your email or SOC dashboard.</p>
          </div>
          <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
