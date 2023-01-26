import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
	const count = ref(0);
	// const saveScore = computed(() => count.value += 2);
	function increment(el: number) {
		count.value = el;
	}

	return { count, increment };
});
