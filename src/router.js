import VueRouter from 'vue-router'
import Vue from 'vue'
import HomePage from './components/HomePage.vue';
import SelectWarrior from "./components/SelectWarrior.vue"
import FightPage from "./components/FightPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/warriors',
    component: SelectWarrior,
  },
  {
    path: '/fight',
    component: FightPage,
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router