<template>
	<ul class="card-box">
		<li v-for="(a, i) in dataContent" :key="i">
			<router-link
				:to="`${i}/detail`"
				:class="status?.innerText === '좋음' && `good`"
			>
				<h5>{{ a['date'] }}</h5>
				<h6>데이터 검사 결과</h6>
				<p ref="status">
					{{
						a.values &&
						(
							Object.values(a.values).filter(
								(el, idx) => idx === 0 && el <= 3
							) &&
							Object.values(a.values).filter((el, idx) => idx !== 0 && el > 0)
						).length > 0
							? '좋음'
							: a.values &&
							  Object.values(a.values).filter(
									(el, idx) => idx === 0 && el >= 10
							  ).length > 0
							? '나쁨'
							: '보통'
					}}
				</p>
			</router-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { reactive, onMounted, onUpdated, ref } from 'vue';
	import data from '../assets/data';
	import { firestore } from '../firebase';
	const status = ref<HTMLElement | null>(null);

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

	let dataContent = reactive<Array<IValues>>([]);

	const todos = firestore.collection('todos');
	todos.get().then((prod) => {
		prod.forEach((el) => {
			dataContent.push(el.data());
		});
	});
	onMounted(() => {
		// console.log(typeof dataContent);
		if (status.value) console.dir(status.value);
	});
	// dataContent = [...localData];
</script>

<style lang="scss">
	.card-box {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
		padding: 15px 0;
		li {
			width: calc(100% / 3 - 30px);
			height: 300px;
			border: 1px solid #ddd;
			text-align: center;
			a {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 100%;
				h5,
				h6 {
					display: block;
				}
				h6 {
					color: gray;
				}
			}
		}
	}
</style>
