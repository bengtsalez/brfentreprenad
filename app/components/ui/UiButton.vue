<script setup lang="ts">
import type { ButtonSize, ButtonVariant } from '~/types/ui'

/**
 * Knapp eller knapplänk. Med `href` blir det en länk, annars en <button>.
 * `disabled` ger alltid en inaktiverad <button>, eftersom länkar inte kan inaktiveras.
 */
const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  href: undefined,
  type: 'button',
  disabled: false,
})

const isLink = computed(() => Boolean(props.href) && !props.disabled)

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-accent text-on-accent hover:bg-accent-hover disabled:bg-disabled disabled:text-on-disabled',
  secondary: 'border-accent bg-transparent text-accent hover:bg-accent-soft disabled:border-line disabled:bg-transparent disabled:text-on-disabled',
  text: 'border-transparent text-accent underline-offset-4 hover:underline hover:decoration-2 disabled:text-on-disabled disabled:no-underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 text-base',
  sm: 'min-h-10 px-4 text-sm',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-control border font-semibold leading-tight text-center',
  'transition-colors duration-150 disabled:cursor-not-allowed',
  variantClasses[props.variant],
  props.variant === 'text' ? 'min-h-10 px-1' : sizeClasses[props.size],
])
</script>

<template>
  <a v-if="isLink" :href="href" :class="classes">
    <slot />
  </a>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
