<template>
	<ul>
		<li v-for="(a, i) in data" :key="i">
			<router-link :to="`${i}/detail`" class="card" style="width: 18rem">
				<div class="card-body">
					<h5 class="card-title">{{ a.date }}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
					<p class="card-text">
						{{ a.comment }}
					</p>
				</div>
			</router-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { reactive, ref, watch, onUpdated, defineProps, onMounted } from 'vue';
	import data from '../assets/data';
	const props = defineProps({
		date: { type: String, required: true },
	});

	const dataContent = reactive([]);
	const allkeys: Array<string> = reactive(['']);

	watch(allkeys, () => {
		const keys = Object.keys(localStorage);
		const localData = keys.map((key) => localStorage.getItem(key));
		allkeys.push();
	});
	onMounted(() => {
		console.log(props.data);
	});
	onUpdated(() => {
		const allKeys: Array<string> = Object.keys(localStorage);
		const localData: Array<any> = allKeys.map((key) =>
			localStorage.getItem(key)
		);

		// console.log(JSON.parse(localData || ""));
		// dataContent.push()
	});
</script>

<style lang="scss"></style>
