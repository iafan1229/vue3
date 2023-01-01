import { createWebHistory, createRouter } from 'vue-router';
import Home from './components/AppHome.vue';
import Post from './components/AppPosts.vue';
import AppDetail from './components/AppDetails.vue';
import Author from './components/AppAuthor.vue';
import Comment from './components/AppComment.vue';

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/posts',
		component: Post,
	},
	{
		path: '/posts/:id',
		components: {
			default: AppDetail,
			Author,
			Comment,
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
