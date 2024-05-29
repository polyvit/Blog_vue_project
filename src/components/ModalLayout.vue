<script setup lang="ts">
import IconClose from './icons/IconClose.vue'
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <IconClose @click="$emit('close-modal')" class="icon" />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    position: relative;

    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }
  }
}
</style>
