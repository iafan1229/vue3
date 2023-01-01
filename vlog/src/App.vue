<template>
	<div>
		<NavBar />
		<router-view :data="Data"></router-view>
		<router-view name="Author" class="ms-3 me-3"></router-view>
		<router-view name="Comment" class="ms-3 me-3"></router-view>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import NavBar from './components/AppHeader.vue';
	import Data from './assets/data';
	// import AppHome from './components/AppHome.vue';
	// import AppPost from './components/AppPosts.vue';

	export default defineComponent({
		name: 'App',
		components: {
			NavBar,
			// AppHome,
			// AppPost,
		},
		data() {
			return {
				Data,
			};
		},
	});
</script>
