class Panda { static description = 'Outer Panda class' }
console.log('Panda from outer scope:', Panda);
{
  console.log('Panda from inner scope:', Panda);
  class Panda { static description = 'Inner Panda class' }
}