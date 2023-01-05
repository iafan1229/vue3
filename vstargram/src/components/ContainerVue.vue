<template>
	<div>
		<div>
			<PostVue v-for="(a, i) in postData" :key="i" :data="postData[i]" />
		</div>
		<button @click="addData">더보기</button>
	</div>
</template>

<script lang="ts">
	interface IPost {
		name: string;
		userImage: string;
		postImage: string;
		likes: number;
		date: string;
		liked: boolean;
		content: string;
		filter: string;
	}
	import { defineComponent, Prop, PropType } from 'vue';
	import PostVue from './PostVue.vue';
	export default defineComponent({
		components: {
			PostVue,
		},
		props: {
			postData: Array as Prop<IPost[]>,
		},
		data() {
			return {
				dataSet: this.postData,
				getData: {},
			};
		},
		methods: {
			addData() {
				this.getData = fetch(`https://codingapple1.github.io/vue/more1.json`)
					.then((res) => res.json())
					.then((res) => this.dataSet?.push(res));
			},
		},
	});
</script>
