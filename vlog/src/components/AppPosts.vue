<template>
	<div class="mt-3">
		<div class="list-group pb-5" v-for="(a, i) in listLength" :key="i">
			<h5 class="list-group-item" @click="$router.push(`/posts/${i}`)">
				<p>{{ data[i].title }}</p>
			</h5>
			<p class="list-group-item">{{ data[i].content }}</p>
			<p class="list-group-item">{{ data[i].date }}</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		data() {
			return {
				listLength: 1,
			};
		},
		props: {
			data: Array,
		},
		created() {
			if (this.data) {
				this.listLength = this.data.length;
			}
		},
	});
</script>
<style lang="scss">
	.list-group {
		h5 {
			background: #e1cefe;
			&:hover {
				cursor: pointer;
				color: rgb(162, 23, 172);
			}
		}
		margin-bottom: 0;
		p {
			margin-bottom: 0;
		}
	}
</style>
