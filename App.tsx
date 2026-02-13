import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PageType } from './types';
import { Login } from './pages/Login';
import { ExecutiveOverview } from './pages/ExecutiveOverview';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { ActiveIncidents } from './pages/ActiveIncidents';
import { PastIncidents } from './pages/PastIncidents';
import { AnalyticsPPE } from './pages/AnalyticsPPE';
import { SettingsUsers } from './pages/SettingsUsers';
import { AnalyticsFire } from './pages/AnalyticsFire';
import { AnalyticsPeople } from './pages/AnalyticsPeople';
import { AnalyticsRootCause } from './pages/AnalyticsRootCause';
import { SOPLibrary } from './pages/SOPLibrary';
import { CameraManagement } from './pages/CameraManagement';
import { ZoneConfiguration } from './pages/ZoneConfiguration';
import { PersonDirectory } from './pages/PersonDirectory';
import { SettingsAudit } from './pages/SettingsAudit';
import { SettingsSLA } from './pages/SettingsSLA';
import { SettingsWorkflow } from './pages/SettingsWorkflow';
import { IncidentsFalse } from './pages/IncidentsFalse';
import { AnalyticsOverview } from './pages/AnalyticsOverview';
import { IncidentDetail } from './pages/IncidentDetail';
import { EmergencyResponse } from './pages/EmergencyResponse';
import { AnalyticsOvercrowding } from './pages/AnalyticsOvercrowding';
import { AnalyticsViolence } from './pages/AnalyticsViolence';
import { AnalyticsIdentity } from './pages/AnalyticsIdentity';
import { HeadcountConfig } from './pages/HeadcountConfig';
import { ReportsStandard } from './pages/ReportsStandard';
import { ReportsAudit } from './pages/ReportsAudit';
import { FaceEnrollment } from './pages/FaceEnrollment';
import { AllIncidents } from './pages/AllIncidents';
import { ProductOverview } from './pages/ProductOverview';
import { SITE_HIERARCHY } from './constants';

const PlaceholderPage: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 animate-pulse">
    <h1 className="text-2xl font-semibold uppercase tracking-widest mb-2">{name}</h1>
    <p className="text-sm font-medium">Enterprise Module Configuration in Progress</p>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<PageType>(PageType.DASHBOARD_EXECUTIVE);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Global Filter State
  const [currentSite, setCurrentSite] = useState(SITE_HIERARCHY[0].sites[0].name); // Default: Mundra Port
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentShift, setCurrentShift] = useState('Shift A');

  // Emergency Response State
  const [activeEmergency, setActiveEmergency] = useState<{ type: string, zone: string } | null>(null);
  const [eventHistory, setEventHistory] = useState<any[]>([]);

  // Initial App Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNavigateToDetail = (id: string) => {
    setSelectedIncidentId(id);
    setActivePage(PageType.INCIDENTS_DETAIL);
  };

  const handleEmergencyRespond = useCallback((eventData: { type: string, zone: string }) => {
    setActiveEmergency(eventData);
    setActivePage(PageType.EMERGENCY_RESPONSE);
  }, []);

  const addToHistory = useCallback((event: any) => {
    setEventHistory(prev => [event, ...prev].slice(0, 15));
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case PageType.DASHBOARD_EXECUTIVE:
        return (
          <ExecutiveOverview
            onRespond={handleEmergencyRespond}
            onEventComplete={addToHistory}
            currentSite={currentSite}
            startDate={startDate}
            endDate={endDate}
            currentShift={currentShift}
          />
        );
      case PageType.DASHBOARD_LIVE:
        return <LiveMonitoring />;
      case PageType.PRODUCT_OVERVIEW:
        return <ProductOverview />;
      case PageType.INCIDENTS_ACTIVE:
        return <ActiveIncidents onViewDetail={handleNavigateToDetail} />;
      case PageType.INCIDENTS_PAST:
        return <PastIncidents onViewDetail={handleNavigateToDetail} />;
      case PageType.INCIDENTS_DETAIL:
        return <IncidentDetail incidentId={selectedIncidentId} onBack={() => setActivePage(PageType.INCIDENTS_ACTIVE)} />;
      case PageType.EMERGENCY_RESPONSE:
        return <EmergencyResponse event={activeEmergency} onBack={() => setActivePage(PageType.DASHBOARD_EXECUTIVE)} />;
      case PageType.INCIDENTS_FALSE:
        return <IncidentsFalse />;
      case PageType.ANALYTICS_OVERVIEW:
        return <AnalyticsOverview />;
      case PageType.ANALYTICS_PPE:
        return <AnalyticsPPE />;
      case PageType.ANALYTICS_FIRE:
        return <AnalyticsFire />;
      case PageType.ANALYTICS_OVERCROWDING:
        return <AnalyticsOvercrowding />;
      case PageType.ANALYTICS_VIOLENCE:
        return <AnalyticsViolence />;
      case PageType.ANALYTICS_IDENTITY:
        return <AnalyticsIdentity />;
      case PageType.ANALYTICS_PEOPLE:
        return <AnalyticsPeople />;
      case PageType.ANALYTICS_ROOT_CAUSE:
        return <AnalyticsRootCause />;
      case PageType.SOP_LIBRARY:
        return <SOPLibrary />;
      case PageType.CAMERAS_MGMT:
        return <CameraManagement />;
      case PageType.ZONES_CONFIG:
        return <ZoneConfiguration />;
      case PageType.PEOPLE_DIR:
        return <PersonDirectory />;
      case PageType.PEOPLE_HEADCOUNT:
        return <HeadcountConfig />;
      case PageType.SETTINGS_SLA:
        return <SettingsSLA />;
      case PageType.SETTINGS_WORKFLOW:
        return <SettingsWorkflow />;
      case PageType.SETTINGS_USERS:
        return <SettingsUsers />;
      case PageType.SETTINGS_AUDIT:
        return <SettingsAudit />;
      case PageType.REPORTS_STANDARD:
        return <ReportsStandard />;
      case PageType.REPORTS_AUDIT:
        return <ReportsAudit />;
      case PageType.FACE_ENROLLMENT:
        return <FaceEnrollment />;
      case PageType.ALL_INCIDENTS:
        return <AllIncidents onViewDetail={handleNavigateToDetail} />;
      default:
        return <PlaceholderPage name={activePage.replace(/-/g, ' ')} />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-white font-semibold tracking-widest animate-pulse font-mono tracking-[0.2em]">Initialising iSafetyRobo System...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const isProductOverview = activePage === PageType.PRODUCT_OVERVIEW;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 selection:bg-primary-100">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {!isProductOverview && (
          <Header
            onLogout={handleLogout}
            eventHistory={eventHistory}
            onViewEvent={handleEmergencyRespond}
            onViewIncident={handleNavigateToDetail}
            currentSite={currentSite}
            setCurrentSite={setCurrentSite}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            currentShift={currentShift}
            setCurrentShift={setCurrentShift}
          />
        )}

        <main className={`flex-1 overflow-y-auto ${isProductOverview ? 'p-0 bg-black' : 'p-8'} no-scrollbar`}>
          <div className={isProductOverview ? "h-full" : "max-w-[1600px] mx-auto pb-12"}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;