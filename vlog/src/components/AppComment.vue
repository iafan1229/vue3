<template>
	<div class="pt-5">
		<div>
			{{ Number($route.params.id) + 1 }}번째 게시물에 코멘트를 남겨주세요.
		</div>
		<div class="form-floating">
			<textarea
				class="form-control"
				placeholder="Leave a comment here"
				id="floatingTextarea"
			></textarea>
			<label for="floatingTextarea">Comments</label>
		</div>
	</div>
</template>

<script lang="ts">
	export default {};
</script>

<style></style>
