import React from 'react';
import { FaCode, FaDatabase, FaServer, FaCloud, FaRobot, FaDocker, FaReact, FaPython, FaJava, FaNodeJs, FaLock, FaNetworkWired, FaLinux, FaCogs, FaTerminal, FaBrain, FaSwatchbook, FaBolt } from 'react-icons/fa';
import { SiCsharp, SiJavascript, SiTypescript, SiKubernetes, SiSpring, SiDotnet, SiGraphql, SiPostgresql, SiMysql, SiTailwindcss, SiVite, SiTensorflow, SiShell, SiSqlite } from 'react-icons/si';

export function getSkillIconFromKey(key?: string | null) {
  const k = (key || '').toString();
  switch (k) {
    case 'SiCsharp':
      return <SiCsharp className="w-3 h-3" />;
    case 'SiJavascript':
      return <SiJavascript className="w-3 h-3" />;
    case 'SiTypescript':
      return <SiTypescript className="w-3 h-3" />;
    case 'SiKubernetes':
      return <SiKubernetes className="w-3 h-3" />;
    case 'SiSpring':
      return <SiSpring className="w-3 h-3" />;
    case 'FaDatabase':
      return <FaDatabase className="w-3 h-3" />;
    case 'FaServer':
      return <FaServer className="w-3 h-3" />;
    case 'FaCloud':
      return <FaCloud className="w-3 h-3" />;
    case 'FaPython':
      return <FaPython className="w-3 h-3" />;
    case 'FaJava':
      return <FaJava className="w-3 h-3" />;
    case 'FaDocker':
      return <FaDocker className="w-3 h-3" />;
    case 'FaReact':
      return <FaReact className="w-3 h-3" />;
    case 'FaNodeJs':
      return <FaNodeJs className="w-3 h-3" />;
    case 'SiDotnet':
      return <SiDotnet className="w-3 h-3" />;
    case 'FaLock':
      return <FaLock className="w-3 h-3" />;
    case 'SiGraphql':
      return <SiGraphql className="w-3 h-3" />;
    case 'SiPostgresql':
      return <SiPostgresql className="w-3 h-3" />;
    case 'SiMysql':
      return <SiMysql className="w-3 h-3" />;
    case 'FaNetworkWired':
      return <FaNetworkWired className="w-3 h-3" />;
    case 'SiTailwindcss':
      return <SiTailwindcss className="w-3 h-3" />;
    case 'SiVite':
      return <SiVite className="w-3 h-3" />;
    case 'FaLinux':
      return <FaLinux className="w-3 h-3" />;
    case 'FaCogs':
      return <FaCogs className="w-3 h-3" />;
    case 'FaTerminal':
      return <FaTerminal className="w-3 h-3" />;
    case 'FaBrain':
      return <FaBrain className="w-3 h-3" />;
    case 'SiTensorflow':
      return <SiTensorflow className="w-3 h-3" />;
    case 'SiShell':
      return <SiShell className="w-3 h-3" />;
    case 'SiSqlite':
      return <SiSqlite className="w-3 h-3" />;
    default:
      return <FaCode className="w-3 h-3" />;
  }
}

export default getSkillIconFromKey;
