<template>
  <div class="screen">
    <div
      class="screen__inner"
      :style="{
        width: `${
          (((920 - 16 * 4) / numberCardInRow - 16) * 0.75 + 16) *
          numberCardInRow
        }px`,
      }"
    >
      <card-flip
        v-for="(card, index) in cardContextList"
        :key="index"
        ref="input"
        :image-path="`images/${card}.png`"
        :card="{ index, value: card }"
        :number-card-in-row="numberCardInRow"
        @on-flip="checkRule($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

import { CARD_CONTEXT_LIST } from '@/symbols';

import CardFlip from './Card.vue';

const cardContextList = inject(CARD_CONTEXT_LIST);
const numberCardInRow = Math.sqrt(cardContextList!.value.length);

const rules = ref<any[]>([]);
const input = ref();
const countRight = ref(0);

const emit = defineEmits<{
  (e: 'onFinish'): void;
}>();

const checkRule = (card: any) => {
  if (rules.value.length === 2 || !card) return false;

  rules.value.push(card);

  if (rules.value.length === 2) {
    if (rules.value[0].value === rules.value[1].value) {
      input.value[rules.value[0].index].onDisabledMode();
      input.value[rules.value[1].index].onDisabledMode();

      countRight.value = countRight.value + 1;
      rules.value = [];
    } else {
      setTimeout(() => {
        input.value[rules.value[0].index].onFlipBackCard();
        input.value[rules.value[1].index].onFlipBackCard();
        rules.value = [];
      }, 800);
    }
  } else {
    return false;
  }

  if (countRight.value === cardContextList!.value.length / 2) {
    setTimeout(() => {
      emit('onFinish');
    }, 800);
  }
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
  background-color: var(--dark);
  color: var(--light);

  &__inner {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem auto;
  }
}
</style>
