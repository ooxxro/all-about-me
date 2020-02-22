import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import UserContainer from "../views/UserContainer.vue";
import Setting from "../views/Setting";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "*",
  //   redirect: "/login"
  // },
  // {
  //   path: "/",
  //   redirect: "/login"
  // },
  {
    path: "/user/:uid",
    name: "User",
    component: UserContainer,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("/login");
  else next();
});

export default router;
