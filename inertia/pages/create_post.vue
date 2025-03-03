<script setup>
import { reactive, onMounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { router } from '@inertiajs/core';

const page = usePage()

const form = reactive({
  title: null,
  description: null,
})

function submit() {
  router.post('create-post', form)
}

</script>

<template>
  <div>
    <div class="max-w-m mx-auto">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none text-center tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Create post form Inertia
      </h1>
    </div>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" id="title" v-model="form.title" placeholder="Enter a title..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div class="mb-5">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea type="text" id="description" rows="4" placeholder="Your description here" v-model="form.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>
      <button type="submit">Create post</button>
    </form>
  </div>
</template>
