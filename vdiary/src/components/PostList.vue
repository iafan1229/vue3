<template>
	<ul class="card-box">
		<li v-for="(a, i) in dataContent" :key="i">
			<router-link :to="`${i}/detail`">
				<h5>{{ a['date' as unknown as number] }}</h5>
				<h6>데이터 검사 결과</h6>
				<p>
					{{ a['values' as unknown as number] }}
					<!-- {{ a['exercise'] }} -->
				</p>
			</router-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { reactive, onMounted } from 'vue';
	import data from '../assets/data';

	let dataContent = reactive<Array<string>>([]);
	let state = reactive(['좋음', '보통', '나쁨']);

	const allKeys: Array<string> = Object.keys(localStorage);
	const localData = allKeys.map((key) =>
		JSON.parse(localStorage.getItem(key) || '{}')
	);
	dataContent = [...localData];
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
