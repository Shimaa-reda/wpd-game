import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta:{title:"WPD Game"}
  },
  {
    path: '/day',
    name: 'day',
    component: () => import('../components/day.vue'),
    meta:{title:"WPD Game"}
    
  },
  // {
  //   path: '/score',
  //   name: 'score',
  //   component: () => import('../components/Score.vue'),
  //   meta:{title:"Score"}
  // }
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
