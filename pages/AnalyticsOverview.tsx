import React, { useState } from 'react';
import { 
  HardHat, Flame, Users, BarChart3, ScanFace, 
  ShieldAlert
} from 'lucide-react';
import { AnalyticsPPE } from './AnalyticsPPE';
import { AnalyticsFire } from './AnalyticsFire';
import { AnalyticsOvercrowding } from './AnalyticsOvercrowding';
import { AnalyticsViolence } from './AnalyticsViolence';
import { AnalyticsIdentity } from './AnalyticsIdentity';

type AnalyticsModule = 'PPE' | 'FIRE' | 'CROWD' | 'VIOLENCE' | 'IDENTITY';

export const AnalyticsOverview: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AnalyticsModule>('PPE');

  const MODULE_TABS = [
    { id: 'PPE', label: 'PPE Compliance', icon: <HardHat size={16} />, color: 'text-primary', activeBg: 'bg-primary text-white shadow-primary-100' },
    { id: 'FIRE', label: 'Fire & Smoke', icon: <Flame size={16} />, color: 'text-red-600', activeBg: 'bg-red-600 text-white shadow-red-100' },
    { id: 'CROWD', label: 'Overcrowding', icon: <Users size={16} />, color: 'text-orange-600', activeBg: 'bg-orange-600 text-white shadow-orange-100' },
    { id: 'VIOLENCE', label: 'Violence', icon: <ShieldAlert size={16} />, color: 'text-purple-600', activeBg: 'bg-purple-600 text-white shadow-purple-100' },
    { id: 'IDENTITY', label: 'Identity & Access', icon: <ScanFace size={16} />, color: 'text-emerald-600', activeBg: 'bg-emerald-600 text-white shadow-emerald-100' },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'PPE': return <AnalyticsPPE />;
      case 'FIRE': return <AnalyticsFire />;
      case 'CROWD': return <AnalyticsOvercrowding />;
      case 'VIOLENCE': return <AnalyticsViolence />;
      case 'IDENTITY': return <AnalyticsIdentity />;
      default:
        return <AnalyticsPPE />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Compact Module Navigation Widget */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm sticky top-0 z-10 transition-all w-fit">
        <div className="flex flex-wrap gap-1 p-1 bg-slate-100/80 rounded-xl">
          {MODULE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as AnalyticsModule)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                activeModule === tab.id 
                  ? `${tab.activeBg} shadow-md scale-105` 
                  : `text-slate-500 hover:text-slate-800 hover:bg-white/50`
              }`}
            >
              <span className={activeModule === tab.id ? 'text-white' : tab.color}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Module Content */}
      <div className="min-h-[60vh]">
        {renderModuleContent()}
      </div>
    </div>
  );
};