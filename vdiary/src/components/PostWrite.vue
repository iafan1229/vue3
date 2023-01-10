<template>
	<form class="write-form">
		<transition name="fade">
			<PostCalendar
				@date-change="(date:Date) => (dateValue = date)"
				v-if="calendar"
				@change-boolean="calendar = false"
			/>
		</transition>

		<div>
			<input
				class="form-control"
				type="text"
				readonly
				:placeholder="`${dateValue.getFullYear()}.${
					dateValue.getMonth() + 1
				}.${dateValue.getDate()}`"
				@click="calendar = true"
			/>
		</div>

		<div class="mb-3 num-input">
			<label class="form-label">하루 마신 물의 양</label>
			<input type="number" class="form-control" />잔
		</div>
		<div class="mb-3 num-input">
			<label class="form-label">하루 흡연량</label>
			<input type="number" class="form-control" />개비
		</div>
		<div class="mb-3 num-input">
			<label class="form-label">하루 주량</label>
			<select name="" id="" class="form-select">
				<option value="">소주</option>
			</select>
			<input type="number" class="form-control" />병
		</div>
		<div class="form-floating">
			<textarea
				class="form-control"
				placeholder="Leave a comment here"
				id="floatingTextarea2"
				style="height: 100px"
			></textarea>
			<label for="floatingTextarea2">간단하게 할말 남기기</label>
		</div>
		<!-- <div class="form-check">
			<input
				class="form-check-input"
				type="checkbox"
				value=""
				id="flexCheckDefault"
			/>
			<label class="form-check-label" for="flexCheckDefault">
				Default checkbox
			</label>
		</div> -->
		<!-- <div class="form-check">
			<input
				class="form-check-input"
				type="checkbox"
				value=""
				id="flexCheckChecked"
				checked
			/>
			<label class="form-check-label" for="flexCheckChecked"> 운동 여부 </label>
		</div> -->
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="flexRadioDefault"
				id="flexRadioDefault1"
			/>
			<label class="form-check-label" for="flexRadioDefault1">
				운동 햇음
			</label>
		</div>
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="flexRadioDefault"
				id="flexRadioDefault2"
				checked
			/>
			<label class="form-check-label" for="flexRadioDefault2">
				운동 안했음
			</label>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import PostCalendar from './PostCalendar.vue';

	const dateValue = ref(new Date());
	const calendar = ref(false);
</script>

<style lang="scss">
	div {
		padding: 5px 0;
	}
	.num-input {
		display: flex;
		input {
			width: 100px;
		}
		.form-select {
			width: 100px;
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
	.write-form {
		padding: 0 7px;
		label {
			padding-right: 5px;
		}
		input {
			margin: 0 5px;
		}
	}
</style>
