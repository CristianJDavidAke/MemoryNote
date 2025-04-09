import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Project } from '../interfaces/projectInterface'
import { v4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []))

  const addProject = (projectName: string) => {
    projects.value.push({
      id: v4(),
      name: projectName,
      tasks: [],
    })
  }

  const addTask = (taskName: string, projectId: string) => {
    if (taskName) {
      const project = projects.value.find((project) => projectId == project.id)
      if (project) {
        project.tasks.push({
          id: v4(),
          name: taskName,
          completedAt: undefined,
        })
      }
    }
    return
  }

  const updatePro = (projectId: string, newName: string) => {
    if(!projectId)return
    const project = projects.value.find((project) => project.id == projectId)
    if (!project) return
    project.name = newName
  }
  const deletePro = (projectId: string) => {
    if (!projectId) return
    projects.value = projects.value.filter((project) => project.id != projectId)
  }

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((project) => projectId == project.id)
    if (!project) return

    const task = project.tasks.find((t) => taskId == t.id)
    if (!task) return

    task.completedAt = task.completedAt ? undefined : new Date()
  }

  return {
    projects,

    //getters
    projectList: computed(() => [...projects.value]),
    verfiProjects: computed(() => projects.value.length == 0),
    projectWithCompletion: computed(() => {
      return projects.value.map((project) => ({
        id: project.id,
        name: project.name,
        taskCount: project.tasks.length,
        completion: project.tasks.filter((task) => task.completedAt).length,
      }))
    }),

    //actions
    addProject,
    addTask,
    updatePro,
    deletePro,
    toggleTask,
  }
})
