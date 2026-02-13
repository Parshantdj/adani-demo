import React, { useState } from 'react';
import {
  UserPlus, Search, Filter, Plus, Camera, Trash2, Edit2,
  MoreHorizontal, Download, ChevronRight, X, Info,
  CloudUpload, RefreshCcw, ShieldCheck, UserCheck
} from 'lucide-react';

interface RegisteredPerson {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  dept: string;
  status: string;
  photos: string[];
}

const MOCK_REGISTERED: RegisteredPerson[] = [
  {
    id: 'SNT-4001',
    firstName: 'Srijan',
    middleName: 'Kumar',
    lastName: 'Sharma',
    role: 'Safety Engineer',
    dept: 'Safety',
    status: 'Active',
    photos: [
      'https://i.pravatar.cc/150?u=srijan',
      'https://picsum.photos/seed/s1/150/150',
      'https://picsum.photos/seed/s2/150/150',
      'https://picsum.photos/seed/s3/150/150',
      'https://picsum.photos/seed/s4/150/150'
    ]
  },
  {
    id: 'SNT-4002',
    firstName: 'Sreshtha',
    middleName: 'Prasad',
    lastName: 'Verma',
    role: 'Operations Lead',
    dept: 'Operations',
    status: 'Active',
    photos: [
      'https://i.pravatar.cc/150?u=sreshtha',
      'https://picsum.photos/seed/sr1/150/150',
      'https://picsum.photos/seed/sr2/150/150',
      'https://picsum.photos/seed/sr3/150/150',
      'https://picsum.photos/seed/sr4/150/150'
    ]
  },
  {
    id: 'SNT-4003',
    firstName: 'Lakshay',
    middleName: 'Dev',
    lastName: 'Gupta',
    role: 'Compliance Officer',
    dept: 'Compliance',
    status: 'Active',
    photos: [
      'https://i.pravatar.cc/150?u=lakshay',
      'https://picsum.photos/seed/l1/150/150',
      'https://picsum.photos/seed/l2/150/150',
      'https://picsum.photos/seed/l3/150/150',
      'https://picsum.photos/seed/l4/150/150'
    ]
  },
  {
    id: 'SNT-4004',
    firstName: 'Manoj',
    middleName: 'Bihari',
    lastName: 'Singh',
    role: 'Plant Supervisor',
    dept: 'Plant',
    status: 'Active',
    photos: [
      'https://i.pravatar.cc/150?u=manoj',
      'https://picsum.photos/seed/m1/150/150',
      'https://picsum.photos/seed/m2/150/150',
      'https://picsum.photos/seed/m3/150/150',
      'https://picsum.photos/seed/m4/150/150'
    ]
  },
  {
    id: 'SNT-4005',
    firstName: 'Mandeep',
    middleName: 'Deepak',
    lastName: 'Kaur',
    role: 'EHS Manager',
    dept: 'EHS',
    status: 'Active',
    photos: [
      'https://i.pravatar.cc/150?u=mandeep',
      'https://picsum.photos/seed/md1/150/150',
      'https://picsum.photos/seed/md2/150/150',
      'https://picsum.photos/seed/md3/150/150',
      'https://picsum.photos/seed/md4/150/150'
    ]
  },
];

export const FaceEnrollment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    type: 'Permanent Staff'
  });

  const [uploads, setUploads] = useState<Record<string, string | null>>({
    LEFT: null,
    RIGHT: null,
    FRONT: null,
    UPWARD: null,
    DOWNWARD: null
  });

  const handleUpload = (position: string) => {
    const mockImage = `https://picsum.photos/seed/${position}/200/200`;
    setUploads(prev => ({ ...prev, [position]: mockImage }));
  };

  const filteredData = MOCK_REGISTERED.filter(person => {
    const fullName = `${person.firstName} ${person.middleName} ${person.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative space-y-6 animate-in fade-in duration-500 pb-12 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-100">
            <UserCheck size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Registered Personnel Database</h2>
            <p className="text-slate-500 text-sm font-medium">Full view of biometric enrollments and identification status.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white hover:shadow-sm transition-all">
            <Download size={18} />
            Export Audit
          </button>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200"
          >
            <UserPlus size={20} />
            Register Person
          </button>
        </div>
      </div>

      {/* Filter & Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by first, middle or last name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
          />
        </div>
        <div className="bg-white px-6 py-3.5 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Count</span>
          <span className="text-xl font-black text-slate-900">{filteredData.length}</span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee Profile</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Middle Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Biometric Samples (L, R, U, D)</th>
                <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? (
                filteredData.map((person) => (
                  <tr key={person.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative group/photo">
                          <img src={person.photos[0]} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-primary transition-all cursor-pointer shadow-sm" alt="Primary" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 truncate max-w-[180px]">{person.firstName} {person.middleName} {person.lastName}</p>
                          <p className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">{person.id} • {person.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-slate-700">{person.firstName}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-slate-700">{person.middleName}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-slate-700">{person.lastName}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        {person.photos.slice(1).map((url, i) => (
                          <div key={i} className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 hover:scale-125 transition-transform cursor-pointer hover:z-10 shadow-sm bg-slate-100">
                            <img src={url} className="w-full h-full object-cover" alt={`Sample ${i}`} />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-white rounded-lg transition-all shadow-sm">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Search size={64} strokeWidth={1} className="mb-4 opacity-20" />
                      <h3 className="text-xl font-semibold text-slate-500">No personnel found</h3>
                      <p className="text-sm">Try searching with a different name or ID.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Biometric Integrity Sync: 100% Stable</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>

      {/* Right Side Sliding Panel for Registration Form */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsPanelOpen(false)}></div>

          <div className="relative w-full max-w-xl bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            {/* Panel Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-200">
                  <UserPlus size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Register New Person</h2>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-600 transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {/* Form Inputs */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Middle Name</label>
                  <input
                    type="text"
                    placeholder="Enter Middle Name"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              {/* Biometric Uploads */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Upload Biometric Samples</h3>
                  <div className="p-1 bg-slate-100 rounded-full text-slate-400"><Info size={12} /></div>
                </div>

                <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    {['LEFT', 'RIGHT', 'FRONT', 'UPWARD', 'DOWNWARD'].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => handleUpload(pos)}
                        className={`aspect-square rounded-3xl border-2 transition-all flex flex-col items-center justify-center p-4 relative group overflow-hidden ${uploads[pos] ? 'border-primary bg-primary-50/50 shadow-md' : 'border-white bg-white hover:border-primary-300 shadow-sm'
                          }`}
                      >
                        {uploads[pos] ? (
                          <>
                            <img src={uploads[pos]!} className="absolute inset-0 w-full h-full object-cover" alt={pos} />
                            <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <RefreshCcw className="text-white" size={32} />
                            </div>
                          </>
                        ) : (
                          <>
                            <CloudUpload size={36} className="text-slate-200 mb-3 group-hover:text-primary transition-all" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center group-hover:text-primary">{pos} PROFILE</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col gap-4">
              <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100/50 flex items-start gap-3">
                <ShieldCheck size={18} className="text-primary mt-0.5" />
                <p className="text-[11px] text-primary-700 leading-relaxed font-medium">By clicking register, you confirm that all biometric data collected is handled in compliance with factory privacy policies and data encryption standards.</p>
              </div>
              <button className="w-full py-5 bg-[#1a1c3d] text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-[#0f1128] transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]">
                <UserPlus size={20} /> REGISTER & SYNC TO NODES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};