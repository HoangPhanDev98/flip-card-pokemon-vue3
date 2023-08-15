<template>
  <div class="screen">
    <h1>✨ Congratulations ✨</h1>
    <p>{{ Math.round(timer / 1000) }} seconds</p>
    <button @click="emit('onStartGame')">Start Again</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  timer: number;
}>();

const emit = defineEmits<{
  (e: 'onStartGame'): void;
}>();
</script>
