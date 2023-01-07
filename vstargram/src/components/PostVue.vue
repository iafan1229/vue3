<template>
	<div class="post-wrap">
		<div class="post">
			<div class="post-header">
				<div
					class="profile"
					:style="{ 'background-image': `url(${data?.postImage}` }"
				></div>
				<span class="profile-name">{{ data?.name }}</span>
			</div>
			<div
				class="post-body"
				:style="{ 'background-image': `url(${data?.postImage}` }"
				:class="data?.filter ? data?.filter : ''"
			></div>
			<div class="post-content">
				<p
					class="likes"
					@click="$emit('changeLike')"
					:style="{
						cursor: 'pointer',
						display: 'inline-block',
					}"
				>
					{{ likes && likes }} Likes
				</p>
				<p
					class="likes"
					@click="$emit('minus', -1)"
					:style="{
						display: 'inline-block',
						paddingLeft: '10px',
						cursor: 'pointer',
					}"
				>
					disLike
				</p>
				<p>
					<strong>{{ data?.name }}</strong> {{ data?.content }}
				</p>
				<p class="date">{{ data?.date }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		props: {
			data: Object,
			likes: Number,
		},
	});
</script>
<style>
	.post-wrap {
		border-top: 1px solid rgb(235, 234, 234);
	}
	.post {
		width: 100%;
	}
	.profile {
		/* background-image: url("https://placeimg.com/100/100/arch"); */
		width: 30px;
		height: 30px;
		background-size: 100%;
		border-radius: 50%;
		float: left;
	}
	.profile-name {
		display: block;
		float: left;
		padding-left: 10px;
		padding-top: 7px;
		font-size: 14px;
	}
	.post-header {
		height: 30px;
		padding: 10px;
	}
	.post-body {
		height: 450px;
		background-position: center;
		background-size: cover;
	}
	.post-content {
		padding-left: 15px;
		padding-right: 15px;
		font-size: 14px;
	}
	.post-content .likes {
		color: rgb(44, 109, 185);
	}
	.date {
		font-size: 11px;
		color: grey;
		margin-top: -8px;
	}
</style>
