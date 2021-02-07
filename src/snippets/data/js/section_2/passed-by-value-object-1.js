const ourTeam = {
  name: 'Commercial'
};

function rebrand(team, newName) {
  team.name = newName;
  return team;
}

console.log('ourTeam before rebranding:', ourTeam);
const ourNewTeam = rebrand(ourTeam, 'Admadillos');
console.log('ourTeam after rebranding:', ourTeam);
console.log('ourNewTeam:', ourNewTeam);
console.log('ourTeam === ourNewTeam:', ourTeam === ourNewTeam);