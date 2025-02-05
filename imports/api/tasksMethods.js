import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from './tasksCollection';

async function insertTask(text) {
    check(text, String);
    return await TasksCollection.insertAsync({
        text,
        createdAt: new Date,
    });
}

async function removeTask(taskId) {
    check(taskId, String);
    await TasksCollection.removeAsync(taskId);
}

async function setIsCheckedTask(taskId, checked) {
    check(taskId, String);
    check(checked, Boolean);

    await TasksCollection.updateAsync(taskId, {
        $set: {
            checked
        }
    });
}

Meteor.methods({ insertTask, removeTask, setIsCheckedTask });