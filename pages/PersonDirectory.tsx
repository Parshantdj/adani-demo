
import React from 'react';
import { UserCheck, Search, Filter, Plus, Shield, User, Camera, History, Mail, Phone, MoreHorizontal } from 'lucide-react';

const MOCK_STAFF = [
  { id: 'ST-2041', name: 'Arjun Singh', role: 'Mechanical Engineer', dept: 'Line A', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=arjun' },
  { id: 'ST-2152', name: 'Sneha Rao', role: 'Quality Analyst', dept: 'Paint Shop', status: 'Away', image: 'https://i.pravatar.cc/150?u=sneha' },
  { id: 'ST-1092', name: 'Vikram Mehta', role: 'Shift Supervisor', dept: 'Battery Hub', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=vikram' },
  { id: 'ST-3301', name: 'Zoya Khan', role: 'Safety Auditor', dept: 'EHS Dept', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=zoya' },
  { id: 'ST-4055', name: 'Rahul Deshmukh', role: 'Forklift Operator', dept: 'Warehouse', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 'ST-1120', name: 'Aditi Nair', role: 'Maintenance Lead', dept: 'Press Shop', status: 'Away', image: 'https://i.pravatar.cc/150?u=aditi' },
  { id: 'ST-5509', name: 'Karan Johar', role: 'Safety Warden', dept: 'Line B', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=karan' },
  { id: 'ST-2291', name: 'Ishaan Khattar', role: 'Inventory Specialist', dept: 'Logistics', status: 'Off Duty', image: 'https://i.pravatar.cc/150?u=ishaan' },
  { id: 'ST-9021', name: 'Meera Rajput', role: 'Lab Technician', dept: 'Paint Shop', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=meera' },
  { id: 'ST-3312', name: 'Sunil Gavaskar', role: 'Security Head', dept: 'Security', status: 'On Floor', image: 'https://i.pravatar.cc/150?u=sunil' },
];

export const PersonDirectory: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg text-white">
            <UserCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Person Directory</h2>
            <p className="text-slate-500 text-sm">Face recognition database, staff profile matching, and attendance logs.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
          <Plus size={20} />
          Enroll New Person
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-6 sticky top-24">
          <h3 className="font-semibold text-slate-800 border-b border-slate-50 pb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1.5">Department</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary">
                <option>All Departments</option>
                <option>Line A</option>
                <option>Paint Shop</option>
                <option>Battery Hub</option>
                <option>Warehouse</option>
                <option>Security</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1.5">Status</label>
              <div className="space-y-2">
                {['On Floor', 'Away', 'Off Duty', 'Guest'].map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-primary" />
                    <span className="text-xs text-slate-600 font-medium">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors">Apply Filters</button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search by name, staff ID or biometric ID..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none shadow-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_STAFF.map(person => (
              <div key={person.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-emerald-500 transition-all cursor-pointer group">
                <div className="relative">
                  <img src={person.image} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-50 group-hover:border-emerald-100 transition-colors" alt={person.name} />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${person.status === 'On Floor' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{person.id}</p>
                      <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{person.name}</h4>
                    </div>
                    <button className="p-1 text-slate-300 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 mb-4">{person.role} • {person.dept}</p>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-emerald-100">
                      <History size={14} /> HISTORY
                    </button>
                    <button className="flex-1 bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-emerald-100">
                      <Shield size={14} /> ACCESS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
