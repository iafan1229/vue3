<template>
	<HeaderVue />
	<router-view></router-view>
	<FooterVue />
</template>

<script setup lang="ts">
	import { onMounted, ref, watch, onUpdated } from '@vue/runtime-core';
	import { useRoute } from 'vue-router';
	import FooterVue from './Layout/FooterVue.vue';
	import HeaderVue from './Layout/HeaderVue.vue';

	const dateArray = ref<string[]>([]);
</script>

<style lang="scss">
	@font-face {
		font-family: 'Pretendard-Regular';
		src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
			format('woff');
		font-weight: 400;
		font-style: normal;
	}
	* {
		margin: 0;
		padding: 0;
		font-family: 'Pretendard-Regular';
	}
	ul {
		list-style: none;
	}
	a {
		text-decoration: none !important;
		color: #000 !important;
	}
</style>
