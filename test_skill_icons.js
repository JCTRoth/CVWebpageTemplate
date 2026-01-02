const { getSkillIconFromKey } = require('./src/utils/skillIcons');
const skillsData = require('./src/data/skills.json');
const projectsData = require('./src/data/projects.json');

// Collect all unique skills
const allSkills = new Set();
skillsData.groups.forEach(group => group.forEach(skill => allSkills.add(skill)));
projectsData.projects.forEach(project => project.skills.forEach(skill => allSkills.add(skill)));

console.log('Testing skill icons for all skills...\n');

const skillsWithIcons = [];
const skillsWithoutIcons = [];

allSkills.forEach(skill => {
  // Get the palette entry for this skill
  const palette = require('./src/utils/skillColors').palette;
  const normalizedSkill = skill.toLowerCase().replace(/\s+/g, '');
  const paletteEntry = palette.find(p => p.name === normalizedSkill);
  
  if (paletteEntry && paletteEntry.icon) {
    // Try to get the icon
    try {
      const icon = getSkillIconFromKey(paletteEntry.icon);
      if (icon) {
        skillsWithIcons.push(skill);
      } else {
        skillsWithoutIcons.push(skill);
      }
    } catch (error) {
      skillsWithoutIcons.push(skill);
    }
  } else {
    skillsWithoutIcons.push(skill);
  }
});

console.log('Skills with icons:', skillsWithIcons.length);
console.log('Skills without icons:', skillsWithoutIcons.length);

if (skillsWithoutIcons.length > 0) {
  console.log('\nSkills without icons:');
  skillsWithoutIcons.forEach(skill => console.log('  -', skill));
} else {
  console.log('\n✅ All skills have icons!');
}

console.log('\nSample skills with icons:');
skillsWithIcons.slice(0, 10).forEach(skill => console.log('  -', skill));