import React from 'react';
import { FaCode, FaDatabase, FaServer, FaCloud, FaRobot, FaDocker, FaReact, FaPython, FaJava, FaNodeJs } from 'react-icons/fa';
import { SiCsharp, SiJavascript, SiTypescript, SiKubernetes, SiSpring } from 'react-icons/si';

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
    default:
      return <FaCode className="w-3 h-3" />;
  }
}

export default getSkillIconFromKey;
