import React from 'react';
import { 
  FaCode, 
  FaDatabase, 
  FaServer, 
  FaCloud, 
  FaRobot, 
  FaLaptopCode,
  FaDocker,
  FaReact,
  FaPython,
  FaJava,
  FaNodeJs
} from 'react-icons/fa';
import { SiCsharp, SiJavascript, SiTypescript, SiKubernetes, SiSpring } from 'react-icons/si';
import { getSkillDotClasses } from '../utils/skillColors';

type SkillBadgeProps = {
  children: React.ReactNode;
  skill?: string;
  className?: string;
};

/**
 * Get appropriate icon for a skill
 */
function getSkillIcon(skill: string) {
  const skillLower = skill.toLowerCase();
  
  // Technology-specific icons
  if (skillLower.includes('react')) return <FaReact className="w-3 h-3" />;
  if (skillLower.includes('python')) return <FaPython className="w-3 h-3" />;
  if (skillLower.includes('java') && !skillLower.includes('javascript')) return <FaJava className="w-3 h-3" />;
  if (skillLower.includes('c#') || skillLower.includes('csharp')) return <SiCsharp className="w-3 h-3" />;
  if (skillLower.includes('javascript')) return <SiJavascript className="w-3 h-3" />;
  if (skillLower.includes('typescript')) return <SiTypescript className="w-3 h-3" />;
  if (skillLower.includes('kubernetes') || skillLower.includes('k8s')) return <SiKubernetes className="w-3 h-3" />;
  if (skillLower.includes('spring')) return <SiSpring className="w-3 h-3" />;
  if (skillLower.includes('docker')) return <FaDocker className="w-3 h-3" />;
  if (skillLower.includes('database') || skillLower.includes('sql') || skillLower.includes('postgresql') || skillLower.includes('mysql')) return <FaDatabase className="w-3 h-3" />;
  if (skillLower.includes('server') || skillLower.includes('backend') || skillLower.includes('api')) return <FaServer className="w-3 h-3" />;
  if (skillLower.includes('cloud') || skillLower.includes('aws') || skillLower.includes('azure')) return <FaCloud className="w-3 h-3" />;
  if (skillLower.includes('ai') || skillLower.includes('machine learning') || skillLower.includes('ml')) return <FaRobot className="w-3 h-3" />;
  if (skillLower.includes('node')) return <FaNodeJs className="w-3 h-3" />;
  
  // Default icon
  return <FaCode className="w-3 h-3" />;
}

/**
 * Renders a circular skill badge used across cards and markdown content.
 */
const SkillBadge: React.FC<SkillBadgeProps> = ({ children, skill, className }) => {
  const label = skill ?? React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('')
    .trim();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-100 shadow-sm [box-shadow:inset_0_1px_2px_rgba(0,0,0,0.08)] hover:[box-shadow:inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.15)] transition-colors ${className ?? ''}`}
      aria-label={label ? `Skill: ${label}` : undefined}
    >
      {getSkillIcon(label)}
      <span className={`inline-flex h-2.5 w-2.5 rounded-full ${getSkillDotClasses(label)} shadow [box-shadow:0_0_0_1px_rgba(255,255,255,0.5)]`} aria-hidden="true" />
      <span className="text-sm font-medium leading-none tracking-tight">
        {children}
      </span>
    </span>
  );
};

export const SkillBadgeMarkdown: React.FC<SkillBadgeProps> = ({ children, className }) => (
  <SkillBadge className={className}>{children}</SkillBadge>
);

export default SkillBadge;