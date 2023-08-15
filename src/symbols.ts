import { InjectionKey, Ref } from 'vue';

export const CARD_CONTEXT_LIST: InjectionKey<Ref<number[]>> =
  Symbol('cardContextList');
