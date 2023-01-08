<template>
	<div>
		<div class="header">
			<ul class="header-button-left">
				<li
					@click="
						$router.go(-1);
						show = true;
					"
				>
					Go Back
				</li>
			</ul>
			<ul class="header-button-right">
				<li>
					<router-link to="/mypage">search</router-link>
				</li>
				<li>
					<router-link :to="show ? '/' : '/upload'">{{
						show ? 'post' : 'write'
					}}</router-link>
				</li>
			</ul>
			<img src="./assets/logo.png" class="logo" />
		</div>

		<router-view
			:postData="postData"
			:url="imageUrl && imageUrl"
			@show="show = false"
			@results="(a) => a && postData.unshift(a)"
		/>

		<div class="footer">
			<ul class="footer-button-plus">
				<input
					type="file"
					id="file"
					class="inputfile"
					@input="(e) => upload(e)"
				/>
				<label for="file" class="input-plus">+</label>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	// import ContainerVue from './components/ContainerVue.vue';
	import postData from './assets/post';

	export default defineComponent({
		data() {
			return {
				postData,
				show: true,
				writing: false,
				imageUrl: '' as null | string,
			};
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
		updated() {
			if (this.imageUrl !== '') this.$router.push('/upload');
		},
		components: {
			// ContainerVue,
		},
	});
</script>
<style>
	body {
		margin: 0;
	}
	ul {
		padding: 5px;
		list-style-type: none;
	}
	.logo {
		width: 100px;
		margin: auto;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 8px;
	}
	.header {
		width: 100%;
		height: 40px;
		padding-bottom: 8px;
		position: sticky;
		top: 0;
		background: white;
	}
	.header-button-left {
		color: rgb(81, 178, 216);
		float: left;
		width: 100px;
		padding-left: 20px;
		cursor: pointer;
		margin-top: 10px;
	}
	.header-button-right {
		color: rgb(68, 164, 201);
		position: absolute;
		right: 0;
		width: 120px;
		cursor: pointer;
		margin-top: 10px;
	}
	.header-button-right li {
		display: inline-block;
		padding-left: 10px;
	}
	.footer {
		width: 100%;
		position: sticky;
		bottom: 0;
		padding-bottom: 10px;
		background-color: white;
		background: #e9f3f7;
	}
	.footer-button-plus {
		width: 100%;
		margin: auto;
		text-align: center;
		cursor: pointer;
		font-size: 24px;
		padding-top: 12px;
	}
	.footer-button-plus * {
		width: 100%;
	}
	.sample-box {
		width: 100%;
		height: 600px;
		background-color: bisque;
	}
	.inputfile {
		width: 100%;
		display: none;
	}
	.input-plus {
		display: inline-block;
		width: 100%;
		cursor: pointer;
	}
	#app {
		box-sizing: border-box;
		font-family: 'sans-serif';
		margin-top: 60px;
		width: 100%;
		max-width: 460px;
		margin: auto;
		position: relative;
		border-right: 1px solid #eee;
		border-left: 1px solid #eee;
	}
	a {
		color: rgb(98, 194, 233);
		text-decoration: none;
	}
	button {
		background: rgb(39, 106, 188);
		color: #fff;
		text-align: center;
		width: 100%;
		height: 30px;
		border: none;
		outline: none;
		margin: 20px 0;
	}
</style>
