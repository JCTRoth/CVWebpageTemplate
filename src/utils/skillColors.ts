import skillsData from '../data/skills.json';

/**
 * Palette of distinct, accessible Tailwind colors.
 * Each skill gets a unique strong, powerful color, with pastel variants available later.
 * We provide vibrant, bold colors for maximum visual impact and uniqueness.
 */
export interface PaletteEntry {
  name: string;
  dot: string;
  ring: string;
  selectedRing?: string;
  borderStrong?: string;
  borderHover?: string;
  badgeHoverBg?: string;
  chipBg?: string;
  chipText?: string;
  chipBorder?: string;
  chipHoverBg?: string;
}

export const palette: PaletteEntry[] = [
  // .NET Ecosystem - Electric Blue
  {
    name: '.net',
    dot: 'bg-blue-700 dark:bg-blue-600',
    ring: 'focus-visible:ring-blue-600',
    selectedRing: 'ring-4 ring-blue-500/40',
    borderStrong: '!border-blue-800 dark:!border-blue-700',
    borderHover: 'hover:border-blue-700 dark:hover:border-blue-600',
    badgeHoverBg: 'hover:bg-blue-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-blue-700/12 dark:bg-blue-600/25',
    chipText: 'text-blue-800 dark:text-blue-100',
    chipBorder: 'border-blue-500/50',
    chipHoverBg: 'hover:bg-blue-700/25 dark:hover:bg-blue-600/35',
  },
  // C# - Royal Blue
  {
    name: 'c#',
    dot: 'bg-blue-800 dark:bg-blue-700',
    ring: 'focus-visible:ring-blue-700',
    selectedRing: 'ring-4 ring-blue-600/40',
    borderStrong: '!border-blue-900 dark:!border-blue-800',
    borderHover: 'hover:border-blue-800 dark:hover:border-blue-700',
    badgeHoverBg: 'hover:bg-blue-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-blue-800/12 dark:bg-blue-700/25',
    chipText: 'text-blue-900 dark:text-blue-100',
    chipBorder: 'border-blue-600/50',
    chipHoverBg: 'hover:bg-blue-800/25 dark:hover:bg-blue-700/35',
  },
  // ASP.NET - Deep Navy
  {
    name: 'asp.net',
    dot: 'bg-indigo-800 dark:bg-indigo-700',
    ring: 'focus-visible:ring-indigo-700',
    selectedRing: 'ring-4 ring-indigo-600/40',
    borderStrong: '!border-indigo-900 dark:!border-indigo-800',
    borderHover: 'hover:border-indigo-800 dark:hover:border-indigo-700',
    badgeHoverBg: 'hover:bg-indigo-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-indigo-800/12 dark:bg-indigo-700/25',
    chipText: 'text-indigo-900 dark:text-indigo-100',
    chipBorder: 'border-indigo-600/50',
    chipHoverBg: 'hover:bg-indigo-800/25 dark:hover:bg-indigo-700/35',
  },
  // Entity Framework - Steel Gray
  {
    name: 'entityframework',
    dot: 'bg-slate-700 dark:bg-slate-600',
    ring: 'focus-visible:ring-slate-600',
    selectedRing: 'ring-4 ring-slate-500/40',
    borderStrong: '!border-slate-800 dark:!border-slate-700',
    borderHover: 'hover:border-slate-700 dark:hover:border-slate-600',
    badgeHoverBg: 'hover:bg-slate-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-slate-700/12 dark:bg-slate-600/25',
    chipText: 'text-slate-800 dark:text-slate-100',
    chipBorder: 'border-slate-500/50',
    chipHoverBg: 'hover:bg-slate-700/25 dark:hover:bg-slate-600/35',
  },
  // Java - Crimson Red
  {
    name: 'java',
    dot: 'bg-red-700 dark:bg-red-600',
    ring: 'focus-visible:ring-red-600',
    selectedRing: 'ring-4 ring-red-500/40',
    borderStrong: '!border-red-800 dark:!border-red-700',
    borderHover: 'hover:border-red-700 dark:hover:border-red-600',
    badgeHoverBg: 'hover:bg-red-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-red-700/12 dark:bg-red-600/25',
    chipText: 'text-red-800 dark:text-red-100',
    chipBorder: 'border-red-500/50',
    chipHoverBg: 'hover:bg-red-700/25 dark:hover:bg-red-600/35',
  },
  // JavaFX - Scarlet
  {
    name: 'javafx',
    dot: 'bg-red-800 dark:bg-red-700',
    ring: 'focus-visible:ring-red-700',
    selectedRing: 'ring-4 ring-red-600/40',
    borderStrong: '!border-red-900 dark:!border-red-800',
    borderHover: 'hover:border-red-800 dark:hover:border-red-700',
    badgeHoverBg: 'hover:bg-red-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-red-800/12 dark:bg-red-700/25',
    chipText: 'text-red-900 dark:text-red-100',
    chipBorder: 'border-red-600/50',
    chipHoverBg: 'hover:bg-red-800/25 dark:hover:bg-red-700/35',
  },
  // JavaScript - Golden Amber
  {
    name: 'javascript',
    dot: 'bg-amber-600 dark:bg-amber-500',
    ring: 'focus-visible:ring-amber-500',
    selectedRing: 'ring-4 ring-amber-400/40',
    borderStrong: '!border-amber-700 dark:!border-amber-600',
    borderHover: 'hover:border-amber-600 dark:hover:border-amber-500',
    badgeHoverBg: 'hover:bg-amber-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-amber-600/12 dark:bg-amber-500/25',
    chipText: 'text-amber-700 dark:text-amber-200',
    chipBorder: 'border-amber-400/50',
    chipHoverBg: 'hover:bg-amber-600/25 dark:hover:bg-amber-500/35',
  },
  // TypeScript - Sapphire Blue
  {
    name: 'typescript',
    dot: 'bg-blue-900 dark:bg-blue-800',
    ring: 'focus-visible:ring-blue-800',
    selectedRing: 'ring-4 ring-blue-700/40',
    borderStrong: '!border-blue-950 dark:!border-blue-900',
    borderHover: 'hover:border-blue-900 dark:hover:border-blue-800',
    badgeHoverBg: 'hover:bg-blue-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-blue-900/12 dark:bg-blue-800/25',
    chipText: 'text-blue-950 dark:text-blue-100',
    chipBorder: 'border-blue-700/50',
    chipHoverBg: 'hover:bg-blue-900/25 dark:hover:bg-blue-800/35',
  },
  // React - Electric Cyan
  {
    name: 'react',
    dot: 'bg-cyan-600 dark:bg-cyan-500',
    ring: 'focus-visible:ring-cyan-500',
    selectedRing: 'ring-4 ring-cyan-400/40',
    borderStrong: '!border-cyan-700 dark:!border-cyan-600',
    borderHover: 'hover:border-cyan-600 dark:hover:border-cyan-500',
    badgeHoverBg: 'hover:bg-cyan-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-cyan-600/12 dark:bg-cyan-500/25',
    chipText: 'text-cyan-700 dark:text-cyan-200',
    chipBorder: 'border-cyan-400/50',
    chipHoverBg: 'hover:bg-cyan-600/25 dark:hover:bg-cyan-500/35',
  },
  // Python - Forest Green
  {
    name: 'python',
    dot: 'bg-green-700 dark:bg-green-600',
    ring: 'focus-visible:ring-green-600',
    selectedRing: 'ring-4 ring-green-500/40',
    borderStrong: '!border-green-800 dark:!border-green-700',
    borderHover: 'hover:border-green-700 dark:hover:border-green-600',
    badgeHoverBg: 'hover:bg-green-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-green-700/12 dark:bg-green-600/25',
    chipText: 'text-green-800 dark:text-green-100',
    chipBorder: 'border-green-500/50',
    chipHoverBg: 'hover:bg-green-700/25 dark:hover:bg-green-600/35',
  },
  // Docker - Midnight Blue
  {
    name: 'docker',
    dot: 'bg-blue-950 dark:bg-blue-900',
    ring: 'focus-visible:ring-blue-900',
    selectedRing: 'ring-4 ring-blue-800/40',
    borderStrong: '!border-blue-950 dark:!border-blue-950',
    borderHover: 'hover:border-blue-950 dark:hover:border-blue-900',
    badgeHoverBg: 'hover:bg-blue-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-blue-950/12 dark:bg-blue-900/25',
    chipText: 'text-blue-950 dark:text-blue-100',
    chipBorder: 'border-blue-800/50',
    chipHoverBg: 'hover:bg-blue-950/25 dark:hover:bg-blue-900/35',
  },
  // Kubernetes - Imperial Purple
  {
    name: 'kubernetes',
    dot: 'bg-purple-800 dark:bg-purple-700',
    ring: 'focus-visible:ring-purple-700',
    selectedRing: 'ring-4 ring-purple-600/40',
    borderStrong: '!border-purple-900 dark:!border-purple-800',
    borderHover: 'hover:border-purple-800 dark:hover:border-purple-700',
    badgeHoverBg: 'hover:bg-purple-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-purple-800/12 dark:bg-purple-700/25',
    chipText: 'text-purple-900 dark:text-purple-100',
    chipBorder: 'border-purple-600/50',
    chipHoverBg: 'hover:bg-purple-800/25 dark:hover:bg-purple-700/35',
  },
  // GraphQL - Hot Pink
  {
    name: 'graphql',
    dot: 'bg-pink-700 dark:bg-pink-600',
    ring: 'focus-visible:ring-pink-600',
    selectedRing: 'ring-4 ring-pink-500/40',
    borderStrong: '!border-pink-800 dark:!border-pink-700',
    borderHover: 'hover:border-pink-700 dark:hover:border-pink-600',
    badgeHoverBg: 'hover:bg-pink-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-pink-700/12 dark:bg-pink-600/25',
    chipText: 'text-pink-800 dark:text-pink-100',
    chipBorder: 'border-pink-500/50',
    chipHoverBg: 'hover:bg-pink-700/25 dark:hover:bg-pink-600/35',
  },
  // PostgreSQL - Deep Teal
  {
    name: 'postgresql',
    dot: 'bg-teal-700 dark:bg-teal-600',
    ring: 'focus-visible:ring-teal-600',
    selectedRing: 'ring-4 ring-teal-500/40',
    borderStrong: '!border-teal-800 dark:!border-teal-700',
    borderHover: 'hover:border-teal-700 dark:hover:border-teal-600',
    badgeHoverBg: 'hover:bg-teal-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-teal-700/12 dark:bg-teal-600/25',
    chipText: 'text-teal-800 dark:text-teal-100',
    chipBorder: 'border-teal-500/50',
    chipHoverBg: 'hover:bg-teal-700/25 dark:hover:bg-teal-600/35',
  },
  // MySQL - Royal Purple
  {
    name: 'mysql',
    dot: 'bg-purple-700 dark:bg-purple-600',
    ring: 'focus-visible:ring-purple-600',
    selectedRing: 'ring-4 ring-purple-500/40',
    borderStrong: '!border-purple-800 dark:!border-purple-700',
    borderHover: 'hover:border-purple-700 dark:hover:border-purple-600',
    badgeHoverBg: 'hover:bg-purple-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-purple-700/12 dark:bg-purple-600/25',
    chipText: 'text-purple-800 dark:text-purple-100',
    chipBorder: 'border-purple-500/50',
    chipHoverBg: 'hover:bg-purple-700/25 dark:hover:bg-purple-600/35',
  },
  // Linux - Burnt Orange
  {
    name: 'linux',
    dot: 'bg-orange-700 dark:bg-orange-600',
    ring: 'focus-visible:ring-orange-600',
    selectedRing: 'ring-4 ring-orange-500/40',
    borderStrong: '!border-orange-800 dark:!border-orange-700',
    borderHover: 'hover:border-orange-700 dark:hover:border-orange-600',
    badgeHoverBg: 'hover:bg-orange-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-orange-700/12 dark:bg-orange-600/25',
    chipText: 'text-orange-800 dark:text-orange-100',
    chipBorder: 'border-orange-500/50',
    chipHoverBg: 'hover:bg-orange-700/25 dark:hover:bg-orange-600/35',
  },
  // JWT Authentication - Electric Violet
  {
    name: 'jwtauthentication',
    dot: 'bg-violet-700 dark:bg-violet-600',
    ring: 'focus-visible:ring-violet-600',
    selectedRing: 'ring-4 ring-violet-500/40',
    borderStrong: '!border-violet-800 dark:!border-violet-700',
    borderHover: 'hover:border-violet-700 dark:hover:border-violet-600',
    badgeHoverBg: 'hover:bg-violet-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-violet-700/12 dark:bg-violet-600/25',
    chipText: 'text-violet-800 dark:text-violet-100',
    chipBorder: 'border-violet-500/50',
    chipHoverBg: 'hover:bg-violet-700/25 dark:hover:bg-violet-600/35',
  },
  // Tailwind CSS - Ocean Blue
  {
    name: 'tailwindcss',
    dot: 'bg-sky-600 dark:bg-sky-500',
    ring: 'focus-visible:ring-sky-500',
    selectedRing: 'ring-4 ring-sky-400/40',
    borderStrong: '!border-sky-700 dark:!border-sky-600',
    borderHover: 'hover:border-sky-600 dark:hover:border-sky-500',
    badgeHoverBg: 'hover:bg-sky-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-sky-600/12 dark:bg-sky-500/25',
    chipText: 'text-sky-700 dark:text-sky-200',
    chipBorder: 'border-sky-400/50',
    chipHoverBg: 'hover:bg-sky-600/25 dark:hover:bg-sky-500/35',
  },
  // Vite - Electric Lime
  {
    name: 'vite',
    dot: 'bg-lime-700 dark:bg-lime-600',
    ring: 'focus-visible:ring-lime-600',
    selectedRing: 'ring-4 ring-lime-500/40',
    borderStrong: '!border-lime-800 dark:!border-lime-700',
    borderHover: 'hover:border-lime-700 dark:hover:border-lime-600',
    badgeHoverBg: 'hover:bg-lime-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-lime-700/12 dark:bg-lime-600/25',
    chipText: 'text-lime-800 dark:text-lime-100',
    chipBorder: 'border-lime-500/50',
    chipHoverBg: 'hover:bg-lime-700/25 dark:hover:bg-lime-600/35',
  },
  // Zustand - Emerald Green
  {
    name: 'zustand',
    dot: 'bg-emerald-700 dark:bg-emerald-600',
    ring: 'focus-visible:ring-emerald-600',
    selectedRing: 'ring-4 ring-emerald-500/40',
    borderStrong: '!border-emerald-800 dark:!border-emerald-700',
    borderHover: 'hover:border-emerald-700 dark:hover:border-emerald-600',
    badgeHoverBg: 'hover:bg-emerald-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-emerald-700/12 dark:bg-emerald-600/25',
    chipText: 'text-emerald-800 dark:text-emerald-100',
    chipBorder: 'border-emerald-500/50',
    chipHoverBg: 'hover:bg-emerald-700/25 dark:hover:bg-emerald-600/35',
  },
  // SignalR - Magenta
  {
    name: 'signalr',
    dot: 'bg-fuchsia-700 dark:bg-fuchsia-600',
    ring: 'focus-visible:ring-fuchsia-600',
    selectedRing: 'ring-4 ring-fuchsia-500/40',
    borderStrong: '!border-fuchsia-800 dark:!border-fuchsia-700',
    borderHover: 'hover:border-fuchsia-700 dark:hover:border-fuchsia-600',
    badgeHoverBg: 'hover:bg-fuchsia-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-fuchsia-700/12 dark:bg-fuchsia-600/25',
    chipText: 'text-fuchsia-800 dark:text-fuchsia-100',
    chipBorder: 'border-fuchsia-500/50',
    chipHoverBg: 'hover:bg-fuchsia-700/25 dark:hover:bg-fuchsia-600/35',
  },
  // AI - Crimson Rose
  {
    name: 'ai',
    dot: 'bg-rose-700 dark:bg-rose-600',
    ring: 'focus-visible:ring-rose-600',
    selectedRing: 'ring-4 ring-rose-500/40',
    borderStrong: '!border-rose-800 dark:!border-rose-700',
    borderHover: 'hover:border-rose-700 dark:hover:border-rose-600',
    badgeHoverBg: 'hover:bg-rose-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-rose-700/12 dark:bg-rose-600/25',
    chipText: 'text-rose-800 dark:text-rose-100',
    chipBorder: 'border-rose-500/50',
    chipHoverBg: 'hover:bg-rose-700/25 dark:hover:bg-rose-600/35',
  },
  // Machine Learning - Golden Amber
  {
    name: 'machinelearning',
    dot: 'bg-amber-700 dark:bg-amber-600',
    ring: 'focus-visible:ring-amber-600',
    selectedRing: 'ring-4 ring-amber-500/40',
    borderStrong: '!border-amber-800 dark:!border-amber-700',
    borderHover: 'hover:border-amber-700 dark:hover:border-amber-600',
    badgeHoverBg: 'hover:bg-amber-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-amber-700/12 dark:bg-amber-600/25',
    chipText: 'text-amber-800 dark:text-amber-100',
    chipBorder: 'border-amber-500/50',
    chipHoverBg: 'hover:bg-amber-700/25 dark:hover:bg-amber-600/35',
  },
  // Shell Scripting - Charcoal Gray
  {
    name: 'shellscripting',
    dot: 'bg-stone-800 dark:bg-stone-700',
    ring: 'focus-visible:ring-stone-700',
    selectedRing: 'ring-4 ring-stone-600/40',
    borderStrong: '!border-stone-900 dark:!border-stone-800',
    borderHover: 'hover:border-stone-800 dark:hover:border-stone-700',
    badgeHoverBg: 'hover:bg-stone-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-stone-800/12 dark:bg-stone-700/25',
    chipText: 'text-stone-900 dark:text-stone-100',
    chipBorder: 'border-stone-600/50',
    chipHoverBg: 'hover:bg-stone-800/25 dark:hover:bg-stone-700/35',
  },
  // System Administration - Zinc Gray
  {
    name: 'systemadministration',
    dot: 'bg-zinc-700 dark:bg-zinc-600',
    ring: 'focus-visible:ring-zinc-600',
    selectedRing: 'ring-4 ring-zinc-500/40',
    borderStrong: '!border-zinc-800 dark:!border-zinc-700',
    borderHover: 'hover:border-zinc-700 dark:hover:border-zinc-600',
    badgeHoverBg: 'hover:bg-zinc-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-zinc-700/12 dark:bg-zinc-600/25',
    chipText: 'text-zinc-800 dark:text-zinc-100',
    chipBorder: 'border-zinc-500/50',
    chipHoverBg: 'hover:bg-zinc-700/25 dark:hover:bg-zinc-600/35',
  },
  // White (for CSS)
  {
    name: 'white',
    dot: 'bg-white dark:bg-gray-100',
    ring: 'focus-visible:ring-gray-500',
    selectedRing: 'ring-4 ring-gray-400/30',
    borderStrong: '!border-gray-600 dark:!border-gray-500',
    borderHover: 'hover:border-gray-500 dark:hover:border-gray-300',
    badgeHoverBg: 'hover:bg-gray-50/60 dark:hover:bg-slate-700',
    chipBg: 'bg-gray-600/10 dark:bg-gray-400/20',
    chipText: 'text-gray-700 dark:text-gray-200',
    chipBorder: 'border-gray-400/40',
    chipHoverBg: 'hover:bg-gray-600/20 dark:hover:bg-gray-400/30',
  },
  // Spring - Bright Green
  {
    name: 'spring',
    dot: 'bg-green-600 dark:bg-green-500',
    ring: 'focus-visible:ring-green-500',
    selectedRing: 'ring-4 ring-green-400/40',
    borderStrong: '!border-green-700 dark:!border-green-600',
    borderHover: 'hover:border-green-600 dark:hover:border-green-500',
    badgeHoverBg: 'hover:bg-green-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-green-600/12 dark:bg-green-500/25',
    chipText: 'text-green-700 dark:text-green-100',
    chipBorder: 'border-green-400/50',
    chipHoverBg: 'hover:bg-green-600/25 dark:hover:bg-green-500/35',
  },
  // SQLite - Navy Blue
  {
    name: 'sqlite',
    dot: 'bg-blue-800 dark:bg-blue-700',
    ring: 'focus-visible:ring-blue-700',
    selectedRing: 'ring-4 ring-blue-600/40',
    borderStrong: '!border-blue-900 dark:!border-blue-800',
    borderHover: 'hover:border-blue-800 dark:hover:border-blue-700',
    badgeHoverBg: 'hover:bg-blue-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-blue-800/12 dark:bg-blue-700/25',
    chipText: 'text-blue-900 dark:text-blue-100',
    chipBorder: 'border-blue-600/50',
    chipHoverBg: 'hover:bg-blue-800/25 dark:hover:bg-blue-700/35',
  },
  // CI/CD - Indigo
  {
    name: 'ci/cd',
    dot: 'bg-indigo-600 dark:bg-indigo-500',
    ring: 'focus-visible:ring-indigo-500',
    selectedRing: 'ring-4 ring-indigo-400/40',
    borderStrong: '!border-indigo-700 dark:!border-indigo-600',
    borderHover: 'hover:border-indigo-600 dark:hover:border-indigo-500',
    badgeHoverBg: 'hover:bg-indigo-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-indigo-600/12 dark:bg-indigo-500/25',
    chipText: 'text-indigo-700 dark:text-indigo-100',
    chipBorder: 'border-indigo-400/50',
    chipHoverBg: 'hover:bg-indigo-600/25 dark:hover:bg-indigo-500/35',
  },
  // Docker Swarm - Deep Blue
  {
    name: 'dockerswarm',
    dot: 'bg-blue-900 dark:bg-blue-800',
    ring: 'focus-visible:ring-blue-800',
    selectedRing: 'ring-4 ring-blue-700/40',
    borderStrong: '!border-blue-950 dark:!border-blue-900',
    borderHover: 'hover:border-blue-900 dark:hover:border-blue-800',
    badgeHoverBg: 'hover:bg-blue-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-blue-900/12 dark:bg-blue-800/25',
    chipText: 'text-blue-950 dark:text-blue-100',
    chipBorder: 'border-blue-700/50',
    chipHoverBg: 'hover:bg-blue-900/25 dark:hover:bg-blue-800/35',
  },
  // ServiceNow - Professional Blue-Gray
  {
    name: 'servicenow',
    dot: 'bg-slate-600 dark:bg-slate-500',
    ring: 'focus-visible:ring-slate-500',
    selectedRing: 'ring-4 ring-slate-400/40',
    borderStrong: '!border-slate-700 dark:!border-slate-600',
    borderHover: 'hover:border-slate-600 dark:hover:border-slate-500',
    badgeHoverBg: 'hover:bg-slate-50/70 dark:hover:bg-slate-700',
    chipBg: 'bg-slate-600/12 dark:bg-slate-500/25',
    chipText: 'text-slate-700 dark:text-slate-200',
    chipBorder: 'border-slate-400/50',
    chipHoverBg: 'hover:bg-slate-600/25 dark:hover:bg-slate-500/35',
  },
];

