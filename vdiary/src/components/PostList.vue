<template>
	<ul class="card-box">
		<li
			v-for="(a, i) in dataContent"
			:key="i"
			@click="$router.push({ params: { date: a.date } })"
		>
			<router-link :to="`${i}/detail`">
				<h5>{{ a['date'] }}</h5>
				<h6>데이터 검사 결과</h6>
				<p>
					{{ a['values'] }}
					<!-- {{ a['exercise'] }} -->
				</p>
			</router-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { reactive, onMounted, onUpdated } from 'vue';
	import data from '../assets/data';
	import { firestore } from '../firebase';
	let state = reactive(['좋음', '보통', '나쁨']);

	interface IValues {
		date?: string;
		exercise?: IExer;
		values?: IExer;
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
	onUpdated(() => {
		console.log(typeof dataContent);
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
