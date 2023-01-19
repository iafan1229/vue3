<template>
	<div class="detail-wrap">
		<h1>
			{{ $route.params.id }}번 데이터({{ detail[0] }})의 출력 결과 {{ detail[1] }}
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
	import { reactive, onMounted, ref, onUpdated, onBeforeUpdate, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { firestore } from '../firebase';
	interface IDetail {
		date?: string;
		water?: number;
	}
	let detail = reactive<any>({});
	const content = ref<any>([]);
	const alert = ref<string>('');
	const route = useRoute();

	const todos = firestore.collection('todos');
	todos.get().then((snapShot)=>{
		const doc = snapShot.docs[Number(route.params.id)].data()
		// console.log({...doc})
		detail = {...doc}
	});

	onUpdated(() => {

		if (
			detail[1].morning.num.walk === 0 &&
			detail[1].morning.num.etc === 0
		) {
			alert.value = '운동량이 없습니다';
		} else {
			alert.value = '운동량은 다음과 같습니다';
			// content.value.push(detail[1]['category']);
			// console.log(detail[1]);
		}
	});
	watch(detail, (newVal)=>{
		console.log(newVal)
		// if(Object.keys(detail).length) {
		// 	alert('hi')
		// }
	})	
</script>

<style lang="scss">
	.detail-wrap {
		padding: 0 5px;
	}
</style>
