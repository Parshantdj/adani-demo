
import React from 'react';
import { UserPlus, Search, MoreVertical, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const MOCK_USERS = [
  { name: 'Rajesh Kumar', role: 'Plant Safety Head', email: 'rajesh.k@isafetyrobo.com', phone: '+91 98765 43210', location: 'Mundra Port', status: 'Active' },
  { name: 'Amit Sharma', role: 'Safety Officer', email: 'amit.s@isafetyrobo.com', phone: '+91 98765 43211', location: 'Mundra Power Plant', status: 'Active' },
  { name: 'Priya Verma', role: 'Audit Manager', email: 'priya.v@isafetyrobo.com', phone: '+91 98765 43212', location: 'Ahmedabad HQ', status: 'Inactive' },
  { name: 'Sanjay Gupta', role: 'SOC Operator', email: 'sanjay.g@isafetyrobo.com', phone: '+91 98765 43213', location: 'Dhamra Port', status: 'Active' },
];

export const SettingsUsers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">User Management</h2>
          <p className="text-slate-500 text-sm">Manage system access, roles, and location assignments.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all">
          <UserPlus size={20} />
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email or role..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Filter</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Bulk Actions</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role & Access</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.map((user, idx) => (
                <tr key={idx} className="hover:bg-slate-50 group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold border border-slate-200">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">UID: SNT-{1000 + idx}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-primary-700">
                        <ShieldCheck size={14} />
                        <span className="font-semibold">{user.role}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Full Read/Write Access</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2"><Mail size={12} className="text-slate-400" /> <span>{user.email}</span></div>
                      <div className="flex items-center gap-2"><Phone size={12} className="text-slate-400" /> <span>{user.phone}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
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
