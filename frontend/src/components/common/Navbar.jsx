import React, { useState } from 'react';
import {
  Activity,
  Bell,
  Search,
  SlidersHorizontal,
  Database,
  Cpu,
  Sparkles,
  ChevronDown,
  AlertTriangle,
  Clock,
  ExternalLink,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({
  onToggleSidebar,
  isSidebarOpen,
  activeTimeline = 60,
  onTimelineChange = () => {},
  onRunSimulation = () => {}
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTimelineMenu, setShowTimelineMenu] = useState(false);

  // Sample real-time notifications for supply chain disruptions
  const notifications = [
    {
      id: 1,
      title: 'Port of Rotterdam Congestion',
      type: 'critical',
      time: '12m ago',
      desc: 'Estimated 8.4 day ripple delay across 14 Tier-2 automotive suppliers.'
    },
    {
      id: 2,
      title: 'Semiconductor Lead Time Spike',
      type: 'warning',
      time: '45m ago',
      desc: 'Tier-1 fab in Hsinchu reported 18% capacity throttling.'
    },
    {
      id: 3,
      title: 'GNN Model Re-trained',
      type: 'info',
      time: '2h ago',
      desc: 'Multi-hop delay graph embeddings updated with latest shipping manifests.'
    }
  ];

  const timelineOptions = [30, 60, 90];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Toggle & Brand / Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* AtmoGraph Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
              <Activity className="h-5 w-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
              </span>
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white">
                  Atmo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Graph</span>
                </span>
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                  GNN v1.2
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                Supply Chain Ripple Effect Predictor
              </p>
            </div>
          </div>
        </div>

        {/* Center: Global Graph & Supplier Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search supplier, facility, port or component (e.g. Foxconn, Tier-2)..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900/90 py-1.5 pl-9 pr-12 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
              <kbd className="hidden rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:inline-block">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Pipeline Statuses, Timeline Horizon, Notifications & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Engine Status Badges (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 border-r border-slate-800 pr-3">
            <div className="flex items-center gap-1.5 rounded-md bg-slate-900 px-2.5 py-1 text-xs text-slate-300 border border-slate-800">
              <Database className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">Neo4j:</span>
              <span className="text-[11px] font-semibold text-emerald-400">Connected</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-slate-900 px-2.5 py-1 text-xs text-slate-300 border border-slate-800">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-mono text-[11px]">PyG:</span>
              <span className="text-[11px] font-semibold text-cyan-400">Live</span>
            </div>
          </div>

          {/* Timeline Horizon Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTimelineMenu(!showTimelineMenu)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline text-slate-400">Horizon:</span>
              <span className="font-semibold text-white">{activeTimeline} Days</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showTimelineMenu && (
              <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-xl shadow-black/50 z-50">
                <div className="px-2 py-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Simulation Window
                </div>
                {timelineOptions.map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => {
                      onTimelineChange(days);
                      setShowTimelineMenu(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      activeTimeline === days
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{days} Days Propagation</span>
                    {activeTimeline === days && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Run Prediction Button */}
          <button
            type="button"
            onClick={onRunSimulation}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
            <span className="hidden sm:inline">Simulate Ripple</span>
            <span className="sm:hidden">Run</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg border border-slate-800 bg-slate-900/90 p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-2xl shadow-black/80 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-semibold text-white">Disruption Alerts</span>
                  </div>
                  <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30">
                    3 Active
                  </span>
                </div>

                <div className="mt-2 divide-y divide-slate-800/60 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div key={item.id} className="py-2.5 px-1 hover:bg-slate-850/60 rounded-lg transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium text-slate-200">{item.title}</p>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    <span>View all in Disruption Feed</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User / Org Avatar */}
          <div className="flex items-center pl-1 sm:pl-2 border-l border-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900/60 border border-indigo-700/50 text-xs font-bold text-indigo-300">
              SC
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

