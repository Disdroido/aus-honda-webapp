import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import ProfileView from "../views/Profile.vue"
import SignInView from "../views/SignIn.vue"
import SignUpView from "../views/SignUp.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
  ],
});

export default router;
