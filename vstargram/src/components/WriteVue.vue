<template>
	<div>
		<div
			class="upload-image"
			:style="{
				backgroundImage: `url(${url}) `,
			}"
		></div>
		<div class="write">
			<textarea class="write-box" v-model="handleWrite">write!</textarea>
		</div>
		<button v-on:click="publish">뷰스타에 게시글 올리기</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		props: {
			url: String,
		},
		data() {
			return {
				handleWrite: '' as string,
				newData: {},
			};
		},
		methods: {
			publish() {
				var newPosts = {
					name: 'ha young',
					userImage: 'https://placeimg.com/100/100/arch',
					postImage: this.url,
					likes: 0,
					date: 'March 1',
					liked: false,
					content: this.handleWrite,
					filter: 'perpetua',
				};
				this.newData = { ...newPosts };
				this.$emit('results', this.newData);
			},
		},
		watch: {
			newData(a) {
				if (Object.keys(a).length !== 0) {
					this.$router.push('/');
				}
			},
		},
	});
</script>
