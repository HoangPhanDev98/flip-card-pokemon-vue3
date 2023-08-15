<template>
  <h1>POKE MEMORIES</h1>
  <p>Select mode to start game</p>
  <div class="modes">
    <button
      v-for="mode in modeList"
      :key="mode.totalBlockOfBoard"
      @click="onSelectMode(mode.totalBlockOfBoard)"
    >
      <span>{{ mode.boardSize }}</span>
      <span>{{ mode.difficulty }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const modeList = [
  {
    totalBlockOfBoard: 16,
    boardSize: '4x4',
    difficulty: 'Easy',
  },
  {
    totalBlockOfBoard: 36,
    boardSize: '6x6',
    difficulty: 'Medium',
  },
  {
    totalBlockOfBoard: 64,
    boardSize: '8x8',
    difficulty: 'Hard',
  },
  {
    totalBlockOfBoard: 100,
    boardSize: '10x10',
    difficulty: 'Super Hard',
  },
];

const emit = defineEmits<{
  (e: 'onStart', payload: number): void;
}>();

const onSelectMode = (totalBlockOfBoard: number) => {
  emit('onStart', totalBlockOfBoard);
};
</script>
