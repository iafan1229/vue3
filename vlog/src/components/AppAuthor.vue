<template>
	<div>
		<hr />

		<div>{{ Number($route.params.id) + 1 }}번째 게시글에 대한 copyright</div>
		<div class="card">
			<div class="card-header">Featured</div>
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	export default {};
</script>

<style></style>
