<template>
  <div class="">
    <div class="my-5">
      <label for="buttondisplay" class="font-bold block mb-2">
        {{ label }}
      </label>
      <slot></slot>
    </div>
    <div class="flex justify-between items-center">
      <p>{{ subtext }}</p>
      <div class="border bg-cyan-900 text-white rounded-full w-10 h-10 flex justify-center items-center">
        <p class="text-xl font-bold">{{ value }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    label: {
      type: String,
      default: "Label",
    },
    subtext: {
      type: String,
      default: "Enter subtext here",
    },
    value: {
      type: Number,
      default: 0,
    },
  });
</script>
