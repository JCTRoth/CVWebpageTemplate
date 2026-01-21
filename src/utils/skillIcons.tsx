import React from 'react';
import { FaCode, FaDatabase, FaServer, FaCloud, FaRobot, FaDocker, FaReact, FaPython, FaJava, FaNodeJs, FaLock, FaNetworkWired, FaLinux, FaCogs, FaTerminal, FaBrain, FaSwatchbook, FaBolt, FaAngular, FaHtml5, FaWordpress } from 'react-icons/fa';
import { SiCsharp, SiJavascript, SiTypescript, SiKubernetes, SiSpring, SiDotnet, SiGraphql, SiPostgresql, SiMysql, SiTailwindcss, SiVite, SiTensorflow, SiShell, SiSqlite, SiGnubash, SiSwagger, SiHibernate, SiGradle, SiGrafana, SiPrometheus, SiGitlab, SiCsswizardry } from 'react-icons/si';
import { BsBootstrapFill, BsFiletypeXml, BsCloudsFill } from 'react-icons/bs';
import { GrGraphQl } from 'react-icons/gr';
import { LuRadioTower } from 'react-icons/lu';
import { TbBrandPowershell, TbBrandRedux, TbBrandElastic } from 'react-icons/tb';

export function getSkillIcon(skill?: string | null) {
  const k = (skill || '').toString().toLowerCase().trim();
  switch (k) {
    case 'c#':
    case 'csharp':
      return <SiCsharp className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'javascript':
    case 'java script':
      return <SiJavascript className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'typescript':
    case 'type script':
      return <SiTypescript className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'kubernetes':
      return <SiKubernetes className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'spring':
      return <SiSpring className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'entityframework':
    case 'entity framework':
      return <FaDatabase className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'java':
    case 'javaee':
    case 'javafx':
      return <FaJava className="w-3 h-3 text-slate-700 dark:text-slate-300 font-bold" />;
    case 'docker':
      return <FaDocker className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'react':
      return <FaReact className="w-3 h-3 text-slate-700 dark:text-slate-300 font-bold" />;
    case 'python':
      return <FaPython className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'nodejs':
    case 'node.js':
      return <FaNodeJs className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case '.net':
    case 'asp.net':
      return <SiDotnet className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'jwt':
    case 'jwtauthentication':
    case 'jwt authentication':
      return <FaLock className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'graphql':
      return <GrGraphQl className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'postgresql':
      return <SiPostgresql className="w-3 h-3 text-slate-700 dark:text-slate-300 font-bold" />;
    case 'mysql':
      return <SiMysql className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'network':
    case 'networking':
      return <FaNetworkWired className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'tailwind':
    case 'tailwindcss':
    case 'tailwind css':
      return <SiTailwindcss className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'vite':
      return <SiVite className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'zustand':
      return <TbBrandRedux className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'signalr':
      return <FaNetworkWired className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'ai':
      return <FaBrain className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'machinelearning':
    case 'machine learning':
      return <SiTensorflow className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'shellscripting':
    case 'shell scripting':
    case 'bash':
    case 'shell':
      return <SiGnubash className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'systemadministration':
    case 'system administration':
      return <FaCogs className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'sqlite':
      return <SiSqlite className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'ci/cd':
    case 'ci':
    case 'cd':
      return <FaCogs className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'dockerswarm':
    case 'docker swarm':
      return <FaNetworkWired className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'maui':
    case 'xamarin':
      return <SiCsharp className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'powershell':
      return <TbBrandPowershell className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'rest':
    case 'rest api':
      return <SiSwagger className="w-3 h-3 text-slate-700 dark:text-slate-300 font-bold" />;
    case 'soap':
      return <BsFiletypeXml className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'hibernate':
      return <SiHibernate className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'gitlab':
      return <SiGitlab className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'iot':
      return <LuRadioTower className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'elk':
    case 'elasticstack':
    case 'elastic stack':
    case 'elastic stack (elk)':
    case 'elasticsearch':
      return <TbBrandElastic className="w-3 h-3 text-slate-700 dark:text-slate-300 font-bold" />;
    case 'gradle':
      return <SiGradle className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'angular':
      return <FaAngular className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'html':
      return <FaHtml5 className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'css':
      return <SiCsswizardry className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'bootstrap':
      return <BsBootstrapFill className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'wordpress':
      return <FaWordpress className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'grafana':
      return <SiGrafana className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'microservices':
      return <BsCloudsFill className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'prometheus':
      return <SiPrometheus className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
    case 'linux':
      return <FaLinux className="w-3 h-3 text-slate-700 dark:text-slate-300" />;
  }
}

export default getSkillIcon;