// Map skills to palette entry - assign unique colors to each skill
const skillToPalette = new Map<string, PaletteEntry>();

// Manual color overrides for specific skills
const manualOverrides: Record<string, string> = {
  'Java': 'rose',      // red
  'Maven': 'amber',    // yellow
  'C#': 'orange',      // orange
  'csharp': 'orange',  // also handle lowercase
  'CSS': 'white',      // white
  'css': 'white',      // also handle lowercase
};

// Collect all unique skills
const allSkills = new Set<string>();
(skillsData.groups || []).forEach((group: string[]) => {
  group.forEach((s) => allSkills.add(s));
});

// First, assign manual overrides
Object.entries(manualOverrides).forEach(([skill, colorName]) => {
  const color = palette.find(p => p.name === colorName);
  if (color) {
    skillToPalette.set(skill, color);
    allSkills.delete(skill); // Remove from round-robin assignment
  }
});

// Then assign colors in round-robin fashion to remaining skills
let colorIndex = 0;
allSkills.forEach((skill) => {
  skillToPalette.set(skill, palette[colorIndex % palette.length]);
  colorIndex++;
});

const DEFAULT_DOT = 'bg-primary-500 dark:bg-primary-400';
const DEFAULT_RING = 'focus-visible:ring-primary-500';
const DEFAULT_SELECTED_RING = 'ring-4 ring-primary-400/30';
const DEFAULT_BORDER_STRONG = '!border-primary-600 dark:!border-primary-500';
const DEFAULT_BORDER_HOVER = 'hover:border-primary-500 dark:hover:border-primary-300';
const DEFAULT_BADGE_HOVER_BG = 'hover:bg-primary-50/60 dark:hover:bg-slate-700';
const DEFAULT_CHIP_BG = 'bg-primary-600/10 dark:bg-primary-400/20';
const DEFAULT_CHIP_TEXT = 'text-primary-700 dark:text-primary-200';
const DEFAULT_CHIP_BORDER = 'border-primary-400/40';
const DEFAULT_CHIP_HOVER_BG = 'hover:bg-primary-600/20 dark:hover:bg-primary-400/30';

