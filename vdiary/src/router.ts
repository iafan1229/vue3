import { createWebHistory, createRouter } from 'vue-router';
import PostList from './components/PostList.vue';
import PostWrite from './components/PostWrite.vue';
import PostDetail from './components/PostDetail.vue';
import ChartVue from './components/ChartVue.vue';

const routes = [
	{
		path: '/',
		name: 'list',
		component: PostList,
	},
	{
		path: '/write',
		name: 'write',
		component: PostWrite,
	},
	{
		path: '/:id/detail',
		name: 'detail',
		component: PostDetail,
	},
	{
		path: '/chart',
		name: 'chart',
		component: ChartVue,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
