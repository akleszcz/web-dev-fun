function Panda(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Panda.prototype.favouriteFood = 'bamboo';

const panda = new Panda('Wanda', 'female', 2015);

console.log('Panda Wanda:', panda);
console.log('Favourite food of panda Wanda (1):', panda.favouriteFood);

panda.favouriteFood = 'pizza';
console.log('Favourite food of panda Wanda (2):', panda.favouriteFood);

delete panda.favouriteFood;
console.log('Favourite food of panda Wanda (3):', panda.favouriteFood);

console.log('Favourite movie of panda Wanda (1):', panda.favouriteMovie);

Panda.prototype.favouriteMovie = 'Kung Fu Panda';
console.log('Favourite movie of panda Wanda (2):', panda.favouriteMovie);
