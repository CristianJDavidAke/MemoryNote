<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Proyectos</th>
          <th>Tareas</th>
          <th>Avance</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover"
          v-for="(project, index) in projectStore.projectWithCompletion"
          :key="project.id"
        >
          <th>{{ index + 1 }}</th>
          <td @dblclick="(startEditing(project.id, project.name), (hover = true))">
            <template v-if="!editingState[project.id]">
              <h3>{{ project.name }}</h3>
            </template>
            <template v-else>
              <input type="text" v-model="inputUp" /> &nbsp;&nbsp;&nbsp;
              <button
                class="btn btn-outline btn-accent"
                @click="
                  (projectStore.updatePro(project.id, inputUp),
                  startEditing(project.id, project.name))
                "
              >
                Cambiar
              </button>
            </template>
          </td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-success w-56"
              :value="project.completion"
              :max="project.taskCount"
            ></progress>
            &nbsp;
            <span>{{ project.completion }}/{{ project.taskCount }}</span>
          </td>
          <td>
            <!-- REVISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR -->
            <button
              class="btn btn-outline btn-info"
              @mouseenter="hover = true"
              @mouseleave="hover = false"
              @click="startEditing(project.id, project.name)"
            >
              <template v-if="hover && editingState[project.id]">
                <OpenEye></OpenEye>
              </template>
              <template v-else>
                <CloseEye></CloseEye>
              </template>
            </button>
            &nbsp;
            <button
              class="btn btn-outline btn-secondary"
              @click="projectStore.deletePro(project.id)"
            >
              <XMark></XMark>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <InputMo
    :open="openMo"
    @close="openMo = false"
    @value="projectStore.addProject"
    tittle="Nuevo proyecto"
    subtittle="Ingresa el nombre del nuevo proyecto que quieras realizar"
    placeholder="Ingresan un nombre"
  ></InputMo>

  <CustomMo :open="customMo">
    <template #header>
      <h3 class="text-lg font-bold">Hello!</h3>
    </template>

    <template #body>
      <p>Hello body boy</p>
    </template>

    <template #footer>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button @click="customMo = false" class="btn">Close</button>
        </form>
      </div>
    </template>
  </CustomMo>

  <SqButton @click="openMo = true">
    <NoteVect></NoteVect>
  </SqButton>

  <SqButton position="bottom-left" @click="customMo = true">
    <DangerVec></DangerVec>
  </SqButton>
</template>

<script setup lang="ts">
import CustomMo from '@/modules/common/components/customMo.vue'
import InputMo from '@/modules/common/components/inputMo.vue'
import SqButton from '@/modules/common/components/sqButton.vue'
import NoteVect from '@/modules/common/Icons/noteVect.vue'
import XMark from '@/modules/common/Icons/xMark.vue'
import { ref } from 'vue'
import { useProjectStore } from '../store/projectStore'
import DangerVec from '@/modules/common/Icons/dangerVec.vue'
import CloseEye from '@/modules/common/Icons/closeEye.vue'
import OpenEye from '@/modules/common/Icons/openEye.vue'

const projectStore = useProjectStore()
const hover = ref(false)
const openMo = ref(false)
const customMo = ref(false)
const inputUp = ref('')
const editingState = ref<Record<string, boolean>>({})

const activeProjectId = ref<string | null>(null)

const startEditing = (id: string, projectName: string) => {
  if (activeProjectId.value) {
    editingState.value[activeProjectId.value] = false
  }
  if (activeProjectId.value == id) {
    editingState.value = {}
    activeProjectId.value = null
    return
  }
  editingState.value[id] = true
  activeProjectId.value = id

  inputUp.value = projectName
}
</script>
