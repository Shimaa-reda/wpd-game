import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta:{title:"Home"}
  },
  // {
  //   path: '/questions',
  //   name: 'questions',
  //   component: () => import('../components/game.vue'),
  //   meta:{title:"Quiz"}
  // },
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
