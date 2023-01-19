<template>
	<ul class="card-box">
		<li
			v-for="(a, i) in dataContent"
			:key="i"
			class="container"
			:class="
				a.values &&
				(
					Object.values(a.values).filter((el, idx) => idx === 0 && el <= 3) &&
					Object.values(a.values).filter((el, idx) => idx !== 0 && el > 0)
				).length > 0
					? 'good'
					: a.values &&
					  Object.values(a.values).filter((el, idx) => idx === 0 && el >= 10)
							.length > 0
					? 'bad'
					: 'normal'
			"
		>
			<router-link :to="`${i}/detail`">
				<div class="item front">
				<div class="card">
					<div class="tools">
						<div class="circle">
							<span class="red box"></span>
						</div>
						<div class="circle">
							<span class="yellow box"></span>
						</div>
						<div class="circle">
							<span class="green box"></span>
						</div>
					</div>
					<div class="card__content">
						<div class="card__color">
							<div class="card-wrap">
								<h6>데이터 검사 결과</h6>
								<p ref="status">
									{{
										a.values &&
										(
											Object.values(a.values).filter(
												(el, idx) => idx === 0 && el <= 3
											) &&
											Object.values(a.values).filter(
												(el, idx) => idx !== 0 && el > 0
											)
										).length > 0
											? '좋음'
											: a.values &&
											  Object.values(a.values).filter(
													(el, idx) => idx === 0 && el >= 10
											  ).length > 0
											? '나쁨'
											: '보통'
									}}
								</p>
								<h5
									:class="`date-title date${i}`"
									v-for="(x, i) in a['date']?.split('.').slice(0, 1)"
									:key="i"
								>
									{{ x === '2023' ? x + '年' : x }}
								</h5>
								<div class="date-inner">
									<h5
										:class="`date-title date${i}`"
										v-for="(x, i) in a['date']?.split('.').slice(1, 3)"
										:key="i"
									>
										{{ x.length === 2 ? '0' + x.trim() : x }}
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="item back">
				<p :style="{ fontSize: '16px' }">
					마신 주량은 {{ a.values?.drink }}이고 <br />
					흡연량은 {{ a.values?.smoke }}. <br />
					마신 물은 {{ a.values?.water }} 잔 입니다.
				</p>
			</div>
		</router-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { reactive, onMounted, onUpdated, ref } from 'vue';
	import data from '../assets/data';
	import { firestore } from '../firebase';
	const status = ref<HTMLElement | null>(null);

	interface IValues {
		date?: string;
		exercise?: IExer;
		values?: IVal;
	}
	interface IVal {
		smoke?: number;
		water?: number;
		drink?: number;
	}
	interface IExer {
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

	let dataContent = reactive<Array<IValues>>([]);

	const todos = firestore.collection('todos');
	todos.get().then((prod) => {
		prod.forEach((el) => {
			dataContent.push(el.data());
		});
	});
	// dataContent = [...localData];
</script>

<style lang="scss">
	.card-box {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
		padding: 15px 0;
		li {
			position: relative;
			width: calc(100% / 3 - 30px);
			height: 300px;
			text-align: center;
			.card {
				background: radial-gradient(lightgray, #fff);
			}
			h6 + p {
				font-size: 25px;
			}
			a {
				display: block;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 100%;

				h5,
				h6 {
					white-space: nowrap;
					display: block;
				}
				h6 {
					font-size: 17px;
					color: gray;
				}
				h5 {
					font-size: 18px;
					max-width: 80%;
					margin: 0 auto;
					padding: 10px 4px;
					&.date1,
					&.date2 {
						font-size: 18px;
					}
				}
			}
			&.good {
				.card__color {
					background: linear-gradient(to right, #ffc6ec, rgb(255, 255, 183));
					box-shadow: inset 2px 2px 2px rgb(0 0 0 / 7%);
					border-radius: 8px;
					width: calc(100% - 1rem * 4);
					height: calc(100% - 1rem * 4);
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					overflow: hidden;
				}
			}
			&.normal {
				.card__color {
					background: linear-gradient(to right, #fbf5c7, rgb(192, 235, 236));
					box-shadow: inset 16px 16px 26px rgb(0 0 0 /5%);
					border-radius: 8px;
					width: calc(100% - 1rem * 4);
					height: calc(100% - 1rem * 4);
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					overflow: hidden;
				}
			}
		}
	}
	.card {
		height: 100%;
		margin: 0 auto;
		background-color: #f8fbfe;
		border-radius: 8px;
		z-index: 1;
	}

	.tools {
		display: flex;
		align-items: center;
		padding: 9px;
	}

	.circle {
		padding: 0 4px;
	}

	.box {
		display: block;
		align-items: center;
		width: 10px;
		height: 10px;
		padding: 1px;
		border-radius: 50%;
	}

	.red {
		background-color: #ff605c;
	}

	.yellow {
		background-color: #ffbd44;
	}

	.green {
		background-color: #00ca4e;
	}
	.date-title {
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		border-radius: 0%;
		&.date0 {
			display: inline-block;
			vertical-align: middle;
			line-height:0.2;
		}
		&.date1,
		&.date2 {
			display: inline-block;
		}

		&.date1 {
			vertical-align: middle;
			line-height: 0.2;
		}
		&.date2 {
			
		}
	}
	.card-wrap {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	p {
		font-weight: bold;
		font-size: 25px;
	}
	p + .date-title.date0 {
		border-radius: 0;
		position: relative;
		background: transparent;
		color: #000;
		&::before {
			content: '';
			position: absolute;
			bottom: -2px;
			left: 50%;
			display: inline-block;
			width: 90%;
			height: 2px;
			background: #000;
			transform: translateX(-50%);
		}
	}
	.container {
		perspective: 3000px;
	}

	.container .item {
		width: 100%;
		height: 100%;
		font-size: 35px;
		backface-visibility: hidden;
		transition: 1s;
	}

	.container .item.front {
		height: 100%;
		position: absolute;
		transform: rotateY(0deg);
	}

	.container:hover .item.front {
		transform: rotateY(180deg);
	}

	.container .item.back {
		height: 100%;
		transform: rotateY(-180deg);
		background: radial-gradient(lightgray, #fff);
		border: 1px solid lightgray;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: Center;
	}

	.container:hover .item.back {
		transform: rotateY(0deg);
	}
</style>
