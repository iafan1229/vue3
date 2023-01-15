<template>
	<div class="detail-wrap">
		<h1>
			{{ $route.params.id }}번 데이터({{ $route.params.date }})의 출력 결과
		</h1>
		<!-- <h2>마신 물의 양 : {{ detail.exercise }}</h2> -->
		<hr />
		<h2>흡연,음주,수분섭취량</h2>
		<p>
			<!-- 담배 {{ detail.values.smoke }}개비, {{ detail.values.drink }}잔의 술, 물
			{{ detail.values.water }}잔 -->
		</p>
		<hr />
		<h2>운동량</h2>
		<p>{{ alert }}</p>
		<!-- <p>{{ content[0] }}</p> -->
		<!-- <p> -->
		<!-- {{
				detail.exercise.morning.num[content[0]] &&
				detail.exercise.morning.num[content[0]] + '걸음'
			}}
		</p> -->
		<h3></h3>
	</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	interface IDetail {
		date?: string;
		water?: number;
	}
	let detail = reactive<IDetail>({});
	let alert = ref('');
	let content = ref([]);

	const route = useRoute();

	detail = {
		...JSON.parse(localStorage.getItem(route.params.id.toString()) || '{}'),
	};
	onMounted(() => {
		// if (
		// 	detail.exercise.morning.num.walk === 0 &&
		// 	detail.exercise.morning.num.etc === 0
		// ) {
		// 	alert.value = '운동량이 없습니다';
		// } else {
		// 	alert.value = '운동량은 다음과 같습니다';
		// 	content.value.push(detail.exercise['category']);
		// 	console.log(detail.exercise);
		// }
	});
</script>

<style lang="scss">
	.detail-wrap {
		padding: 0 5px;
	}
</style>
