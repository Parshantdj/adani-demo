
import React, { useState } from 'react';
import { Users, Save, Search, AlertTriangle, Ruler, Settings2, Edit2, Check, X, ArrowRight } from 'lucide-react';
import { SITE_HIERARCHY } from '../constants';

const ALL_ZONES = SITE_HIERARCHY.flatMap(b => b.sites.flatMap(s => s.zones));

const INITIAL_ZONES = ALL_ZONES.map((zone, idx) => ({
   id: `ZN-${String(idx + 1).padStart(2, '0')}`,
   name: zone,
   area: Math.floor(Math.random() * 2000) + 200,
   maxCapacity: Math.floor(Math.random() * 150) + 20,
   alertThreshold: 90,
   status: idx % 7 === 0 ? 'Maintenance' : 'Active'
}));

export const HeadcountConfig: React.FC = () => {
   const [zones, setZones] = useState(INITIAL_ZONES);
   const [editingId, setEditingId] = useState<string | null>(null);
   const [editForm, setEditForm] = useState<any>(null);

   const handleEdit = (zone: any) => {
      setEditingId(zone.id);
      setEditForm({ ...zone });
   };

   const handleSave = () => {
      setZones(zones.map(z => z.id === editingId ? editForm : z));
      setEditingId(null);
      setEditForm(null);
   };

   const handleCancel = () => {
      setEditingId(null);
      setEditForm(null);
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-20">
         <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
               <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <Users size={24} />
               </div>
               <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Headcount & Crowd Rules</h2>
                  <p className="text-slate-500 text-sm">Configure maximum occupancy limits and density thresholds for overcrowding alerts.</p>
               </div>
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all">
                  Import CSV
               </button>
               <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-100">
                  <Save size={18} />
                  Apply Configuration
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <div className="p-4 bg-primary-50 text-primary rounded-2xl"><Users size={24} /></div>
               <div><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Total Plant Capacity</p><h4 className="text-2xl font-semibold text-slate-900">{zones.reduce((acc, curr) => acc + curr.maxCapacity, 0)} Pax</h4></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Ruler size={24} /></div>
               <div><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Avg Density Limit</p><h4 className="text-2xl font-semibold text-slate-900">2.5 Pax/m²</h4></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><AlertTriangle size={24} /></div>
               <div><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Active Monitors</p><h4 className="text-2xl font-semibold text-slate-900">{zones.filter(z => z.status === 'Active').length} Zones</h4></div>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
               <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search zone name or ID..." className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
               </div>
               <button className="flex items-center gap-2 text-xs font-semibold text-primary hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Settings2 size={14} /> Advanced Settings
               </button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                     <tr>
                        <th className="px-6 py-4">Zone Details</th>
                        <th className="px-6 py-4">Area Size</th>
                        <th className="px-6 py-4">Max Capacity (Limit)</th>
                        <th className="px-6 py-4">Density Threshold</th>
                        <th className="px-6 py-4">Alert Trigger %</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                     {zones.map((zone) => (
                        <tr key={zone.id} className={`hover:bg-slate-50 transition-colors ${editingId === zone.id ? 'bg-primary-50/30' : ''}`}>
                           <td className="px-6 py-4">
                              <div>
                                 <p className="font-semibold text-slate-800">{zone.name}</p>
                                 <p className="text-[10px] font-mono text-slate-400">{zone.id}</p>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-slate-500">{zone.area} m²</td>

                           {/* Editable Cells */}
                           {editingId === zone.id ? (
                              <>
                                 <td className="px-6 py-4">
                                    <input
                                       type="number"
                                       value={editForm.maxCapacity}
                                       onChange={(e) => setEditForm({ ...editForm, maxCapacity: parseInt(e.target.value) })}
                                       className="w-24 px-2 py-1 border border-primary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className="text-slate-400 font-mono">{(editForm.maxCapacity / zone.area).toFixed(2)} pax/m²</span>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                       <input
                                          type="range"
                                          min="50" max="100"
                                          value={editForm.alertThreshold}
                                          onChange={(e) => setEditForm({ ...editForm, alertThreshold: parseInt(e.target.value) })}
                                          className="w-24"
                                       />
                                       <span className="text-xs font-semibold">{editForm.alertThreshold}%</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <select
                                       value={editForm.status}
                                       onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                       className="text-xs border border-slate-300 rounded px-2 py-1"
                                    >
                                       <option>Active</option>
                                       <option>Inactive</option>
                                       <option>Maintenance</option>
                                    </select>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                       <button onClick={handleSave} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"><Check size={16} /></button>
                                       <button onClick={handleCancel} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"><X size={16} /></button>
                                    </div>
                                 </td>
                              </>
                           ) : (
                              <>
                                 <td className="px-6 py-4 font-semibold text-slate-900">{zone.maxCapacity} Pax</td>
                                 <td className="px-6 py-4 font-mono text-slate-500">{(zone.maxCapacity / zone.area).toFixed(2)} pax/m²</td>
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                       <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                          <div className="h-full bg-orange-500" style={{ width: `${zone.alertThreshold}%` }}></div>
                                       </div>
                                       <span className="text-xs font-semibold text-orange-600">@{zone.alertThreshold}%</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-widest ${zone.status === 'Active' ? 'bg-green-100 text-green-700' :
                                       zone.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                                       }`}>
                                       {zone.status}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(zone)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all">
                                       <Edit2 size={16} />
                                    </button>
                                 </td>
                              </>
                           )}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100">
               <div className="flex items-start gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl">
                  <div className="bg-primary p-1.5 rounded-full text-white mt-0.5"><Settings2 size={14} /></div>
                  <div>
                     <h4 className="text-xs font-semibold text-blue-900 uppercase tracking-widest mb-1">Dynamic Capacity Adjustment</h4>
                     <p className="text-xs text-primary-700 leading-relaxed">
                        AI can automatically adjust density thresholds based on shift timings (e.g., lower limits during night shift).
                        Current setting: <span className="font-semibold">Manual Fixed Limits</span>.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
