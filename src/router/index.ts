import ProjectsLayout from '@/modules/projects/layouts/projectsLayout.vue'
import ProjectView from '@/modules/projects/views/projectView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: ProjectsLayout,
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: ProjectView,
        },
        {
          path: 'project/:id',
          name: 'infoProject',
          props: true,
          component: () => import('@/modules/projects/views/infoProject.vue'),
        },
      ],
    },
  ],
})
/* path: '/',
      name: 'projects',
      component: ProjectsLayout,
      children: [
        {
          path: '/',
          name: 'projectView',
          component: ProjectView,
        }, */
export default router
