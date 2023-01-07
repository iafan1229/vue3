// store.ts
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import post from './assets/post';

// define your typings for the store state
export interface State {
	filter: string;
	dataLength: number;
	dataSet: Array<any>;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		filter: '',
		dataLength: post.length,
		dataSet: post,
	},
	mutations: {
		filtering(state, data) {
			state.filter = data;
		},
		increase(state) {
			state.dataLength += 1;
		},
		changeData(state, data) {
			state.dataSet.push(data);
		},
	},
	actions: {
		getData(context) {
			fetch(`https://codingapple1.github.io/vue/more1.json`)
				.then((res) => res.json())
				.then((res) => {
					context.commit('changeData', res);
					context.commit('increase');
				});
		},
	},
});
