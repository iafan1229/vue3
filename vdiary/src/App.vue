<template>
	<HeaderVue />
	<router-view></router-view>
	<FooterVue />
</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from '@vue/runtime-core';
	import FooterVue from './Layout/FooterVue.vue';
	import HeaderVue from './Layout/HeaderVue.vue';
	import PostWrite from './components/PostWrite.vue';

	const a = ref(3);
	onMounted(() => {
		console.log('hi');
		a.value = 4;
	});
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
</style>
