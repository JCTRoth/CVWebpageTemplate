import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import resume from '../data/resume.json';
import personal_photo from '../data/personal_photo.jpg';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
// Removed LOC data flair

/*
 HeroHeader
 - Non-sticky hero that visually shrinks as user scrolls down.
 - Implements parallax: background gradient & noise move slower than foreground.
 - Blur reduction: starts with heavier blur, decreases on scroll.
 - Dynamic color shift: gradient interpolates from deep navy -> bright azure.
 - Noise texture overlay via CSS pseudo-element.
 - Navigation fades in only after threshold shrink.

 Performance considerations:
 - Scroll listener uses requestAnimationFrame to batch updates.
 - Derived progress clamped between 0 and 1 based on a shrinkRange (default 320px scroll).
 - MotionValues drive transforms without re-render for smoother animation.
*/

interface HeroHeaderProps {
  shrinkRange?: number; // Pixels of scroll over which hero shrinks
  minHeight?: number; // Final compact height
  maxHeight?: number; // Initial height
  navFadeThreshold?: number; // progress at which nav fades in
}

// Scroll progress hook (0 -> 1) using RAF throttle; avoids React state by using a MotionValue
function useScrollProgress(range: number) {
  const mv = useMotionValue(0);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const raw = Math.min(scrollYRef.current, range);
      mv.set(raw / range);
    };
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [range, mv]);
  return mv;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  shrinkRange = 320,
  minHeight = 220,
  maxHeight = 400,
  navFadeThreshold = 0.45,
}) => {
  const profile = (resume as any).profile as { name: string; title: string; email?: string; skills: Record<string, string[]> | string[] } | undefined;
  const progress = useScrollProgress(shrinkRange);

  // Measure the actual content height so we can ensure the hero never
  // collapses smaller than the content. We add a small offset for breathing room.
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [measuredContentHeight, setMeasuredContentHeight] = React.useState<number>(0);
  const offsetPx = 24; // small offset added to content height

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // Use ResizeObserver so responsive layout changes update the measurement.
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMeasuredContentHeight(Math.ceil(entry.contentRect.height));
      }
    });
    ro.observe(el);
    // initial measure
    setMeasuredContentHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  const effectiveMin = Math.max(minHeight, measuredContentHeight + offsetPx);

  // Drive a MotionValue for height so we can recompute mapping when effectiveMin changes.
  const heightMV = useMotionValue(maxHeight);
  React.useEffect(() => {
    // Subscribe to progress (0..1) and update height accordingly.
    const unsubscribe = progress.onChange((p) => {
      const val = maxHeight + (effectiveMin - maxHeight) * p;
      heightMV.set(val);
    });
    // initialize
    heightMV.set(maxHeight + (effectiveMin - maxHeight) * progress.get());
    return unsubscribe;
  }, [progress, maxHeight, effectiveMin, heightMV]);

  // Derived transforms using framer-motion
  const scaleImg = useTransform(heightMV, [effectiveMin, maxHeight], [0.4, 1]);
  const scaleText = useTransform(heightMV, [effectiveMin, maxHeight], [0.75, 1]);
  const yParallaxBg = useTransform(heightMV, [effectiveMin, maxHeight], [0, -40]); // subtle upward

  // We'll also drive gradient color shift via progress
  // Detect theme (client-side) and choose gradient endpoints accordingly.
  // Make theme detection reactive so toggling theme after mount updates the hero.
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    const obs = new MutationObserver(() => {
      setIsDarkMode(el.classList.contains('dark'));
    });
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  const gradient = useTransform(heightMV, (h: number) => {
    const t = 1 - (h - minHeight) / (maxHeight - minHeight); // 0 at top -> 1 shrunk
    const mix = (a: number, b: number) => Math.round(a + (b - a) * t);

    if (isDarkMode) {
      // Interpolate dark -> bright azure (existing behavior)
      const startColor = { r: 5, g: 20, b: 60 };
      const endColor = { r: 10, g: 120, b: 255 };
      const c1 = `rgb(${mix(startColor.r, endColor.r)}, ${mix(startColor.g, endColor.g)}, ${mix(startColor.b, endColor.b)})`;
      const c2 = `rgb(${mix(startColor.r * 0.5, endColor.r * 0.8)}, ${mix(startColor.g * 0.5, endColor.g * 0.8)}, ${mix(startColor.b * 0.5, endColor.b * 0.8)})`;
      return `linear-gradient(135deg, ${c1}, ${c2})`;
    }

    // Light mode: use white -> pale blue that fits theme tokens
    const lightStart = { r: 255, g: 255, b: 255 };
    const lightEnd = { r: 233, g: 244, b: 255 }; // #e9f4ff (matches theme)
    const l1 = `rgb(${mix(lightStart.r, lightEnd.r)}, ${mix(lightStart.g, lightEnd.g)}, ${mix(lightStart.b, lightEnd.b)})`;
    const l2 = `rgb(${mix(Math.round(lightStart.r * 0.9), Math.round(lightEnd.r * 0.9))}, ${mix(Math.round(lightStart.g * 0.9), Math.round(lightEnd.g * 0.9))}, ${mix(Math.round(lightStart.b * 0.9), Math.round(lightEnd.b * 0.9))})`;
    return `linear-gradient(135deg, ${l1}, ${l2})`;
  });

  // nav opacity and translate based on progress
  const navOpacity = useTransform(progress, [navFadeThreshold, 1], [0, 1]);
  const navY = useTransform(progress, [navFadeThreshold, 1], [20, 0]);

  const containerStyle = isDarkMode
    ? { height: heightMV, backgroundImage: gradient }
    : { height: heightMV, backgroundColor: '#445b90', backgroundImage: 'none' };
  // Remove overflow-hidden so content (nav) isn't clipped as height shrinks
  // Use white text on both modes for adequate contrast over darker backgrounds
  const baseClass = 'relative w-full text-white';
  return (
    <motion.div
      style={containerStyle}
      className={baseClass}
    >
      {/* Noise overlay using pseudo-element via a nested div */}
      <motion.div
        aria-hidden
        style={{ y: yParallaxBg }}
        className="absolute inset-0 "
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 60%)',
            mixBlendMode: 'overlay',
            opacity: 0.6,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" fill=\"none\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"200\" height=\"200\" filter=\"url(#noise)\" opacity=\"0.4\"/></svg>")',
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            pointerEvents: 'none',
            opacity: 0.35 + progress.get() * 0.25,
          }}
        />
      </motion.div>

      {/* Container: flex column; nav anchored to bottom via mt-auto to remain visible when hero shrinks */}
      <div className="relative max-w-6xl mx-auto h-full px-6 flex flex-col">
        {/* Theme toggle: top-right on desktop, below content on mobile */}
        <div className="absolute top-4 right-4 z-20 md:block hidden">
          <ThemeToggle className="theme-toggle-hero" />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 pt-4 pb-4 md:pb-0">
          <motion.img
            src={personal_photo}
            alt={`${profile?.name ?? 'Profile'} photo`}
            style={{ scale: scaleImg, backgroundColor: isDarkMode ? 'transparent' : 'var(--color-bg-alt)', padding: isDarkMode ? 0 : 4 }}
            className="rounded-full object-cover shadow-xl w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48"
          />
          <div className="flex-1 mt-3 md:mt-0 w-full md:w-auto">
            <motion.h1
              style={{ scale: scaleText }}
              className="font-bold tracking-tight text-center md:text-left"
            >
              <span className="block text-4xl md:text-5xl">{profile?.name}</span>
            </motion.h1>
            <motion.p
              style={{ opacity: useTransform(progress, [0, 1], [1, 0.75]) }}
              className="mt-2 text-lg text-blue-100 text-center md:text-left"
            >
              {profile?.title}
            </motion.p>
            {profile?.email && (
              <motion.p
                style={{ opacity: useTransform(progress, [0, 1], [1, 0.75]) }}
                className="text-sm mt-1 text-blue-200 text-center md:text-left"
              >
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              </motion.p>
            )}
            <motion.div
              style={{ opacity: useTransform(progress, [0, 1], [1, 0.4]) }}
              className="mt-4 hidden md:block text-sm text-blue-50 max-w-xl"
            >
              {Array.isArray(profile?.skills)
                ? (profile?.skills || []).slice(0, 10).join(' \u2022 ')
                : Object.entries(profile?.skills || {})
                    .flatMap(([cat, items]) => items.map((s) => s))
                    .slice(0, 10)
                    .join(' \u2022 ')}
            </motion.div>
          </div>
        </div>
        {/* Mobile theme toggle below content */}
        <div className="md:hidden flex justify-center mt-4">
          <ThemeToggle className="theme-toggle-hero" />
        </div>
      </div>
      {/* LOC flair removed */}

        {/* Navigation that fades in once threshold met and stays visible (anchored bottom) */}
        {/* Commented out, because it's pretty bugged */}
        {/* <motion.nav
          style={{ opacity: navOpacity, y: navY }}
          className="mt-auto mb-4 flex items-center justify-start gap-4 px-4 py-2 rounded-xl nav-surface/50 backdrop-blur-md bg-[var(--color-surface)]/60 shadow-elevate-sm border app-border"
        >
          <ul className="flex flex-wrap gap-2 text-sm font-medium pr-12">
            {['/','/projects','/about','/resume'].map((path, idx) => {
              const label = ['Home','Projects','About','Resume'][idx];
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => `px-3 py-1 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-primary)] ${isActive ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]' : 'hover:bg-[var(--color-surface-solid)]/70 text-[var(--color-text)]'}`}
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </motion.nav> */}
      {/* Foreground overlay gradient fade at bottom to smoothly transition into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)'
      }} />
    </motion.div>
  );
};

export default HeroHeader;
