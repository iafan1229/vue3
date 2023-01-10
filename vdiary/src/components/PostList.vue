<template>
	<ul>
		<li v-for="(a, i) in data" :key="i">
			<router-link :to="`${i}/detail`" class="card" style="width: 18rem">
				<div class="card-body">
					<h5 class="card-title">{{ a.date }}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
					<p class="card-text">
						{{ a.comment }}
					</p>
				</div>
			</router-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import data from '../assets/data';
</script>

<style lang="scss"></style>
