<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import type { ComponentObjectPropsOptions } from 'vue'

interface InputData {
  type: string
  placeholder: string
  label: string | null
  errorMessage: string | null
  pattern: string | RegExp
  minLength: number
  maxLength: number
}

const localError = ref<string>('')

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  data: {
    default: (): InputData => {
      return {
        type: 'text',
        placeholder: 'placeholder here',
        label: null,
        errorMessage: null,
        pattern: '',
        minLength: 1,
        maxLength: 100
      }
    }
  }
})
const emit = defineEmits(['update:modelValue', 'validate'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
const handleValidate = (event: Event) => {
  const el = event.target as HTMLInputElement
  const isPatternValid = props.data.pattern ? !!el.value.match(props.data.pattern) : true
  const isLengthValid =
    Number(el.value.length) >= props.data.minLength &&
    Number(el.value.length) <= props.data.maxLength
  if (!isPatternValid || !isLengthValid) {
    localError.value = 'Your value is not valid'
  } else {
    localError.value = ''
  }
  emit('validate', !!(isPatternValid && isLengthValid))
}
</script>

<template>
  <div class="input">
    <p v-if="props.data.label">{{ props.data.label }}</p>
    <input
      :type="props.data.type"
      :placeholder="props.data.placeholder"
      @input="handleInput"
      @blur="handleValidate"
    />
    <div class="icon">
      <slot></slot>
    </div>
  </div>
  <span v-if="props.data.errorMessage || localError" class="error input_error">{{
    props.data.errorMessage || localError
  }}</span>
</template>

<style lang="scss" scoped>
.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 4px 4px 4px 30px;
    height: 50px;

    &:focus {
      outline: none;
    }
  }

  .icon {
    width: 12px;
    position: absolute;
    left: 6px;
  }
  .input_error {
    margin-bottom: 8px;
  }
}
</style>
