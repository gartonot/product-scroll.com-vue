<script lang="ts" setup>
  import { toRefs } from 'vue'

  interface IProps {
    modalIsOpen: boolean
  }

  const props = defineProps<IProps>()
  const { modalIsOpen } = toRefs(props)

  const emit = defineEmits<{
    'modal-close': []
  }>()
</script>

<template>
  <div :class="['modal', { 'modal-open': modalIsOpen }]" @click="emit('modal-close')" @wheel.stop>
    <div class="modal__wrapper" @click.stop>
      <button class="button-close" @click="emit('modal-close')">
        x
      </button>
      <div class="modal__wrapper-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .button-close {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border: none;
    padding: 8px;
    width: 24px;
    height: 24px;
    font-size: 16px;
    color: $color-error;
  }
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    background-color: rgba($color-black, 0.5);
    backdrop-filter: blur(10px);
    z-index: $index-10;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;

    &.modal-open {
      opacity: 1;
      visibility: visible;
    }
    &__wrapper {
      background-color: $color-white;
      min-width: 312px;
      max-width: 80%;
      padding: 20px;
      border-radius: 16px;

      &-body {
        margin-top: 20px;
      }
    }
  }
</style>
