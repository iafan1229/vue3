<template>
	<div class="nav-wrap">
		<nav class="navbar navbar-expand-lg bg-body-secondary">
			<div class="container-fluid">
				<h1 class="navbar-brand" href="#">
					<router-link to="/">HY's Healthcare</router-link>
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
					<div class="form">
						<input
							class="input"
							placeholder="Type your text"
							required="true"
							type="text"
						/>
						<span class="input-border"></span>
					</div>
					<ButtonVue search="search" />
				</div>
			</div>
		</nav>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import ButtonVue from '@/components/ButtonVue.vue';
	const url = ref(['/', '/write', '/chart']);
	const menu = ref(['Home', 'Write', 'Chart']);
</script>

<style lang="scss">
	.navbar {
		background: linear-gradient(to right, #161623, #35358e);
		padding: 10px 0;
		h1 {
			a {
				font-size: 24px;
				letter-spacing: 2.9px;
				font-family: 'headFont';
				color: rgb(199, 204, 68) !important;
			}
		}
		a.nav-link {
			color: gray !important;
			&.active {
				color: #fff !important;
				font-weight: bold !important;
			}
		}
	}
	.navbar-nav li a.active {
		color: rgb(123, 121, 121) !important;
		font-weight: bold;
	}
	.form {
		--width-of-input: 200px;
		--border-height: 1px;
		--border-before-color: rgba(221, 221, 221, 0.39);
		--border-after-color: #5891ff;
		--input-hovered-color: #4985e01f;
		position: relative;
		width: var(--width-of-input);
		margin-right: 15px;
	}
	/* styling of Input */
	.input {
		color: #fff;
		font-size: 0.9rem;
		background-color: transparent;
		width: 100%;
		box-sizing: border-box;
		padding-inline: 0.5em;
		padding-block: 0.7em;
		border: none;
		border-bottom: var(--border-height) solid var(--border-before-color);
	}
	/* styling of animated border */
	.input-border {
		position: absolute;
		background: var(--border-after-color);
		width: 0%;
		height: 2px;
		bottom: 0;
		left: 0;
		transition: 0.3s;
	}
	/* Hover on Input */
	input:hover {
		background: var(--input-hovered-color);
	}

	input:focus {
		outline: none;
	}
	/* here is code of animated border */
	input:focus ~ .input-border {
		width: 100%;
	}
	/* === if you want to do animated border on typing === */
	/* remove input:focus code and uncomment below code */
	/* input:valid ~ .input-border{
	  width: 100%;
	} */
	.nav-wrap {
		margin-bottom: 20px;
	}
</style>
