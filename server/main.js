import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '/imports/api/tasksCollection';
import '../imports/api/tasksPublications';


const insertTask = async text => await TasksCollection.insertAsync({ text });


Meteor.startup(async () => {
  const tasksCount = await TasksCollection.find({}).countAsync();
  //noticed how theres mention of async in the above line

  if (tasksCount === 0) {
    await insertTask('First Task');
    await insertTask('Second Task');
    await insertTask('Third Task');
    await insertTask('Fourth Task');
  }

})
