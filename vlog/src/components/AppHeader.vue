<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">VueLog</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav">
					<router-link class="nav-link" to="/posts">Posts</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		data() {
			return {
				clicked: 0,
			};
		},
		methods: {
			tmp() {
				console.log('hi');
			},
		},
	});
</script>
