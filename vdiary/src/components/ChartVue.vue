<template>
	<div>
		<apexChart
			ref="chart"
			type="area"
			height="550"
			:options="chartOptions"
			:series="series"
		></apexChart>
	</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref, onUpdated, watch, shallowRef } from 'vue';
	import VueApexCharts from 'vue3-apexcharts';
	import { firestore } from '../firebase';
	import { useDateStore } from '../DateStore';
	import { storeToRefs } from 'pinia';
	const store = useDateStore();
	const { count } = storeToRefs(store);
	const chart = ref(null);

	type IDate = string | undefined;
	interface IValues {
		date?: string;
		exercise?: IExer;
		values?: IVal;
		text?: string;
	}
	interface IVal {
		smoke?: number;
		water?: number;
		drink?: number;
	}
	interface IExer {
		0: { amount: number; category: string; num: number; walk: boolean };
		1: { amount: number; category: string; num: number; walk: boolean };
	}
	interface ISeries {
		amount: number;
	}
	let dataContent = ref<Array<IValues>>([]);
	const apexChart = shallowRef(VueApexCharts);
	const chartOptions = ref({
		chart: {
			height: 550,
			type: 'area',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		xaxis: {
			type: 'category',
			categories: count.value,
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm',
			},
		},
	});
	const series = ref([
		{
			name: '오전 걷기량',
			data: [] as ISeries[],
		},
		{
			name: '오후 걷기량',
			data: [] as ISeries[],
		},
	]);
	const todos = firestore.collection('todos').orderBy('date');
	todos.get().then((prod) => {
		prod.forEach((el) => {
			console.log(el.data().exercise?.[0].amount);
			dataContent.value.push(el.data());
			series.value[0].data.push(el.data().exercise?.[0].amount);
			series.value[1].data.push(el.data().exercise?.[1].amount);
		});
	});
</script>
