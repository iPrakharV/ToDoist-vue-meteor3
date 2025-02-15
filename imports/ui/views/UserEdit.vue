<template>
  <div class="user-edit md:bg-gray-100 md:rounded-lg md:p-8 md:mx-auto md:mt-8 md:w-96">
    <div class="mb-4">
      <button @click="goBack" class="text-blue-600 hover:underline">&larr; Back</button>
    </div>

    <h1 class="text-4xl font-bold text-gray-800 my-4 text-center">Edit User</h1>

    <!-- If a phone number exists and we're not editing, show it -->
    <div v-if="!isEditing && user.phone">
      <p class="text-center text-lg">
        Current Phone Number: <span class="font-bold">{{ user.phone }}</span>
      </p>
      <div class="mt-4 text-center">
        <button
          @click="enableEditing"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Change Phone Number
        </button>
      </div>
    </div>

    <!-- If there's no phone or we're in editing mode, show the form -->
    <form v-else @submit.prevent="saveUser">
      <div class="form-group mb-4">
        <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">
          Phone Number:
        </label>
        <input
          id="phone"
          type="tel"
          v-model="user.phone"
          @input="filterInput"
          placeholder="Enter phone number"
          class="w-full border border-gray-300 rounded-md py-2 px-3"
        />
      </div>
      <div class="flex justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          type="button"
          @click="cancelEditing"
          class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>

    <div v-if="message" class="mt-4 text-center text-green-600">{{ message }}</div>
    <div v-if="error" class="mt-4 text-center text-red-600">{{ error }}</div>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor'

export default {
  name: 'UserEdit',
  data() {
    return {
      user: {
        phone: ''
      },
      isEditing: false,
      message: '',
      error: ''
    }
  },
  created() {
    const currentUser = Meteor.user()
    const phone = currentUser?.profile?.phone || ''
    this.user.phone = phone
    // If no phone exists, we want the form open for input.
    this.isEditing = !phone
  },
  methods: {
    filterInput(e) {
      // Only allow digits in the phone field.
      this.user.phone = e.target.value.replace(/\D/g, '')
    },
    saveUser() {
      this.message = ''
      this.error = ''
      if (!this.user.phone) {
        this.error = 'Phone number cannot be empty.'
        return
      }
      Meteor.call('updatePhoneNumber', this.user.phone, (err) => {
        if (err) {
          console.log(err)
          this.error = err.reason || 'Failed to update phone number.'
        } else {
          this.message = 'Phone number updated successfully.'
          this.isEditing = false
        }
      })
    },
    enableEditing() {
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
      const currentUser = Meteor.user()
      const phone = currentUser?.profile?.phone || ''
      this.user.phone = phone
      // Stay in editing mode if no phone exists.
      this.isEditing = !phone
    },
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style scoped>
.user-edit {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
}
</style>