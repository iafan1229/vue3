<template>
	<div class="calendar-wrap" @click="closeModal">
		<div class="calendar" @click="(e) => e.stopPropagation()">
			<v-date-picker
				mode="date"
				@click="(e) => handleDatePicker(e)"
				v-model="date"
				isExpanded
			/>
		</div>
	</div>
	<!-- {{ date }} -->
</template>

<script setup lang="ts">
	import { defineEmits, ref, defineProps } from 'vue';

	const date = ref(new Date());
	const emit = defineEmits(['dateChange', 'changeBoolean']);

	const handleDatePicker = (e) => {
		e.stopPropagation();
		// date.value = e.target.value;
		emit('dateChange', date.value);
	};
	const closeModal = (e) => {
		emit('changeBoolean');
	};
</script>

<style lang="scss">
	.calendar-wrap {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100vh;
		z-index: 2;
		.calendar {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
