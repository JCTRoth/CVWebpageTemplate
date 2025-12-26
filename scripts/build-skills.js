#!/usr/bin/env node
/**
 * build-skills.js
 * ----------------
 * Small utility to (re)generate `src/data/skills.json` by combining the
 * categorized skills found in `src/data/resume.json` with the `skills` lists
 * declared in `src/data/projects.json`.
 *
 * Behavior:
 * - Reads `resume.json` and preserves the top-level keys of `profile.skills`
 *   as ordered groups. Skills declared there are grouped and de-duplicated.
 * - Scans all projects in `projects.json` and counts occurrences of each
 *   skill across projects. Any skill not already present in resume groups is
 *   collected into a `Project Skills` group (sorted alphabetically).
 * - Adds `metadata.singleUseSkills` containing the list of skills that occur
 *   exactly once across all projects (handy for spotting niche tech).
 * - Writes the result to `src/data/skills.json` with an additional
 *   `metadata.generatedAt` timestamp and source paths.
 *
 * Usage:
 *   node scripts/build-skills.js            # verbose
 *   node scripts/build-skills.js --silent   # quiet
 *
 * The project `npm` scripts call this automatically before `dev` and
 * `build` so you usually don't need to run it manually.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const silentArg = args.includes('--silent') || args.includes('-s');
const npmSilent = (process.env.npm_config_loglevel || '').toLowerCase() === 'silent';
const SILENT = silentArg || npmSilent;

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const RESUME_PATH = path.join(DATA_DIR, 'resume.json');
const PROJECTS_PATH = path.join(DATA_DIR, 'projects.json');
const SKILLS_PATH = path.join(DATA_DIR, 'skills.json');

function log(...msgs) {
  if (!SILENT) console.log(...msgs);
}

function warn(...msgs) {
  if (!SILENT) console.warn(...msgs);
}

function readJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`build-skills: Failed to read ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

function sanitizeSkill(value) {
  if (value == null) return '';
  const text = typeof value === 'string' ? value : String(value);
  return text.trim();
}

function pushGroup(groups, labels, label, items, seen) {
  const deduped = [];
  items.forEach((raw) => {
    const skill = sanitizeSkill(raw);
    if (!skill || seen.has(skill)) return;
    deduped.push(skill);
    seen.add(skill);
  });
  if (deduped.length) {
    groups.push(deduped);
    labels.push(label);
  }
}

const resumeData = readJSON(RESUME_PATH);
const projectsData = readJSON(PROJECTS_PATH);
const projects = Array.isArray(projectsData?.projects) ? projectsData.projects : [];

const groups = [];
const groupLabels = [];
const seenSkills = new Set();

const resumeSkillGroups = resumeData?.profile?.skills && typeof resumeData.profile.skills === 'object'
  ? resumeData.profile.skills
  : {};

Object.entries(resumeSkillGroups).forEach(([label, skills]) => {
  if (!Array.isArray(skills)) return;
  pushGroup(groups, groupLabels, label, skills, seenSkills);
});

const projectSkillCounts = new Map();
projects.forEach((project) => {
  const list = Array.isArray(project?.skills) ? project.skills : [];
  const uniqueSkills = new Set();
  list.forEach((raw) => {
    const skill = sanitizeSkill(raw);
    if (skill) uniqueSkills.add(skill);
  });
  uniqueSkills.forEach((skill) => {
    projectSkillCounts.set(skill, (projectSkillCounts.get(skill) || 0) + 1);
  });
});

const projectOnlySkills = [];
projectSkillCounts.forEach((_, skill) => {
  if (!seenSkills.has(skill)) {
    projectOnlySkills.push(skill);
  }
});
projectOnlySkills.sort((a, b) => a.localeCompare(b));
if (projectOnlySkills.length) {
  pushGroup(groups, groupLabels, 'Project Skills', projectOnlySkills, seenSkills);
}

const singleUseSkills = Array.from(projectSkillCounts.entries())
  .filter(([, count]) => count === 1)
  .map(([skill]) => skill)
  .sort((a, b) => a.localeCompare(b));

const output = {
  groups,
  metadata: {
    generatedAt: new Date().toISOString(),
    sources: {
      resume: path.relative(ROOT, RESUME_PATH),
      projects: path.relative(ROOT, PROJECTS_PATH),
    },
    groupLabels,
    singleUseSkills,
  },
};

try {
  fs.writeFileSync(SKILLS_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
} catch (error) {
  console.error(`build-skills: Failed to write ${SKILLS_PATH}: ${error.message}`);
  process.exit(1);
}

log(`build-skills: wrote ${path.relative(ROOT, SKILLS_PATH)} with ${groups.length} groups.`);
if (singleUseSkills.length) {
  warn(`Skills used in only one project: ${singleUseSkills.join(', ')}`);
}
``