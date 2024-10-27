import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Day from '../views/Day.vue'
import LastDay from '../views/LastDay.vue'

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
    component: () => Day,
    meta:{title:"WPD Game"}
  },
  ,
  {
    path: '/last_day',
    name: 'lastday',
    component: () => LastDay,
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
