<script setup>
import { ref } from 'vue';
import { Meteor } from 'meteor/meteor';

const newTask = ref('');

const addTask = async () => {
    await Meteor.callAsync('insertTask', newTask.value.trim());
    newTask.value = '';
}
</script>

<template>
    <form @submit.prevent="addTask">
      <input
          v-model="newTask"
          class=" border border-gray-300 rounded-md py-2 px-4 mr-2 text-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:ring-0"
          type="text" placeholder="Type to add new tasks" />
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded" type="submit">Add Task</button>
    </form>
  </template>