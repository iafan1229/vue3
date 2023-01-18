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
	import { firestore } from './firebase';

	onMounted(() => {
		const todos = firestore.collection('todos');
		// todos.doc('test').set({ name: 'duck', height: 180 });
		//todos.doc('test').update({ text: '꿀잠 자기', completed: true });

		// todos
		// 	.doc('test')
		// 	.get()
		// 	.then((doc) => {
		// 		// document의 데이터를 가져옴
		// 		console.log(doc.data());
		// 		// document의 id를 가져옴
		// 		console.log(doc.id);
		// 	});
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
	@font-face {
		font-family: 'headFont';
		src: url('../public/NeutralFace-Bold.woff') format('woff');
	}
	#wrap {
		width: 1000px;
	}
	#app {
		padding: 20px;
		position: relative;
		width: 100%;
		height: 90vh;
		max-width: 1200px;
		margin: 30px;
		box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.1);
		overflow-y: auto;
		/* display: flex; */
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.5);
		border-left: 1px solid gbga(255, 255, 255, 0.5);
		backdrop-filter: blur(5px);
		nav {
			border-radius: 8px;
		}
	}
	* {
		margin: 0;
		padding: 0;
		font-family: 'Pretendard-Regular';
		box-sizing: border-box;
	}
	a {
		text-decoration: none !important;
		color: #000 !important;
	}
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #161623;
		overflow: hidden;
	}
	body::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(#f00, #f0f);
		clip-path: circle(20% at right 70%);
		z-index: -1;
		/* animation: move-up6 2s ease-in infinite alternate-reverse; */
		/* animation-name: move-down1; */
	}
	body::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(#2196f3, #e91e63);
		clip-path: circle(20% at 5% 5%);
		z-index: -1;
		/* animation: move-down1 2s ease-in infinite alternate-reverse; */
	}
	.container {
	}
	ul {
		list-style: none;
	}
	@keyframes move-up6 {
		to {
			transform: translateY(-30px);
		}
	}

	@keyframes move-down1 {
		to {
			transform: translateY(10px);
		}
	}
</style>
