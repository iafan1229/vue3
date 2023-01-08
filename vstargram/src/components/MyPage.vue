<template>
	<div>
		<div style="padding: 10px">
			<h4>팔로워</h4>
			<input placeholder="?" v-model="filterWord" />
			<div class="post-header" v-for="(a, i) in follower" :key="i">
				<div
					class="profile"
					:style="{ backgroundImage: `url(${a.image})` }"
				></div>
				<span class="profile-name">{{ a.name }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { ref, onMounted, watch } from 'vue';
	import type { Ref } from 'vue';

	interface IFollower {
		id: number;
		name: string;
		image: string;
	}

	export default defineComponent({
		setup() {
			const original: Ref<IFollower[]> = ref([]);
			const follower: Ref<IFollower[]> = ref([]);
			const filterWord: Ref<string> = ref('');

			onMounted(() => {
				fetch('/follower.json')
					.then((res) => res.json())
					.then((res) => (original.value = res));
			});

			watch(original, () => {
				if (original.value.length) follower.value = [...original.value];
			});

			watch(filterWord, () => {
				if (filterWord.value) {
					follower.value = [
						...original.value.filter((el) =>
							el.name.includes(filterWord.value)
						),
					];
				} else {
					follower.value = original.value;
				}
			});

			return { follower, filterWord };
		},
	});
</script>
