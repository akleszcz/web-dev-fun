const ourTeamName = 'Commercial';

function rebrand(name, newName) {
  name = newName;
  return name;
}

console.log('ourTeamName before rebranding:', ourTeamName);
const ourNewTeamName = rebrand(ourTeamName, 'Admadillos');
console.log('ourTeamName after rebranding:', ourTeamName);
console.log('ourNewTeamName:', ourNewTeamName);