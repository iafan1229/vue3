<template>
	<div>
		<apexChart
			type="area"
			height="550"
			:options="chartOptions"
			:series="series"
		></apexChart>
		{{ chartOptions }}
	</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref, onUpdated, watch, shallowRef } from 'vue';
	import VueApexCharts from 'vue3-apexcharts';
	import { firestore } from '../firebase';
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

	let dataContent = reactive<Array<IValues>>([]);
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
			categories: ['1'] as IDate[],
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm',
			},
		},
	});
	const series = reactive([
		{
			name: '오전 걷기량',
			data: [31, 40, 28],
		},
		{
			name: '오후 걷기량',
			data: [11, 32, 45],
		},
	]);
	const todos = firestore.collection('todos');
	todos.get().then((prod) => {
		prod.forEach((el) => {
			dataContent.push(el.data());
		});
	});
	watch(dataContent, (data) => {
		if (data) {
			const a = dataContent.map((el) => el.date);
			chartOptions.value.xaxis.categories = [...a];
		}
	});
</script>
