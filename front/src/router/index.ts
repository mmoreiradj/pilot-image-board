import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/auth/SignUpView.vue";
import SignInView from "../views/auth/SignInView.vue";
import { useUserStore } from "@/stores";

const DEFAULT_TITLE = "Pilot";

const enum User {
  ANONYMOUS,
  NOT_AUTHENTICATED,
  AUTHENTICATED,
  ADMIN,
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
      security: User.ANONYMOUS,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin/AdminView.vue"),
    meta: {
      title: "Admin",
      security: User.ADMIN,
    },
  },
  {
    path: "/create-category",
    name: "create-category",
    component: () => import("../views/admin/CreateCategoryView.vue"),
    meta: {
      title: "Create Category",
      security: User.ADMIN,
    },
  },
  {
    path: "/category/:categoryId/edit",
    name: "edit-category",
    component: () => import("../views/admin/EditCategoryView.vue"),
    meta: {
      title: "Edit Category",
      security: User.ADMIN,
    },
  },
  {
    path: "/create-board",
    name: "create-board",
    component: () => import("../views/admin/CreateBoardView.vue"),
    meta: {
      title: "Create Category",
      security: User.ADMIN,
    },
  },
  {
    path: "/board/:boardId/edit",
    name: "edit-board",
    component: () => import("../views/admin/EditBoardView.vue"),
    meta: {
      title: "Edit Category",
      security: User.ADMIN,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin/AdminView.vue"),
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/create-category",
    name: "create-category",
    component: () => import("../views/admin/CreateCategoryView.vue"),
    meta: {
      title: "Create Category",
    },
  },
  {
    path: "/category/:categoryId/edit",
    name: "edit-category",
    component: () => import("../views/admin/EditCategoryView.vue"),
    meta: {
      title: "Edit Category",
    },
  },
  {
    path: "/create-board",
    name: "create-board",
    component: () => import("../views/admin/CreateBoardView.vue"),
    meta: {
      title: "Create Category",
    },
  },
  {
    path: "/board/:boardId/edit",
    name: "edit-board",
    component: () => import("../views/admin/EditBoardView.vue"),
    meta: {
      title: "Edit Category",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
    meta: {
      title: "Sign Up",
      security: User.NOT_AUTHENTICATED,
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView,
    meta: {
      title: "Sign In",
      security: User.NOT_AUTHENTICATED,
    },
  },
  {
    path: "/:boardId",
    name: "board",
    component: () => import("../views/board/BoardView.vue"),
    meta: {
      title: "Board",
      security: User.ANONYMOUS,
    },
  },
  {
    path: "/:boardId/start-thread",
    name: "start-thread",
    component: () => import("../views/thread/StartThreadView.vue"),
    meta: {
      title: "Start Thread",
      security: User.AUTHENTICATED,
    },
  },
  {
    path: "/:boardId/threads/:threadId",
    name: "thread",
    component: () => import("../views/thread/ThreadView.vue"),
    meta: {
      title: "Thread",
      security: User.ANONYMOUS,
    },
  },
  {
    path: "/:boardId/threads/:threadId/post",
    name: "post",
    component: () => import("../views/post/CreatePostView.vue"),
    meta: {
      title: "Post",
      security: User.AUTHENTICATED,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/common/NotFoundView.vue"),
    meta: {
      title: "Not Found",
      security: User.ANONYMOUS,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.initUser();
  document.title = to.meta.title ? String(to.meta.title) : DEFAULT_TITLE;
  if (to.meta.security === User.NOT_AUTHENTICATED && userStore.isConnected()) {
    next({ name: "home" });
  } else if (to.meta.security === User.ADMIN) {
    if (userStore.isConnected() && userStore.isAdmin()) {
      next();
    } else {
      next({ name: "home" });
    }
  } else if (to.meta.security === User.AUTHENTICATED) {
    if (userStore.isConnected()) {
      next();
    } else {
      next({ name: "signin" });
    }
  } else {
    next();
  }
});

export default router;
