import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useDateStore = defineStore('dateCollection', () => {
	const count = ref([] as string[]);
	// const saveScore = computed(() => count.value += 2);
	function increment(el: string) {
		count.value.push(el);
	}

	return { count, increment };
});
