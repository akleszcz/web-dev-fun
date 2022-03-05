class Panda {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  setName(value) {
    this.#name = value;
  }
}

const panda = new Panda('Wanda');
console.log(panda.getName()); // Wanda
panda.setName('Miranda');
console.log(panda.getName()); // Miranda
//console.log(panda.#name); // Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class

