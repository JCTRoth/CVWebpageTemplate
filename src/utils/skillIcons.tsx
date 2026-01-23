import React from 'react';
import { FaCode, FaDatabase, FaServer, FaCloud, FaRobot, FaDocker, FaReact, FaPython, FaJava, FaNodeJs, FaLock, FaNetworkWired, FaLinux, FaCogs, FaTerminal, FaBrain, FaSwatchbook, FaBolt, FaAngular, FaHtml5, FaWordpress, FaUser } from 'react-icons/fa';
import { SiCsharp, SiJavascript, SiTypescript, SiKubernetes, SiSpring, SiDotnet, SiGraphql, SiPostgresql, SiMysql, SiTailwindcss, SiVite, SiTensorflow, SiShell, SiSqlite, SiGnubash, SiSwagger, SiHibernate, SiGradle, SiGrafana, SiPrometheus, SiGitlab, SiCsswizardry } from 'react-icons/si';
import { BsBootstrapFill, BsFiletypeXml, BsCloudsFill } from 'react-icons/bs';
import { GrGraphQl } from 'react-icons/gr';
import { LuRadioTower } from 'react-icons/lu';
import { TbBrandPowershell, TbBrandRedux, TbBrandElastic, TbFileTypeSql } from 'react-icons/tb';

export function getSkillIcon(skill?: string | null) {
  const k = (skill || '').toString().toLowerCase().trim();
  switch (k) {
    case 'c#':
    case 'csharp':
      return <SiCsharp className="w-3 h-3 text-black dark:text-white" />;
    case 'javascript':
    case 'java script':
      return <SiJavascript className="w-3 h-3 text-black dark:text-white" />;
    case 'typescript':
    case 'type script':
      return <SiTypescript className="w-3 h-3 text-black dark:text-white" />;
    case 'kubernetes':
      return <SiKubernetes className="w-3 h-3 text-black dark:text-white" />;
    case 'servicenow':
      return <FaUser className="w-3 h-3 text-black dark:text-white" />;
    case 'spring':
      return <SiSpring className="w-3 h-3 text-black dark:text-white" />;
    case 'entityframework':
    case 'entity framework':
      return <FaDatabase className="w-3 h-3 text-black dark:text-white" />;
    case 'java':
    case 'javaee':
    case 'javafx':
      return <FaJava className="w-3 h-3 text-black dark:text-white font-bold" />;
    case 'docker':
      return <FaDocker className="w-3 h-3 text-black dark:text-white" />;
    case 'react':
      return <FaReact className="w-3 h-3 text-black dark:text-white font-bold" />;
    case 'python':
      return <FaPython className="w-3 h-3 text-black dark:text-white" />;
    case 'nodejs':
    case 'node.js':
      return <FaNodeJs className="w-3 h-3 text-black dark:text-white" />;
    case '.net':
    case 'asp.net':
      return <SiDotnet className="w-3 h-3 text-black dark:text-white" />;
    case 'jwt':
    case 'jwtauthentication':
    case 'jwt authentication':
      return <FaLock className="w-3 h-3 text-black dark:text-white" />;
    case 'graphql':
      return <GrGraphQl className="w-3 h-3 text-black dark:text-white" />;
    case 'postgresql':
      return <SiPostgresql className="w-3 h-3 text-black dark:text-white font-bold" />;
    case 'mysql':
      return <SiMysql className="w-3 h-3 text-black dark:text-white" />;
    case 'network':
    case 'networking':
      return <FaNetworkWired className="w-3 h-3 text-black dark:text-white" />;
    case 'tailwind':
    case 'tailwindcss':
    case 'tailwind css':
      return <SiTailwindcss className="w-3 h-3 text-black dark:text-white" />;
    case 'vite':
      return <SiVite className="w-3 h-3 text-black dark:text-white" />;
    case 'zustand':
      return <TbBrandRedux className="w-3 h-3 text-black dark:text-white" />;
    case 'signalr':
      return <FaNetworkWired className="w-3 h-3 text-black dark:text-white" />;
    case 'ai':
      return <FaBrain className="w-3 h-3 text-black dark:text-white" />;
    case 'machinelearning':
    case 'machine learning':
      return <SiTensorflow className="w-3 h-3 text-black dark:text-white" />;
    case 'shellscripting':
    case 'shell scripting':
    case 'bash':
    case 'shell':
    case 'bourne again shell':
    case 'bourne-again-shell':
    case 'bourne again':
    case 'bourne-again':
    case 'batch':
    case 'dos':
    case 'dos batch':
    case 'windows batch':
      return <SiGnubash className="w-3 h-3 text-black dark:text-white" />;
    case 'systemadministration':
    case 'system administration':
      return <FaCogs className="w-3 h-3 text-black dark:text-white" />;
    case 'sqlite':
      return <SiSqlite className="w-3 h-3 text-black dark:text-white" />;
    case 'sql':
      return <TbFileTypeSql className="w-3 h-3 text-black dark:text-white" />;
    case 'ci/cd':
    case 'ci':
    case 'cd':
      return <FaCogs className="w-3 h-3 text-black dark:text-white" />;
    case 'dockerswarm':
    case 'docker swarm':
      return <FaNetworkWired className="w-3 h-3 text-black dark:text-white" />;
    case 'maui':
    case 'xamarin':
      return <SiCsharp className="w-3 h-3 text-black dark:text-white" />;
    case 'powershell':
      return <TbBrandPowershell className="w-3 h-3 text-black dark:text-white" />;
    case 'rest':
    case 'rest api':
      return <SiSwagger className="w-3 h-3 text-black dark:text-white font-bold" />;
    case 'soap':
      return <BsFiletypeXml className="w-3 h-3 text-black dark:text-white" />;
    case 'hibernate':
      return <SiHibernate className="w-3 h-3 text-black dark:text-white" />;
    case 'gitlab':
      return <SiGitlab className="w-3 h-3 text-black dark:text-white" />;
    case 'iot':
      return <LuRadioTower className="w-3 h-3 text-black dark:text-white" />;
    case 'elk':
    case 'elasticstack':
    case 'elastic stack':
    case 'elastic stack (elk)':
    case 'elasticsearch':
      return <TbBrandElastic className="w-3 h-3 text-black dark:text-white font-bold" />;
    case 'gradle':
      return <SiGradle className="w-3 h-3 text-black dark:text-white" />;
    case 'angular':
      return <FaAngular className="w-3 h-3 text-black dark:text-white" />;
    case 'html':
      return <FaHtml5 className="w-3 h-3 text-black dark:text-white" />;
    case 'css':
      return <SiCsswizardry className="w-3 h-3 text-black dark:text-white" />;
    case 'bootstrap':
      return <BsBootstrapFill className="w-3 h-3 text-black dark:text-white" />;
    case 'wordpress':
      return <FaWordpress className="w-3 h-3 text-black dark:text-white" />;
    case 'grafana':
      return <SiGrafana className="w-3 h-3 text-black dark:text-white" />;
    case 'microservices':
      return <BsCloudsFill className="w-3 h-3 text-black dark:text-white" />;
    case 'prometheus':
      return <SiPrometheus className="w-3 h-3 text-black dark:text-white" />;
    case 'linux':
      return <FaLinux className="w-3 h-3 text-black dark:text-white" />;
  }
}

export default getSkillIcon;
