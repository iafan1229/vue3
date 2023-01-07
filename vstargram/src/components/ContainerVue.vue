<template>
	<div>
		<div>
			<PostVue
				v-for="(a, i) in postData"
				:key="i"
				:data="postData && postData[i]"
				:likes="likes[i]"
				:idx="i"
				@change-like="handleLike(i)"
				@minus="likes[i] > 0 ? (likes[i] -= 1) : 0"
			/>
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
	import { defineComponent, Prop } from 'vue';
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
				likes: Array(this.$store.state.dataLength).fill(0),
			};
		},
		methods: {
			addData() {
				this.$store.dispatch('getData');
				this.likes = [...this.likes, 0];
			},
			handleLike(i: number) {
				this.likes[i] += 1;
			},
		},
	});
</script>
