<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <div class="text-center my-8">
      <router-link to="/dashboard" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Go to ORDO Dashboard
      </router-link>
    </div>
    <TheWelcome />
  </main>
</template>
