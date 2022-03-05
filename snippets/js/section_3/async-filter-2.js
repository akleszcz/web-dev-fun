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
  const tasksTimesPromises = tasks.map(async (task) => await getTimeSpent(task.id));
  const tasksTimes = await Promise.all(tasksTimesPromises);
  console.log('tasksTimes:', tasksTimes);
  const longTasks = tasks.filter((task, index) => tasksTimes[index] > 60);
  return longTasks;
}

await logTimes(myTasks);