export function getSkillPalette(skill: string): PaletteEntry | undefined {
  return skillToPalette.get(skill);
}

export function getSkillDotClasses(skill: string): string {
  return skillToPalette.get(skill)?.dot ?? DEFAULT_DOT;
}

export function getSkillRingClass(skill: string): string {
  if (!skill) return DEFAULT_RING;
  const normalized = skill.trim().toLowerCase();
  // First try exact palette entry
  const byName = palette.find((p) => p.name === normalized || p.name === normalized.replace(/\s+/g, ''));
  if (byName) return byName.ring ?? DEFAULT_RING;
  // Try to match by skills.json canonical entries
  for (const grp of skillsData.groups || []) {
    for (const item of grp) {
      if (item.toLowerCase() === normalized) {
        const found = palette.find((pp) => pp.name === item.toLowerCase());
        if (found) return found.ring ?? DEFAULT_RING;
      }
    }
  }
  // Try substring match against palette names
  for (const p of palette) {
    if (normalized.includes(p.name)) return p.ring ?? DEFAULT_RING;
  }
  return DEFAULT_RING;
}

// Export helpers for other components that expect specific classes
export function getSkillBorderStrong(skill: string): string {
  return skillToPalette.get(skill)?.borderStrong ?? DEFAULT_BORDER_STRONG;
}

export function getSkillBorderHover(skill: string): string {
  return skillToPalette.get(skill)?.borderHover ?? DEFAULT_BORDER_HOVER;
}

export function getSkillBadgeHoverBg(skill: string): string {
  return skillToPalette.get(skill)?.badgeHoverBg ?? DEFAULT_BADGE_HOVER_BG;
}

export function getSkillSelectedRing(skill: string): string {
  return skillToPalette.get(skill)?.selectedRing ?? DEFAULT_SELECTED_RING;
}

export function getSkillChipClasses(skill: string): string {
  const p = skillToPalette.get(skill);
  if (!p) {
    return [DEFAULT_CHIP_BG, DEFAULT_CHIP_TEXT, DEFAULT_CHIP_BORDER, DEFAULT_CHIP_HOVER_BG].join(' ');
  }
  return [p.chipBg, p.chipText, p.chipBorder, p.chipHoverBg].join(' ');
}
