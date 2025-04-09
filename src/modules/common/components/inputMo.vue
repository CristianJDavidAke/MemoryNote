<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ tittle }}!</h3>
      <p v-if="subtittle" class="py-4">{{ subtittle }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue()">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ingrese un nuevo valor'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5">
            <button type="button" class="btn btn-error mr-3" @click="emits('close')">Close</button>
            <button type="submit" class="btn btn-success">Crear</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  open: boolean
  placeholder?: string
  tittle: string
  subtittle?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  close: [void]
  value: [text: string]
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(props, ({ open }) => {
  if (open) {
    inputRef.value?.focus()
  }
})

const submitValue = () => {
  if (inputValue.value && inputValue.value.length != 0) {
    console.log(inputValue.value)
    emits('value', inputValue.value.trim())
    emits('close')
    inputValue.value = ''
    return
  }
  inputRef.value?.focus()

  return
}
</script>
