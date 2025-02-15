<script setup>
// Importing components and libraries
import Task from './components/Task.vue'
import TaskForm from './components/TaskForm.vue'
import { subscribe, autorun } from 'vue-meteor-tracker'
import { TasksCollection } from '../api/tasksCollection'
import { Meteor } from 'meteor/meteor'
import { ref, watch } from 'vue'
import LoginForm from './components/LoginForm.vue'

// Flag to hide completed tasks
const hideCompleted = ref(false)
// Track if the user is logged in
const isLogged = ref(false)

// Get current user ID reactively
const userId = autorun(() => Meteor.userId()).result

// Update login status when userId changes
watch(
  () => userId.value,
  (newUserId) => {
    isLogged.value = !!newUserId
  },
  { immediate: true }
)

// Subscribe to tasks published from the server
subscribe('tasks')

// Get tasks from the collection based on hideCompleted and user
const tasks = autorun(() => {
  const filter = hideCompleted.value 
    ? { checked: { $ne: true }, userId: userId.value }
    : { userId: userId.value }
  return TasksCollection.find(filter, { sort: { createdAt: -1 } }).fetch()
}).result

// Toggle the flag for hiding completed tasks
const toggleHideCompleted = () => {
  hideCompleted.value = !hideCompleted.value
}

// Count of incomplete tasks
const incompleteTasksCount = autorun(() => {
  return TasksCollection.find({ checked: { $ne: true }, userId: userId.value }).count()
}).result

// Logout the user
const logout = () => Meteor.logout()
</script>

<template>
  <div v-if="isLogged">
    <header class="flex items-center justify-between px-4 py-4 bg-gray-100 border-t border-b border-gray-200">
      <h1 class="text-4xl font-bold text-gray-800 my-4">
        🚀 To-Do List
        <span v-if="incompleteTasksCount > 0" class="text-xl font-light text-gray-600">
          ({{ incompleteTasksCount }})
        </span>
      </h1>
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click="logout">
        Logout
      </button>
    </header>
    <!-- New navigation links -->
    <nav class="bg-gray-50 p-2">
      <router-link class="text-blue-600 hover:underline" to="/">Home</router-link>
      <router-link class="ml-4 text-blue-600 hover:underline" to="/user/edit">Edit User</router-link>
    </nav>
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="mb-8 md:w-96 md:mx-auto md:mb-0 md:mt-8 md:px-4 md:py-8 text-center md:bg-gray-100 md:rounded-lg">
        <TaskForm />
        <div>
          <button class="text-sm font-semibold text-gray-600 hover:text-gray-800" @click="toggleHideCompleted">
            <span v-if="hideCompleted">Show all</span>
            <span v-else>Hide completed</span>
          </button>
        </div>
        <ul class="list-none list-inside pt-4 md:w-96">
          <Task v-for="task of tasks" :key="task._id" :task="task" />
        </ul>
      </div>
    </div>
  </div>

  <div v-else>
    <LoginForm />
  </div>
</template>