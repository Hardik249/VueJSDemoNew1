import Home from "@/views/home.vue";

export const routes = [
  {
    path: "/",
    component: Home,
    // meta: { requiresAuth: false },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import("@views/AboutView.vue"),
  //   meta: { breadCrumb: 'About' },
  // },
  {
    path: '/register',
    name: 'Register',
    // component: Register
    component: () => import("@/views/Register.vue"),
    meta: { breadCrumb: 'Register' },
  },
  {
    path: '/login',
    name: 'Login',
    component: import("@/views/Login.vue"),
    meta: { breadCrumb: 'Login' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: import("@/views/Profile.vue"),
    meta: { breadCrumb: 'Profile' },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/auth.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard.vue"),
    children: [
      {
        path: "history",
        component: () => import("./views/dashboard/history.vue"),
      },
      /* {
        path: "security",
        component: UserHome,
      },
      {
        path: "contact",
        component: UserHome,
      },
      {
        path: "logout",
        component: UserHome,
      }, */
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
