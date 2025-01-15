<script setup>
import Task from './components/Task.vue'

const getTasks = () => {
  return [
    { id: 1, text: 'Install Node.js' },
    { id: 2, text: 'Install Meteor 3' },
    { id: 3, text: 'Run the project' },
  ]
}
</script>
<!-- Added some sample tasks -->

<script>

</script>
<template>
  <div class="container">
    <header>
      <h1 class="text-4xl font-bold text-grey-800 my-4">ToDo List</h1>
    </header>
    <ul class="list-disc list inside p-4">
    <Task v-for="task in getTasks()" :key="task._id" :task="task"</ul>
  </div>
</template>
