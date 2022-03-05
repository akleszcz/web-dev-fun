const dwayne = {}, daniel = { firstName: 'Daniel' }, jason = { key: 'jason' };

dwayne[daniel] = 123;
dwayne[jason] = 456;

console.log(dwayne[daniel]);
