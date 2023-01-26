<template>
	<form class="write-form" @submit="(e:Event) => handleSubmit(e)">
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
				placeholder="0"
				v-model="values.water"
			/>잔
		</div>
		<div class="mb-3 num-input">
			<label class="form-label">하루 흡연량</label>
			<input
				type="number"
				class="form-control"
				placeholder="0"
				v-model="values.smoke"
			/>개비
		</div>
		<div class="mb-3 num-input">
			<label class="form-label">하루 주량</label>
			<select name="" id="" class="form-select">
				<option value="">소주</option>
			</select>
			<input
				type="number"
				class="form-control"
				placeholder="0"
				v-model="values.drink"
			/>병
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
					v-for="(a, i) in day"
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
					<select name="" id="" class="form-select" v-model="a.category">
						<option value="walk" selected>걷기</option>
						<option value="gym">헬스</option>
						<option value="yoga">요가</option>
						<option value="pilates">필라테스</option>
					</select>
					<div class="category-wrap">
						<div class="walk" v-if="a.walk">
							<h4>스마트폰에 입력된 걷기양을 입력하세요*</h4>
							<input type="text" class="form-control" v-model="a.amount" /><span
								>걸음</span
							>
						</div>
						<div class="others" v-if="!a.walk">
							<h4>운동 횟수를 입력하세요</h4>
							<input type="text" class="form-control" v-model="a.amount" /><span
								>회</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<h4>메모</h4>
		<div class="form-floating">
			<textarea
				v-model="text"
				class="form-control"
				placeholder="Leave a comment here"
				id="floatingTextarea2"
				style="height: 100px"
			></textarea>
			<label for="floatingTextarea2">간단하게 할말 남기기</label>
		</div>
		<input type="submit" class="btn btn-dark" value="submit" />
	</form>
</template>

<script setup lang="ts">
	import router from '@/router';
	import { onMounted, watch, reactive, ref, computed, onUpdated } from 'vue';
	import PostCalendar from './PostCalendar.vue';
	import { firestore } from '../firebase';
	const dateValue = ref(new Date());
	const calendar = ref(false);
	const myInput = ref<HTMLElement | null>(null);
	const exercise = ref<boolean>(false);
	const tabNum = ref<number>(0);
	const category1 = ref<string>('walk');
	const category2 = ref('walk');
	const walk1 = ref<boolean>(true);
	const walk2 = ref<boolean>(true);
	const amount1 = ref(0);
	const amount2 = ref(0);
	const array = ref([
		{ num: 1, category: category1, walk: walk1, amount: amount1 },
		{ num: 2, category: category2, walk: walk2, amount: amount2 },
	]);
	const checked = ref<string>('');
	const text = ref('');

	interface IValues {
		category: string;
		morning: IDaily;
		afternoon: IDaily;
	}
	interface IDaily {
		num: INum;
	}
	interface INum {
		walk: number;
		etc: number;
	}
	const day = reactive<Array<string>>(['오전', '오후']);
	const values = reactive({ water: 0, smoke: 0, drink: 0 });

	const handleSubmit = (e: Event) => {
		const todos = firestore.collection('todos');
		e.preventDefault();
		todos.add({
			date: dateValue.value.toLocaleDateString().toString(),
			values: values,
			exercise: array.value,
			text: text.value,
		});

		router.push('/');
	};
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
	watch(category1, (a) => {
		if (a === 'walk') {
			walk1.value = true;
		} else {
			walk1.value = false;
		}
	});
	watch(category2, (a) => {
		if (a === 'walk') {
			walk2.value = true;
		} else {
			walk2.value = false;
		}
	});
	watch(text, (a) => {
		if (a.length > 20) {
			alert('문자가 너무 깁니다');
			return;
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
