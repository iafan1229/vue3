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
			<input
				type="number"
				class="form-control"
				ref="myInput"
				placeholder="1"
			/>잔
		</div>
		<div class="mb-3 num-input">
			<label class="form-label">하루 흡연량</label>
			<input type="number" class="form-control" placeholder="1" />개비
		</div>
		<div class="mb-3 num-input">
			<label class="form-label">하루 주량</label>
			<select name="" id="" class="form-select">
				<option value="">소주</option>
			</select>
			<input type="number" class="form-control" placeholder="1" />병
		</div>
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="flexRadioDefault"
				id="flexRadioDefault1"
				v-model="checked"
				value="noExercise"
				checked
			/>
			<label class="form-check-label" for="flexRadioDefault1">
				운동 안햇음
			</label>
		</div>
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="flexRadioDefault"
				id="flexRadioDefault2"
				v-model="checked"
				value="Exercise"
			/>
			<label class="form-check-label" for="flexRadioDefault2">
				운동 했음
			</label>
		</div>
		<div class="tab" v-if="exercise">
			<ul class="nav nav-tabs">
				<li
					class="nav-item"
					v-for="(a, i) in ['오전', '오후']"
					:key="i"
					:class="tabNum === i ? 'active' : null"
					@click="tabNum = i"
				>
					<a class="nav-link" aria-current="page" href="#">{{ a }}</a>
				</li>
			</ul>
			<div class="nav-content" v-for="(a, i) in array" :key="i" :data-index="i">
				<div v-if="tabNum === i">
					<h4>운동을 선택하세요*</h4>
					<select name="" id="" class="form-select" v-model="category">
						<option value="0">걷기</option>
						<option value="1">헬스</option>
						<option value="2">요가</option>
						<option value="3">필라테스</option>
					</select>
					<div class="category-wrap">
						<div class="walk" v-if="walk">
							<h4>스마트폰에 입력된 걷기양을 입력하세요*</h4>
							<input type="text" class="form-control" /><span>걸음</span>
						</div>
						<div class="others" v-if="!walk">
							<h4>운동 횟수를 입력하세요</h4>
							<input type="text" class="form-control" /><span>회</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<h4>메모</h4>
		<div class="form-floating">
			<textarea
				class="form-control"
				placeholder="Leave a comment here"
				id="floatingTextarea2"
				style="height: 100px"
			></textarea>
			<label for="floatingTextarea2">간단하게 할말 남기기</label>
		</div>
		<button type="submit" class="btn btn-dark">submit</button>
	</form>
</template>

<script setup lang="ts">
	import { onMounted, watch, reactive, ref, computed } from 'vue';
	import PostCalendar from './PostCalendar.vue';

	const dateValue = ref(new Date());
	const calendar = ref(false);
	const myInput = ref<HTMLElement | null>(null);
	const exercise = ref<boolean>(false);
	const tabNum = ref<number>(0);
	const array = computed(() => {
		return [1, 2];
	});
	const checked = ref<string>('');
	const category = ref<string>('0');
	const walk = ref<boolean>(true);

	onMounted(() => {
		if (myInput.value) myInput.value.focus();
	});
	watch(checked, (a) => {
		if (a === 'Exercise') {
			exercise.value = true;
		} else {
			exercise.value = false;
		}
	});
	watch(category, (a) => {
		if (a === '0') {
			walk.value = true;
		} else {
			walk.value = false;
		}
	});
</script>

<style lang="scss">
	.write-form {
		div {
			padding: 5px 0;
		}
		.nav-content {
			padding: 0;
			div {
				padding: 15px 0;
			}
		}
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
	.nav-item {
		&.active {
			background-color: #f3feff;
		}
	}
	.nav-content {
		h4 {
			font-size: 16px;
		}
		input {
			display: inline-block;
			width: 100px;
		}
		span {
			display: inline-block;
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
	button[type='submit'] {
		margin: 10px 0;
	}
	.form-check .form-check-input {
		margin-left: 5px;
	}
</style>
