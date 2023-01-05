<template>
	<div>
		<!-- 필터선택페이지 -->
		<div
			class="upload-image"
			:style="{
				backgroundImage: `url(${url ? url : imageUrl}) `,
			}"
		></div>
		<div class="filters">
			<div
				:style="{ backgroundImage: `url(${url ? url : imageUrl})` }"
				v-for="(a, i) in filters"
				:key="i"
				:class="`filter-1 filter-item ${a}`"
			>
				<slot></slot>
			</div>
		</div>

		<!-- 글작성페이지 -->
		<button @click="$router.push('/write')">포스팅 글 작성하기</button>
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
				image: true,
				imageUrl: '' as string | null,
				filters: [
					'aden',
					'_1977',
					'brannan',
					'brooklyn',
					'clarendon',
					'earlybird',
					'gingham',
					'hudson',
					'inkwell',
					'kelvin',
					'lark',
					'lofi',
					'maven',
					'mayfair',
					'moon',
					'nashville',
					'perpetua',
					'reyes',
					'rise',
					'slumber',
					'stinson',
					'toaster',
					'valencia',
					'walden',
					'willow',
					'xpro2',
				],
			};
		},
		created() {
			this.$emit('image');
			this.$emit('writing');
		},
		methods: {
			upload(e: Event) {
				e.preventDefault();
				const file = e.target as HTMLInputElement;
				const filed = file.files;
				const url = filed && URL.createObjectURL(filed[0]);
				this.imageUrl = filed && url;
			},
		},
	});
</script>
<style>
	.upload-image {
		width: 100%;
		height: 450px;
		background: cornflowerblue;
		background-size: cover;
	}
	.filters {
		overflow-x: scroll;
		white-space: nowrap;
	}
	.filter-1 {
		width: 100px;
		height: 100px;
		background-color: cornflowerblue;
		margin: 10px 10px 10px auto;
		padding: 8px;
		display: inline-block;
		color: white;
		background-size: cover;
	}
	.filters::-webkit-scrollbar {
		height: 5px;
	}
	.filters::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	.filters::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 5px;
	}
	.filters::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	.write-box {
		border: none;
		width: 90%;
		height: 100px;
		padding: 15px;
		margin: auto;
		display: block;
		outline: none;
	}
	.filter-item {
		width: 100px;
		height: 100px;
		margin: 10px 10px 10px auto;
		padding: 8px;
		display: inline-block;
		color: white;
		background-size: cover;
		background-position: center;
	}
</style>
