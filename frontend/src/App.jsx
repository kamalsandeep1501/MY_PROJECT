import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Card, { StatCard } from './components/common/Card';
import {
  Activity,
  AlertOctagon,
  ArrowUpRight,
  Clock,
  Layers,
  Network,
  Radio,
  Share2,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(60);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationNotice, setSimulationNotice] = useState(null);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationNotice(`Simulating multi-hop delay ripple propagation across ${activeTimeline}-day horizon...`);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationNotice(`Simulation completed: 4 Tier-2 suppliers flagged with >5 day delay ripple.`);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Sidebar Navigation */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block shrink-0 h-full`}>
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main App Layout */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activeTimeline={activeTimeline}
          onTimelineChange={setActiveTimeline}
          onRunSimulation={handleRunSimulation}
        />

        {/* Dynamic Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
          <div className="mx-auto max-w-7xl space-y-6">
            
            {/* Simulation Notification Banner */}
            {simulationNotice && (
              <div className="flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200 shadow-lg shadow-indigo-950/40">
                <div className="flex items-center gap-2">
                  <Zap className={`h-4 w-4 text-indigo-400 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{simulationNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimulationNotice(null)}
                  className="text-xs text-indigo-400 hover:text-indigo-200"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Supply Chain Resilience & Delay Ripple
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Real-time Graph Neural Network (GNN) inference & NLP-based disruption forecasting.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300">
                  <Clock className="mr-1.5 h-3.5 w-3.5 text-indigo-400" />
                  Horizon: {activeTimeline} Days
                </span>
              </div>
            </div>

            {/* Quick Metrics Cards using StatCard */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Network Health"
                value="88.4%"
                subtext="1,482 active supply chain nodes"
                delta="Normal"
                deltaType="positive"
                icon={Activity}
                iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              />

              <StatCard
                title="Ripple Delay Risk"
                value="+5.2d"
                subtext="Avg delay propagation impact"
                delta="Moderate"
                deltaType="warning"
                icon={TrendingUp}
                iconBg="bg-amber-500/10 text-amber-400 border-amber-500/20"
              />

              <StatCard
                title="Active Disruptions"
                value="7"
                subtext="Extracted from global news feeds"
                delta="3 Critical"
                deltaType="negative"
                icon={AlertOctagon}
                iconBg="bg-rose-500/10 text-rose-400 border-rose-500/20"
              />

              <StatCard
                title="GNN Multi-Hop Depth"
                value="3 Hops"
                subtext="PyTorch Geometric trained"
                delta="Tier 1 → Tier 3"
                deltaType="neutral"
                icon={Network}
                iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
              />
            </div>

            {/* Active Tab Content Area using Card */}
            <Card variant="glass" padding="lg" className="min-h-[360px] flex flex-col justify-center items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
                {activeTab === 'dashboard' && <Activity className="h-8 w-8" />}
                {activeTab === 'graph' && <Share2 className="h-8 w-8" />}
                {activeTab === 'predictions' && <TrendingUp className="h-8 w-8" />}
                {activeTab === 'disruptions' && <Radio className="h-8 w-8" />}
                {activeTab !== 'dashboard' && activeTab !== 'graph' && activeTab !== 'predictions' && activeTab !== 'disruptions' && (
                  <Layers className="h-8 w-8" />
                )}
              </div>
              <Card.Title as="h2" className="text-lg font-semibold text-white capitalize justify-center">
                {activeTab} Module Loaded
              </Card.Title>
              <Card.Description className="max-w-md mt-1">
                Navbar, Sidebar, and Card components are fully modular, typed, and integrated into the design system.
              </Card.Description>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}

