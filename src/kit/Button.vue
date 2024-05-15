<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  color: {
    type: String,
    default: 'red'
  }
})
const emit = defineEmits(['click'])

const clickHandler = () => {
  emit('click')
}
</script>

<template>
  <button @click="clickHandler" :class="['btn', `btn_${color}`]">
    <div class="container">
      <slot></slot>
    </div>
  </button>
</template>

<style lang="scss" scoped>
$white-color: white;
$pink-button: #ff5959;
$black-color: black;

.btn {
  transition: 500ms ease all;
  cursor: pointer;
  padding: 9px 30px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  max-width: max-content;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &:focus {
    outline: none;
  }
  &_red {
    background-color: $pink-button;
    color: $white-color;
    &:hover {
      background-color: #f17b7b;
    }
  }
  &_white {
    background-color: $white-color;
    color: $black-color;
    &:hover {
      background-color: #d6d6d6;
    }
  }
}
</style>
