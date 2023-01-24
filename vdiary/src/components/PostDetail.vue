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
			{{ boolean ? morningValue : '없음' }}
			{{ boolean ? afternoonValue : '없음' }}
		</h2>
		<p>{{ alert }}</p>
		<p>
			{{
				boolean
					? morningBoolean
						? detail.exercise?.[0].category === 'walk'
							? '오전 ' + detail.exercise?.[0].amount + '걸음'
							: '오전 ' + detail.exercise?.[0].amount + '회'
						: ''
					: ''
			}}
		</p>
		<p>
			{{
				boolean
					? afternoonBoolean
						? detail.exercise?.[1].category === 'walk'
							? '오후 ' + detail.exercise?.[1].amount + '걸음'
							: '오후 ' + detail.exercise?.[1].amount + '회'
						: ''
					: ''
			}}
		</p>
		<apexChart
			width="500"
			type="bar"
			:options="chartOptions"
			:series="series"
		></apexChart>
	</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref, onUpdated, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { firestore } from '../firebase';
	import VueApexCharts from 'vue3-apexcharts';
	import { react } from '@babel/types';

	interface IValues {
		date?: string;
		exercise?: [
			{ amount: number; category: string; num: number; walk: boolean },
			{ amount: number; category: string; num: number; walk: boolean }
		];
		values?: IVal;
	}
	interface IVal {
		smoke?: number;
		water?: number;
		drink?: number;
	}
	let detail = ref<IValues>({});
	const alert = ref<string>('');
	const route = useRoute();
	const boolean = ref(false);
	const morningBoolean = ref(false);
	const afternoonBoolean = ref(false);

	const morningValue = ref('없음');
	const afternoonValue = ref('없음');
	const todos = firestore.collection('todos');
	todos.get().then((snapShot) => {
		const doc = snapShot.docs[Number(route.params.id)].data();
		detail.value = { ...doc };
	});
	const chartOptions = reactive({
		chart: { id: 'vuechart-example' },
		xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] },
	});
	const series = reactive([
		{
			name: 'series-1',
			data: [30, 40, 35, 50, 49, 60, 70, 91],
		},
	]);
	const apexChart = ref(VueApexCharts);

	onMounted(() => {
		console.log(apexChart);
	});
	onUpdated(() => {
		if (detail.value.exercise) {
			const [morning, afternoon] = detail.value.exercise;

			switch (morning.category) {
				case 'walk':
					morningValue.value = '걷기';
					break;
				case 'gym':
					morningValue.value = '헬스';
					break;
				case 'yoga':
					morningValue.value = '요가';
					break;
				case 'pilates':
					morningValue.value = '필라테스';
					break;
			}

			switch (afternoon.category) {
				case 'walk':
					afternoonValue.value = '걷기';
					break;
				case 'gym':
					afternoonValue.value = '헬스';
					break;
				case 'yoga':
					afternoonValue.value = '요가';
					break;
				case 'pilates':
					afternoonValue.value = '필라테스';
					break;
			}

			if (morning.amount === 0 && afternoon.amount === 0) {
				boolean.value = false;
				alert.value = '운동량이 없습니다';
			} else {
				boolean.value = true;
				alert.value = '운동량은 다음과 같습니다';

				if (morning.amount === 0 && morning.amount === 0) {
					morningBoolean.value = false;
				} else {
					morningBoolean.value = true;
				}

				if (afternoon.amount === 0 && afternoon.amount === 0) {
					afternoonBoolean.value = false;
				} else {
					afternoonBoolean.value = true;
				}
			}
		}
	});
</script>

<style lang="scss">
	.detail-wrap {
		padding: 0 5px;
		p {
			font-weight: normal;
		}
	}
</style>
