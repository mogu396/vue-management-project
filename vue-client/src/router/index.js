import Vue from 'vue'
import VueRouter from 'vue-router'
// const Home=()=>import('../views/Home.vue')
const Home = () => import('../views/Home')
const Register = () => import('../views/Register')
const Login = () => import('../views/Login')
const Main = () => import('../views/Main')
const UserInfo = () => import('../views/UserInfo')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/', component: Main },
      { path: '/home', component: Main },
      { path: '/userinfo', name: 'UserInfo', component: UserInfo }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },


]

const router = new VueRouter({
  routes
})

// 路由守卫，jwt鉴权
router.beforeEach((to, from, next) => {
  // 判断localStorage中是否有token
  const isLogin = localStorage.userToken ? true : false
  // 对于登陆和注册，放行
  if (to.path === '/login' || to.path === 'register') {
    next()
  } else {
    if (isLogin) {
      next()
    } else {
      Vue.prototype.$message({
        message: '请登陆',
        type: 'warning'
      })
      next('/login')
    }
  }
})

export default router
