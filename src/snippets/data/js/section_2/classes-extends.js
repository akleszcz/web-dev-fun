class Animal {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }

  eat() {
    return 'Om nom nom nom...';
  }
}

class Llama extends Animal {
  constructor(name, sex, yearOfBirth, spittingDistance) {
    super(name, sex, yearOfBirth);
    this.spittingDistance = spittingDistance;
  }

  spit() {
    return 'Ptui!';
  }
}

const llama = new Llama('Daisy', 'female', 2015, 450);
console.log('llama: ', llama);
console.log('llama.eat(): ', llama.eat());
console.log('llama.spit(): ', llama.spit());

console.log('llama.__proto__ === Llama.prototype: ', llama.__proto__ === Llama.prototype);
console.log('llama.__proto__.__proto__ === Animal.prototype: ', llama.__proto__.__proto__ === Animal.prototype);