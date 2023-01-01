<template>
	<div>
		<ul class="list-group">
			<li class="list-group-item">
				{{ data[Number($route.params.id)].title }}
			</li>
			<li class="list-group-item">
				{{ data[Number($route.params.id)].content }}
			</li>
			<li class="list-group-item">{{ data[Number($route.params.id)].date }}</li>
			<li class="list-group-item">
				{{ data[Number($route.params.id)].number }}
			</li>
		</ul>
		<button
			type="button"
			class="btn btn-dark mt-5 mb-5 ms-2"
			@click="$router.go(-1)"
		>
			뒤로가기
		</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		props: {
			data: Array,
		},
		// data() {
		//   return {
		//   };
		// },
		// methods: {
		//   },
		// },
	});
</script>
