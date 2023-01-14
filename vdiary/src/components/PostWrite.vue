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
					<select name="" id="" class="form-select" v-model="category">
						<option value="walk" selected>걷기</option>
						<option value="gym">헬스</option>
						<option value="yoga">요가</option>
						<option value="pilates">필라테스</option>
					</select>
					<div class="category-wrap">
						<div class="walk" v-if="walk">
							<h4>스마트폰에 입력된 걷기양을 입력하세요*</h4>
							<input
								type="text"
								class="form-control"
								v-model="count.walk"
							/><span>걸음</span>
						</div>
						<div class="others" v-if="!walk">
							<h4>운동 횟수를 입력하세요</h4>
							<input
								type="text"
								class="form-control"
								v-model="count.amount"
							/><span>회</span>
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
		<input type="submit" class="btn btn-dark" value="submit" />
	</form>
</template>

<script setup lang="ts">
	import router from '@/router';
	import { onMounted, watch, reactive, ref, computed, onUpdated } from 'vue';
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
	const category = ref<string>('walk');
	const walk = ref<boolean>(true);
	const num = ref<number>(0);

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
	const count = reactive({ walk: 0, amount: 0 });
	const exerciseValues = reactive<IValues>({
		category: 'walk',
		morning: { num: { walk: 0, etc: 0 } },
		afternoon: { num: { walk: 0, etc: 0 } },
	});

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		num.value = localStorage.length;
		localStorage.setItem(
			String(num.value),
			JSON.stringify({
				date: dateValue.value.toLocaleDateString().toString(),
				values: values,
				exercise: exerciseValues,
			})
		);
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
	watch(category, (a) => {
		exerciseValues.category = a;

		if (a === 'walk') {
			walk.value = true;
		} else {
			walk.value = false;
		}
	});
	onUpdated(() => {
		if (category.value === 'walk') {
			if (tabNum.value === 0) {
				exerciseValues.morning.num.walk = count.walk;
			} else {
				exerciseValues.afternoon.num.walk = count.walk;
			}
		} else {
			if (tabNum.value === 0) {
				exerciseValues.morning.num.etc = count.amount;
			} else {
				exerciseValues.afternoon.num.etc = count.amount;
			}
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
