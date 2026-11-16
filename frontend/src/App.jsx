import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
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

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Network Health</span>
                  <Activity className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">88.4%</span>
                  <span className="text-xs font-medium text-emerald-400">Normal</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">1,482 active supply chain nodes</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Ripple Delay Risk</span>
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">+5.2d</span>
                  <span className="text-xs font-medium text-amber-400">Moderate</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Avg delay propagation impact</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Disruptions</span>
                  <AlertOctagon className="h-4 w-4 text-rose-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">7</span>
                  <span className="text-xs font-medium text-rose-400">3 Critical</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Extracted from global news feeds</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">GNN Multi-Hop Depth</span>
                  <Network className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">3 Hops</span>
                  <span className="text-xs font-medium text-cyan-400">Tier 1 → Tier 3</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">PyTorch Geometric trained</p>
              </div>
            </div>

            {/* Active Tab Content Area */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 min-h-[360px] flex flex-col justify-center items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
                {activeTab === 'dashboard' && <Activity className="h-8 w-8" />}
                {activeTab === 'graph' && <Share2 className="h-8 w-8" />}
                {activeTab === 'predictions' && <TrendingUp className="h-8 w-8" />}
                {activeTab === 'disruptions' && <Radio className="h-8 w-8" />}
                {activeTab !== 'dashboard' && activeTab !== 'graph' && activeTab !== 'predictions' && activeTab !== 'disruptions' && (
                  <Layers className="h-8 w-8" />
                )}
              </div>
              <h2 className="text-lg font-semibold text-white capitalize">
                {activeTab} Module Loaded
              </h2>
              <p className="text-sm text-slate-400 max-w-md mt-1">
                Navbar and Sidebar components are fully responsive and functional. Selecting items in the sidebar updates navigation context and interactive states.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

