<template>
  <!-- <div>{{ router.params.id }}</div> -->
  <div class="w-full">
    <section class="m-2">
      <BreadCrums :name="project?.name"></BreadCrums>
    </section>

    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Completada</th>
              <th>Nombre</th>
              <th>Terminada el:</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="task in project?.tasks" :key="task.id">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectStore.toggleTask(id,task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>

            <tr class="hover">
              <th></th>
              <td colspan="2">
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="taskName"
                  @keyup.enter="submitTask()"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrums from '@/modules/common/components/breadCrums.vue'
import { useProjectStore } from '../store/projectStore'
import { ref, watch } from 'vue'
import type { Project } from '../interfaces/projectInterface'
import { useRouter } from 'vue-router'

const router = useRouter()
interface Props {
  id: string
}
const props = defineProps<Props>()
const projectStore = useProjectStore()
const taskName = ref('')
/* const project = ref<Project | undefined>(
  projectStore.projectList.find((project) => props.id == project.id),
)
 */

const project = ref<Project | undefined>()

const submitTask = () => {
  if (taskName.value && taskName.value.trim().length != 0) {
    projectStore.addTask(taskName.value, props.id)
    taskName.value = ''
    return
  }
  return
}

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => props.id == project.id)
    if (!project.value) {
      router.replace('/')
    }
  },
  {
    immediate: true,
  },
)
</script>
