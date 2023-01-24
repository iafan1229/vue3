<template>
	<div class="detail-wrap">
		<h1>{{ $route.params.id }}번 데이터({{ detail.date }})의 출력 결과</h1>
		<hr />
		<p>
			음주량: {{ detail.values?.drink }}병, 흡연량:
			{{ detail.values?.smoke }}개비, 물 {{ detail.values?.water }} 잔
		</p>
		<hr />
		<h2>
			운동 종류 :
			{{
				boolean
					? detail.exercise?.category === 'walk'
						? '걷기'
						: '기타등등'
					: '없음'
			}}
		</h2>
		<p>{{ alert }}</p>
		<p>
			{{
				boolean
					? morningBoolean
						? detail.exercise?.morning.num.walk
							? '오전 ' + detail.exercise?.morning.num.walk + '걸음'
							: '오전 ' + detail.exercise?.morning.num.etc + '회'
						: ''
					: ''
			}}
		</p>
		<p>
			{{
				boolean
					? afternoonBoolean
						? detail.exercise?.afternoon.num.walk
							? '오후 ' + detail.exercise?.afternoon.num.walk + '걸음'
							: '오후 ' + detail.exercise?.afternoon.num.etc + '회'
						: ''
					: ''
			}}
		</p>
	</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref, onUpdated, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { firestore } from '../firebase';

	interface IValues {
		date?: string;
		exercise?: IExer;
		values?: IVal;
	}
	interface IVal {
		smoke?: number;
		water?: number;
		drink?: number;
	}
	interface IExer {
		category: string;
		morning: IDaily;
		afternoon: IDaily;
	}
	interface IDaily {
		num: INum;
	}
	interface INum {
		walk: number;
		etc: number;
	}

	let detail = ref<IValues>({});
	const alert = ref<string>('');
	const route = useRoute();
	const boolean = ref(false);
	const morningBoolean = ref(false);
	const afternoonBoolean = ref(false);

	const todos = firestore.collection('todos');
	todos.get().then((snapShot) => {
		const doc = snapShot.docs[Number(route.params.id)].data();
		detail.value = { ...doc };
	});

	onUpdated(() => {
		if (detail.value.exercise) {
			const { category, afternoon, morning } = detail.value.exercise;

			if (
				morning.num.walk === 0 &&
				morning.num.etc === 0 &&
				afternoon.num.walk === 0 &&
				afternoon.num.etc === 0
			) {
				boolean.value = false;
				alert.value = '운동량이 없습니다';
			} else {
				boolean.value = true;
				alert.value = '운동량은 다음과 같습니다';

				if (morning.num.walk === 0 && morning.num.etc === 0) {
					morningBoolean.value = false;
				} else {
					console.log('hi');
					morningBoolean.value = true;
				}

				if (afternoon.num.walk === 0 && afternoon.num.etc === 0) {
					afternoonBoolean.value = false;
				} else {
					afternoonBoolean.value = true;
				}
			}
		}
	});
	// watch(
	// 	detail,
	// 	(newVal) => {
	// 		console.log(newVal);
	// 		// if(Object.keys(detail).length) {
	// 		// 	alert('hi')
	// 		// }
	// 	},
	// 	{ deep: true }
	// );
</script>

<style lang="scss">
	.detail-wrap {
		padding: 0 5px;
		p {
			font-weight: normal;
		}
	}
</style>
