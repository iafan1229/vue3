<template>
	<button class="button">{{ props.search }}</button>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	const props = defineProps({
		search: { type: String, required: true },
	});
</script>

<style lang="scss" scoped>
	.button {
		--color: #00a97f;
		padding: 0.3em 0.8em;
		background-color: transparent;
		border-radius: 0.3em;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: 0.5s;
		font-weight: 400;
		font-size: 15px;
		border: 1px solid;
		font-family: inherit;
		letter-spacing: 1.2;
		color: var(--color);
		z-index: 1;
	}

	.button::before,
	.button::after {
		content: '';
		display: block;
		width: 50px;
		height: 50px;
		transform: translate(-50%, -50%);
		position: absolute;
		border-radius: 50%;
		z-index: -1;
		background-color: var(--color);
		transition: 1s ease;
	}

	.button::before {
		top: -1em;
		left: -1em;
	}

	.button::after {
		left: calc(100% + 1em);
		top: calc(100% + 1em);
	}

	.button:hover::before,
	.button:hover::after {
		height: 410px;
		width: 410px;
	}

	.button:hover {
		color: rgb(10, 25, 30);
	}

	.button:active {
		filter: brightness(0.8);
	}
</style>
