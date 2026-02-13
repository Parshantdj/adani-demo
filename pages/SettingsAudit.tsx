
import React from 'react';
import { History, Search, Download, Filter, User, ShieldAlert, Monitor, Terminal } from 'lucide-react';

const MOCK_AUDITS = [
  { id: 'AUD-001', user: 'Rajesh Kumar', action: 'Modified SOP', target: 'SOP-SAFE-01', timestamp: '2024-05-20 14:12:45', ip: '10.2.1.42', severity: 'Medium' },
  { id: 'AUD-002', user: 'System AI', action: 'Zone Rule Triggered', target: 'Zone B4', timestamp: '2024-05-20 14:10:02', ip: 'Local Engine', severity: 'High' },
  { id: 'AUD-003', user: 'Amit Sharma', action: 'Manual Override', target: 'CAM-A1-04', timestamp: '2024-05-20 13:45:10', ip: '10.2.1.88', severity: 'Critical' },
  { id: 'AUD-004', user: 'Priya Verma', action: 'Exported Audit Report', target: 'Audit_May_2024.pdf', timestamp: '2024-05-20 13:30:15', ip: '10.2.1.12', severity: 'Low' },
  { id: 'AUD-005', user: 'Admin Console', action: 'New User Enrolled', target: 'Sneha Rao', timestamp: '2024-05-20 12:00:00', ip: '10.2.1.01', severity: 'Low' },
  { id: 'AUD-006', user: 'Sanjay Gupta', action: 'Camera Calibrated', target: 'CAM-WH-02', timestamp: '2024-05-20 11:45:00', ip: '10.2.1.89', severity: 'Low' },
  { id: 'AUD-007', user: 'System AI', action: 'PPE Violation Auto-Logged', target: 'INC-2024-011', timestamp: '2024-05-20 11:30:22', ip: 'Local Engine', severity: 'Medium' },
  { id: 'AUD-008', user: 'Rajesh Kumar', action: 'Login Success', target: 'User Dashboard', timestamp: '2024-05-20 09:00:15', ip: '10.2.1.42', severity: 'Low' },
  { id: 'AUD-009', user: 'Amit Sharma', action: 'Deleted False Positive', target: 'FP-2024-004', timestamp: '2024-05-19 17:15:10', ip: '10.2.1.88', severity: 'Medium' },
  { id: 'AUD-010', user: 'Security Team', action: 'Escalation Sent', target: 'INC-2024-005', timestamp: '2024-05-19 16:42:00', ip: '10.2.5.11', severity: 'High' },
  { id: 'AUD-011', user: 'Admin Console', action: 'Database Backup Complete', target: 'iSafety_Prod_DB', timestamp: '2024-05-19 03:00:00', ip: 'System Cron', severity: 'Low' },
];

export const SettingsAudit: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg text-white">
            <Terminal size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">System Audit Logs</h2>
            <p className="text-slate-500 text-sm">Immutable ledger of all user actions, AI triggers, and system configuration changes.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black transition-all shadow-lg shadow-slate-200">
          <Download size={20} />
          Export Secure Ledger
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Filter by User, IP, Target or Action..." className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"><Filter size={18} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User / Source</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target Object</th>
                <th className="px-6 py-4">Client IP</th>
                <th className="px-6 py-4">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {MOCK_AUDITS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-mono text-[10px] uppercase font-semibold">{log.timestamp.split(' ')[0]}</span>
                      <span className="text-slate-700 font-mono text-xs">{log.timestamp.split(' ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400"><User size={12} /></div>
                      <span className="text-slate-800 font-semibold">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-primary text-xs font-semibold px-2 py-0.5 bg-primary-50 rounded border border-primary-100">{log.action}</span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-mono text-xs">{log.target}</td>
                  <td className="px-6 py-5 text-slate-400 font-mono text-[10px]">{log.ip}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${log.severity === 'Critical' ? 'bg-red-600 text-white' :
                        log.severity === 'High' ? 'bg-orange-600 text-white' :
                          'bg-slate-100 text-slate-600'
                      }`}>
                      {log.severity}
                    </span>
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
