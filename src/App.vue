<template>
  <home-screen
    v-if="displayScreen === 'home'"
    @on-start="onHandleBeforeStartGame($event)"
  />
  <gameplay-screen
    v-if="displayScreen === 'gameplay'"
    @on-finish="onFinishGame"
  />
  <result-screen
    v-if="displayScreen === 'result'"
    :timer="setting.timer"
    @on-start-game="displayScreen = 'gameplay'"
  />
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';

import { shuffled } from '@/utils/common';

import GameplayScreen from './components/GameplayScreen.vue';
import HomeScreen from './components/HomeScreen.vue';
import ResultScreen from './components/ResultScreen.vue';
import { CARD_CONTEXT_LIST } from './symbols';

const displayScreen = ref('home');
const setting = ref({
  totalBlockOfBoard: 0,
  cardContextList: [] as number[],
  startedAt: 0,
  timer: 0,
});

// Create a ref for the provided card context list
const providedCardContextList = ref([...setting.value.cardContextList]);

// Provide it at the beginning of the setup function
provide(CARD_CONTEXT_LIST, providedCardContextList);

const onHandleBeforeStartGame = (totalBlockOfBoard: number) => {
  setting.value.totalBlockOfBoard = totalBlockOfBoard;

  const firstCardList = Array.from(
    { length: setting.value.totalBlockOfBoard / 2 },
    (_, i) => i + 1,
  );

  const secondCardList = [...firstCardList];

  const cardList = [...firstCardList, ...secondCardList];

  setting.value.cardContextList = shuffled(cardList);
  setting.value.startedAt = new Date().getTime();

  displayScreen.value = 'gameplay';
};

const onFinishGame = () => {
  setting.value.timer = new Date().getTime() - setting.value.startedAt;
  displayScreen.value = 'result';
};

watch(
  () => setting.value.cardContextList,
  (newList) => {
    providedCardContextList.value = newList;
  },
  { deep: true },
);
</script>
