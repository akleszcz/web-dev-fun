try {
  const panda1 = new Panda1('Wanda', 'female', 2015);
  console.log('panda1: ', panda1);
  const panda2 = new Panda2('Miranda', 'female', 2018);
  console.log('panda2: ', panda2);
} catch (error) {
  console.error('Error: ', error);
}


function Panda1(name, sex, yearOfBirth) {
  this.name = name;
  this.sex = sex;
  this.yearOfBirth = yearOfBirth;
}

class Panda2 {
  constructor(name, sex, yearOfBirth) {
    this.name = name;
    this.sex = sex;
    this.yearOfBirth = yearOfBirth;
  }
}
