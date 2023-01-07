// vuex.d.ts
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
	// declare your own store states
	interface State {
		filter: string;
		dataLength: number;
		dataSet: Array;
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
