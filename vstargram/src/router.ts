import { createWebHistory, createRouter } from 'vue-router';
import ContainerVue from './components/ContainerVue.vue';
import WriteVue from './components/WriteVue.vue';
import UploadVue from './components/UploadVue.vue';
import MyPage from './components/MyPage.vue';

const routes = [
	{
		path: '/',
		component: ContainerVue,
	},
	{
		path: '/write',
		component: WriteVue,
	},
	{
		path: '/upload',
		component: UploadVue,
	},
	{
		path: '/mypage',
		component: MyPage,
	},
	// {
	// 	path: '/posts/:id',
	// 	components: {
	// 		default: AppDetail,
	// 		Author,
	// 		Comment,
	// 	},
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
