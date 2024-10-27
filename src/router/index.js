import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{title:"WPD Game"}
  },
  {
    path: '/day',
    name: 'day',
    component: () => import('../views/Day.vue'),
    meta:{title:"WPD Game"}
  },
  ,
  {
    path: '/last_day',
    name: 'lastday',
    component: () => import ('../views/LastDay.vue'),
    meta:{title:"WPD Game"}
  },
  {
    path: '/clear',
    name: 'clear',
    component: () => import ('../views/Clear.vue'),
    meta:{title:"WPD Game"}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title;
  next();
});


export default router
