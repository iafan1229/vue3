<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-body-secondary">
			<div class="container-fluid">
				<h1 class="navbar-brand" href="#">
					<router-link to="/">건강관리 앱</router-link>
				</h1>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li v-for="(a, i) in url" :key="i" class="nav-item">
							<router-link
								exact
								active-class="active"
								class="nav-link"
								aria-current="page"
								:to="a"
								>{{ menu[i] }}</router-link
							>
						</li>
					</ul>
					<form class="d-flex" role="search">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button class="btn" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const url = ref(['/', '/write']);
	const menu = ref(['Home', 'Write']);
</script>

<style lang="scss">
	.navbar {
		background: #e3f2fd;
	}
	.navbar-nav li a.active {
		color: rgb(123, 121, 121) !important;
		font-weight: bold;
	}
</style>
