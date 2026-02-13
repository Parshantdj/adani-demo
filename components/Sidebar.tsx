import React, { useState, useEffect } from 'react';
import { NAVIGATION_GROUPS } from '../constants';
import { PageType } from '../types';
import {
  ChevronDown, ChevronRight, Search, ChevronLeft,
  LayoutDashboard, AlertCircle, BarChart3,
  ShieldCheck, Camera, Users, Settings,
  Layers, Disc
} from 'lucide-react';
import LOGO from "../logo.png"

interface SidebarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'Dashboard': <LayoutDashboard size={20} />,
  'Incidents': <AlertCircle size={20} />,
  'Analytics': <BarChart3 size={20} />,
  'SOP & Compliance': <ShieldCheck size={20} />,
  'Cameras & Zones': <Camera size={20} />,
  'People': <Users size={20} />,
  'Settings': <Settings size={20} />,
};

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, collapsed, setCollapsed }) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const activeGroup = NAVIGATION_GROUPS.find(g => g.items.some(i => i.id === activePage));
    if (activeGroup && !collapsed) {
      setOpenGroups(prev => prev.includes(activeGroup.title) ? prev : [...prev, activeGroup.title]);
    }
  }, [activePage, collapsed]);

  const toggleGroup = (title: string) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenGroups([title]);
      return;
    }
    setOpenGroups(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const filteredGroups = NAVIGATION_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(group => group.items.length > 0 || group.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`flex flex-col h-screen bg-sidebar-bg text-slate-300 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'} shadow-2xl z-20 overflow-hidden font-sans border-r border-slate-800`}>
      {/* Brand Header - h-16 for alignment */}
      <div className="h-16 flex items-center justify-between px-5 bg-black/20 relative border-b border-slate-800">
        <div className={`flex items-center overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <img src={LOGO} alt="Logo" className="w-8 " />
          <div className="flex flex-col leading-none whitespace-nowrap">
            <span className="text-[11px] font-semibold mb-0.5 tracking-tight ">Binary Semantics</span>
            <span className="text-lg font-semibold text-white tracking-tight">iSafetyRobo</span>
          </div>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg bg-[#001529]/40 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500 transition-all shadow-sm ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-5 py-4 border-b border-slate-800/50">
          <div className="relative group">
            <input
              type="text"
              placeholder="Quick search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#000c17] border border-slate-700/30 rounded-lg py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
          </div>
        </div>
      )}

      {/* no-scrollbar class added here */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
        {filteredGroups.map((group) => {
          const isOpen = openGroups.includes(group.title) || searchTerm.length > 0;
          const isActiveGroup = group.items.some(i => i.id === activePage);

          return (
            <div key={group.title} className="mb-1">
              <button
                onClick={() => toggleGroup(group.title)}
                className={`w-full flex items-center justify-between px-3 py-3.5 rounded-xl transition-all duration-200 group ${isActiveGroup && collapsed ? 'bg-primary text-white shadow-lg' : 'hover:bg-[#ffffff05]'} ${isOpen && !collapsed ? 'text-white' : 'text-slate-400'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActiveGroup || isOpen ? 'text-primary' : 'text-slate-500'} ${collapsed && isActiveGroup ? 'text-white' : ''}`}>
                    {GROUP_ICONS[group.title] || <Layers size={18} />}
                  </span>
                  {!collapsed && <span className="text-[15px] font-semibold">{group.title}</span>}
                </div>
                {!collapsed && (
                  <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-slate-600'}`}>
                    <ChevronDown size={14} />
                  </span>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="mt-1 space-y-1 relative pl-3 ml-5">
                  {/* Vertical line for the group items */}
                  <div className="absolute left-0 top-0 bottom-4 w-px bg-slate-700/40"></div>

                  {group.items.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`w-full flex items-center justify-between pl-6 pr-4 py-2.5 text-xs rounded-xl transition-all relative ${isActive ? 'bg-primary text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-[#ffffff08]'}`}
                      >
                        {/* Horizontal connecting line */}
                        <div className={`absolute left-0 top-1/2 w-4 h-px ${isActive ? 'bg-primary' : 'bg-slate-700/40'}`}></div>

                        <span className="truncate tracking-tight">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[9px] px-2.5 rounded-md font-black shadow-sm ${item.badge === 'LIVE' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-700 text-slate-300'}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};