import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";;
import ProfileView from "../views/Profile.vue";
import SignInView from "../views/SignIn.vue";
import SignUpView from "../views/SignUp.vue";
import AdminStoreView from "../views/admin/Store.vue";
import AdminStoreEditView from "../views/admin/Edit.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      meta: {
        requiresAuth: true,
      },
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
    {
      path: "/admin/store",
      name: "store",
      component: AdminStoreView,
    },
    {
      path: "/admin/store/edit/:id",
      name: "edit",
      component: AdminStoreEditView,
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
