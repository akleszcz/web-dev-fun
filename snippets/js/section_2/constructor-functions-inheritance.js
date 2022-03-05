function Animal(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

Animal.prototype.eat = function () {
  return 'Om nom nom nom...';
};

function GiantPanda(name, sex, yearOfBirth, favouriteSportDiscipline) {
  Animal.call(this, name, sex, yearOfBirth);
  this.favouriteSportDiscipline = favouriteSportDiscipline;
}
GiantPanda.prototype = Object.create(Animal.prototype);
Object.defineProperty(GiantPanda.prototype, 'constructor', {
  value: GiantPanda,
  enumerable: false,
  writable: true,
});

function Llama(name, sex, yearOfBirth, spittingDistance) {
  Animal.call(this, name, sex, yearOfBirth);
  this.spittingDistance = spittingDistance;
}
Llama.prototype = Object.create(Animal.prototype);
Object.defineProperty(Llama.prototype, 'constructor', {
  value: Llama,
  enumerable: false,
  writable: true,
});
Llama.prototype.spit = function () {
  return 'Ptui!';
};

const panda = new GiantPanda('Wanda', 'female', 2015, 'climbing');
const llama = new Llama('Daisy', 'female', 2015, 450);

console.log('panda: ', panda);
console.log('panda.eat(): ', panda.eat());

console.log('llama: ', llama);
console.log('llama.eat(): ', llama.eat());
console.log('llama.spit(): ', llama.spit());
