<template>
  <div class="screen">
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

<style lang="scss" scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);

  h1 {
    font-size: 4.5rem;
    text-transform: uppercase;
  }

  p {
    font-size: 2rem;
  }
}

.modes {
  display: flex;
  margin-top: 2rem;

  button {
    font: var(--font);
    width: 150px;
    height: 150px;
    background: transparent;
    box-shadow: none;
    border: 1px solid var(--light);
    color: var(--light);
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin: 0 1rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
      background-color: var(--light);
      color: var(--dark);
    }

    span:first-child {
      font-size: 2rem;
    }

    span:last-child {
      display: block;
      font-size: 1.25rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
