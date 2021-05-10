function getTimeSpent(taskId) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      switch (taskId) {
        case 1:
          return resolve(40);
        case 2:
          return resolve(120);
        case 3:
          return resolve(150);
        default:
          return reject(new Error('Id not found'));
      }
    }, 1000);
  });
}

const myTasks = [
  {
    id: 1,
    description: 'feeding pandas',
  },
  {
    id: 2,
    description: 'playing with red pandas',
  },
  {
    id: 3,
    description: 'dancing with armadillos',
  },
];

async function logTimes(tasks) {
  console.log('Before async loop');

  const resultPromises = tasks.map(async function (task) {
    const time = await getTimeSpent(task.id);
    console.log(`Time spent on ${task.description}: `, time);
    return time;
  });
  const result = await Promise.all(resultPromises);
  console.log('After async loop');
  return result;
}

console.log('logTimes result: ', await logTimes(myTasks));
