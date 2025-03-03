<script setup lang="ts">
import { reactive } from 'vue'
import { router } from '@inertiajs/core';


defineProps({ errors: Object })

const form = reactive({
  title: null,
  description: null,
})

function submit() {
  router.post('create-post', form)
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
    <div class="max-w-m mx-auto">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none text-center tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
      Post Creation      </h1>
    </div>
    <form @submit.prevent="submit" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
        <input type="text" id="title" v-model="form.title" placeholder="Enter a compelling title…" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="helper_title">Keep it concise and engaging (max 100 characters).</p>
        <div v-if="errors?.title" class="text-red-500 text-sm mt-2">{{ errors.title }}</div>
      </div>
      <div class="mb-5">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Description</label>
        <textarea type="text" id="description" rows="10" resize="none" placeholder="Write a detailed description of your post…" v-model="form.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"/>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="helper_description">Provide clear and engaging content (max 500 characters).</p>
        <div v-if="errors?.description" class="text-red-500 text-sm mt-2">{{ errors.description }}</div>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Publish Post</button>
    </form>
  </div>
</template>
