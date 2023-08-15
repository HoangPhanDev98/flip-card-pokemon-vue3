<template>
  <div
    class="card"
    :class="{ disabled: isDisabled }"
    :style="{
      width: `${((920 - 16 * 4) / numberCardInRow - 16) * 0.75}px`,
      height: `${(920 - 16 * 4) / numberCardInRow - 16}px`,
      perspective: `${((920 - 16 * 4) / numberCardInRow - 16) * 0.75 * 2}px`,
    }"
    @click="onToggleFlipCard"
  >
    <div class="card__inner" :class="{ 'is-flipped': isFlipped }">
      <div class="card__face card__face--front">
        <div
          class="card__content"
          :style="{
            backgroundSize: `${
              (((920 - 16 * 4) / numberCardInRow - 16) * 0.75) / 3
            }px ${(((920 - 16 * 4) / numberCardInRow - 16) * 0.75) / 3}px`,
          }"
        ></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{
            backgroundImage: `url(${logo})`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  imagePath: string;
  card: any;
  numberCardInRow: number;
}>();

const emit = defineEmits<{
  (e: 'onFlip', payload: number): void;
}>();

const logo = ref();
const isDisabled = ref(false);

watchEffect(async () => {
  logo.value = (
    await import(/* @vite-ignore */ `../assets/${props.imagePath}`)
  ).default;
});

const isFlipped = ref(false);
const onToggleFlipCard = () => {
  if (isDisabled.value) return false;
  isFlipped.value = !isFlipped.value;
  emit('onFlip', props.card);
};

const onFlipBackCard = () => {
  isFlipped.value = false;
};

const onDisabledMode = () => {
  isDisabled.value = true;
};

defineExpose({
  onFlipBackCard,
  onDisabledMode,
});
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &__inner {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
  }

  .is-flipped {
    transform: rotateY(-180deg);
  }

  &__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);

    &--front .card__content {
      background: url('../assets//images/icon_back.png') no-repeat center center;
      height: 100%;
      width: 100%;
    }

    &--back {
      background-color: var(--light);
      transform: rotateY(-180deg);

      .card__content {
        height: 100%;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
  }

  &.disabled &__inner {
    cursor: default;
  }
}
</style>
