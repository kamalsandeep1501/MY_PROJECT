import React, { forwardRef } from 'react';

/**
 * Base Card Component
 * A flexible, themeable container tailored for dark-mode supply chain dashboards.
 */
export const Card = forwardRef(({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  glow = null, // 'indigo' | 'rose' | 'amber' | 'emerald' | 'cyan' | null
  onClick,
  ...props
}, ref) => {
  // Variant styles
  const variants = {
    default: 'bg-slate-900/80 border border-slate-800/80 shadow-md shadow-black/20',
    glass: 'bg-slate-900/50 backdrop-blur-md border border-slate-800/60 shadow-lg shadow-black/30',
    subtle: 'bg-slate-950/60 border border-slate-850/80',
    elevated: 'bg-slate-900 border border-slate-750 shadow-xl shadow-black/40',
    gradient: 'bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/80 shadow-lg',
    danger: 'bg-rose-950/20 border border-rose-500/30 shadow-lg shadow-rose-950/20',
    warning: 'bg-amber-950/20 border border-amber-500/30 shadow-lg shadow-amber-950/20',
    success: 'bg-emerald-950/20 border border-emerald-500/30 shadow-lg shadow-emerald-950/20'
  };

  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-7'
  };

  // Optional glow accents
  const glowStyles = {
    indigo: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:shadow-xl',
    rose: 'hover:border-rose-500/50 hover:shadow-rose-500/10 hover:shadow-xl',
    amber: 'hover:border-amber-500/50 hover:shadow-amber-500/10 hover:shadow-xl',
    emerald: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10 hover:shadow-xl',
    cyan: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:shadow-xl'
  };

  const hoverClass = hover || onClick ? 'transition-all duration-200 hover:-translate-y-0.5 cursor-pointer' : '';
  const selectedGlow = glow && glowStyles[glow] ? glowStyles[glow] : '';

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden ${variants[variant] || variants.default} ${paddings[padding] || paddings.md} ${hoverClass} ${selectedGlow} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header Component
 */
export const CardHeader = forwardRef(({
  children,
  className = '',
  action = null,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-start justify-between gap-4 pb-3 border-b border-slate-800/60 ${className}`}
      {...props}
    >
      <div className="space-y-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

/**
 * Card Title Component
 */
export const CardTitle = forwardRef(({
  children,
  className = '',
  icon: Icon = null,
  iconColor = 'text-indigo-400',
  as: Component = 'h3',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={`text-base font-semibold tracking-tight text-white flex items-center gap-2 ${className}`}
      {...props}
    >
      {Icon && <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />}
      <span>{children}</span>
    </Component>
  );
});

CardTitle.displayName = 'CardTitle';

/**
 * Card Description Component
 */
export const CardDescription = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={`text-xs text-slate-400 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

/**
 * Card Content Component
 */
export const CardContent = forwardRef(({
  children,
  className = '',
  noPadding = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`${noPadding ? '' : 'pt-3'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

/**
 * Card Footer Component
 */
export const CardFooter = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-800/60 text-xs text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

/**
 * Pre-configured Stat / KPI Metric Card for Supply Chain Dashboards
 */
export const StatCard = ({
  title,
  value,
  subtext,
  delta,
  deltaType = 'neutral', // 'positive' | 'negative' | 'warning' | 'neutral'
  icon: Icon,
  iconBg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  className = '',
  onClick,
  ...props
}) => {
  const deltaColors = {
    positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    neutral: 'text-slate-400 bg-slate-800/60 border-slate-700/50'
  };

  return (
    <Card
      variant="gradient"
      padding="md"
      hover={Boolean(onClick)}
      onClick={onClick}
      className={className}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${iconBg}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {value}
        </span>
        {delta && (
          <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-semibold ${deltaColors[deltaType] || deltaColors.neutral}`}>
            {delta}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1.5 text-xs text-slate-400 truncate">
          {subtext}
        </p>
      )}
    </Card>
  );
};

// Compound attachments for dot-notation usage e.g. <Card.Header />
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Stat = StatCard;

export default Card;

