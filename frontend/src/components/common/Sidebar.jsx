import React, { useState } from 'react';
import {
  LayoutDashboard,
  Share2,
  TrendingUp,
  Radio,
  Building2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  GitBranch,
  Layers,
  HelpCircle,
  Zap
} from 'lucide-react';

export default function Sidebar({
  activeTab = 'dashboard',
  onSelectTab = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {}
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'graph',
      label: 'Supply Chain Graph',
      icon: Share2,
      badge: 'Interactive'
    },
    {
      id: 'predictions',
      label: 'GNN Delay Ripple',
      icon: TrendingUp,
      badge: 'AI'
    },
    {
      id: 'disruptions',
      label: 'Disruption News Feed',
      icon: Radio,
      badge: 'Live'
    },
    {
      id: 'suppliers',
      label: 'Supplier Directory',
      icon: Building2,
      badge: null
    },
    {
      id: 'analytics',
      label: 'Impact Analytics',
      icon: BarChart3,
      badge: null
    }
  ];

  const secondaryNavItems = [
    {
      id: 'neo4j',
      label: 'Knowledge Graph DB',
      icon: GitBranch,
      badge: null
    },
    {
      id: 'settings',
      label: 'System & Model Config',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-md transition-all duration-300 ease-in-out z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Collapse Toggle */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/60">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Navigation
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`rounded-lg p-1.5 text-slate-400 hover:bg-slate-850 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!isCollapsed && (
            <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Core Modules
            </h3>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/90 to-indigo-700/80 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badge === 'Live'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary System / Config */}
        <div>
          {!isCollapsed && (
            <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Management
            </h3>
          )}
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Live Network Snapshot Card (When Expanded) */}
        {!isCollapsed && (
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-3.5 shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Graph Topology
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-850/60 p-2 border border-slate-800/60">
                <p className="text-[10px] text-slate-400">Total Nodes</p>
                <p className="text-sm font-bold text-slate-100 mt-0.5">1,482</p>
              </div>
              <div className="rounded-lg bg-slate-850/60 p-2 border border-slate-800/60">
                <p className="text-[10px] text-slate-400">Active Edges</p>
                <p className="text-sm font-bold text-slate-100 mt-0.5">4,910</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-lg bg-rose-500/10 px-2.5 py-1.5 border border-rose-500/20">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Critical Delays</span>
              </div>
              <span className="text-xs font-bold text-rose-300">12 Nodes</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        {!isCollapsed ? (
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                WS Live: 60fps
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">v0.1.0</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="relative flex h-2.5 w-2.5" title="WebSocket Live Connected">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

